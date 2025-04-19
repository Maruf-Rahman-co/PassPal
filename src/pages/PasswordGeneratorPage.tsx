import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PasswordGeneratorComponent from "@/components/PasswordGenerator";
import PassPalBubble from "@/components/PassPalBubble";
import { calculatePasswordStrength } from "@/utils/passwordUtils";
import PasswordHistory from "@/components/PasswordHistory";
import { usePasswordHistory } from "@/hooks/usePasswordHistory";
import { Info, Key, Shuffle, Save, History, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Key className="w-5 sm:w-6 h-5 sm:h-6 text-passpal-purple" />
            <h1 className="text-xl sm:text-2xl font-bold">Password Generator</h1>
          </div>
          
          <div className="grid gap-4 sm:gap-6">
            <PasswordGeneratorComponent
              password={password}
              setPassword={setPassword}
              onSavePassword={handleSavePassword}
            />
            
            {password && (
              <Card className="p-3 sm:p-4 animate-slide-up">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Shuffle className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground shrink-0" />
                      <span className="font-medium text-sm sm:text-base">Generated Password</span>
                    </div>
                    <Button
                      onClick={() => handleSavePassword(password)}
                      variant="outline"
                      size="sm"
                      className="shrink-0 flex items-center gap-2 bg-passpal-purple text-white hover:bg-passpal-purple/90"
                    >
                      <Save className="w-4 h-4" />
                      <span className="text-sm">Save</span>
                    </Button>
                  </div>
                  
                  <div className="w-full bg-muted rounded-lg p-2 sm:p-3">
                    <div className="max-w-full overflow-hidden">
                      <div className="break-all font-mono text-xs sm:text-sm">
                        {password}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <History className="w-4 sm:w-5 h-4 sm:h-5 text-passpal-purple shrink-0" />
                <h2 className="text-base sm:text-lg font-semibold">Password History</h2>
              </div>
              <PasswordHistory
                savedPasswords={savedPasswords}
                onDelete={deletePassword}
              />
            </div>

            {/* PassPal Assistant Section */}
            <div className="w-full">
              <PassPalBubble 
                password={password} 
                level={currentLevel} 
                strength={strengthScore} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 