
/**
 * Theme Protocol System for EL ACCESS 2.0
 * Provides standardized theme settings and utilities for the application
 */

// Theme Protocol Colors
export const protocolColors = {
  primary: {
    blue: '#066893',
    dark: '#044E70',
    light: '#2389B0',
    accent: '#065F85'
  },
  secondary: {
    green: '#05A66B',
    yellow: '#F0C808',
    red: '#DF2935',
    purple: '#6F2DBD'
  },
  neutral: {
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    mediumGray: '#D1D5DB',
    darkGray: '#4B5563',
    black: '#111827'
  }
};

// Theme Protocol Categories
export const protocolCategories = {
  python: {
    color: protocolColors.secondary.green,
    icon: 'file-code',
    name: 'Python'
  },
  javascript: {
    color: protocolColors.secondary.yellow,
    icon: 'file-code',
    name: 'JavaScript'
  },
  htmlcss: {
    color: protocolColors.secondary.red,
    icon: 'file-code',
    name: 'HTML/CSS'
  },
  mobile: {
    color: protocolColors.secondary.purple,
    icon: 'smartphone',
    name: 'Mobile Development'
  },
  frontend: {
    color: protocolColors.primary.light,
    icon: 'layout',
    name: 'Frontend Development'
  },
  backend: {
    color: protocolColors.primary.dark,
    icon: 'server',
    name: 'Backend Development'
  }
};

// Brand Data
export const brandInfo = {
  name: 'ELCODERS',
  fullName: 'ELCODERS SOFTWARE DEVELOPING COMPANY',
  founder: 'C.E.O ELYON',
  email: 'elcoderssoftwares12@gmail.com',
  whatsapp: '2348088578817',
  whatsappChannel: 'https://whatsapp.com/channel/0029Vae13b4BvvsYVV4a6C2z',
  slogan: 'Learning to code, coding to innovate',
  copyright: '© 2024 EL ACCESS by ELCODERS SOFTWARE. All rights reserved.'
};

// Get category color by id
export const getCategoryColor = (categoryId: string): string => {
  return protocolCategories[categoryId]?.color || protocolColors.primary.blue;
};

// Toggle dark mode
export const toggleDarkMode = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('el-access-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('el-access-theme', 'light');
  }
};

// Initialize theme based on user preference
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('el-access-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    toggleDarkMode(true);
    return true;
  }
  return false;
};
