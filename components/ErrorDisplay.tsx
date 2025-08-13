
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const AlertTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
    </svg>
);


export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
    <div className="flex items-center">
        <AlertTriangleIcon className="w-6 h-6 mr-3 text-red-400" />
        <div>
            <strong className="font-bold">An error occurred: </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    </div>
  </div>
);
