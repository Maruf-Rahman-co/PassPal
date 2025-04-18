import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PasswordGeneratorComponent from "@/components/PasswordGenerator";
import PassPalBubble from "@/components/PassPalBubble";
import { calculatePasswordStrength } from "@/utils/passwordUtils";
import PasswordHistory from "@/components/PasswordHistory";
import { usePasswordHistory } from "@/hooks/usePasswordHistory";
import { Info, Key, Shuffle, Save, History, Settings } from "lucide-react";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState<string>("");
  const [strengthScore, setStrengthScore] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const { savedPasswords, addPassword, deletePassword } = usePasswordHistory();

  // Calculate strength when password changes
  useEffect(() => {
    if (password) {
      const score = calculatePasswordStrength(password);
      setStrengthScore(score);
    }
  }, [password]);

  const handleSavePassword = (newPassword: string) => {
    addPassword(newPassword);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Key className="w-6 h-6 text-passpal-purple" />
            <h1 className="text-2xl font-bold">Password Generator</h1>
          </div>
          
          <div className="grid gap-6">
            <PasswordGeneratorComponent
              password={password}
              setPassword={setPassword}
              onSavePassword={handleSavePassword}
            />
            
            {password && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shuffle className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">Generated Password</span>
                  </div>
                  <button
                    onClick={() => handleSavePassword(password)}
                    className="flex items-center gap-2 text-sm text-passpal-purple hover:text-passpal-purple/80"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <code className="text-lg font-mono break-all">{password}</code>
                </div>
              </div>
            )}
            
            <PasswordHistory
              savedPasswords={savedPasswords}
              onDelete={deletePassword}
            />
          </div>
          <PassPalBubble password={password} level={currentLevel} strength={strengthScore} />
        </div>
        
      </main>
      
    </div>
  );
} 