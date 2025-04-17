import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Encoder = () => {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  // Custom encoding algorithm
  const encodeText = (text: string, key: string): string => {
    if (!text || !key) return "";
    
    // Convert key to a number sequence
    const keySum = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const keyPattern = keySum.toString().split("").map(Number);
    
    return text
      .split("")
      .map((char, index) => {
        const charCode = char.charCodeAt(0);
        const shift = keyPattern[index % keyPattern.length];
        // Apply shift based on mode
        const newCharCode = mode === "encode" 
          ? charCode + shift + keySum % 26
          : charCode - shift - keySum % 26;
        
        return String.fromCharCode(newCharCode);
      })
      .join("");
  };

  const handleProcess = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }
    
    if (!key) {
      toast({
        title: "Error",
        description: "Please enter an encryption key",
        variant: "destructive",
      });
      return;
    }

    const processed = encodeText(text, key);
    setResult(processed);
    
    toast({
      title: `${mode === "encode" ? "Encoded" : "Decoded"} Successfully! 🎉`,
      description: `Your text has been ${mode === "encode" ? "encoded" : "decoded"}.`
    });
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied! 📋",
        description: "Result copied to clipboard"
      });
    }
  };

  const handleClear = () => {
    setText("");
    setResult("");
    setKey("");
  };

  return (
    <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
        {mode === "encode" ? (
          <Lock className="text-passpal-purple" size={20} />
        ) : (
          <Unlock className="text-passpal-purple" size={20} />
        )}
        Text {mode === "encode" ? "Encoder" : "Decoder"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter your text:
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Text to ${mode}...`}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Encryption Key:
          </label>
          <Input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your secret key"
            type="text"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleProcess}
            className="flex-1 bg-passpal-purple hover:bg-passpal-purple/80"
          >
            {mode === "encode" ? (
              <>
                <Lock className="mr-2" size={16} /> Encode
              </>
            ) : (
              <>
                <Unlock className="mr-2" size={16} /> Decode
              </>
            )}
          </Button>
          <Button
            onClick={() => setMode(mode === "encode" ? "decode" : "encode")}
            variant="outline"
            className="hover:bg-passpal-purple/10"
          >
            <RefreshCw size={16} />
          </Button>
        </div>

        {result && (
          <div className="mt-6 space-y-2">
            <label className="block text-sm font-medium">
              {mode === "encode" ? "Encoded" : "Decoded"} Result:
            </label>
            <div className="relative">
              <Textarea
                value={result}
                readOnly
                className="pr-10 min-h-[100px]"
              />
              <Button
                onClick={handleCopy}
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 hover:bg-passpal-purple/10"
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
        )}

        {(text || result || key) && (
          <Button
            onClick={handleClear}
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default Encoder; 