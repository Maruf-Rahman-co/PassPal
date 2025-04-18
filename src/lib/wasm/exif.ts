import ExifReader from 'exifreader';

interface ExifTag {
  description?: string;
  value?: string | number;
}

interface ExifTags {
  [key: string]: ExifTag;
}

export async function readMetadata(file: File): Promise<{ [key: string]: string | number | undefined }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const tags = await ExifReader.load(arrayBuffer) as ExifTags;
    const metadata: { [key: string]: string | number | undefined } = {};

    for (const [key, value] of Object.entries(tags)) {
      if (value.description !== undefined) {
        metadata[key] = value.description;
      } else if (value.value !== undefined) {
        metadata[key] = value.value;
      }
    }

    return metadata;
  } catch (error) {
    console.error('Error reading metadata:', error);
    throw new Error('Failed to read image metadata');
  }
}

export async function addMetadata(
  file: File,
  key: string,
  value: string
): Promise<{ [key: string]: string | number | undefined }> {
  try {
    // For now, we'll just read the existing metadata and add the new key-value pair
    // In a real implementation, you would use a proper EXIF writing library
    const metadata = await readMetadata(file);
    return {
      ...metadata,
      [key]: value,
    };
  } catch (error) {
    console.error('Error adding metadata:', error);
    throw new Error('Failed to add metadata');
  }
}

export async function removeAllMetadata(file: File): Promise<Blob> {
  try {
    // Create a new image without metadata
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    // Create a temporary object URL for the image
    const objectUrl = URL.createObjectURL(file);
    
    // Wait for the image to load
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = objectUrl;
    });

    // Set canvas dimensions to match the image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0);

    // Clean up the object URL
    URL.revokeObjectURL(objectUrl);

    // Convert the canvas to a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert canvas to blob'));
        }
      }, file.type);
    });
  } catch (error) {
    console.error('Error removing metadata:', error);
    throw new Error('Failed to remove metadata');
  }
} 