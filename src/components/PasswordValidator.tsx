import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Shield, ShieldCheck, ShieldX, Edit, Check, AlertTriangle, Lock, Unlock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  calculatePasswordStrength, 
  getStrengthLevel, 
  passwordRules, 
  getLevelRequirements,
  getUserLevel
} from "@/utils/passwordUtils";

interface PasswordValidatorProps {
  password: string;
  onLevelChange: (level: number) => void;
  setPassword: (password: string) => void;
}

const PasswordValidator = ({ password, onLevelChange, setPassword }: PasswordValidatorProps) => {
  const [strength, setStrength] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [customPassword, setCustomPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Calculate strength and level when password changes
  useEffect(() => {
    if (password) {
      const newStrength = calculatePasswordStrength(password);
      setStrength(newStrength);
      
      const newLevel = getUserLevel(password);
      setCurrentLevel(newLevel);
      onLevelChange(newLevel);
      setCustomPassword(password);
    } else {
      setStrength(0);
      setCurrentLevel(0);
      onLevelChange(0);
      setCustomPassword("");
    }
  }, [password, onLevelChange]);
  
  const strengthInfo = getStrengthLevel(strength);

  // Determine active rules for current password
  const passedRules = passwordRules.filter(rule => rule.check(password));
  const passedRuleIds = passedRules.map(rule => rule.id);
  
  // Determine which rules need to be met to improve
  const failedRules = passwordRules.filter(rule => !passedRuleIds.includes(rule.id));

  // Handle submitting a custom password
  const handleSubmitCustomPassword = () => {
    setPassword(customPassword);
    setIsEditing(false);
  };

  const getStrengthColor = () => {
    if (strength >= 80) return "text-green-500";
    if (strength >= 60) return "text-yellow-500";
    return "text-red-500";
  };
  
  return (
    <div className="space-y-6">
      {/* Password Input Section */}
      <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="text-passpal-purple" size={20} />
          Test Your Password
        </h3>

        <div className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={customPassword}
              onChange={(e) => setCustomPassword(e.target.value)}
              placeholder="Enter your password to test"
              className="pr-24"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>

          <Button
            onClick={handleSubmitCustomPassword}
            className="w-full bg-passpal-purple hover:bg-passpal-purple/80"
          >
            <Shield className="mr-2" size={16} /> Analyze Password
          </Button>
        </div>
      </div>

      {/* Strength Analysis Section */}
      {password && (
        <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
          <div className="space-y-6">
            {/* Strength Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Password Strength</h3>
                <span className={`font-bold ${getStrengthColor()}`}>
                  {strengthInfo.text}
                </span>
              </div>
              <div className="relative">
                <Progress value={strength} className="h-3" />
                <div className="absolute -top-1 left-1/4 w-0.5 h-5 bg-gray-300 dark:bg-gray-600" />
                <div className="absolute -top-1 left-1/2 w-0.5 h-5 bg-gray-300 dark:bg-gray-600" />
                <div className="absolute -top-1 left-3/4 w-0.5 h-5 bg-gray-300 dark:bg-gray-600" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Weak</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Strong</span>
              </div>
            </div>

            {/* Security Level */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-passpal-purple/10 to-transparent">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStrengthColor()}`}>
                  {strengthInfo.emoji}
                </div>
                <div>
                  <div className="font-medium">Security Level</div>
                  <div className="text-sm text-muted-foreground">
                    Level {currentLevel}/5
                  </div>
                </div>
              </div>
              {currentLevel === 5 && (
                <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <ShieldCheck size={14} />
                  Maximum Security
                </div>
              )}
            </div>

            {/* Requirements Analysis */}
            <div className="space-y-4">
              {failedRules.length > 0 ? (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2 text-red-500">
                    <AlertTriangle size={16} />
                    Failed Requirements
                  </h4>
                  <div className="grid gap-2">
                    {failedRules.map(rule => (
                      <div 
                        key={rule.id}
                        className="flex items-center gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                      >
                        <ShieldX size={14} />
                        <span className="text-sm">{rule.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <ShieldCheck className="mx-auto mb-2 text-green-500" size={24} />
                  <h4 className="font-medium text-green-700 dark:text-green-300">
                    Perfect Score! 🎉
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Your password meets all security requirements
                  </p>
                </div>
              )}
            </div>

            {/* Password Tips */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300">
                Password Tips 💡
              </h4>
              <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                <li>• Use a mix of characters (letters, numbers, symbols)</li>
                <li>• Make it at least 12 characters long</li>
                <li>• Avoid common words and patterns</li>
                <li>• Don't use personal information</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordValidator;
