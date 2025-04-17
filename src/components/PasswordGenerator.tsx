import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Zap, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePassword, generateMemorablePassword } from "@/utils/passwordUtils";

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
    <div className="glass p-6 rounded-xl mb-6 animate-slide-up dark:glass-dark">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Zap className="text-passpal-purple" size={20} />
          Password Generator
        </h2>
        
        <div className="flex flex-col gap-2">
          <div className="relative w-full">
            <input
              type="text"
              value={password}
              className="w-full p-3 rounded-lg bg-white/70 dark:bg-white/10 border border-passpal-purple/30 font-mono text-sm sm:text-base break-all"
              readOnly
            />
            <div className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 gap-2">
              <Button 
                onClick={handleCopyPassword}
                variant="outline" 
                size="sm"
                className="hover-bounce bg-passpal-purple text-white hover:bg-passpal-purple/80 hover:text-white"
              >
                <Copy size={16} className="mr-1" /> Copy
              </Button>
              <Button 
                onClick={handleSavePassword}
                variant="outline" 
                size="sm"
                className="hover-bounce bg-passpal-dark-purple text-white hover:bg-passpal-dark-purple/80 hover:text-white"
                disabled={!password || !onSavePassword}
              >
                <Save size={16} className="mr-1" /> Save
              </Button>
            </div>
          </div>
          <div className="flex sm:hidden gap-2">
            <Button 
              onClick={handleCopyPassword}
              variant="outline" 
              size="sm"
              className="flex-1 hover-bounce bg-passpal-purple text-white hover:bg-passpal-purple/80 hover:text-white"
            >
              <Copy size={16} className="mr-1" /> Copy
            </Button>
            <Button 
              onClick={handleSavePassword}
              variant="outline" 
              size="sm"
              className="flex-1 hover-bounce bg-passpal-dark-purple text-white hover:bg-passpal-dark-purple/80 hover:text-white"
              disabled={!password || !onSavePassword}
            >
              <Save size={16} className="mr-1" /> Save
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="length">Length: {length} characters</Label>
              {isMemorable && <span className="text-xs text-muted-foreground">(Disabled for memorable mode)</span>}
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

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="memorable" className="font-medium">Make it Memorable</Label>
              <Switch 
                id="memorable" 
                checked={isMemorable} 
                onCheckedChange={setIsMemorable}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="font-medium">Uppercase Letters</Label>
              <Switch 
                id="uppercase" 
                checked={includeUppercase} 
                onCheckedChange={setIncludeUppercase}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase" className="font-medium">Lowercase Letters</Label>
              <Switch 
                id="lowercase" 
                checked={includeLowercase} 
                onCheckedChange={setIncludeLowercase}
                disabled={isMemorable}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="numbers" className="font-medium">Numbers</Label>
            <Switch 
              id="numbers" 
              checked={includeNumbers} 
              onCheckedChange={setIncludeNumbers}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="symbols" className="font-medium">Symbols</Label>
            <Switch 
              id="symbols" 
              checked={includeSymbols} 
              onCheckedChange={setIncludeSymbols}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="emojis" className="font-medium">Emojis</Label>
            <Switch 
              id="emojis" 
              checked={includeEmojis} 
              onCheckedChange={setIncludeEmojis}
              disabled={isMemorable}
            />
          </div>

          <div className="mt-4">
            <Button 
              onClick={handleGeneratePassword} 
              className="w-full hover-bounce bg-passpal-purple hover:bg-passpal-purple/80"
            >
              <Zap size={16} className="mr-1" /> Generate New Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
