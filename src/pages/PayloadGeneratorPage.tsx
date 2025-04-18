import Header from "@/components/Header";
import PayloadGenerator from "@/components/PayloadGenerator";
import { Info, Shield, AlertTriangle, Terminal, Code2, Database } from "lucide-react";

const PayloadGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl">
        <main className="p-2 sm:p-4">
          <div className="mb-4 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">
              Payload Generator <span className="text-passpal-purple">📌</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              Generate and test common security payloads for XSS, SQL Injection, and Command Injection
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
            {/* Main Tool Section */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-6">
              <PayloadGenerator />

              {/* How to Use Section */}
              <div className="glass p-3 sm:p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-3 sm:mb-4">
                  <Terminal className="text-passpal-purple" size={20} />
                  How to Use
                </h2>
                
                <div className="space-y-4 sm:space-y-6 text-muted-foreground">
                  {/* XSS Testing Guide */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <Code2 className="text-passpal-purple" size={16} />
                      Testing for XSS
                    </h3>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm">1. Identify input fields (forms, URL parameters, headers)</p>
                      <p className="text-xs sm:text-sm">2. Try basic payloads first to detect filtering</p>
                      <p className="text-xs sm:text-sm">3. Test both reflected and stored XSS scenarios</p>
                      <div className="bg-zinc-800/50 p-2 sm:p-3 rounded-lg border border-zinc-700/50 text-xs sm:text-sm overflow-x-auto">
                        <p className="text-zinc-300 mb-1">Example Test Cases:</p>
                        <pre className="text-violet-300 text-xs whitespace-pre-wrap break-all sm:break-normal">
                          • URL Parameter: ?search=&lt;script&gt;alert(1)&lt;/script&gt;<br/>
                          • Form Input: &lt;img src=x onerror=alert(1)&gt;<br/>
                          • Link: javascript:alert(1)
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* SQL Injection Guide */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <Database className="text-passpal-purple" size={16} />
                      Testing for SQL Injection
                    </h3>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm">1. Test login forms and search functionalities</p>
                      <p className="text-xs sm:text-sm">2. Start with simple bypasses, then try UNION attacks</p>
                      <p className="text-xs sm:text-sm">3. Use time-based payloads to detect blind SQLi</p>
                      <div className="bg-zinc-800/50 p-2 sm:p-3 rounded-lg border border-zinc-700/50 text-xs sm:text-sm overflow-x-auto">
                        <p className="text-zinc-300 mb-1">Common Test Points:</p>
                        <pre className="text-violet-300 text-xs whitespace-pre-wrap break-all sm:break-normal">
                          • Login: admin'--<br/>
                          • Search: ' OR '1'='1<br/>
                          • ID Parameter: ?id=1 UNION SELECT 1,2,3--
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Command Injection Guide */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <Terminal className="text-passpal-purple" size={16} />
                      Testing for Command Injection
                    </h3>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm">1. Look for features that interact with the system</p>
                      <p className="text-xs sm:text-sm">2. Test different command separators (;, &&, |)</p>
                      <p className="text-xs sm:text-sm">3. Verify command execution with safe commands first</p>
                      <div className="bg-zinc-800/50 p-2 sm:p-3 rounded-lg border border-zinc-700/50 text-xs sm:text-sm overflow-x-auto">
                        <p className="text-zinc-300 mb-1">Test Scenarios:</p>
                        <pre className="text-violet-300 text-xs whitespace-pre-wrap break-all sm:break-normal">
                          • Ping Tool: 127.0.0.1 && whoami<br/>
                          • File Upload: file.jpg; ls<br/>
                          • Domain Lookup: domain.com | cat /etc/passwd
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <Shield className="text-passpal-purple" size={16} />
                      Testing Best Practices
                    </h3>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm list-disc list-inside">
                      <li>Always obtain explicit permission before testing</li>
                      <li>Document all tests and findings</li>
                      <li>Start with basic payloads before complex ones</li>
                      <li>Use a test environment when possible</li>
                      <li>Monitor for unintended side effects</li>
                    </ul>
                  </div>

                  {/* Warning Note */}
                  <div className="flex items-start gap-2 bg-red-500/10 p-2 sm:p-3 rounded-lg">
                    <AlertTriangle className="text-red-400 mt-1 flex-shrink-0" size={16} />
                    <div className="text-xs sm:text-sm space-y-1">
                      <p className="text-red-400 font-medium">Important:</p>
                      <p>
                        These payloads are provided for educational purposes and authorized security testing only. 
                        Unauthorized use against systems you don't own or have explicit permission to test is illegal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section Sidebar */}
            <div>
              <div className="glass p-3 sm:p-6 rounded-xl animate-slide-up dark:glass-dark">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-3 sm:mb-4">
                  <Info className="text-passpal-purple" size={20} />
                  About Payload Generator
                </h2>
                
                <div className="space-y-3 sm:space-y-4 text-muted-foreground">
                  <p className="text-xs sm:text-sm">
                    A collection of common security testing payloads for identifying vulnerabilities 
                    in web applications. Use these payloads responsibly for authorized security testing.
                  </p>

                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="font-medium text-foreground text-sm sm:text-base">Payload Types:</h3>
                    <div className="grid gap-2 sm:gap-3">
                      <div className="flex items-start gap-2">
                        <Shield className="text-passpal-purple mt-1" size={16} />
                        <span className="text-xs sm:text-sm">XSS (Cross-Site Scripting)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="text-passpal-purple mt-1" size={16} />
                        <span className="text-xs sm:text-sm">SQL Injection</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="text-passpal-purple mt-1" size={16} />
                        <span className="text-xs sm:text-sm">Command Injection</span>
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
};

export default PayloadGeneratorPage; 