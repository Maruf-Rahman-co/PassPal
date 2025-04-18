import Header from "@/components/Header";
import MorseCode from "@/components/MorseCode";
import { Radio, Info, Volume2, Clock, Keyboard } from "lucide-react";

const MorseCodePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl">
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Morse Code <span className="text-passpal-purple">📡</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert text to Morse code and back with audio playback
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2">
              <MorseCode />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Morse Code
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Morse code is a method of encoding text characters using standardized 
                    sequences of dots and dashes, revolutionizing long-distance communication 
                    since its invention in the 1830s.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <Radio className="text-passpal-purple mt-1" size={16} />
                        <span>Convert any text to Morse code and vice versa</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Volume2 className="text-passpal-purple mt-1" size={16} />
                        <span>Audio playback with adjustable speed</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="text-passpal-purple mt-1" size={16} />
                        <span>Real-time conversion as you type</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Keyboard className="text-passpal-purple mt-1" size={16} />
                        <span>Complete character support including numbers and special characters</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Did You Know?</h3>
                    <p>
                      The most famous Morse code message is "SOS" (···−−−···), 
                      which was adopted as the international distress signal in 1908.
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

export default MorseCodePage; 