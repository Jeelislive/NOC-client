import React from 'react';
import { Link } from 'react-router-dom';

const Inspector = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Inspector Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Link 
          to="applicationlist" 
          className="bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg p-6 text-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="flex flex-col items-center">
            <svg 
              className="w-16 h-16 text-red-600 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4.354a4 4 0 110 5.292M15 21H9a2 2 0 01-2-2V10.34a4 4 0 01.672-2.777L13.5 2.672A4 4 0 0118 7.34l-5 4.672A4 4 0 0112 10.34V21z" 
              />
            </svg>
            <h2 className="font-semibold text-xl text-gray-800 mb-2">Application List</h2>
            <p className="text-gray-600">View all NOC applications</p>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Inspector;
