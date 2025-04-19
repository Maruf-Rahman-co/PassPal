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
  Lock,
  Sparkles,
  ChevronDown
} from "lucide-react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

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
    bgColor: "bg-gradient-to-br from-blue-500/90 to-blue-600/90",
    darkBgColor: "dark:from-blue-600/90 dark:to-blue-700/90"
  },
  {
    title: "Passphrase Generator",
    description: "Generate memorable and secure passphrases using dictionary words",
    icon: FileText,
    link: "/passphrase-generator",
    category: "password",
    bgColor: "bg-gradient-to-br from-emerald-500/90 to-emerald-600/90",
    darkBgColor: "dark:from-emerald-600/90 dark:to-emerald-700/90"
  },
  {
    title: "Password Tester",
    description: "Test password strength with detailed security analysis",
    icon: Shield,
    link: "/password-tester",
    category: "password",
    bgColor: "bg-gradient-to-br from-purple-500/90 to-purple-600/90",
    darkBgColor: "dark:from-purple-600/90 dark:to-purple-700/90"
  },
  {
    title: "Pwned Password Checker",
    description: "Check if your password has been exposed in data breaches",
    icon: AlertTriangle,
    link: "/pwned-password-checker",
    category: "password",
    bgColor: "bg-gradient-to-br from-red-500/90 to-red-600/90",
    darkBgColor: "dark:from-red-600/90 dark:to-red-700/90"
  },
  {
    title: "Text Encoder",
    description: "Encode and decode text with various algorithms",
    icon: FileCode,
    link: "/encoder",
    category: "encryption",
    bgColor: "bg-gradient-to-br from-sky-500/90 to-sky-600/90",
    darkBgColor: "dark:from-sky-600/90 dark:to-sky-700/90"
  },
  {
    title: "Caesar Cipher",
    description: "Classic shift cipher for text encryption",
    icon: Code2,
    link: "/caesar-cipher",
    category: "encryption",
    bgColor: "bg-gradient-to-br from-orange-500/90 to-orange-600/90",
    darkBgColor: "dark:from-orange-600/90 dark:to-orange-700/90"
  },
  {
    title: "Vigenère Cipher",
    description: "Advanced polyalphabetic substitution cipher",
    icon: Lock,
    link: "/vigenere-cipher",
    category: "encryption",
    bgColor: "bg-gradient-to-br from-pink-500/90 to-pink-600/90",
    darkBgColor: "dark:from-pink-600/90 dark:to-pink-700/90"
  },
  {
    title: "Zero-Width Encoder",
    description: "Hide secret messages in plain sight using invisible characters",
    icon: EyeOff,
    link: "/zero-width-encoder",
    category: "encryption",
    bgColor: "bg-gradient-to-br from-teal-500/90 to-teal-600/90",
    darkBgColor: "dark:from-teal-600/90 dark:to-teal-700/90"
  },
  {
    title: "Steganography",
    description: "Hide secret messages within images",
    icon: Image,
    link: "/steganography",
    category: "encryption",
    bgColor: "bg-gradient-to-br from-violet-500/90 to-violet-600/90",
    darkBgColor: "dark:from-violet-600/90 dark:to-violet-700/90"
  },
  {
    title: "Morse Code",
    description: "Convert text to Morse code with audio playback",
    icon: Radio,
    link: "/morse-code",
    category: "encryption",
    bgColor: "bg-gradient-to-br from-amber-500/90 to-amber-600/90",
    darkBgColor: "dark:from-amber-600/90 dark:to-amber-700/90"
  },
  {
    title: "Payload Generator",
    description: "Generate security testing payloads for XSS, SQLi, and more",
    icon: Bug,
    link: "/payload-generator",
    category: "security",
    bgColor: "bg-gradient-to-br from-rose-500/90 to-rose-600/90",
    darkBgColor: "dark:from-rose-600/90 dark:to-rose-700/90"
  },
  {
    title: "Confusable Detector",
    description: "Detect confusable characters in text and URLs",
    icon: AlertTriangle,
    link: "/confusable-detector",
    category: "security",
    bgColor: "bg-gradient-to-br from-indigo-500/90 to-indigo-600/90",
    darkBgColor: "dark:from-indigo-600/90 dark:to-indigo-700/90"
  },
  {
    title: "Link Redirect Checker",
    description: "Detect and analyze URL redirect chains for security",
    icon: ExternalLink,
    link: "/redirect-checker",
    category: "security",
    bgColor: "bg-gradient-to-br from-cyan-500/90 to-cyan-600/90",
    darkBgColor: "dark:from-cyan-600/90 dark:to-cyan-700/90"
  },
  {
    title: "EXIF Tool",
    description: "Analyze and extract metadata from images",
    icon: FileImage,
    link: "/exif-tool",
    category: "analysis",
    bgColor: "bg-gradient-to-br from-fuchsia-500/90 to-fuchsia-600/90",
    darkBgColor: "dark:from-fuchsia-600/90 dark:to-fuchsia-700/90"
  }
];

const FloatingIcon = ({ icon: Icon, className, initialX, initialY }: { 
  icon: React.ElementType; 
  className?: string;
  initialX: number;
  initialY: number;
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      animate={{
        x: initialX + (Math.random() > 0.5 ? 100 : -100),
        y: initialY + (Math.random() > 0.5 ? 100 : -100),
        opacity: [0, 0.06, 0],
        rotate: [0, 360]
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear",
        opacity: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <Icon className="w-12 h-12" />
    </motion.div>
  );
};

const BackgroundShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Lock Icons */}
      <FloatingIcon icon={Lock} className="text-white/5" initialX={200} initialY={100} />
      <FloatingIcon icon={Lock} className="text-white/5" initialX={800} initialY={300} />
      <FloatingIcon icon={Lock} className="text-white/5" initialX={400} initialY={500} />
      
      {/* Shield Icons */}
      <FloatingIcon icon={Shield} className="text-white/5" initialX={100} initialY={400} />
      <FloatingIcon icon={Shield} className="text-white/5" initialX={700} initialY={200} />
      <FloatingIcon icon={Shield} className="text-white/5" initialX={300} initialY={600} />

      {/* Key Icons */}
      <FloatingIcon icon={Key} className="text-white/5" initialX={600} initialY={100} />
      <FloatingIcon icon={Key} className="text-white/5" initialX={200} initialY={500} />
      <FloatingIcon icon={Key} className="text-white/5" initialX={900} initialY={400} />

      {/* Animated Shapes */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl"
        initial={{ x: -100, y: -100 }}
        animate={{
          x: [-100, 100, -100],
          y: [-100, 100, -100],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 blur-3xl"
        initial={{ x: 500, y: 300 }}
        animate={{
          x: [500, 300, 500],
          y: [300, 500, 300],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-rose-500/5 to-orange-500/5 blur-3xl"
        initial={{ x: 800, y: 600 }}
        animate={{
          x: [800, 600, 800],
          y: [600, 800, 600],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundShapes />
      <main className="container mx-auto px-4 py-8 space-y-8 relative">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-background via-muted to-background p-8 md:p-10">
          <div className="relative z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Security Tools
              <span className="ml-2 inline-block">
                <Sparkles className="w-8 h-8 text-passpal-purple" />
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore our collection of security tools for password management, encryption, and analysis
            </motion.p>
          </div>
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        {/* Search and Filter Section */}
        <motion.div 
          className="sticky top-4 z-30 backdrop-blur-xl bg-background/95 rounded-lg border shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Mobile Dropdown Filter */}
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    {selectedCategory === "all" 
                      ? "All Tools" 
                      : toolCategories[selectedCategory as ToolCategory].name}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-56">
                  <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ToolCategory | "all")}>
                    <DropdownMenuRadioItem value="all" className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      All Tools
                    </DropdownMenuRadioItem>
                    {Object.entries(toolCategories).map(([key, { name, icon: Icon }]) => (
                      <DropdownMenuRadioItem key={key} value={key} className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Horizontal Filter Buttons */}
            <div className="hidden sm:block">
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("all")}
                    className="whitespace-nowrap"
                    size="sm"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    All Tools
                  </Button>
                  {Object.entries(toolCategories).map(([key, { name, icon: Icon }]) => (
                    <Button
                      key={key}
                      variant={selectedCategory === key ? "default" : "outline"}
                      onClick={() => setSelectedCategory(key as ToolCategory)}
                      className="whitespace-nowrap"
                      size="sm"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredTools.map((tool, index) => {
            const CategoryIcon = toolCategories[tool.category].icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Link to={tool.link} className="block h-full">
                  <Card className={`relative h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${tool.bgColor}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/10" />
                    <div className="relative p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm shrink-0 w-14 h-14 flex items-center justify-center">
                          <tool.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-semibold text-white truncate pr-2">
                              {tool.title}
                            </h2>
                            <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                              <CategoryIcon className="w-4 h-4 text-white/90" />
                            </div>
                          </div>
                          <p className="text-sm text-white/90 line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No tools found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard; 