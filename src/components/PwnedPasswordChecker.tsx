import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Shield, AlertTriangle, CheckCircle2, Loader2, Lock, Key, RefreshCw, AlertCircle } from "lucide-react";
import { checkPassword } from "@/lib/passwordChecker";
import { toast } from "sonner";

export default function PwnedPasswordChecker() {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{ isPwned: boolean; count?: number; error?: string } | null>(null);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!password) {
      toast({
        title: "No Password",
        description: "Please enter a password to check",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const checkResult = await checkPassword(password);
      setResult(checkResult);
      
      if (checkResult.error) {
        toast({
          title: "Error",
          description: `Failed to check password: ${checkResult.error}`,
          variant: "destructive",
        });
      } else if (checkResult.isPwned) {
        toast({
          title: "Password Found in Breaches",
          description: `This password has been found in ${checkResult.count?.toLocaleString()} data breaches!`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password Not Found",
          description: "This password has not been found in any known breaches",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Password check error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setResult({
        isPwned: false,
        error: errorMessage
      });
      toast({
        title: "Error",
        description: `Failed to check password: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass animate-slide-up dark:glass-dark">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-passpal-purple" />
            Check Password Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter password to check"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleCheck}
                disabled={isLoading || !password}
                className="bg-passpal-purple hover:bg-passpal-purple/90"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Check"
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              This check is secure and private. Your password is never sent in plain text.
            </p>
          </div>

          {result && (
            <div className="mt-4">
              {result.error ? (
                <div className="flex items-center gap-2 text-amber-500">
                  <AlertCircle className="h-5 w-5" />
                  <p>
                    Error checking password: {result.error}
                    <br />
                    <span className="text-sm text-muted-foreground">
                      Please try again later or check your internet connection.
                    </span>
                  </p>
                </div>
              ) : result.isPwned ? (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertTriangle className="h-5 w-5" />
                  <p>
                    This password has been found in {result.count?.toLocaleString()} data breaches.
                    <br />
                    <span className="text-sm text-muted-foreground">
                      It is strongly recommended to change this password immediately.
                    </span>
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-500">
                  <Shield className="h-5 w-5" />
                  <p>This password has not been found in any known data breaches.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Password Best Practices Section */}
      <Card className="glass animate-slide-up dark:glass-dark">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="text-passpal-purple" />
            Password Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Key className="text-passpal-purple" size={16} />
                Creating Strong Passwords
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-passpal-purple">•</span>
                  Use at least 12 characters
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-passpal-purple">•</span>
                  Include uppercase and lowercase letters
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-passpal-purple">•</span>
                  Add numbers and special characters
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-passpal-purple">•</span>
                  Avoid common words and patterns
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-passpal-purple">•</span>
                  Don't use personal information
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <RefreshCw className="text-passpal-purple" size={16} />
                Password Management
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-passpal-purple">•</span>
                  Use a unique password for each account
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-passpal-purple">•</span>
                  Consider using a password manager
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-passpal-purple">•</span>
                  Enable two-factor authentication
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-passpal-purple">•</span>
                  Change passwords after data breaches
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-passpal-purple">•</span>
                  Regularly review account security
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 