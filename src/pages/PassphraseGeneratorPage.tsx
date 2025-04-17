import Header from "@/components/Header";
import PassphraseGenerator from "@/components/PassphraseGenerator";
import { Info, Key, FileText, Brain, History } from "lucide-react";

const PassphraseGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto max-w-6xl">
        
        
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Passphrase Generator <span className="text-passpal-purple">🔑</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create memorable yet secure passphrases using dictionary words
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2">
              <PassphraseGenerator />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Passphrase Generator
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Passphrases are a more user-friendly alternative to traditional passwords. 
                    They use multiple words to create longer, more memorable, and often more 
                    secure authentication strings.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <FileText className="text-passpal-purple mt-1" size={16} />
                        <span>Customizable word count</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Key className="text-passpal-purple mt-1" size={16} />
                        <span>Optional numbers and special characters</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Brain className="text-passpal-purple mt-1" size={16} />
                        <span>Easy to remember</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <History className="text-passpal-purple mt-1" size={16} />
                        <span>Password history tracking</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Why Use Passphrases?</h3>
                    <p>
                      Passphrases are often easier to remember than complex passwords while 
                      providing similar or better security. They're particularly useful for 
                      services where you need to type the password frequently.
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

export default PassphraseGeneratorPage; 