import React, { useState, useRef, ChangeEvent } from 'react';
import { ImageInfo, ResizeOptions } from '../types';
import ImageUploader from './ImageUploader';
import ResizeControls from './ResizeControls';

export default function ImageResizer() {
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [resizedImage, setResizedImage] = useState<{ url: string; size: string } | null>(null);
  const [options, setOptions] = useState<ResizeOptions>({
    width: '100',
    height: '100',
    quality: 72,
    format: 'jpeg',
    unit: 'percent',
    background: 'white'
  });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage({
            file,
            preview: img.src,
            width: img.width,
            height: img.height,
            size: formatBytes(file.size)
          });
          setResizedImage(null);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleOptionChange = (key: keyof ResizeOptions, value: string | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const convertToPixels = (value: string, unit: string, originalSize: number): number => {
    const numValue = parseFloat(value);
    switch (unit) {
      case 'percent':
        return (numValue / 100) * originalSize;
      case 'cm':
        return Math.round(numValue * 37.795275591);
      case 'in':
        return Math.round(numValue * 96);
      default:
        return numValue;
    }
  };

  const handleResize = async () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = image.preview;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const newWidth = convertToPixels(options.width, options.unit, img.width);
    const newHeight = convertToPixels(options.height, options.unit, img.height);

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setResizedImage({
            url,
            size: formatBytes(blob.size)
          });
        }
      },
      `image/${options.format}`,
      options.quality / 100
    );
  };

  const handleDownload = () => {
    if (!resizedImage) return;
    const a = document.createElement('a');
    a.href = resizedImage.url;
    a.download = `resized-image.${options.format}`;
    a.click();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Resize an Image</h1>
      
      <ImageUploader 
        image={image} 
        onImageSelect={handleImageSelect} 
      />
      
      {image && !resizedImage && (
        <>
          <ResizeControls 
            options={options} 
            onChange={handleOptionChange} 
          />
          
          <button
            onClick={handleResize}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Resize Image
          </button>
        </>
      )}

      {resizedImage && (
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Your image has been resized!</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img 
              src={resizedImage.url} 
              alt="Resized preview" 
              className="max-w-[300px] max-h-[300px] mx-auto object-contain mb-4"
            />
            <p className="text-gray-600 mb-4">
              resized-image.{options.format} | {resizedImage.size}
            </p>
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg"
            >
              Download Image
            </button>
          </div>
          <button
            onClick={() => setResizedImage(null)}
            className="text-blue-500 hover:text-blue-600"
          >
            Resize Again
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}