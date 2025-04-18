declare module '@/lib/wasm/exif' {
  export function readMetadata(file: File): Promise<{ [key: string]: string | number | undefined }>;
  export function addMetadata(file: File, key: string, value: string): Promise<{ [key: string]: string | number | undefined }>;
  export function removeAllMetadata(file: File): Promise<Blob>;
} 