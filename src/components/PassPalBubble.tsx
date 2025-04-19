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
    <div className="glass p-2 sm:p-3 rounded-lg sm:rounded-xl animate-scale-in dark:glass-dark w-full sm:w-auto">
      <div className="flex items-start gap-2">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl bg-passpal-purple text-white dark:text-black animate-bounce-subtle shrink-0`}>
          {getMoodEmoji()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-sm sm:text-base text-foreground">PassPal</h3>
            <span className="text-[10px] bg-passpal-yellow/50 dark:bg-amber-700/50 px-1.5 py-0.5 rounded-full text-amber-800 dark:text-amber-200 whitespace-nowrap">
              AI Assistant
            </span>
          </div>
          
          <div className="mt-1 min-h-[36px] sm:min-h-[48px]">
            <p className="text-xs sm:text-sm text-foreground break-words">
              {displayedTip}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>
          
          {password && (
            <div className="mt-1.5 sm:mt-2 bg-muted p-1.5 sm:p-2 rounded-lg text-xs">
              <span className="font-semibold text-foreground">Your Password Persona:</span>{" "}
              <span className="break-words">{persona}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassPalBubble;
