import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PasswordGenerator from "@/components/PasswordGenerator";
import PasswordValidator from "@/components/PasswordValidator";
import PassPalBubble from "@/components/PassPalBubble";
import { calculatePasswordStrength } from "@/utils/passwordUtils";
import PasswordHistory from "@/components/PasswordHistory";
import { usePasswordHistory } from "@/hooks/usePasswordHistory";
import PassphraseGenerator from "@/components/PassphraseGenerator";

const Index = () => {
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
      addPassword(newPassword, 'password');
    }
  };

  // Save passphrase to history when generated
  const handleSavePassphrase = (passphrase: string) => {
    if (passphrase) {
      addPassword(passphrase, 'passphrase');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl">
        <Header />
        
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Password Party <span className="text-passpal-purple">🔐</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create ultra-secure passwords, passphrases, and test your existing ones
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            {/* Left column - Password Generator & Passphrase Generator */}
            <div className="md:col-span-4 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h2 className="text-lg font-semibold mb-3 text-foreground">Password Generator</h2>
                  <PasswordGenerator 
                    password={password} 
                    setPassword={setPassword}
                    onSavePassword={handleSavePassword}
                  />
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-3 text-foreground">Passphrase Generator</h2>
                  <PassphraseGenerator 
                    onSavePassphrase={handleSavePassphrase}
                  />
                </div>
              </div>
              
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
            
            {/* Right column - Validator */}
            <div className="md:col-span-3 space-y-6">
              <h2 className="text-lg font-semibold mb-3 text-foreground">Password Validator</h2>
              <PasswordValidator 
                password={password} 
                onLevelChange={setCurrentLevel}
                setPassword={setPassword}
              />
            </div>
          </div>
        </main>
        
        <footer className="text-center py-6 text-sm text-muted-foreground">
          <p>PassPal - Level up your password security game 🛡️</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
