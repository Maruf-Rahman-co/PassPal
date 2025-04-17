// Vigenère Cipher implementation

function generateKey(text: string, key: string): string {
  key = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!key) throw new Error("Key must contain at least one letter");
  
  let result = '';
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i].match(/[A-Za-z]/)) {
      result += key[j % key.length];
      j++;
    } else {
      result += ' ';
    }
  }
  return result;
}

export function encryptVigenere(text: string, key: string): string {
  const fullKey = generateKey(text, key);
  
  return text
    .split('')
    .map((char, i) => {
      // Handle uppercase letters
      if (char.match(/[A-Z]/)) {
        const shift = fullKey[i].charCodeAt(0) - 65;
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      // Handle lowercase letters
      if (char.match(/[a-z]/)) {
        const shift = fullKey[i].charCodeAt(0) - 65;
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      }
      // Leave non-alphabetic characters unchanged
      return char;
    })
    .join('');
}

export function decryptVigenere(text: string, key: string): string {
  const fullKey = generateKey(text, key);
  
  return text
    .split('')
    .map((char, i) => {
      // Handle uppercase letters
      if (char.match(/[A-Z]/)) {
        const shift = fullKey[i].charCodeAt(0) - 65;
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      }
      // Handle lowercase letters
      if (char.match(/[a-z]/)) {
        const shift = fullKey[i].charCodeAt(0) - 65;
        return String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
      }
      // Leave non-alphabetic characters unchanged
      return char;
    })
    .join('');
}

// Function to analyze text for potential key lengths
export function analyzeKeyLength(text: string): { length: number; score: number }[] {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
  const results: { length: number; score: number }[] = [];
  
  // Try key lengths from 1 to 10
  for (let keyLength = 1; keyLength <= 10; keyLength++) {
    let score = 0;
    
    // Split text into columns based on key length
    for (let offset = 0; offset < keyLength; offset++) {
      const column = [];
      for (let i = offset; i < cleanText.length; i += keyLength) {
        column.push(cleanText[i]);
      }
      
      // Calculate frequency score for this column
      const frequencies: { [key: string]: number } = {};
      for (const char of column) {
        frequencies[char] = (frequencies[char] || 0) + 1;
      }
      
      // Higher scores indicate more likely key lengths
      const columnScore = Object.values(frequencies).reduce((sum, freq) => {
        const probability = freq / column.length;
        return sum + probability * probability;
      }, 0);
      
      score += columnScore;
    }
    
    results.push({
      length: keyLength,
      score: score / keyLength
    });
  }
  
  return results.sort((a, b) => b.score - a.score);
} 