import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCcw, Lock } from "lucide-react";
import { toast } from "sonner";

// Zero-width characters
const ZERO_WIDTH_SPACE = "\u200B";
const ZERO_WIDTH_NON_JOINER = "\u200C";
const ZERO_WIDTH_JOINER = "\u200D";
const LEFT_TO_RIGHT_MARK = "\u200E";
const RIGHT_TO_LEFT_MARK = "\u200F";

const ZeroWidthEncoder = () => {
  const [inputText, setInputText] = useState("");
  const [coverText, setCoverText] = useState("");
  const [password, setPassword] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleModeChange = (newMode: "encode" | "decode") => {
    // Clear all input fields when switching modes
    setInputText("");
    setCoverText("");
    setPassword("");
    setOutputText("");
    setMode(newMode);
  };

  const encodeText = (text: string, cover: string, pass: string) => {
    // Convert text to binary
    const binary = text.split('').map(char => 
      char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join('');

    // If password is provided, encrypt the binary using XOR
    let encryptedBinary = binary;
    if (pass) {
      encryptedBinary = binary.split('').map((bit, i) => {
        const passBit = pass.charCodeAt(i % pass.length) % 2 === 0 ? '0' : '1';
        return bit === passBit ? '0' : '1'; // XOR
      }).join('');
    }

    // Convert encrypted binary to zero-width characters
    const encoded = encryptedBinary.split('').map(bit => {
      return bit === '0' ? ZERO_WIDTH_SPACE : ZERO_WIDTH_NON_JOINER;
    }).join('');

    return cover + encoded;
  };

  const decodeText = (text: string, pass: string) => {
    // Extract zero-width characters
    const zeroWidthChars = text.split('').filter(char => 
      [ZERO_WIDTH_SPACE, ZERO_WIDTH_NON_JOINER].includes(char)
    );

    // Convert zero-width characters back to binary
    let binary = zeroWidthChars.map(char => {
      return char === ZERO_WIDTH_SPACE ? '0' : '1';
    }).join('');

    // If password is provided, decrypt the binary using XOR
    if (pass) {
      binary = binary.split('').map((bit, i) => {
        const passBit = pass.charCodeAt(i % pass.length) % 2 === 0 ? '0' : '1';
        return bit === passBit ? '0' : '1'; // XOR to decrypt
      }).join('');
    }

    // Convert binary to text
    const chunks = binary.match(/.{1,8}/g) || [];
    return chunks.map(chunk => 
      String.fromCharCode(parseInt(chunk, 2))
    ).join('');
  };

  const handleEncode = () => {
    if (!inputText) {
      toast.error("Please enter text to encode");
      return;
    }
    if (!coverText) {
      toast.error("Please enter cover text");
      return;
    }
    const encoded = encodeText(inputText, coverText, password);
    setOutputText(encoded);
  };

  const handleDecode = () => {
    if (!inputText) {
      toast.error("Please enter text to decode");
      return;
    }
    try {
      const decoded = decodeText(inputText, password);
      setOutputText(decoded);
    } catch (error) {
      toast.error("Failed to decode text. Make sure you have the correct password.");
    }
  };

  const handleCopy = () => {
    if (!outputText) return;

    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = outputText;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);

    try {
      // Select and copy the text
      textarea.select();
      const successful = document.execCommand('copy');
      
      if (successful) {
        toast.success("Copied to clipboard!");
      } else {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    } finally {
      // Clean up
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex gap-4">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => handleModeChange("encode")}
            className="flex-1"
          >
            Encode
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode
          </Button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-text">
              {mode === "encode" ? "Secret Message" : "Encoded Text"}
            </Label>
            <Textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === "encode" ? "Enter your secret message..." : "Paste the encoded text..."}
              className="min-h-[100px]"
            />
          </div>

          {mode === "encode" && (
            <div className="space-y-2">
              <Label htmlFor="cover-text">Cover Text</Label>
              <Textarea
                id="cover-text"
                value={coverText}
                onChange={(e) => setCoverText(e.target.value)}
                placeholder="Enter the text that will hide your secret message..."
                className="min-h-[100px]"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password (Optional)</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password for additional security..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={mode === "encode" ? handleEncode : handleDecode}
            className="flex-1"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            {mode === "encode" ? "Encode" : "Decode"}
          </Button>
          {outputText && (
            <Button
              variant="outline"
              onClick={handleCopy}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          )}
        </div>

        {/* Output */}
        {outputText && (
          <div className="space-y-2">
            <Label>Result</Label>
            <div className="glass p-4 rounded-lg break-all">
              {outputText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZeroWidthEncoder; 