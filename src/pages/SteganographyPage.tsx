import Header from "@/components/Header";
import Steganography from "@/components/Steganography";
import { Info, Image, Lock, Eye, FileImage, MessageSquare } from "lucide-react";

const SteganographyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto max-w-6xl">
        
        
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Image Steganography <span className="text-passpal-purple">🖼️</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hide secret messages inside images securely
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2">
              <Steganography />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Steganography
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Steganography is the art of hiding information in plain sight. 
                    Our tool uses advanced LSB (Least Significant Bit) technique to 
                    conceal messages within images without visible changes.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="text-passpal-purple mt-1" size={16} />
                        <span>Hide text messages in images</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Lock className="text-passpal-purple mt-1" size={16} />
                        <span>Password protection for messages</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Eye className="text-passpal-purple mt-1" size={16} />
                        <span>No visible changes to images</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileImage className="text-passpal-purple mt-1" size={16} />
                        <span>Support for common image formats</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Did You Know?</h3>
                    <p>
                      The word "steganography" comes from Greek, meaning "concealed writing." 
                      This technique has been used throughout history, from ancient Greece 
                      to modern digital communication.
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

export default SteganographyPage; 