import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, Copy, Key, Lock, Unlock, Search, AlertCircle } from "lucide-react";
import { encryptVigenere, decryptVigenere, analyzeKeyLength } from "@/lib/vigenereCipher";
import { useToast } from "@/components/ui/use-toast";

export default function VigenereCipher() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [key, setKey] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [keyLengthAnalysis, setKeyLengthAnalysis] = useState<{ length: number; score: number }[]>([]);
  const { toast } = useToast();

  const handleConvert = () => {
    try {
      if (!key) {
        toast({
          title: "Error",
          description: "Please enter a key",
          variant: "destructive",
        });
        return;
      }

      if (!inputText) {
        toast({
          title: "Error",
          description: "Please enter text to process",
          variant: "destructive",
        });
        return;
      }

      const result = mode === "encrypt"
        ? encryptVigenere(inputText, key)
        : decryptVigenere(inputText, key);
      
      setOutputText(result);
      toast({
        title: "Success",
        description: `Text ${mode === "encrypt" ? "encrypted" : "decrypted"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleSwap = () => {
    setInputText("");
    setOutputText("");
    setKey("");
    setKeyLengthAnalysis([]);
    setMode(mode === "encrypt" ? "decrypt" : "encrypt");
    
    toast({
      title: "Mode Changed",
      description: `Switched to ${mode === "encrypt" ? "decrypt" : "encrypt"} mode`,
    });
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  const handleAnalyzeKeyLength = () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter text to analyze",
        variant: "destructive",
      });
      return;
    }

    const results = analyzeKeyLength(inputText);
    setKeyLengthAnalysis(results);
    
    toast({
      title: "Analysis Complete",
      description: "Key length analysis has been performed",
    });
  };

  return (
    <div className="space-y-6">
      {/* Mode and Key Controls */}
      <Card className="overflow-hidden bg-gradient-to-br from-background to-muted">
        <div className="p-4 space-y-4">
          {/* Mode Toggle */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm p-2 rounded-lg">
              <Lock className={`w-4 h-4 ${mode === "encrypt" ? "text-passpal-purple" : "text-muted-foreground"}`} />
              <span className="text-sm font-medium">Encrypt</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSwap}
                className="h-7 w-7 p-0"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <Unlock className={`w-4 h-4 ${mode === "decrypt" ? "text-passpal-purple" : "text-muted-foreground"}`} />
              <span className="text-sm font-medium">Decrypt</span>
            </div>
          </div>

          {/* Key Input */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full flex items-center gap-2 bg-background/50 backdrop-blur-sm p-2 rounded-lg">
              <Key className="h-4 w-4 text-passpal-purple" />
              <Input
                placeholder="Enter encryption key..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="flex-1 h-7 text-sm border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
            {mode === "decrypt" && (
              <Button
                variant="outline"
                onClick={handleAnalyzeKeyLength}
                size="sm"
                className="w-full sm:w-auto h-9 text-xs sm:text-sm bg-background/50 backdrop-blur-sm"
                disabled={!inputText}
              >
                <Search className="h-4 w-4 mr-2" />
                Analyze Key Length
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid gap-4">
        {/* Input Card */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Input Text</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                  {mode === "encrypt" ? "Plain Text" : "Cipher Text"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(inputText)}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder={`Enter text to ${mode}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border-0 rounded-none min-h-[100px] text-sm resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </Card>

        {/* Convert Button */}
        <div className="flex justify-center">
          <div className="bg-muted w-0.5 h-6" />
        </div>
        <Button 
          onClick={handleConvert} 
          className="mx-auto w-full sm:w-auto min-w-[200px] bg-passpal-purple hover:bg-passpal-purple/90"
          disabled={!inputText || !key}
        >
          {mode === "encrypt" ? (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Encrypt Text
            </>
          ) : (
            <>
              <Unlock className="mr-2 h-4 w-4" />
              Decrypt Text
            </>
          )}
        </Button>

        {/* Output Card */}
        {outputText && (
          <>
            <div className="flex justify-center">
              <div className="bg-muted w-0.5 h-6" />
            </div>
            <Card className="overflow-hidden">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Output Text</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                      {mode === "encrypt" ? "Cipher Text" : "Plain Text"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(outputText)}
                    className="h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={outputText}
                readOnly
                className="border-0 rounded-none min-h-[100px] text-sm resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </Card>
          </>
        )}

        {/* Key Length Analysis */}
        {keyLengthAnalysis.length > 0 && (
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Key Length Analysis</span>
              </div>
            </div>
            <div className="divide-y">
              {keyLengthAnalysis.slice(0, 5).map((result, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted">
                      Length {result.length}
                    </span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-passpal-purple"
                        style={{
                          width: `${(result.score / keyLengthAnalysis[0].score) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Score: {result.score.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
} 