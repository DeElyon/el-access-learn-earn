
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'destructive' | 'ghost';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ProtocolButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const ProtocolButton: React.FC<ProtocolButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-protocol-blue disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Size classes
  const sizeClasses = {
    xs: 'text-xs px-2 py-1 rounded',
    sm: 'text-sm px-3 py-1.5 rounded-md',
    md: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-5 py-2.5 rounded-lg',
    xl: 'text-lg px-6 py-3 rounded-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-protocol-blue text-white hover:bg-protocol-dark active:bg-protocol-accent',
    secondary: 'bg-protocol-light text-white hover:bg-protocol-blue active:bg-protocol-dark',
    outline: 'border border-protocol-blue text-protocol-blue bg-transparent hover:bg-protocol-blue/10 active:bg-protocol-blue/20',
    link: 'underline-offset-4 hover:underline text-protocol-blue hover:text-protocol-dark bg-transparent',
    destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-protocol-blue dark:text-protocol-light'
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" cy="12" r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      
      {children}
      
      {rightIcon && !isLoading && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
};

export default ProtocolButton;
