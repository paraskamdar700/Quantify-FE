// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Define your color presets here
export const THEME_PRESETS = [
  { name: 'Blue', color: '#3b82f6', class: 'blue' },
  { name: 'Purple', color: '#8b5cf6', class: 'purple' },
  { name: 'Rose', color: '#f43f5e', class: 'rose' },
  { name: 'Orange', color: '#f97316', class: 'orange' },
  { name: 'Green', color: '#22c55e', class: 'green' },
];

export const ThemeProvider = ({ children }) => {
  // Load from local storage or default to 'light' and 'Blue'
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('themeMode') || 'light');
  const [primaryColor, setPrimaryColor] = useState(() => localStorage.getItem('primaryColor') || '#3b82f6');

  // Apply Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Apply Primary Color (Using CSS Variables)
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    localStorage.setItem('primaryColor', primaryColor);
  }, [primaryColor]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, primaryColor, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);