import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, Copy, Key, Lock, Unlock, AlertCircle, ArrowDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CaesarCipher() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [bruteForceResults, setBruteForceResults] = useState<string[]>([]);
  const { toast } = useToast();

  const caesarCipher = (text: string, shift: number): string => {
    if (!text) return "";
    
    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
        }
        if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
        }
        return char;
      })
      .join("");
  };

  const handleConvert = () => {
    try {
      if (!inputText) {
        toast({
          title: "Error",
          description: "Please enter text to process",
          variant: "destructive",
        });
        return;
      }

      const result = caesarCipher(inputText, mode === "encrypt" ? shift : -shift);
      setOutputText(result);
      setBruteForceResults([]);
      
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

  const handleBruteForce = () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter text to decrypt",
        variant: "destructive",
      });
      return;
    }

    const results: string[] = [];
    for (let i = 1; i <= 25; i++) {
      results.push(caesarCipher(inputText, -i));
    }
    setBruteForceResults(results);
    
    toast({
      title: "Brute Force Complete",
      description: "All possible shifts have been calculated",
    });
  };

  const handleSwap = () => {
    setInputText("");
    setOutputText("");
    setShift(3);
    setBruteForceResults([]);
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

  return (
    <div className="space-y-6">
      {/* Mode and Controls Card */}
      <Card className="p-4 bg-gradient-to-br from-background to-muted">
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
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm p-2 rounded-lg">
              <label className="text-sm font-medium">Shift:</label>
              <Input
                type="number"
                min="0"
                max="25"
                value={shift}
                onChange={(e) => setShift(parseInt(e.target.value) || 0)}
                className="w-16 h-7 text-sm"
              />
            </div>
            
            {mode === "decrypt" && (
              <Button 
                variant="outline" 
                onClick={handleBruteForce} 
                size="sm"
                className="h-9 text-xs sm:text-sm bg-background/50 backdrop-blur-sm"
              >
                <Key className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                Brute Force
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
          disabled={!inputText}
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

        {/* Brute Force Results */}
        {bruteForceResults.length > 0 && (
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Brute Force Results</span>
              </div>
            </div>
            <div className="divide-y max-h-[300px] overflow-y-auto">
              {bruteForceResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-muted/50">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted">
                      Shift {index + 1}
                    </span>
                    <span className="text-sm truncate">{result}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(result)}
                    className="h-8 w-8 shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
} 