import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PasswordGenerator from "@/components/PasswordGenerator";
import PassPalBubble from "@/components/PassPalBubble";
import { calculatePasswordStrength } from "@/utils/passwordUtils";
import PasswordHistory from "@/components/PasswordHistory";
import { usePasswordHistory } from "@/hooks/usePasswordHistory";
import { Info, Key, Shuffle, Save, History, Settings } from "lucide-react";

const PasswordGeneratorPage = () => {
  const [password, setPassword] = useState<string>("");
  const [strengthScore, setStrengthScore] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const { savedPasswords, addPassword, deletePassword } = usePasswordHistory();

  // Calculate strength when password changes
  useEffect(() => {
    if (password) {
      const score = calculatePasswordStrength(password);
      setStrengthScore(score);
    } else {
      setStrengthScore(0);
    }
  }, [password]);

  // Save password to history when generated
  const handleSavePassword = (newPassword: string) => {
    if (newPassword) {
      addPassword(newPassword);
    }
  };

  return (
    <div className="min-h-screen  to-accent/20">
      <div className="container mx-auto max-w-6xl">
        
        
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Password Generator <span className="text-passpal-purple">🔐</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create ultra-secure passwords with ease
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2 space-y-6">
              <PasswordGenerator 
                password={password} 
                setPassword={setPassword}
                onSavePassword={handleSavePassword}
              />
              
              <PassPalBubble 
                password={password} 
                level={currentLevel}
                strength={strengthScore}
              />

              <PasswordHistory 
                savedPasswords={savedPasswords}
                onDelete={deletePassword}
              />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Password Generator
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Generate strong, unique passwords that meet modern security standards. 
                    Our tool combines randomness with customization to create passwords 
                    that are both secure and practical.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <Settings className="text-passpal-purple mt-1" size={16} />
                        <span>Customizable password requirements</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shuffle className="text-passpal-purple mt-1" size={16} />
                        <span>Advanced randomization algorithm</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Save className="text-passpal-purple mt-1" size={16} />
                        <span>Save and manage generated passwords</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <History className="text-passpal-purple mt-1" size={16} />
                        <span>Password history with secure storage</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Did You Know?</h3>
                    <p>
                      Using unique passwords for each account is crucial - if one account 
                      is compromised, your other accounts remain secure. Our generator 
                      helps you create distinct passwords for every service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PasswordGeneratorPage; 