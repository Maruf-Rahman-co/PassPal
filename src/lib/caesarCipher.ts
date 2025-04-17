// Caesar Cipher implementation

export function encryptCaesar(text: string, shift: number): string {
  return text
    .split('')
    .map(char => {
      // Handle uppercase letters
      if (char.match(/[A-Z]/)) {
        const code = char.charCodeAt(0);
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      // Handle lowercase letters
      if (char.match(/[a-z]/)) {
        const code = char.charCodeAt(0);
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      // Leave non-alphabetic characters unchanged
      return char;
    })
    .join('');
}

export function decryptCaesar(text: string, shift: number): string {
  // Decryption is encryption with negative shift
  return encryptCaesar(text, (26 - shift) % 26);
}

// Function to brute force all possible shifts
export function bruteForce(text: string): { shift: number; result: string }[] {
  const results: { shift: number; result: string }[] = [];
  
  for (let shift = 0; shift < 26; shift++) {
    results.push({
      shift,
      result: decryptCaesar(text, shift)
    });
  }
  
  return results;
} 