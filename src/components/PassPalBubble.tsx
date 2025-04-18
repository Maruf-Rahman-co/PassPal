import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { getPassPalTip, getPasswordPersona } from "@/utils/passwordUtils";

interface PassPalBubbleProps {
  password: string;
  level: number;
  strength: number;
}

const PassPalBubble = ({ password, level, strength }: PassPalBubbleProps) => {
  const [tip, setTip] = useState<string>("");
  const [persona, setPersona] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [displayedTip, setDisplayedTip] = useState<string>("");
  
  // Update tip when password changes
  useEffect(() => {
    const newTip = getPassPalTip(password);
    setTip(newTip);
    setPersona(getPasswordPersona(strength));
    
    // Reset typing animation
    setIsTyping(true);
    setDisplayedTip("");
    
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < newTip.length) {
        setDisplayedTip(prev => prev + newTip.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20);
    
    return () => clearInterval(typingInterval);
  }, [password, strength]);
  
  // Determine PassPal's mood based on level
  const getMoodEmoji = () => {
    if (level === 0) return "🤓";
    if (level === 1) return "🙂";
    if (level === 2) return "😊";
    if (level === 3) return "😄";
    if (level === 4) return "😎";
    return "🤩";
  };
  
  return (
    <div className="glass p-4 rounded-xl animate-scale-in dark:glass-dark">
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-passpal-purple text-white dark:text-black animate-bounce-subtle`}>
          {getMoodEmoji()}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-foreground">PassPal</h3>
            <span className="text-xs bg-passpal-yellow/50 dark:bg-amber-700/50 px-2 py-0.5 rounded-full text-amber-800 dark:text-amber-200">
              AI Assistant
            </span>
          </div>
          
          <div className="mt-1 min-h-[60px]">
            <p className="text-foreground">
              {displayedTip}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>
          
          {password && (
            <div className="mt-2 bg-muted p-2 rounded-lg text-sm">
              <span className="font-semibold text-foreground">Your Password Persona:</span> {persona}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassPalBubble;
