import Header from "@/components/Header";
import ZeroWidthEncoder from "@/components/ZeroWidthEncoder";
import { Info, FileCode, Lock, RefreshCcw, Copy, KeyRound } from "lucide-react";

const ZeroWidthEncoderPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl">
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Zero-Width Text Encoder <span className="text-passpal-purple">🔐</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hide secret messages in plain sight using invisible Unicode characters
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2">
              <ZeroWidthEncoder />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Zero-Width Text Encoder
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Embed secret messages within normal text using invisible Unicode characters. 
                    Your messages remain hidden in plain sight and can be protected with an optional password.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <KeyRound className="text-passpal-purple mt-1" size={16} />
                        <span>Password-based encryption</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <RefreshCcw className="text-passpal-purple mt-1" size={16} />
                        <span>Instant encoding/decoding</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Lock className="text-passpal-purple mt-1" size={16} />
                        <span>Invisible character embedding</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Copy className="text-passpal-purple mt-1" size={16} />
                        <span>Easy copy and share functionality</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">How It Works:</h3>
                    <p>
                      Zero-width characters are Unicode characters that have no visible representation. 
                      They can be used to encode binary data within text without changing its appearance. 
                      When combined with password encryption, it creates a powerful steganography tool.
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

export default ZeroWidthEncoderPage; 