declare module 'exifreader' {
  interface ExifTag {
    description?: string;
    value?: string | number;
  }

  interface ExifTags {
    [key: string]: ExifTag;
  }

  function load(data: ArrayBuffer): Promise<ExifTags>;

  export default {
    load,
  };
} 