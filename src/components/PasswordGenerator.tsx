import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Zap, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePassword, generateMemorablePassword } from "@/utils/passwordUtils";
import { Card } from "@/components/ui/card";

interface PasswordGeneratorProps {
  password: string;
  setPassword: (password: string) => void;
  onSavePassword?: (password: string) => void;
}

const PasswordGenerator = ({ password, setPassword, onSavePassword }: PasswordGeneratorProps) => {
  const { toast } = useToast();
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [includeEmojis, setIncludeEmojis] = useState<boolean>(false);
  const [isMemorable, setIsMemorable] = useState<boolean>(false);

  // Generate password when options change
  useEffect(() => {
    handleGeneratePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, includeEmojis, isMemorable]);

  // Handle password generation
  const handleGeneratePassword = () => {
    if (isMemorable) {
      const memorablePassword = generateMemorablePassword(
        includeUppercase, 
        includeNumbers, 
        includeSymbols
      );
      setPassword(memorablePassword);
    } else {
      const newPassword = generatePassword(
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        includeEmojis
      );
      setPassword(newPassword);
    }
  };

  // Handle copy to clipboard
  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({
        title: "Copied! 🥳",
        description: "Password saved to clipboard"
      });
    }
  };

  // Handle save password to history
  const handleSavePassword = () => {
    if (password && onSavePassword) {
      onSavePassword(password);
      toast({
        title: "Saved! 💾",
        description: "Password added to history"
      });
    }
  };

  return (
    <Card className="p-3 sm:p-4 md:p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-passpal-purple" />
        <h2 className="text-base sm:text-lg md:text-xl font-semibold">Password Generator</h2>
      </div>

      {/* Password Display */}
      <div className="mb-4 sm:mb-6">
        <div className="relative flex flex-col gap-2 sm:block">
          <input
            type="text"
            value={password}
            className="w-full min-h-[48px] px-3 py-2 sm:py-3 rounded-lg bg-background border border-border font-mono text-sm break-all text-foreground sm:pr-[6.5rem]"
            readOnly
          />
          <div className="flex sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 gap-2 justify-end">
            <Button
              onClick={handleCopyPassword}
              variant="ghost"
              size="sm"
              className="flex-1 sm:flex-initial h-8 hover:bg-background/50 border border-border"
            >
              <Copy className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Copy</span>
            </Button>
            <Button
              onClick={handleSavePassword}
              variant="ghost"
              size="sm"
              className="flex-1 sm:flex-initial h-8 hover:bg-background/50 border border-border"
              disabled={!password || !onSavePassword}
            >
              <Save className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <Label htmlFor="length" className="text-sm font-medium">Length: {length} characters</Label>
              {isMemorable && (
                <span className="text-xs text-muted-foreground">
                  (Disabled for memorable mode)
                </span>
              )}
            </div>
            <Slider 
              id="length"
              min={8} 
              max={64} 
              step={1} 
              value={[length]} 
              onValueChange={(value) => setLength(value[0])}
              disabled={isMemorable}
              className={isMemorable ? "opacity-50" : ""}
            />
          </div>

          {/* Character Types */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="memorable" className="text-sm font-medium">Make it Memorable</Label>
              <Switch 
                id="memorable" 
                checked={isMemorable} 
                onCheckedChange={setIsMemorable}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="text-sm font-medium">Uppercase Letters</Label>
              <Switch 
                id="uppercase" 
                checked={includeUppercase} 
                onCheckedChange={setIncludeUppercase}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase" className="text-sm font-medium">Lowercase Letters</Label>
              <Switch 
                id="lowercase" 
                checked={includeLowercase} 
                onCheckedChange={setIncludeLowercase}
                disabled={isMemorable}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="numbers" className="text-sm font-medium">Numbers</Label>
              <Switch 
                id="numbers" 
                checked={includeNumbers} 
                onCheckedChange={setIncludeNumbers}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="symbols" className="text-sm font-medium">Symbols</Label>
              <Switch 
                id="symbols" 
                checked={includeSymbols} 
                onCheckedChange={setIncludeSymbols}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="emojis" className="text-sm font-medium">Emojis</Label>
              <Switch 
                id="emojis" 
                checked={includeEmojis} 
                onCheckedChange={setIncludeEmojis}
                disabled={isMemorable}
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGeneratePassword} 
            className="w-full h-10 bg-passpal-purple hover:bg-passpal-purple/90 text-white"
          >
            <Zap className="w-4 h-4 mr-2" />
            Generate New Password
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PasswordGenerator;
