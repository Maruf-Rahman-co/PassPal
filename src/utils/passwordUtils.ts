
// Password utility functions

// Generate a random password based on configuration
export function generatePassword(
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean,
  includeEmojis: boolean
): string {
  // Character sets
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const emojiChars = '😀😁😎🔥💯🚀🎉✨🎮🎯';

  // Build character pool based on selected options
  let charPool = '';
  if (includeUppercase) charPool += uppercaseChars;
  if (includeLowercase) charPool += lowercaseChars;
  if (includeNumbers) charPool += numberChars;
  if (includeSymbols) charPool += symbolChars;
  if (includeEmojis) charPool += emojiChars;

  // Default to lowercase if nothing selected
  if (charPool === '') charPool = lowercaseChars;

  let password = '';
  const charPoolLength = charPool.length;

  // Generate the password
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPoolLength);
    password += charPool[randomIndex];
  }

  return password;
}

// Generate a memorable password
export function generateMemorablePassword(
  includeUppercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): string {
  const adjectives = [
    'Cool', 'Super', 'Epic', 'Rad', 'Mega', 'Hyper', 'Ultra', 'Wild', 'Funky', 'Lit'
  ];
  
  const nouns = [
    'Cat', 'Dog', 'Panda', 'Fox', 'Wolf', 'Tiger', 'Lion', 'Dragon', 'Monkey', 'Shark'
  ];
  
  const symbols = ['!', '@', '#', '$', '%', '&', '*'];
  
  let adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  let number = Math.floor(Math.random() * 100);
  
  // Apply transformations based on options
  if (includeUppercase) {
    adj = adj.toUpperCase();
    noun = noun.charAt(0).toUpperCase() + noun.slice(1);
  } else {
    adj = adj.toLowerCase();
    noun = noun.toLowerCase();
  }
  
  let separator = '-';
  if (includeSymbols) {
    separator = symbols[Math.floor(Math.random() * symbols.length)];
  }
  
  let password = `${adj}${separator}${noun}`;
  
  if (includeNumbers) {
    password += `${separator}${number}`;
  }
  
  return password;
}

// Calculate password strength score (0-100)
export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;
  
  let score = 0;
  
  // Length score (up to 30 points)
  const lengthScore = Math.min(30, password.length * 2);
  score += lengthScore;
  
  // Character variety (up to 40 points)
  if (/[A-Z]/.test(password)) score += 10; // Uppercase
  if (/[a-z]/.test(password)) score += 10; // Lowercase
  if (/[0-9]/.test(password)) score += 10; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) score += 10; // Symbols
  
  // Additional complexity factors (up to 30 points)
  const uniqueChars = new Set(password).size;
  const uniqueRatio = uniqueChars / password.length;
  score += Math.floor(uniqueRatio * 20); // Unique character ratio
  
  // Penalize sequential characters
  const sequentialPenalty = (password.length - uniqueChars) * 2;
  score = Math.max(0, score - sequentialPenalty);
  
  // Penalize common patterns
  if (/^(?:123|abc|qwerty|password|admin|user)/i.test(password)) {
    score = Math.max(0, score - 20);
  }
  
  return Math.min(100, Math.max(0, score));
}

// Get strength level based on score
export function getStrengthLevel(score: number): {
  level: 'too-weak' | 'weak' | 'mid' | 'strong' | 'unbreakable',
  emoji: string,
  text: string
} {
  if (score < 20) {
    return { level: 'too-weak', emoji: '🫠', text: 'Too Weak' };
  } else if (score < 40) {
    return { level: 'weak', emoji: '😬', text: 'Weak' };
  } else if (score < 60) {
    return { level: 'mid', emoji: '🤔', text: 'Mid' };
  } else if (score < 80) {
    return { level: 'strong', emoji: '😎', text: 'Strong' };
  } else {
    return { level: 'unbreakable', emoji: '🔐', text: 'Unbreakable' };
  }
}

// Rules that define each level
export const passwordRules = [
  { id: 1, text: "At least 8 characters", check: (password: string) => password.length >= 8 },
  { id: 2, text: "Contains lowercase letters", check: (password: string) => /[a-z]/.test(password) },
  { id: 3, text: "Contains uppercase letters", check: (password: string) => /[A-Z]/.test(password) },
  { id: 4, text: "Contains numbers", check: (password: string) => /[0-9]/.test(password) },
  { id: 5, text: "Contains symbols", check: (password: string) => /[^A-Za-z0-9]/.test(password) },
  { id: 6, text: "At least 12 characters", check: (password: string) => password.length >= 12 },
  { id: 7, text: "No sequential patterns", check: (password: string) => !/(123|abc|qwerty|password)/i.test(password) },
  { id: 8, text: "High entropy (unique characters)", check: (password: string) => new Set(password).size >= password.length * 0.7 },
  { id: 9, text: "At least 16 characters", check: (password: string) => password.length >= 16 },
];

// Get level requirements (what rules must be passed for each level)
export function getLevelRequirements(level: number): number[] {
  switch (level) {
    case 1: return [1, 2]; // Level 1: 8+ chars and lowercase
    case 2: return [1, 2, 3, 4]; // Level 2: + uppercase and numbers
    case 3: return [1, 2, 3, 4, 5, 6]; // Level 3: + symbols and 12+ chars
    case 4: return [1, 2, 3, 4, 5, 6, 7, 8]; // Level 4: + no patterns and high entropy
    case 5: return [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Level 5: Everything including 16+ chars
    default: return [1];
  }
}

// Get user's current level based on passed rules
export function getUserLevel(password: string): number {
  if (!password) return 0;
  
  const passedRuleIds = passwordRules
    .filter(rule => rule.check(password))
    .map(rule => rule.id);
    
  if (getLevelRequirements(5).every(id => passedRuleIds.includes(id))) return 5;
  if (getLevelRequirements(4).every(id => passedRuleIds.includes(id))) return 4;
  if (getLevelRequirements(3).every(id => passedRuleIds.includes(id))) return 3;
  if (getLevelRequirements(2).every(id => passedRuleIds.includes(id))) return 2;
  if (getLevelRequirements(1).every(id => passedRuleIds.includes(id))) return 1;
  
  return 0;
}

// Generate fun persona based on password strength
export function getPasswordPersona(score: number): string {
  if (score < 20) {
    return "The Password Newbie 🐣";
  } else if (score < 40) {
    return "The Casual User 🚶";
  } else if (score < 60) {
    return "The Security Apprentice 🧙‍♂️";
  } else if (score < 80) {
    return "The Cyber Guardian 🛡️";
  } else {
    return "The Vault Keeper 🔐";
  }
}

// Get a fun tip based on the current password state
export function getPassPalTip(password: string): string {
  if (!password) return "Hey there! Let's create an awesome password together! 👋";
  
  const strength = calculatePasswordStrength(password);
  const level = getUserLevel(password);
  
  if (!(/[A-Z]/.test(password))) {
    return "Try adding some UPPERCASE letters for extra spice! 🌶️";
  }
  
  if (!(/[0-9]/.test(password))) {
    return "Numbers are cool! Add some digits for bonus security! 🔢";
  }
  
  if (!(/[^A-Za-z0-9]/.test(password))) {
    return "Symbols like @ # $ % make your password super strong! ✨";
  }
  
  if (password.length < 12) {
    return "Longer is stronger! Try adding a few more characters! 📏";
  }
  
  if (level === 4) {
    return "OMG you're so close to the ultimate level! 🚀";
  }
  
  if (level === 5) {
    return "YOU DID IT! Your password is legendary! 🏆";
  }
  
  const uniqueRatio = new Set(password).size / password.length;
  if (uniqueRatio < 0.7) {
    return "Mix it up a bit! Try using more unique characters! 🎭";
  }
  
  const tips = [
    "You're doing great! Keep going! 🎯",
    "Security looking good! How about some more tweaks? 🛠️",
    "Love your style! Your password is getting stronger! 💪",
    "That's the way! You're becoming a password pro! 🧠",
    "Password Party in progress! 🎉"
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
}
