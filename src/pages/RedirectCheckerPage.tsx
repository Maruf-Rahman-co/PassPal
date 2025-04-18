import RedirectChecker from "@/components/RedirectChecker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, AlertTriangle, Shield, Info } from "lucide-react";

export default function RedirectCheckerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl">
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Link Redirect Checker <span className="text-passpal-purple">🔗</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Analyze URL redirect chains and identify suspicious destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2">
              <RedirectChecker />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Link Redirect Checker
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    The Link Redirect Checker is a security tool that helps you analyze URL 
                    redirect chains and identify potentially suspicious destinations. This tool 
                    is essential for verifying the safety of shortened URLs and tracking links.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <Shield className="text-passpal-purple mt-1" size={16} />
                        <span>Security score assessment</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-passpal-purple mt-1" size={16} />
                        <span>Suspicious domain detection</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ExternalLink className="text-passpal-purple mt-1" size={16} />
                        <span>Complete redirect chain analysis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Info className="text-passpal-purple mt-1" size={16} />
                        <span>Detailed security information</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="text-yellow-600 dark:text-yellow-500 mt-1" size={16} />
                      <div className="text-sm text-yellow-600 dark:text-yellow-500">
                        <strong>Security Note:</strong> Always be cautious when clicking on 
                        unknown or shortened URLs. Use this tool to verify the destination 
                        before visiting potentially dangerous links.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 