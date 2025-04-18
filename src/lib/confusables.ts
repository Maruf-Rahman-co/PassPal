// Unicode confusables data based on Unicode Security Mechanisms
// Reference: https://www.unicode.org/Public/security/latest/confusables.txt
export const confusablesMap: { [key: string]: string } = {
  // Cyrillic characters
  'а': 'a', // CYRILLIC SMALL LETTER A (U+0430)
  'в': 'b', // CYRILLIC SMALL LETTER VE (U+0432)
  'с': 'c', // CYRILLIC SMALL LETTER ES (U+0441)
  'ԁ': 'd', // CYRILLIC SMALL LETTER DE (U+0501)
  'е': 'e', // CYRILLIC SMALL LETTER IE (U+0435)
  'ё': 'e', // CYRILLIC SMALL LETTER IO (U+0451)
  'һ': 'h', // CYRILLIC SMALL LETTER SHHA (U+04BB)
  'і': 'i', // CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I (U+0456)
  'ј': 'j', // CYRILLIC SMALL LETTER JE (U+0458)
  'к': 'k', // CYRILLIC SMALL LETTER KA (U+043A)
  'ӏ': 'l', // CYRILLIC LETTER PALOCHKA (U+04CF)
  'м': 'm', // CYRILLIC SMALL LETTER EM (U+043C)
  'н': 'h', // CYRILLIC SMALL LETTER EN (U+043D)
  'о': 'o', // CYRILLIC SMALL LETTER O (U+043E)
  'р': 'p', // CYRILLIC SMALL LETTER ER (U+0440)
  'ѕ': 's', // CYRILLIC SMALL LETTER DZE (U+0455)
  'т': 't', // CYRILLIC SMALL LETTER TE (U+0442)
  'у': 'y', // CYRILLIC SMALL LETTER U (U+0443)
  'х': 'x', // CYRILLIC SMALL LETTER HA (U+0445)
  'ѡ': 'w', // CYRILLIC SMALL LETTER OMEGA (U+0461)

  // Greek characters
  'α': 'a', // GREEK SMALL LETTER ALPHA (U+03B1)
  'β': 'b', // GREEK SMALL LETTER BETA (U+03B2)
  'ε': 'e', // GREEK SMALL LETTER EPSILON (U+03B5)
  'ι': 'i', // GREEK SMALL LETTER IOTA (U+03B9)
  'κ': 'k', // GREEK SMALL LETTER KAPPA (U+03BA)
  'ο': 'o', // GREEK SMALL LETTER OMICRON (U+03BF)
  'ρ': 'p', // GREEK SMALL LETTER RHO (U+03C1)
  'τ': 't', // GREEK SMALL LETTER TAU (U+03C4)
  'υ': 'u', // GREEK SMALL LETTER UPSILON (U+03C5)
  'χ': 'x', // GREEK SMALL LETTER CHI (U+03C7)

  // Mathematical symbols
  '𝐚': 'a', // MATHEMATICAL BOLD SMALL A (U+1D41A)
  '𝐛': 'b', // MATHEMATICAL BOLD SMALL B (U+1D41B)
  '𝐞': 'e', // MATHEMATICAL BOLD SMALL E (U+1D41E)
  '𝐨': 'o', // MATHEMATICAL BOLD SMALL O (U+1D428)
  '𝐱': 'x', // MATHEMATICAL BOLD SMALL X (U+1D433)

  // Special characters and symbols
  'ı': 'i', // DOTLESS I (U+0131)
  'ℹ': 'i', // INFORMATION SOURCE (U+2139)
  '𝟏': '1', // MATHEMATICAL BOLD DIGIT ONE (U+1D7CF)
  '𝟎': '0', // MATHEMATICAL BOLD DIGIT ZERO (U+1D7CE)
  'ℓ': 'l', // SCRIPT SMALL L (U+2113)
  '‐': '-', // HYPHEN (U+2010)
  '−': '-', // MINUS SIGN (U+2212)
  '⁃': '-', // HYPHEN BULLET (U+2043)
};

// Common phishing patterns and their risk levels
export const phishingPatterns = {
  substitutions: {
    'paypal': ['pаypal', 'payрal', 'раyраl'],
    'google': ['gооgle', 'googӏe', 'gооgӏе'],
    'microsoft': ['miсrоsоft', 'microsоft', 'міcrоsoft'],
    'apple': ['аpple', 'аррӏе', 'аррlе'],
    'amazon': ['amazоn', 'amаzоn', 'аmаzоn'],
    'facebook': ['fаcebook', 'facebооk', 'fаcеbооk'],
    'instagram': ['instаgram', 'іnstagram', 'instаgrаm'],
    'twitter': ['twіtter', 'twittеr', 'twіttеr'],
    'netflix': ['netflіx', 'nеtflix', 'nеtflіx'],
    'linkedin': ['linkеdin', 'lіnkedin', 'linkеdіn'],
  },
  riskLevels: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  }
};

// Add email-specific phishing patterns
export const emailPhishingPatterns = {
  substitutions: {
    'gmail': ['gmаil', 'gmaіl', 'gmаіl'],
    'yahoo': ['yаhoo', 'yahоо', 'yаhоо'],
    'outlook': ['оutlook', 'outlоok', 'оutlоok'],
    'hotmail': ['hоtmail', 'hotmаil', 'hоtmаil'],
    'icloud': ['іcloud', 'iclоud', 'іclоud'],
    'protonmail': ['prоtonmail', 'prоtоnmail', 'prоtоnmаil'],
    'tutanota': ['tutаnota', 'tutаnоta', 'tutаnоtа'],
    'zoho': ['zоho', 'zohо', 'zоhо'],
    'aol': ['аol', 'aоl', 'аоl'],
    'mail': ['mаil', 'maіl', 'mаіl']
  }
};

export interface ScriptInfo {
  name: string;
  range: [number, number];
}

// Unicode script ranges for mixed-script detection
export const scriptRanges: ScriptInfo[] = [
  { name: 'Latin', range: [0x0000, 0x024F] },
  { name: 'Cyrillic', range: [0x0400, 0x04FF] },
  { name: 'Greek', range: [0x0370, 0x03FF] },
  { name: 'Arabic', range: [0x0600, 0x06FF] },
  { name: 'Devanagari', range: [0x0900, 0x097F] },
  { name: 'Chinese', range: [0x4E00, 0x9FFF] },
  { name: 'Japanese Hiragana', range: [0x3040, 0x309F] },
  { name: 'Japanese Katakana', range: [0x30A0, 0x30FF] },
  { name: 'Korean Hangul', range: [0xAC00, 0xD7AF] },
];

export interface ConfusableChar {
  char: string;
  isConfusable: boolean;
  replacement?: string;
  codePoint: string;
  name: string;
  script: string;
  riskLevel: 'high' | 'medium' | 'low';
}

export interface AnalysisResult {
  chars: ConfusableChar[];
  stats: {
    totalChars: number;
    confusableCount: number;
    scripts: { [key: string]: number };
    riskLevel: 'high' | 'medium' | 'low';
    matchedPatterns: string[];
    isEmail: boolean;
    isURL: boolean;
  };
}

function getCharacterScript(codePoint: number): string {
  for (const { name, range } of scriptRanges) {
    if (codePoint >= range[0] && codePoint <= range[1]) {
      return name;
    }
  }
  return 'Unknown';
}

function calculateRiskLevel(char: string, context: string): 'high' | 'medium' | 'low' {
  // Check if it's part of a known phishing pattern
  for (const [target, variations] of Object.entries(phishingPatterns.substitutions)) {
    if (variations.some(v => context.includes(v))) {
      return 'high';
    }
  }

  // Check for email-specific phishing patterns
  if (isEmail(context)) {
    for (const [target, variations] of Object.entries(emailPhishingPatterns.substitutions)) {
      if (variations.some(v => context.toLowerCase().includes(v.toLowerCase()))) {
        return 'high';
      }
    }
  }

  // Check if it's a confusable character
  if (confusablesMap[char]) {
    return 'medium';
  }

  // If it's not in ASCII range and not a common Unicode character
  const codePoint = char.codePointAt(0) ?? 0;
  if (codePoint > 127 && !/[\u0080-\u00FF]/.test(char)) { // Extended Latin-1 range
    return 'medium';
  }

  return 'low';
}

export function getCharacterName(char: string): string {
  try {
    return char.normalize('NFKD');
  } catch {
    return 'Unknown';
  }
}

export function detectConfusables(text: string): AnalysisResult {
  const chars = [...text].map(char => {
    const codePoint = char.codePointAt(0) ?? 0;
    const replacement = confusablesMap[char];
    const script = getCharacterScript(codePoint);
    
    return {
      char,
      isConfusable: !!replacement && replacement !== char,
      replacement,
      codePoint: codePoint.toString(16).toUpperCase(),
      name: getCharacterName(char),
      script,
      riskLevel: calculateRiskLevel(char, text)
    };
  });

  // Calculate statistics
  const stats = {
    totalChars: chars.length,
    confusableCount: chars.filter(c => c.isConfusable).length,
    scripts: chars.reduce((acc: { [key: string]: number }, char) => {
      acc[char.script] = (acc[char.script] || 0) + 1;
      return acc;
    }, {}),
    riskLevel: 'low' as 'high' | 'medium' | 'low',
    matchedPatterns: [] as string[],
    isEmail: isEmail(text),
    isURL: isURL(text)
  };

  // Check for known phishing patterns
  for (const [target, variations] of Object.entries(phishingPatterns.substitutions)) {
    if (variations.some(v => text.toLowerCase().includes(v.toLowerCase()))) {
      stats.matchedPatterns.push(target);
    }
  }

  // Check for email-specific patterns if it's an email
  if (stats.isEmail) {
    for (const [target, variations] of Object.entries(emailPhishingPatterns.substitutions)) {
      if (variations.some(v => text.toLowerCase().includes(v.toLowerCase()))) {
        stats.matchedPatterns.push(`email-${target}`);
      }
    }
  }

  // Determine overall risk level
  if (stats.matchedPatterns.length > 0) {
    stats.riskLevel = 'high';
  } else if (chars.some(c => c.isConfusable)) {
    stats.riskLevel = 'medium';
  } else if (Object.keys(stats.scripts).length > 1 && !stats.isURL && !stats.isEmail) {
    // Only consider multiple scripts suspicious if it's not a URL or email
    stats.riskLevel = 'medium';
  } else {
    stats.riskLevel = 'low';
  }

  return { chars, stats };
}

export function sanitize(text: string): string {
  return [...text].map(c => confusablesMap[c] || c).join('');
}

export function isURL(text: string): boolean {
  try {
    new URL(text.startsWith('http') ? text : `http://${text}`);
    return true;
  } catch {
    return false;
  }
}

export function splitDomain(url: string): { protocol: string; domain: string; path: string } {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
    return {
      protocol: urlObj.protocol,
      domain: urlObj.hostname,
      path: urlObj.pathname + urlObj.search + urlObj.hash,
    };
  } catch {
    return {
      protocol: '',
      domain: url,
      path: '',
    };
  }
}

export function findSimilarDomains(domain: string): string[] {
  const sanitizedDomain = sanitize(domain.toLowerCase());
  return Object.entries(phishingPatterns.substitutions)
    .filter(([target]) => sanitizedDomain.includes(target))
    .map(([target, variations]) => variations)
    .flat();
}

export function isEmail(text: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(text);
} 