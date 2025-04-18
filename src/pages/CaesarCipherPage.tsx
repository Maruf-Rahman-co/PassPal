import Header from "@/components/Header";
import CaesarCipher from "@/components/CaesarCipher";
import { Info, History, Lock, Key, Search, Brain } from "lucide-react";

const CaesarCipherPage = () => {
  return (
    <div className="min-h-screen  from-background to-accent/20">
      <div className="container mx-auto max-w-6xl">
        
        
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Caesar Cipher <span className="text-passpal-purple">🔄</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encrypt and decrypt text using the historical Caesar cipher
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2">
              <CaesarCipher />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Caesar Cipher
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    The Caesar cipher is one of the earliest known encryption techniques, 
                    named after Julius Caesar who used it for secret communication. It 
                    works by shifting each letter in the plaintext by a fixed number 
                    of positions in the alphabet.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <Key className="text-passpal-purple mt-1" size={16} />
                        <span>Customizable shift amount (1-25)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Lock className="text-passpal-purple mt-1" size={16} />
                        <span>Encrypt and decrypt messages</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Search className="text-passpal-purple mt-1" size={16} />
                        <span>Brute force decryption</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Brain className="text-passpal-purple mt-1" size={16} />
                        <span>Educational historical cipher</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Did You Know?</h3>
                    <p>
                      Julius Caesar used a shift of 3 for his messages. While simple, 
                      this cipher was effective in ancient times when many people 
                      couldn't read or write.
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

export default CaesarCipherPage; 