
import React from 'react';

interface ElcodersLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
  showTagline?: boolean;
}

const ElcodersLogo: React.FC<ElcodersLogoProps> = ({ 
  size = 'medium', 
  variant = 'light',
  showTagline = false
}) => {
  const sizes = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };
  
  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl'
  };
  
  const taglineSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <div className="flex items-center">
      <div className={`${sizes[size]} rounded-full overflow-hidden bg-white p-1 flex items-center justify-center`}>
        <img 
          src="/lovable-uploads/777e54bf-8e43-4dc6-92fc-b5572a8c9ece.png" 
          alt="ELCODERS Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="ml-2">
        <div className={`font-poppins font-bold ${textSizes[size]} ${variant === 'light' ? 'text-white' : 'text-protocol-blue'}`}>
          ELCODERS
        </div>
        {showTagline && (
          <div className={`${taglineSizes[size]} ${variant === 'light' ? 'text-blue-100' : 'text-gray-600'}`}>
            SOFTWARE DEVELOPING COMPANY
          </div>
        )}
      </div>
    </div>
  );
};

export default ElcodersLogo;
