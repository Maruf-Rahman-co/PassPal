import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, Copy, Key, Lock, Unlock, AlertCircle } from "lucide-react";
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
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Shift:</label>
            <Input
              type="number"
              min="0"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </div>
          {mode === "decrypt" && (
            <Button variant="outline" onClick={handleBruteForce} className="space-x-2">
              <Key className="h-4 w-4" />
              <span>Brute Force</span>
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

      {bruteForceResults.length > 0 && (
        <Card className="p-4 mt-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <h4 className="text-sm font-medium">Brute Force Results</h4>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {bruteForceResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Shift {index + 1}:</span>
                  <span className="text-sm">{result}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(result)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </Card>
  );
} 