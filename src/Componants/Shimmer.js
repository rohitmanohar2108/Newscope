import React from 'react';

const Shimmer = () => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white animate-pulse">
      <div className="animate-pulse">
        <div className="w-full h-48 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
