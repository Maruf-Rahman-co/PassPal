import { createHash } from 'crypto';

interface PwnedResult {
  isPwned: boolean;
  count?: number;
  error?: string;
}

async function sha1Hash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}

export async function checkPassword(password: string): Promise<PwnedResult> {
  try {
    // Create SHA-1 hash of the password
    const hash = await sha1Hash(password);

    // Get first 5 chars and remaining chars
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    // Make API request
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Parse response
    const text = await response.text();
    const hashes = text.split('\n').map(line => {
      const [hash, count] = line.split(':');
      return { hash, count: parseInt(count, 10) };
    });

    // Check if our suffix exists in the response
    const match = hashes.find(h => h.hash === suffix);
    
    if (match) {
      return {
        isPwned: true,
        count: match.count
      };
    }

    return {
      isPwned: false
    };
  } catch (error) {
    return {
      isPwned: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 