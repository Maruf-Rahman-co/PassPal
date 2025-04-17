import { Moon, Sun, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };
  
  // Check for system preference on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2D2B3B] bg-[#13111C]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">PassPal</span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full text-gray-400 hover:text-white"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
