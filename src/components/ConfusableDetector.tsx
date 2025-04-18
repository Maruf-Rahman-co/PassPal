import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Check, 
  Copy, 
  Download, 
  FileWarning,
  Globe,
  AlertCircle,
  Info,
  Shield,
  Languages,
  BarChart
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { 
  detectConfusables, 
  sanitize, 
  isURL, 
  splitDomain,
  findSimilarDomains,
  type ConfusableChar,
  type AnalysisResult
} from "@/lib/confusables";

const RiskLevelColors = {
  high: "text-red-500 bg-red-500/10",
  medium: "text-yellow-500 bg-yellow-500/10",
  low: "text-green-500 bg-green-500/10"
};

const RiskLevelIcons = {
  high: AlertTriangle,
  medium: AlertCircle,
  low: Check
};

const ConfusableDetector = () => {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [sanitizedText, setSanitizedText] = useState("");
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    const result = detectConfusables(input);
    setAnalysis(result);
    setSanitizedText(sanitize(input));
    setIsAnalyzed(true);
  }, [input]);

  const handleCopyClean = useCallback(() => {
    navigator.clipboard.writeText(sanitizedText);
    toast.success("Clean text copied to clipboard");
  }, [sanitizedText]);

  const handleExport = useCallback(() => {
    if (!analysis) return;

    const { chars, stats } = analysis;
    const csvContent = [
      ["Analysis Report"],
      ["Generated at:", new Date().toISOString()],
      [""],
      ["Overall Statistics"],
      ["Total Characters:", stats.totalChars],
      ["Confusable Characters:", stats.confusableCount],
      ["Risk Level:", stats.riskLevel.toUpperCase()],
      ["Detected Patterns:", stats.matchedPatterns.join(", ") || "None"],
      [""],
      ["Script Distribution"],
      ...Object.entries(stats.scripts).map(([script, count]) => [script, count]),
      [""],
      ["Character Analysis"],
      ["Character", "Unicode", "Name", "Script", "Risk Level", "Safe Version"],
      ...chars.map(c => [
        c.char,
        `U+${c.codePoint}`,
        c.name,
        c.script,
        c.riskLevel.toUpperCase(),
        c.isConfusable ? c.replacement : c.char
      ])
    ].map(row => row.join(",")).join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "confusables-analysis.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Analysis report exported successfully");
  }, [analysis]);

  const renderRiskIcon = (riskLevel: 'high' | 'medium' | 'low', className?: string) => {
    const Icon = RiskLevelIcons[riskLevel];
    return <Icon className={className || 'w-3 h-3 mr-1'} />;
  };

  const renderChar = (char: ConfusableChar) => {
    return (
      <Tooltip key={char.codePoint}>
        <TooltipTrigger asChild>
          <span 
            className={`font-medium cursor-help ${char.isConfusable ? RiskLevelColors[char.riskLevel] : ''} 
              px-0.5 rounded`}
          >
            {char.char}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <div className="space-y-2 p-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">Character Analysis</p>
              {char.isConfusable && (
                <Badge variant="outline" className={RiskLevelColors[char.riskLevel]}>
                  {renderRiskIcon(char.riskLevel)}
                  {char.riskLevel.toUpperCase()} RISK
                </Badge>
              )}
            </div>
            <div className="text-sm space-y-1">
              <p>Character: {char.char}</p>
              <p>Unicode: U+{char.codePoint}</p>
              <p>Script: {char.script}</p>
              <p>Name: {char.name}</p>
              {char.isConfusable && <p>Looks like: {char.replacement}</p>}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  const renderDomainAnalysis = () => {
    if (!isURL(input) || !analysis) return null;

    const { domain } = splitDomain(input);
    const similarDomains = findSimilarDomains(domain);
    const { stats } = analysis;

    return (
      <div className="mt-4 p-4 rounded-lg bg-background">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Domain Analysis
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Risk Level:</span>
              <Badge variant="outline" className={RiskLevelColors[stats.riskLevel]}>
                {renderRiskIcon(stats.riskLevel)}
                {stats.riskLevel.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Confusable Rate:</span>
              <div className="w-32">
                <Progress 
                  value={(stats.confusableCount / stats.totalChars) * 100}
                  className={stats.riskLevel === 'high' ? 'bg-red-500' : 
                    stats.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
                />
              </div>
            </div>
          </div>

          {stats.matchedPatterns.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Known Patterns Detected:</p>
              <div className="flex flex-wrap gap-2">
                {stats.matchedPatterns.map(pattern => (
                  <Badge key={pattern} variant="outline" className="bg-red-500/10 text-red-500">
                    {pattern}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {similarDomains.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Similar Malicious Domains:</p>
              <div className="flex flex-wrap gap-2">
                {similarDomains.map((domain, i) => (
                  <Badge key={i} variant="outline" className="font-mono">
                    {domain}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium">Script Distribution:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.scripts).map(([script, count]) => (
                <Badge key={script} variant="outline" className="flex items-center gap-1">
                  <Languages className="w-3 h-3" />
                  {script}: {count}
                </Badge>
              ))}
            </div>
          </div>

          {stats.riskLevel !== 'low' && (
            <div className="p-3 bg-red-500/10 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-medium text-red-500">Security Alert</p>
                <p>This domain contains suspicious characters and might be a phishing attempt.</p>
                {Object.keys(stats.scripts).length > 1 && (
                  <p>Multiple scripts detected, which is unusual for legitimate domains.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAnalysisOverview = () => {
    if (!analysis) return null;
    const { stats } = analysis;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <Card className="p-4 flex items-center gap-3">
          <div className={`p-2 rounded-lg ${RiskLevelColors[stats.riskLevel]}`}>
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Risk Level</p>
            <p className={`text-lg font-bold ${RiskLevelColors[stats.riskLevel].split(' ')[0]}`}>
              {stats.riskLevel.toUpperCase()}
            </p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Scripts Used</p>
            <p className="text-lg font-bold">{Object.keys(stats.scripts).length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
            <BarChart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Confusable Rate</p>
            <p className="text-lg font-bold">
              {((stats.confusableCount / stats.totalChars) * 100).toFixed(1)}%
            </p>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text-input">Enter Text or URL</Label>
          <div className="flex gap-2">
            <Input
              id="text-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter suspicious text or URL (e.g., аррӏе.com)"
              className="font-mono"
            />
            <Button onClick={handleAnalyze}>
              Analyze
            </Button>
          </div>
        </div>

        {isAnalyzed && analysis && (
          <>
            {renderAnalysisOverview()}

            <Card className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <FileWarning className="w-4 h-4" />
                  Analysis Results
                </h3>
                <div className="p-4 rounded-lg bg-background font-mono text-lg break-all">
                  {analysis.chars.map((char, i) => (
                    <span key={i}>{renderChar(char)}</span>
                  ))}
                </div>
              </div>

              {renderDomainAnalysis()}

              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Safe Version
                </h3>
                <div className="p-4 rounded-lg bg-background font-mono text-lg break-all">
                  {sanitizedText}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyClean}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Clean Text
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExport}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export Analysis Report
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <ScrollArea className="h-[200px]">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-2">Character</th>
                      <th className="p-2">Unicode</th>
                      <th className="p-2">Script</th>
                      <th className="p-2">Risk</th>
                      <th className="p-2">Safe Version</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.chars.map((char, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="p-2 font-mono">{char.char}</td>
                        <td className="p-2 font-mono">U+{char.codePoint}</td>
                        <td className="p-2">{char.script}</td>
                        <td className="p-2">
                          <Badge 
                            variant="outline" 
                            className={RiskLevelColors[char.riskLevel]}
                          >
                            {renderRiskIcon(char.riskLevel)}
                            {char.riskLevel.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-2 font-mono">
                          {char.isConfusable ? char.replacement : char.char}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </Card>
          </>
        )}
      </div>

      
    </div>
  );
};

export default ConfusableDetector; 