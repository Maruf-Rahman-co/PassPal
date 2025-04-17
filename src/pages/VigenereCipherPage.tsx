import Header from "@/components/Header";
import VigenereCipher from "@/components/VigenereCipher";
import { Info, History, Lock, Key, Search, Brain } from "lucide-react";

export const VigenereCipherPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto max-w-6xl">
        
        
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Vigenère Cipher <span className="text-passpal-purple">🔑</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encrypt and decrypt text using the Vigenère cipher, a more secure polyalphabetic substitution cipher
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2">
              <VigenereCipher />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Vigenère Cipher
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    The Vigenère cipher is a method of encrypting alphabetic text by using a simple form of polyalphabetic substitution. 
                    It was invented by Blaise de Vigenère in the 16th century and was considered unbreakable for centuries.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <Key className="text-passpal-purple mt-1" size={16} />
                        <span>Custom key-based encryption</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Lock className="text-passpal-purple mt-1" size={16} />
                        <span>Polyalphabetic substitution</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Search className="text-passpal-purple mt-1" size={16} />
                        <span>Key length analysis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Brain className="text-passpal-purple mt-1" size={16} />
                        <span>More secure than Caesar cipher</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">How It Works:</h3>
                    <p>
                      The Vigenère cipher uses a keyword to determine which Caesar cipher to use for each letter. 
                      Each letter in the keyword corresponds to a shift value (A=0, B=1, ..., Z=25), and the cipher 
                      cycles through these shifts as it encrypts the message.
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

export default VigenereCipherPage; 