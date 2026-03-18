import React from 'react';

interface PageLoaderProps {
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Simple elegant spinner */}
        <div className="relative mb-8">
          <div className="w-12 h-12 mx-auto">
            {/* Outer circle */}
            <div className="absolute inset-0 border-2 border-gray-100 rounded-full"></div>
            {/* Spinning arc */}
            <div className="absolute inset-0 border-2 border-transparent border-t-[#9a8457] rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Clean text */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-700">{message}</h3>
          
          {/* Simple dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-[#9a8457] rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-[#9a8457] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-2 h-2 bg-[#9a8457] rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;