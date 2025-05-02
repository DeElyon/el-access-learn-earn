
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ElcodersLogo from './ElcodersLogo';

type NavbarProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const Navbar = ({ isDarkMode, toggleDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-background'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-protocol-blue flex items-center justify-center p-1">
                <img 
                  src="/lovable-uploads/777e54bf-8e43-4dc6-92fc-b5572a8c9ece.png" 
                  alt="ELCODERS Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold font-poppins text-xl text-protocol-blue">EL ACCESS <span className="text-sm">2.0</span></span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-protocol-blue transition-colors animated-border">Home</Link>
            <Link to="/courses" className="text-foreground hover:text-protocol-blue transition-colors animated-border">Courses</Link>
            <Link to="/registration" className="text-foreground hover:text-protocol-blue transition-colors animated-border">Register</Link>
            <Link to="/contact" className="text-foreground hover:text-protocol-blue transition-colors animated-border">Contact</Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-foreground hover:text-protocol-blue hover:bg-muted/60 transition-colors"
              aria-label="Main menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-protocol-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-protocol-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/registration" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-protocol-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-protocol-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
