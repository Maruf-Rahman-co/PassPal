import { SHA1 } from 'crypto-js';

interface PwnedResult {
  isPwned: boolean;
  count?: number;
  error?: string;
}

function sha1Hash(text: string): string {
  return SHA1(text).toString().toUpperCase();
}

export async function checkPassword(password: string): Promise<PwnedResult> {
  try {
    // Create SHA-1 hash of the password
    const hash = sha1Hash(password);

    // Get first 5 chars and remaining chars
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    // Make API request with proper headers
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'PassPal-Password-Checker',
        'Accept': 'text/plain',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Parse response - the API returns lines in format "SUFFIX:COUNT"
    const text = await response.text();
    
    // Handle empty response
    if (!text.trim()) {
      return { isPwned: false };
    }
    
    // Split by newlines and parse each line
    const lines = text.split('\n');
    
    // Look for the exact suffix in the response
    for (const line of lines) {
      // Each line is in format "SUFFIX:COUNT"
      const [hashSuffix, countStr] = line.split(':');
      
      // Check if this is our hash
      if (hashSuffix === suffix) {
        const count = parseInt(countStr, 10);
        return {
          isPwned: true,
          count: count
        };
      }
    }

    // If we get here, the hash wasn't found
    return {
      isPwned: false
    };
  } catch (error) {
    console.error('Password check error:', error);
    return {
      isPwned: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 