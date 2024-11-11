import React from 'react';
import ImageResizer from './components/ImageResizer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-blue-500 font-bold text-xl">ReduceImages</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
              <a href="/premium" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Get Premium
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-12">
        <ImageResizer />
      </main>
    </div>
  );
}

export default App;