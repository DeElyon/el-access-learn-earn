
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface PaymentTimerProps {
  duration: number; // in seconds
  onExpire: () => void;
  expired: boolean;
}

export const PaymentTimer: React.FC<PaymentTimerProps> = ({ 
  duration, 
  onExpire,
  expired 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    if (expired) {
      setTimeLeft(0);
      return;
    }
    
    if (timeLeft <= 0) {
      onExpire();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, onExpire, expired]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate percentage for the progress display
  const percentage = Math.max(0, (timeLeft / duration) * 100);
  
  // Determine color based on time left
  const getTimerColor = () => {
    if (percentage > 60) return "text-green-600 dark:text-green-400";
    if (percentage > 30) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };
  
  return (
    <div className="flex items-center">
      <div className={`font-mono text-lg font-bold ${getTimerColor()}`}>
        {formatTime(timeLeft)}
      </div>
      <div className="ml-2">
        <Clock className={`h-4 w-4 ${getTimerColor()}`} />
      </div>
    </div>
  );
};

export default PaymentTimer;
