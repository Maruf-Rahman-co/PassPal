export interface RedirectHop {
  url: string;
  statusCode: number;
  headers?: Headers;
  error?: string;
  isSuspicious?: boolean;
  securityInfo?: {
    isHttps: boolean;
    certificateInfo?: string;
    serverInfo?: string;
  };
}

export interface RedirectChainResult {
  chain: RedirectHop[];
  finalDestination?: {
    title?: string;
    description?: string;
    isSuspicious: boolean;
    securityInfo?: {
      isHttps: boolean;
      certificateInfo?: string;
      serverInfo?: string;
    };
  };
  hasLoop: boolean;
  totalHops: number;
  securityScore: number;
  warnings: string[];
}

// Enhanced suspicious patterns
const SUSPICIOUS_PATTERNS = [
  // URL shorteners (could be used to mask malicious URLs)
  /^(?:.*\.)?(?:bit\.ly|tinyurl\.com|goo\.gl|t\.co|is\.gd|buff\.ly|ow\.ly|tr\.im|tiny\.cc|shorturl\.at)/i,
  
  // Common tracking and ad domains
  /^(?:.*\.)?(?:ad|ads|track|click|redirect|stats|analytics|pixel)\./i,
  /(?:tracking|affiliate|click|redirect|analytics)\.(?:com|net|org)/i,
  
  // Suspicious TLDs often used in phishing
  /\.(?:xyz|tk|ml|ga|cf|gq|pw)$/i,
  
  // Typosquatting patterns
  /(?:goggle|faceb00k|paypaI|amaz0n|micros0ft)\./i,
  
  // IP address URLs (often used in phishing)
  /^https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i
];

// Security scoring weights
const SECURITY_WEIGHTS = {
  HTTPS: 30,
  NO_SUSPICIOUS_DOMAINS: 30,
  NO_ERRORS: 20,
  NO_LOOPS: 10,
  REASONABLE_CHAIN_LENGTH: 10
};

export const isSuspiciousDomain = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(domain));
  } catch {
    return true; // Invalid URLs are considered suspicious
  }
};

const calculateSecurityScore = (result: RedirectChainResult): number => {
  let score = 100;
  const warnings: string[] = [];

  // Check HTTPS usage
  const hasNonHttps = result.chain.some(hop => !hop.securityInfo?.isHttps);
  if (hasNonHttps) {
    score -= SECURITY_WEIGHTS.HTTPS;
    warnings.push("Some URLs in the chain use insecure HTTP connections");
  }

  // Check for suspicious domains
  const suspiciousCount = result.chain.filter(hop => hop.isSuspicious).length;
  if (suspiciousCount > 0) {
    score -= (SECURITY_WEIGHTS.NO_SUSPICIOUS_DOMAINS * (suspiciousCount / result.chain.length));
    warnings.push(`${suspiciousCount} suspicious domain${suspiciousCount > 1 ? 's' : ''} detected in the chain`);
  }

  // Check for errors
  const errorCount = result.chain.filter(hop => hop.error).length;
  if (errorCount > 0) {
    score -= SECURITY_WEIGHTS.NO_ERRORS;
    warnings.push("Some redirects encountered errors");
  }

  // Check for loops
  if (result.hasLoop) {
    score -= SECURITY_WEIGHTS.NO_LOOPS;
    warnings.push("Redirect loop detected");
  }

  // Check chain length
  if (result.chain.length > 5) {
    score -= Math.min(SECURITY_WEIGHTS.REASONABLE_CHAIN_LENGTH, (result.chain.length - 5) * 2);
    warnings.push("Unusually long redirect chain");
  }

  return Math.max(0, Math.round(score));
};

export const checkRedirects = async (
  initialUrl: string,
  maxHops: number = 10
): Promise<RedirectChainResult> => {
  const chain: RedirectHop[] = [];
  const visitedUrls = new Set<string>();
  let currentUrl = initialUrl;
  let hasLoop = false;
  const warnings: string[] = [];

  try {
    for (let hop = 0; hop < maxHops; hop++) {
      // Check for loops
      if (visitedUrls.has(currentUrl)) {
        hasLoop = true;
        warnings.push("Redirect loop detected");
        break;
      }
      visitedUrls.add(currentUrl);

      try {
        const response = await fetch(currentUrl, {
          redirect: 'manual',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });

        const urlObj = new URL(currentUrl);
        const securityInfo = {
          isHttps: urlObj.protocol === 'https:',
          serverInfo: response.headers.get('server') || undefined,
          certificateInfo: urlObj.protocol === 'https:' ? 'Secure HTTPS connection' : 'Insecure HTTP connection'
        };

        const hop: RedirectHop = {
          url: currentUrl,
          statusCode: response.status,
          headers: response.headers,
          isSuspicious: isSuspiciousDomain(currentUrl),
          securityInfo
        };

        if (hop.isSuspicious) {
          warnings.push(`Suspicious domain detected: ${urlObj.hostname}`);
        }

        chain.push(hop);

        // If not a redirect status code, we've reached the final destination
        if (![301, 302, 303, 307, 308].includes(response.status)) {
          // Try to get page title and description for final destination
          if (response.status === 200) {
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            
            const result: RedirectChainResult = {
              chain,
              finalDestination: {
                title: doc.title,
                description: doc.querySelector('meta[name="description"]')?.getAttribute('content'),
                isSuspicious: isSuspiciousDomain(currentUrl),
                securityInfo
              },
              hasLoop,
              totalHops: chain.length,
              securityScore: 0,
              warnings
            };

            result.securityScore = calculateSecurityScore(result);
            return result;
          }
          break;
        }

        // Get next URL from Location header
        const nextUrl = response.headers.get('location');
        if (!nextUrl) {
          warnings.push("Redirect response missing Location header");
          break;
        }

        // Resolve relative URLs
        currentUrl = new URL(nextUrl, currentUrl).href;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        warnings.push(`Error during redirect: ${errorMessage}`);
        
        chain.push({
          url: currentUrl,
          statusCode: 0,
          error: errorMessage,
          isSuspicious: isSuspiciousDomain(currentUrl),
          securityInfo: {
            isHttps: currentUrl.startsWith('https:'),
            certificateInfo: currentUrl.startsWith('https:') ? 'Connection failed' : 'Insecure HTTP connection'
          }
        });
        break;
      }
    }
  } catch (error) {
    console.error('Error checking redirects:', error);
    warnings.push("Failed to complete redirect chain analysis");
  }

  const result: RedirectChainResult = {
    chain,
    hasLoop,
    totalHops: chain.length,
    securityScore: 0,
    warnings
  };

  result.securityScore = calculateSecurityScore(result);
  return result;
}; 