// Steganography implementation using the Least Significant Bit (LSB) technique

// Convert text to binary
function textToBinary(text: string): string {
  return text.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('');
}

// Convert binary to text
function binaryToText(binary: string): string {
  // Ensure the binary string length is a multiple of 8
  const paddedBinary = binary.padEnd(Math.ceil(binary.length / 8) * 8, '0');
  const bytes = paddedBinary.match(/.{8}/g) || [];
  return bytes.map(byte => 
    String.fromCharCode(parseInt(byte, 2))
  ).join('');
}

// Simple XOR encryption with password
function encryptMessage(message: string, password: string): string {
  if (!password) throw new Error("Password is required");
  let result = '';
  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i) ^ password.charCodeAt(i % password.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}

// Simple XOR decryption with password
function decryptMessage(encrypted: string, password: string): string {
  if (!password) throw new Error("Password is required");
  return encryptMessage(encrypted, password); // XOR is symmetric
}

// Hide a message in an image
export async function hideMessage(imageData: ImageData, message: string, password: string): Promise<ImageData> {
  if (!message) throw new Error("Message is required");
  if (!password) throw new Error("Password is required");

  // Encrypt the message with password
  const encryptedMessage = encryptMessage(message, password);
  
  // Convert encrypted message to binary
  const binaryMessage = textToBinary(encryptedMessage);
  const messageLength = binaryMessage.length;
  
  // Check if the image can hold the message
  const maxBits = (imageData.data.length - 128) * 0.75; // Use 75% of available pixels after header
  if (messageLength > maxBits) {
    throw new Error("Message is too large for this image");
  }

  // Create a copy of the image data
  const newData = new Uint8ClampedArray(imageData.data);
  
  // Store message length in the first 32 pixels (32 bits)
  const lengthBinary = messageLength.toString(2).padStart(32, '0');
  for (let i = 0; i < 32; i++) {
    newData[i * 4] = (newData[i * 4] & 0xFE) | parseInt(lengthBinary[i]);
  }

  // Hide message in the image data
  let bitIndex = 0;
  for (let i = 32 * 4; i < newData.length - 2 && bitIndex < messageLength; i += 3) {
    // Use one bit per color channel (RGB)
    newData[i] = (newData[i] & 0xFE) | parseInt(binaryMessage[bitIndex++] || '0');
    if (bitIndex < messageLength) {
      newData[i + 1] = (newData[i + 1] & 0xFE) | parseInt(binaryMessage[bitIndex++] || '0');
    }
    if (bitIndex < messageLength) {
      newData[i + 2] = (newData[i + 2] & 0xFE) | parseInt(binaryMessage[bitIndex++] || '0');
    }
  }

  return new ImageData(newData, imageData.width, imageData.height);
}

// Extract a message from an image
export async function extractMessage(imageData: ImageData, password: string): Promise<string> {
  if (!password) throw new Error("Password is required");

  // Extract message length from the first 32 pixels
  let lengthBinary = '';
  for (let i = 0; i < 32; i++) {
    lengthBinary += (imageData.data[i * 4] & 1).toString();
  }
  const messageLength = parseInt(lengthBinary, 2);

  if (messageLength <= 0 || messageLength > (imageData.data.length - 128) * 0.75) {
    throw new Error("No valid message found in this image");
  }

  // Extract the binary message
  let binaryMessage = '';
  let bitCount = 0;
  
  for (let i = 32 * 4; i < imageData.data.length - 2 && bitCount < messageLength; i += 3) {
    // Extract one bit from each color channel (RGB)
    binaryMessage += (imageData.data[i] & 1).toString();
    bitCount++;
    
    if (bitCount < messageLength) {
      binaryMessage += (imageData.data[i + 1] & 1).toString();
      bitCount++;
    }
    
    if (bitCount < messageLength) {
      binaryMessage += (imageData.data[i + 2] & 1).toString();
      bitCount++;
    }
  }

  // Ensure we have the correct number of bits
  binaryMessage = binaryMessage.slice(0, messageLength);

  try {
    // Convert binary message back to text and decrypt
    const encryptedMessage = binaryToText(binaryMessage);
    return decryptMessage(encryptedMessage, password);
  } catch (error) {
    throw new Error("Failed to extract message. The password might be incorrect.");
  }
}

// Helper function to get ImageData from an image source
export async function getImageData(imageSrc: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(ctx.getImageData(0, 0, img.width, img.height));
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageSrc;
  });
}

// Helper function to create image URL from ImageData
export function createImageUrl(imageData: ImageData): string {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
} 