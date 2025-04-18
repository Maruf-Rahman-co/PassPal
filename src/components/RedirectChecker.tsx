import { useState } from "react";
import { Loader2, AlertTriangle, CheckCircle, ArrowRight, Copy, Download, ExternalLink, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { checkRedirects, type RedirectChainResult, type RedirectHop } from "@/lib/redirectChecker";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [maxHops, setMaxHops] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RedirectChainResult | null>(null);

  const handleCheck = async () => {
    if (!url) {
      toast.error("Please enter a URL to check");
      return;
    }

    try {
      // Validate URL format
      new URL(url);
      
      setIsLoading(true);
      const result = await checkRedirects(url, maxHops);
      setResult(result);
      
      // Show appropriate toast based on result
      if (result.hasLoop) {
        toast.warning("Redirect loop detected in the chain!");
      } else if (result.finalDestination?.isSuspicious) {
        toast.warning("The final destination appears suspicious!");
      } else if (result.chain.some(hop => hop.isSuspicious)) {
        toast.warning("Suspicious domains detected in the redirect chain!");
      } else if (result.chain.some(hop => hop.error)) {
        toast.error("Some redirects encountered errors!");
      } else {
        toast.success("Redirect chain analysis completed successfully!");
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("Invalid URL")) {
        toast.error("Please enter a valid URL including the protocol (e.g., https://)");
      } else {
        toast.error("Failed to check redirects: " + (error instanceof Error ? error.message : "Unknown error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "text-green-500";
    if (statusCode >= 300 && statusCode < 400) return "text-amber-500";
    return "text-red-500";
  };

  const getStatusDescription = (statusCode: number) => {
    if (statusCode === 301) return "Moved Permanently";
    if (statusCode === 302) return "Found (Temporary Redirect)";
    if (statusCode === 303) return "See Other";
    if (statusCode === 307) return "Temporary Redirect";
    if (statusCode === 308) return "Permanent Redirect";
    if (statusCode === 200) return "OK (Final Destination)";
    if (statusCode === 404) return "Not Found";
    if (statusCode === 403) return "Forbidden";
    if (statusCode === 500) return "Internal Server Error";
    if (statusCode === 0) return "Connection Error";
    return "Unknown Status";
  };

  const getStatusIcon = (hop: RedirectHop) => {
    if (hop.error) return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (hop.statusCode >= 200 && hop.statusCode < 300) return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <ArrowRight className="h-5 w-5 text-amber-500" />;
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Redirect Chain Analysis\n` +
      `Initial URL: ${result.chain[0].url}\n` +
      `Total Hops: ${result.totalHops}\n` +
      `Has Loop: ${result.hasLoop ? 'Yes' : 'No'}\n\n` +
      result.chain.map((hop, index) => 
        `${index + 1}. ${hop.url}\n` +
        `   Status: ${hop.statusCode} (${getStatusDescription(hop.statusCode)})\n` +
        `   ${hop.isSuspicious ? '⚠️ Suspicious Domain\n' : ''}` +
        `   ${hop.error ? `Error: ${hop.error}\n` : ''}`
      ).join('\n');
    
    navigator.clipboard.writeText(text);
    toast.success("Detailed redirect chain copied to clipboard");
  };

  const exportAsJson = () => {
    if (!result) return;
    
    const exportData = {
      ...result,
      chain: result.chain.map(hop => ({
        ...hop,
        statusDescription: getStatusDescription(hop.statusCode)
      })),
      analysisTimestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `redirect-analysis-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Detailed analysis exported as JSON");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="text-passpal-purple" />
            Link Redirect Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter URL to check (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleCheck}
              disabled={isLoading || !url}
              className="bg-passpal-purple hover:bg-passpal-purple/90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Check"
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">
                Maximum Redirects: {maxHops}
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Limit the number of redirects to follow. Higher values allow for longer chains but may take more time.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider
              value={[maxHops]}
              onValueChange={([value]) => setMaxHops(value)}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          {result && (
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Alert variant={result.securityScore >= 80 ? "default" : result.securityScore >= 50 ? "warning" : "destructive"}>
                  <div className="flex items-center gap-2">
                    {result.securityScore >= 80 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : result.securityScore >= 50 ? (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    <AlertDescription>
                      Security Score: {result.securityScore}/100
                    </AlertDescription>
                  </div>
                </Alert>

                <Alert variant="default">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Chain Analysis: {result.totalHops} hop{result.totalHops !== 1 ? 's' : ''} detected
                      {result.hasLoop ? ' (Redirect loop detected!)' : ''}
                    </AlertDescription>
                  </div>
                </Alert>
              </div>

              {result.warnings.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Security Warnings</h3>
                  <div className="space-y-2">
                    {result.warnings.map((warning, index) => (
                      <Alert key={index} variant="warning">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{warning}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Redirect Chain</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportAsJson}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {result.chain.map((hop, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 p-3 rounded-lg ${
                        hop.isSuspicious ? "bg-red-100 dark:bg-red-900/20" : "bg-card"
                      }`}
                    >
                      {getStatusIcon(hop)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm">
                            {hop.statusCode || "ERR"}
                          </span>
                          <span className={`text-sm ${getStatusColor(hop.statusCode)}`}>
                            {getStatusDescription(hop.statusCode)}
                          </span>
                          {index === result.chain.length - 1 && (
                            <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                              Final Destination
                            </span>
                          )}
                          {hop.securityInfo?.isHttps ? (
                            <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                              HTTPS
                            </span>
                          ) : (
                            <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-0.5 rounded">
                              HTTP
                            </span>
                          )}
                        </div>
                        <p className="text-sm break-all">{hop.url}</p>
                        {hop.securityInfo && (
                          <div className="text-xs text-muted-foreground space-y-1">
                            {hop.securityInfo.certificateInfo && (
                              <p>{hop.securityInfo.certificateInfo}</p>
                            )}
                            {hop.securityInfo.serverInfo && (
                              <p>Server: {hop.securityInfo.serverInfo}</p>
                            )}
                          </div>
                        )}
                        {hop.isSuspicious && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Suspicious domain detected
                          </p>
                        )}
                        {hop.error && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {hop.error}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {result.finalDestination && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Final Destination Details</h3>
                  <div className="p-4 rounded-lg bg-card">
                    {result.finalDestination.title && (
                      <h4 className="font-medium mb-2">{result.finalDestination.title}</h4>
                    )}
                    {result.finalDestination.description && (
                      <p className="text-sm text-muted-foreground">
                        {result.finalDestination.description}
                      </p>
                    )}
                    {result.finalDestination.securityInfo && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>{result.finalDestination.securityInfo.certificateInfo}</p>
                        {result.finalDestination.securityInfo.serverInfo && (
                          <p>Server: {result.finalDestination.securityInfo.serverInfo}</p>
                        )}
                      </div>
                    )}
                    {result.finalDestination.isSuspicious && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Warning: This destination domain appears suspicious. Exercise caution before visiting.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 