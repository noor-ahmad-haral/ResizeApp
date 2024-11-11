import React from 'react';
import { ResizeOptions } from '../types';

interface Props {
  options: ResizeOptions;
  onChange: (key: keyof ResizeOptions, value: string | number) => void;
}

export default function ResizeControls({ options, onChange }: Props) {
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Choose new size and format</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Width</label>
          <div className="mt-1 flex">
            <input
              type="number"
              value={options.width}
              onChange={(e) => onChange('width', e.target.value)}
              className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <select
              value={options.unit}
              onChange={(e) => onChange('unit', e.target.value)}
              className="rounded-r-md border-l-0 border-gray-300 bg-gray-50"
            >
              <option value="percent">%</option>
              <option value="px">px</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Height</label>
          <div className="mt-1 flex">
            <input
              type="number"
              value={options.height}
              onChange={(e) => onChange('height', e.target.value)}
              className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <select
              value={options.unit}
              onChange={(e) => onChange('unit', e.target.value)}
              className="rounded-r-md border-l-0 border-gray-300 bg-gray-50"
            >
              <option value="percent">%</option>
              <option value="px">px</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Resolution</label>
        <input
          type="number"
          value={options.quality}
          onChange={(e) => onChange('quality', e.target.value)}
          className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="1"
          max="100"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Format</label>
          <select
            value={options.format}
            onChange={(e) => onChange('format', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="jpeg">JPG</option>
            <option value="png">PNG</option>
            <option value="gif">GIF</option>
            <option value="webp">WebP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Background</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={options.background === 'white'}
                onChange={() => onChange('background', 'white')}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">White</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={options.background === 'black'}
                onChange={() => onChange('background', 'black')}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Black</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}