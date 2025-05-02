
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-elblue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-md overflow-hidden bg-white flex items-center justify-center">
                <span className="text-elblue font-bold text-sm">&lt;/&gt;</span>
              </div>
              <span className="font-bold text-xl">EL ACCESS <span className="text-sm">2.0</span></span>
            </div>
            <p className="text-sm mb-4">
              EL ACCESS 2.0 is a premier coding tutorial program designed to help you master programming skills through comprehensive 
              courses and hands-on training.
            </p>
            <p className="text-sm">
              Made with ❤️ by ELCODERS SOFTWARES
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
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
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
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
                className="inline-block bg-white text-elblue px-4 py-2 rounded-md hover:bg-opacity-90 transition-all mt-2"
              >
                Follow the ELCODERS 🔥 Channel on WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {currentYear} EL ACCESS. All rights reserved.</p>
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
