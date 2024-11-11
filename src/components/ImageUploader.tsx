import React from 'react';
import { ImageInfo } from '../types';

interface Props {
  image: ImageInfo | null;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploader({ image, onImageSelect }: Props) {
  return (
    <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-white">
      {image ? (
        <div className="space-y-2">
          <img 
            src={image.preview} 
            alt="Preview" 
            className="max-w-[150px] max-h-[150px] mx-auto object-contain"
          />
          <div className="text-center text-sm text-gray-600 space-y-1">
            <p>{image.file.name}</p>
            <p>{image.width} x {image.height}</p>
            <p>{image.size}</p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onImageSelect}
            />
            <div className="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-600 transition-colors">
              Select Image
            </div>
          </label>
        </div>
      )}
    </div>
  );
}