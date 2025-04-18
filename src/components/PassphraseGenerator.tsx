import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Copy, RefreshCw, Zap } from "lucide-react";
import { generatePassphrase, estimatePassphraseStrength, PassphraseOptions } from "@/lib/passphraseGenerator";
import { Progress } from "@/components/ui/progress";

interface PassphraseGeneratorProps {
  onSavePassphrase?: (passphrase: string) => void;
}

export default function PassphraseGenerator({ onSavePassphrase }: PassphraseGeneratorProps) {
  const [passphrase, setPassphrase] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(4);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(true);
  const [capitalizeWords, setCapitalizeWords] = useState<boolean>(true);
  const [strength, setStrength] = useState<{ score: number; feedback: string }>({ score: 0, feedback: "" });
  const { toast } = useToast();

  const generateNewPassphrase = () => {
    const options: PassphraseOptions = {
      wordCount,
      includeNumbers,
      includeSpecialChars,
      capitalizeWords,
    };

    const newPassphrase = generatePassphrase(options);
    setPassphrase(newPassphrase);
    setStrength(estimatePassphraseStrength(newPassphrase));

    if (onSavePassphrase) {
      onSavePassphrase(newPassphrase);
    }
  };

  // Auto-generate when settings change
  useEffect(() => {
    generateNewPassphrase();
  }, [wordCount, includeNumbers, includeSpecialChars, capitalizeWords]);

  const handleCopy = async () => {
    if (!passphrase) {
      toast({
        title: "No Passphrase",
        description: "Please generate a passphrase first.",
        variant: "destructive",
      });
      return;
    }

    await navigator.clipboard.writeText(passphrase);
    toast({
      title: "Copied",
      description: "Passphrase copied to clipboard",
    });
  };

  const getStrengthColor = (score: number) => {
    if (score >= 90) return "bg-strength-strong";
    if (score >= 70) return "bg-strength-mid";
    if (score >= 40) return "bg-strength-weak";
    return "bg-strength-too-weak";
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">Passphrase Settings</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={generateNewPassphrase}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Generate New
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-foreground">Word Count: {wordCount}</label>
            </div>
            <Slider
              value={[wordCount]}
              onValueChange={(value) => setWordCount(value[0])}
              min={3}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Include Numbers</label>
              <Switch
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Include Special Characters</label>
              <Switch
                checked={includeSpecialChars}
                onCheckedChange={setIncludeSpecialChars}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Capitalize Words</label>
              <Switch
                checked={capitalizeWords}
                onCheckedChange={setCapitalizeWords}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Generated Passphrase</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8"
              disabled={!passphrase}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="relative">
            <div className="min-h-[60px] p-3 bg-muted rounded-md flex items-center justify-center text-center break-all text-foreground">
              {passphrase || "Generating passphrase..."}
            </div>
          </div>
        </div>

        {passphrase && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">Strength</label>
              <span className="text-sm text-muted-foreground">{strength.score}%</span>
            </div>
            <Progress
              value={strength.score}
              className={`h-2 ${getStrengthColor(strength.score)}`}
            />
            <p className="text-sm text-muted-foreground mt-2">{strength.feedback}</p>
          </div>
        )}
      </div>
    </Card>
  );
} 