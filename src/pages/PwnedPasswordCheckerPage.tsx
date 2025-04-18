import PwnedPasswordChecker from "@/components/PwnedPasswordChecker";
import { Info, Shield, AlertTriangle, Lock, Database } from "lucide-react";

export default function PwnedPasswordCheckerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl">
        <main className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Pwned Password Checker <span className="text-passpal-purple">🛡️</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Check if your password has been exposed in data breaches
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2">
              <PwnedPasswordChecker />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Pwned Password Checker
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    This tool checks if your password has been exposed in known data breaches 
                    using the Have I Been Pwned API. Your password is never sent in plain text 
                    and is checked securely using k-anonymity.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Key Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <Shield className="text-passpal-purple mt-1" size={16} />
                        <span>Secure password checking</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Lock className="text-passpal-purple mt-1" size={16} />
                        <span>k-anonymity protection</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Database className="text-passpal-purple mt-1" size={16} />
                        <span>Access to billions of breached passwords</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-passpal-purple mt-1" size={16} />
                        <span>Immediate breach notifications</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">How It Works:</h3>
                    <p>
                      Your password is hashed using SHA-1, and only the first 5 characters 
                      of the hash are sent to the API. The API returns a list of matching 
                      hashes, and the check is performed locally. This ensures your password 
                      remains private while still checking against known breaches.
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
} 