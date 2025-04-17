import Header from "@/components/Header";
import Encoder from "@/components/Encoder";
import { Info, FileCode, Lock, RefreshCcw, Copy, KeyRound } from "lucide-react";

const EncoderPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto max-w-6xl">
        
        
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Text Encoder <span className="text-passpal-purple">📝</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encode and decode text with a unique encryption algorithm
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2">
              <Encoder />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Text Encoder
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Transform your text using advanced encryption algorithms. Our encoder 
                    provides a secure way to protect sensitive information and communicate 
                    privately.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <KeyRound className="text-passpal-purple mt-1" size={16} />
                        <span>Strong encryption algorithms</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <RefreshCcw className="text-passpal-purple mt-1" size={16} />
                        <span>Instant encoding/decoding</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Lock className="text-passpal-purple mt-1" size={16} />
                        <span>Password-based encryption</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Copy className="text-passpal-purple mt-1" size={16} />
                        <span>Easy copy and share functionality</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Did You Know?</h3>
                    <p>
                      Modern encryption is so secure that a message encrypted with a strong 
                      key would take billions of years to crack using current technology.
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

export default EncoderPage; 