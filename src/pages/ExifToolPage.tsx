import { Camera, Shield, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import ExifTool from "@/components/ExifTool";

const ExifToolPage = () => {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">EXIF Data Tool</h1>
          <p className="text-muted-foreground text-lg">
            View, add, and remove image metadata securely using WebAssembly technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ExifTool />
          </div>

          <div className="space-y-6">
            <div className="glass p-4 rounded-xl dark:glass-dark">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                About EXIF Data
              </h2>
              <p className="text-muted-foreground mb-4">
                EXIF (Exchangeable Image File Format) data contains information about your images,
                including camera settings, date/time, location, and device details.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• View detailed metadata from your images</li>
                <li>• Add custom metadata tags</li>
                <li>• Remove sensitive information</li>
                <li>• Download metadata as JSON</li>
              </ul>
            </div>

            <div className="glass p-4 rounded-xl dark:glass-dark">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  All processing is done locally in your browser using WebAssembly technology.
                  Your images and their metadata never leave your device.
                </p>
                <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Remember to remove sensitive metadata before sharing images online.
                    Location data and device information can pose privacy risks.
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

export default ExifToolPage; 