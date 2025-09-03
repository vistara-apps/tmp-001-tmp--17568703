import React from 'react';

interface MapPinProps {
  variant?: 'active' | 'inactive';
  onClick?: () => void;
  label?: string;
}

export const MapPin: React.FC<MapPinProps> = ({
  variant = 'inactive',
  onClick,
  label,
}) => {
  return (
    <div 
      className={`relative cursor-pointer transition-all duration-200 transform ${
        variant === 'active' 
          ? 'scale-110 z-10' 
          : 'hover:scale-105'
      }`}
      onClick={onClick}
    >
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          variant === 'active' 
            ? 'bg-primary text-white shadow-lg' 
            : 'bg-primary/70 text-white shadow'
        }`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
      
      {label && variant === 'active' && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );
};

export default MapPin;

