// Common words for generating memorable passphrases
// These words are chosen to be common, easy to remember, and distinct
const commonWords = [
  // Animals
  "dog", "cat", "bird", "fish", "lion", "bear", "wolf", "deer", "frog", "duck",
  // Colors
  "red", "blue", "green", "gold", "pink", "black", "white", "gray", "brown",
  // Nature
  "tree", "leaf", "rock", "lake", "moon", "star", "sun", "rain", "wind", "snow",
  // Actions
  "jump", "run", "walk", "swim", "fly", "sing", "dance", "laugh", "smile", "play",
  // Objects
  "book", "door", "key", "clock", "chair", "table", "phone", "lamp", "pen", "cup",
  // Food
  "cake", "bread", "fruit", "milk", "rice", "soup", "fish", "meat", "salt", "egg",
  // Adjectives
  "big", "small", "fast", "slow", "hot", "cold", "soft", "hard", "new", "old",
  // Numbers as words
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"
];

// Special characters for added security
const specialCharacters = "!@#$%^&*-_+=";

// Function to get random items from an array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Function to capitalize first letter
function capitalizeFirst(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Generate a random number between min and max (inclusive)
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export interface PassphraseOptions {
  wordCount: number;
  includeNumbers: boolean;
  includeSpecialChars: boolean;
  capitalizeWords: boolean;
}

export function generatePassphrase(options: PassphraseOptions): string {
  const {
    wordCount = 4,
    includeNumbers = true,
    includeSpecialChars = true,
    capitalizeWords = true,
  } = options;

  // Get random words
  let words = getRandomItems(commonWords, wordCount);

  // Capitalize words if requested
  if (capitalizeWords) {
    words = words.map(capitalizeFirst);
  }

  // Add a random number if requested
  if (includeNumbers) {
    const number = getRandomNumber(0, 999);
    words.push(number.toString());
  }

  // Join words with a separator
  let passphrase = words.join("-");

  // Add special characters if requested
  if (includeSpecialChars) {
    const specialChar = getRandomItems(specialCharacters.split(""), 1)[0];
    passphrase += specialChar;
  }

  return passphrase;
}

export function estimatePassphraseStrength(passphrase: string): {
  score: number;
  feedback: string;
} {
  let score = 0;
  const feedback: string[] = [];

  // Length check
  if (passphrase.length >= 12) score += 2;
  if (passphrase.length >= 16) score += 2;
  if (passphrase.length >= 20) score += 1;

  // Word count check
  const wordCount = passphrase.split(/[-\s]/).length;
  score += Math.min(wordCount, 5);
  
  // Character variety check
  if (/[A-Z]/.test(passphrase)) {
    score += 2;
    feedback.push("Contains uppercase letters");
  }
  if (/[0-9]/.test(passphrase)) {
    score += 2;
    feedback.push("Contains numbers");
  }
  if (/[!@#$%^&*\-_+=]/.test(passphrase)) {
    score += 2;
    feedback.push("Contains special characters");
  }

  // Normalize score to 0-100
  const normalizedScore = Math.min(Math.round((score / 14) * 100), 100);

  // Generate feedback based on score
  if (normalizedScore < 40) {
    feedback.unshift("Weak - Consider adding more words or complexity");
  } else if (normalizedScore < 70) {
    feedback.unshift("Moderate - Good start, but could be stronger");
  } else if (normalizedScore < 90) {
    feedback.unshift("Strong - Good combination of length and complexity");
  } else {
    feedback.unshift("Very Strong - Excellent passphrase!");
  }

  return {
    score: normalizedScore,
    feedback: feedback.join(". ")
  };
} 