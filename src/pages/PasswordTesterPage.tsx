import { useState } from "react";
import Header from "@/components/Header";
import PasswordValidator from "@/components/PasswordValidator";
import { Info, Shield, Lock, Key, AlertTriangle } from "lucide-react";

const PasswordTesterPage = () => {
  const [password, setPassword] = useState("");
  const [currentLevel, setCurrentLevel] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto max-w-6xl">
        
        
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Password Tester <span className="text-passpal-purple">🛡️</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Test the strength of your passwords with detailed feedback
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2">
              <PasswordValidator 
                password={password} 
                onLevelChange={setCurrentLevel}
                setPassword={setPassword}
              />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Password Testing
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Password testing is crucial for maintaining strong security. Our tool 
                    analyzes multiple factors to determine your password's strength and 
                    provides actionable feedback.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <Shield className="text-passpal-purple mt-1" size={16} />
                        <span>Comprehensive strength analysis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Lock className="text-passpal-purple mt-1" size={16} />
                        <span>Real-time security level assessment</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Key className="text-passpal-purple mt-1" size={16} />
                        <span>Detailed improvement suggestions</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-passpal-purple mt-1" size={16} />
                        <span>Common vulnerability detection</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Did You Know?</h3>
                    <p>
                      A password with 12 characters using a mix of numbers, symbols, and 
                      both cases would take over 200 years to crack using current technology.
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

export default PasswordTesterPage; 