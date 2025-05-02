
import React from 'react';
import { Mail, Phone, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-protocol-blue to-protocol-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-white p-1 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/777e54bf-8e43-4dc6-92fc-b5572a8c9ece.png" 
                  alt="ELCODERS Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold font-poppins text-xl">EL ACCESS <span className="text-sm">2.0</span></span>
                <p className="text-xs text-blue-100">by ELCODERS SOFTWARE</p>
              </div>
            </div>
            <p className="text-sm mb-4">
              EL ACCESS 2.0 is a premier coding tutorial program designed to help you master programming skills through comprehensive 
              courses and hands-on training.
            </p>
            <p className="text-sm flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-400 animate-pulse" fill="currentColor" /> by ELCODERS SOFTWARE DEVELOPING COMPANY
            </p>
            <p className="text-sm mt-2 font-medium">
              Founder & C.E.O: ELYON
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline transition-all">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:underline transition-all">Courses</Link>
              </li>
              <li>
                <Link to="/registration" className="hover:underline transition-all">Registration</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline transition-all">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:elcoderssoftwares12@gmail.com" className="hover:underline transition-all">
                  elcoderssoftwares12@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <a href="https://wa.me/2348088578817" className="hover:underline transition-all">
                  WhatsApp: 08088578817
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <a 
                href="https://whatsapp.com/channel/0029Vae13b4BvvsYVV4a6C2z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-protocol-blue px-4 py-2 rounded-md hover:bg-opacity-90 transition-all mt-2"
              >
                Follow the ELCODERS 🔥 Channel on WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {currentYear} EL ACCESS by ELCODERS SOFTWARE. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <a href="#" className="text-sm hover:underline transition-all">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="text-sm hover:underline transition-all">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
