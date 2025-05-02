
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PromoAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Show the promo after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>
      {isMinimized ? (
        <button 
          onClick={toggleMinimize}
          className="bg-elblue text-white p-3 rounded-full shadow-lg animate-pulse-light hover:bg-blue-600 transition-colors"
        >
          💰
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md overflow-hidden animate-scale-up">
          <div className="bg-gradient-to-r from-elblue to-blue-600 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="font-bold text-sm md:text-base">🔥 LIMITED TIME OFFER! 🔥</h3>
            <div className="flex items-center">
              <button 
                onClick={toggleMinimize} 
                className="p-1 ml-2 hover:bg-blue-600 rounded-full"
                aria-label="Minimize"
              >
                <span>_</span>
              </button>
              <button 
                onClick={dismiss} 
                className="p-1 ml-2 hover:bg-blue-600 rounded-full"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-sm font-semibold mb-2">Turn your phone into a MONEY MACHINE! 📱💰</p>
            
            <div className="space-y-2 text-sm">
              <p><span className="font-bold">1️⃣ Invite a Friend – Get ₦1,000 Instantly!</span> For every friend who registers, you earn ₦1,000 CASH!</p>
              <p><span className="font-bold">2️⃣ KEEP EARNING Every Month!</span> When your referrals make their 2nd bi-weekly payment, you'll earn 50% of that payment EVERY MONTH!</p>
              
              <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded-md my-2">
                <p className="font-semibold text-elblue dark:text-blue-300">Let's Break it Down:</p>
                <ul className="list-disc list-inside pl-2 text-xs space-y-1 mt-1">
                  <li>Invite 5 friends = ₦5,000 instantly + ₦10,000 monthly</li>
                  <li>Invite 20 friends = ₦20,000 instantly + ₦40,000 monthly</li>
                </ul>
              </div>
              
              <p className="font-semibold">That's ₦60,000+ just from sharing a link! 🤯</p>
              
              <p className="text-center font-bold mt-2">REGISTER | REFER | EARN! 🔗</p>
            </div>
            
            <div className="mt-3 flex justify-center">
              <a 
                href="https://wa.me/2348088578817?text=I'm%20interested%20in%20the%20EL%20ACCESS%20referral%20program!"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-elblue hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors hover-scale"
              >
                Get Your Referral Code Now!
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoAlert;
