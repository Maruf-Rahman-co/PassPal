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
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex items-center space-x-4 mr-4">
          <div className="flex-1 flex items-center space-x-2">
            <label className="text-sm font-medium whitespace-nowrap">Key:</label>
            <Input
              placeholder="Enter encryption/decryption key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="flex-1"
            />
          </div>
          {mode === "decrypt" && (
            <Button
              variant="outline"
              onClick={handleAnalyzeKeyLength}
              className="whitespace-nowrap"
              disabled={!inputText}
            >
              <Search className="mr-2 h-4 w-4" />
              Analyze Key Length
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleSwap}
          className="ml-2"
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Input Text</label>
            <div className="text-sm text-muted-foreground">
              {mode === "encrypt" ? "Plain Text" : "Cipher Text"}
            </div>
          </div>
          <div className="flex space-x-2">
            <Textarea
              placeholder={`Enter text to ${mode}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 min-h-[100px]"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleCopy(inputText)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button 
          onClick={handleConvert} 
          className="w-full"
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

        {outputText && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Output Text</label>
              <div className="text-sm text-muted-foreground">
                {mode === "encrypt" ? "Cipher Text" : "Plain Text"}
              </div>
            </div>
            <div className="flex space-x-2">
              <Textarea
                value={outputText}
                readOnly
                className="flex-1 min-h-[100px]"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCopy(outputText)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {keyLengthAnalysis.length > 0 && (
        <Card className="p-4 mt-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <h4 className="text-sm font-medium">Key Length Analysis</h4>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {keyLengthAnalysis.slice(0, 5).map((result, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Length: {result.length}</span>
                  <span className="text-sm text-muted-foreground">
                    Score: {result.score.toFixed(3)}
                  </span>
                </div>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${(result.score / keyLengthAnalysis[0].score) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </Card>
  );
} 