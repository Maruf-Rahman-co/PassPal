// Morse code mapping
export const morseCodeMap: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': ' ', '.': '.-.-.-', ',': '--..--',
  '?': '..--..', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  '¿': '..-.-', '¡': '--...-'
};

// Reverse mapping for decoding
export const reverseMorseCodeMap = Object.entries(morseCodeMap).reduce(
  (acc, [char, morse]) => ({ ...acc, [morse]: char }), 
  {} as { [key: string]: string }
);

// Convert text to Morse code
export function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map(char => morseCodeMap[char] || char)
    .join(' ');
}

// Convert Morse code to text
export function morseToText(morse: string): string {
  return morse
    .split(' ')
    .map(code => reverseMorseCodeMap[code] || code)
    .join('');
}

// Audio context for Morse code sounds
let audioContext: AudioContext | null = null;

// Initialize audio context
export function initAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

// Generate Morse code audio
export async function generateMorseAudio(morse: string, options = {
  dotDuration: 0.1,
  frequency: 600,
  volume: 0.5,
}): Promise<AudioBuffer> {
  const ctx = initAudioContext();
  const { dotDuration, frequency, volume } = options;
  const dashDuration = dotDuration * 3;
  const symbolGap = dotDuration;
  const letterGap = dotDuration * 3;
  const wordGap = dotDuration * 7;

  // Calculate total duration
  let totalDuration = 0;
  for (const char of morse) {
    switch (char) {
      case '.': totalDuration += dotDuration + symbolGap; break;
      case '-': totalDuration += dashDuration + symbolGap; break;
      case ' ': totalDuration += wordGap; break;
    }
  }

  // Create audio buffer
  const sampleRate = ctx.sampleRate;
  const buffer = ctx.createBuffer(1, Math.ceil(sampleRate * totalDuration), sampleRate);
  const channel = buffer.getChannelData(0);

  // Envelope parameters
  const attackTime = 0.005; // 5ms attack
  const releaseTime = 0.01; // 10ms release

  let currentTime = 0;
  for (const char of morse) {
    const duration = char === '.' ? dotDuration : 
                    char === '-' ? dashDuration :
                    wordGap;

    if (char === '.' || char === '-') {
      // Generate sine wave with envelope
      const samples = Math.floor(duration * sampleRate);
      const attackSamples = Math.floor(attackTime * sampleRate);
      const releaseSamples = Math.floor(releaseTime * sampleRate);
      
      for (let i = 0; i < samples; i++) {
        const sampleTime = i / sampleRate;
        const position = Math.floor(currentTime * sampleRate) + i;
        
        if (position >= channel.length) continue; // Safety check
        
        // Calculate envelope
        let envelope = 1.0;
        if (i < attackSamples) {
          envelope = i / attackSamples;
        } else if (i > samples - releaseSamples) {
          envelope = (samples - i) / releaseSamples;
        }
        
        // Generate sine wave with envelope and volume control
        channel[position] = Math.sin(2 * Math.PI * frequency * sampleTime) * envelope * volume;
      }
      currentTime += duration + symbolGap;
    } else {
      currentTime += wordGap;
    }
  }

  return buffer;
}

// Play Morse code audio
export function playMorseAudio(audioBuffer: AudioBuffer) {
  const ctx = initAudioContext();
  
  // Resume audio context if it's suspended (required by some browsers)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  const source = ctx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(ctx.destination);
  source.start();
  return source;
} 