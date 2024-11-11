export interface ImageInfo {
  file: File;
  preview: string;
  width: number;
  height: number;
  size: string;
}

export interface ResizeOptions {
  width: string;
  height: string;
  quality: number;
  format: 'jpeg' | 'png' | 'gif' | 'webp';
  unit: 'px' | 'percent' | 'cm' | 'in';
  background: 'white' | 'black';
}