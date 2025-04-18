import { Link } from "react-router-dom";
import { 
  Key, 
  CheckCircle, 
  FileCode,
  Code2,
  Shield,
  Image,
  Radio,
  FileText,
  ExternalLink,
  EyeOff,
  Bug,
  Camera,
  FileImage,
  AlertTriangle,
  Search,
  Filter,
  X,
  Lock
} from "lucide-react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useMemo } from "react";

interface FeatureCard {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  bgColor: string;
  darkBgColor: string;
}



// Define categories for tools
export const toolCategories = {
  password: {
    name: "Password Tools",
    description: "Tools for password generation, analysis, and management",
    icon: Key
  },
  security: {
    name: "Security Tools",
    description: "Tools for security analysis and testing",
    icon: Shield
  },
  encryption: {
    name: "Encryption Tools",
    description: "Tools for encryption and decryption",
    icon: Lock
  },
  analysis: {
    name: "Analysis Tools",
    description: "Tools for data analysis and inspection",
    icon: Search
  }
} as const;

type ToolCategory = keyof typeof toolCategories;

interface Tool {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  category: ToolCategory;
  bgColor: string;
  darkBgColor: string;
}

const tools: Tool[] = [
  {
    title: "Password Generator",
    description: "Generate secure, random passwords with customizable options",
    icon: Key,
    link: "/password-generator",
    category: "password",
    bgColor: "bg-passpal-blue",
    darkBgColor: "dark:bg-passpal-blue/90"
  },
  {
    title: "Passphrase Generator",
    description: "Generate memorable and secure passphrases using dictionary words",
    icon: FileText,
    link: "/passphrase",
    category: "password",
    bgColor: "bg-passpal-green",
    darkBgColor: "dark:bg-passpal-green/90"
  },
  {
    title: "Password Tester",
    description: "Test password strength with detailed security analysis",
    icon: Shield,
    link: "/password-tester",
    category: "password",
    bgColor: "bg-passpal-purple",
    darkBgColor: "dark:bg-passpal-purple/90"
  },
  {
    title: "Pwned Password Checker",
    description: "Check if your password has been exposed in data breaches",
    icon: AlertTriangle,
    link: "/pwned-checker",
    category: "password",
    bgColor: "bg-passpal-red",
    darkBgColor: "dark:bg-passpal-red/90"
  },
  {
    title: "Text Encoder",
    description: "Encode and decode text with various algorithms",
    icon: FileCode,
    link: "/encoder",
    category: "encryption",
    bgColor: "bg-passpal-blue",
    darkBgColor: "dark:bg-passpal-blue/90"
  },
  {
    title: "Caesar Cipher",
    description: "Classic shift cipher for text encryption",
    icon: Code2,
    link: "/caesar",
    category: "encryption",
    bgColor: "bg-passpal-orange",
    darkBgColor: "dark:bg-passpal-orange/90"
  },
  {
    title: "Vigenère Cipher",
    description: "Advanced polyalphabetic substitution cipher",
    icon: Lock,
    link: "/vigenere",
    category: "encryption",
    bgColor: "bg-passpal-pink",
    darkBgColor: "dark:bg-passpal-pink/90"
  },
  {
    title: "Zero-Width Encoder",
    description: "Hide secret messages in plain sight using invisible characters",
    icon: EyeOff,
    link: "/zero-width-encoder",
    category: "encryption",
    bgColor: "bg-passpal-green",
    darkBgColor: "dark:bg-passpal-green/90"
  },
  {
    title: "Steganography",
    description: "Hide secret messages within images",
    icon: Image,
    link: "/steganography",
    category: "encryption",
    bgColor: "bg-passpal-purple",
    darkBgColor: "dark:bg-passpal-purple/90"
  },
  {
    title: "Morse Code",
    description: "Convert text to Morse code with audio playback",
    icon: Radio,
    link: "/morse-code",
    category: "encryption",
    bgColor: "bg-passpal-orange",
    darkBgColor: "dark:bg-passpal-orange/90"
  },
  {
    title: "Payload Generator",
    description: "Generate security testing payloads for XSS, SQLi, and more",
    icon: Bug,
    link: "/payload-generator",
    category: "security",
    bgColor: "bg-passpal-red",
    darkBgColor: "dark:bg-passpal-red/90"
  },
  {
    title: "Confusable Detector",
    description: "Detect confusable characters in text and URLs",
    icon: AlertTriangle,
    link: "/confusable-detector",
    category: "security",
    bgColor: "bg-passpal-purple",
    darkBgColor: "dark:bg-passpal-purple/90"
  },
  {
    title: "Link Redirect Checker",
    description: "Detect and analyze URL redirect chains for security",
    icon: ExternalLink,
    link: "/redirect-checker",
    category: "security",
    bgColor: "bg-passpal-blue",
    darkBgColor: "dark:bg-passpal-blue/90"
  },
  {
    title: "EXIF Tool",
    description: "Analyze and extract metadata from images",
    icon: FileImage,
    link: "/exif-tool",
    category: "analysis",
    bgColor: "bg-passpal-orange",
    darkBgColor: "dark:bg-passpal-orange/90"
  }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "all">("all");

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Security Tools</h1>
          <p className="text-muted-foreground">
            A collection of security tools for password management, analysis, and testing
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="whitespace-nowrap"
            >
              All Tools
            </Button>
            {Object.entries(toolCategories).map(([key, { name }]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                onClick={() => setSelectedCategory(key as ToolCategory)}
                className="whitespace-nowrap"
              >
                {name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredTools.map((tool) => {
            const CategoryIcon = toolCategories[tool.category].icon;
            return (
              <Card
                key={tool.title}
                className={`p-6 transition-all hover:shadow-lg ${tool.bgColor} ${tool.darkBgColor}`}
              >
                <a href={tool.link} className="block h-full">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-white/10 ${tool.darkBgColor}`}>
                      <tool.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white dark:text-black">
                          {tool.title}
                        </h2>
                        <CategoryIcon className="w-4 h-4 text-white/50 dark:text-black/50" />
                      </div>
                      <p className="mt-2 text-sm text-white/80 dark:text-black/80">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </a>
              </Card>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard; 