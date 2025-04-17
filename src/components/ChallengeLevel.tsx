
import { useState, useEffect } from "react";
import { Trophy, Star, Lock, Unlock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { calculatePasswordStrength } from "@/utils/passwordUtils";

interface ChallengeLevelProps {
  password: string;
  currentLevel: number;
}

const LEVEL_NAMES = [
  "Start Your Journey",
  "Password Apprentice",
  "Security Adept",
  "Cyber Guardian",
  "Password Master"
];

const LEVEL_DESCRIPTIONS = [
  "Begin your password security journey",
  "Learn the basics of password creation",
  "Enhance your password with complexity",
  "Create strong, breach-resistant passwords",
  "Achieve maximum password security"
];

const LEVEL_REWARDS = [
  "Unlock basic password tips",
  "Unlock memorable password mode",
  "Unlock password entropy analysis",
  "Unlock password sharing options",
  "Unlock master badge & all features"
];

const LEVEL_EMOJIS = ["🔰", "⭐", "🥈", "🥇", "🏆"];

const ChallengeLevel = ({ password, currentLevel }: ChallengeLevelProps) => {
  const [strength, setStrength] = useState(0);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);
  const [previousLevel, setPreviousLevel] = useState(0);
  
  // Calculate strength when password changes
  useEffect(() => {
    if (password) {
      const newStrength = calculatePasswordStrength(password);
      setStrength(newStrength);
    } else {
      setStrength(0);
    }
  }, [password]);
  
  // Handle level changes and animations
  useEffect(() => {
    if (currentLevel > previousLevel && previousLevel !== 0) {
      setShowLevelUpAnimation(true);
      const timer = setTimeout(() => {
        setShowLevelUpAnimation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    setPreviousLevel(currentLevel);
  }, [currentLevel, previousLevel]);
  
  return (
    <div className="glass p-6 rounded-xl animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="text-passpal-purple" size={20} />
          Challenge Mode
        </h2>
        <div className="text-xl font-bold">
          Level {currentLevel}/5
        </div>
      </div>
      
      {showLevelUpAnimation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in">
          <div className="bg-gradient-cool p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4 animate-bounce-subtle">{LEVEL_EMOJIS[currentLevel-1]}</div>
            <h2 className="text-2xl font-bold mb-2">Level Up!</h2>
            <p className="text-xl mb-4">You reached Level {currentLevel}!</p>
            <p className="font-semibold">{LEVEL_NAMES[currentLevel-1]}</p>
            <Button 
              className="mt-4 hover-bounce" 
              onClick={() => setShowLevelUpAnimation(false)}
            >
              Awesome!
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map(level => {
          const isLocked = currentLevel < level;
          const isActive = currentLevel === level;
          const isCompleted = currentLevel > level;
          
          return (
            <div 
              key={level} 
              className={`border rounded-lg p-4 transition-all ${
                isActive ? 'border-passpal-purple bg-passpal-purple/10 animate-pulse-glow' : 
                isCompleted ? 'border-green-500 bg-green-50' : 
                'border-gray-200 bg-gray-50 opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500 text-white' : 
                  isActive ? 'bg-passpal-purple text-white' : 
                  'bg-gray-200 text-gray-500'
                }`}>
                  {isLocked ? <Lock size={18} /> : 
                   isCompleted ? <Star size={18} /> : 
                   <span>{level}</span>}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">
                      {LEVEL_NAMES[level-1]}
                    </h3>
                    <div className="text-sm">
                      {LEVEL_EMOJIS[level-1]}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {isLocked ? "Locked" : LEVEL_DESCRIPTIONS[level-1]}
                  </p>
                </div>
              </div>
              
              {!isLocked && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>{isCompleted ? "Completed" : "In Progress"}</span>
                    <span>{isCompleted ? "100%" : isActive ? `${Math.round(strength)}%` : "0%"}</span>
                  </div>
                  <Progress 
                    value={isCompleted ? 100 : isActive ? strength : 0} 
                    className="h-2" 
                  />
                  
                  <div className="mt-2 text-xs flex items-center gap-1 text-passpal-purple">
                    <Unlock size={12} />
                    {LEVEL_REWARDS[level-1]}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeLevel;
