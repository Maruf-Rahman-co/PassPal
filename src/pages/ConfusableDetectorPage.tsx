import { Shield, AlertTriangle, Info } from "lucide-react";
import Header from "@/components/Header";
import ConfusableDetector from "@/components/ConfusableDetector";

const ConfusableDetectorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
            Confusable Unicode Detector
            <Shield className="w-8 h-8 text-passpal-purple" />
          </h1>
          <p className="text-muted-foreground text-lg">
            Detect and analyze confusable Unicode characters that could be used in phishing attacks.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ConfusableDetector />
          </div>

          <div className="space-y-6">
            <div className="glass p-4 rounded-xl dark:glass-dark">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                About This Tool
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  This tool helps identify Unicode characters that look similar to standard ASCII characters
                  but are actually different. These characters are often used in phishing attacks.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Analyze URLs and text for confusable characters</li>
                  <li>• Get detailed information about each character</li>
                  <li>• Export analysis reports</li>
                  <li>• Convert to safe ASCII alternatives</li>
                </ul>
              </div>
            </div>

            <div className="glass p-4 rounded-xl dark:glass-dark">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Security Tips
              </h2>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">When checking URLs, be aware of:</p>
                  <ul className="space-y-2">
                    <li>• Look-alike domain names</li>
                    <li>• Mixed-script characters</li>
                    <li>• Hidden or zero-width characters</li>
                    <li>• IDN homograph attacks</li>
                  </ul>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <p className="text-sm">
                    Always verify the authenticity of URLs before entering sensitive information
                    or downloading files.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfusableDetectorPage; 