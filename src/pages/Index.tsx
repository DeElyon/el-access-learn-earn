
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CourseCategories from '@/components/CourseCategories';
import CTA from '@/components/CTA';
import PromoAlert from '@/components/PromoAlert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check for dark mode preference
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    
    // Apply dark mode class to html element
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CourseCategories />
        <CTA />
      </main>
      <PromoAlert />
      <Footer />
    </div>
  );
};

export default Index;
