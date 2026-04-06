// src/components/ThemeSettings.jsx
import React from 'react';
import { useTheme, THEME_PRESETS } from '../context/ThemeContext.jsx';
import { Moon, Sun, Check } from 'lucide-react';

export const ThemeSettings = ({ isOpen, onClose }) => {
  const { themeMode, setThemeMode, primaryColor, setPrimaryColor } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-16 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-5 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Theme Settings</h3>
        <button onClick={onClose} className="text-sm text-red-500 hover:text-red-600 font-medium">
          Close
        </button>
      </div>

      {/* Mode Toggle */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Color Mode</label>
        <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <button
            onClick={() => setThemeMode('light')}
            className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
              themeMode === 'light' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <Sun size={16} /> Light
          </button>
          <button
            onClick={() => setThemeMode('dark')}
            className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
              themeMode === 'dark' 
                ? 'bg-gray-600 text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <Moon size={16} /> Dark
          </button>
        </div>
      </div>

      {/* Color Presets */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Theme Colors</label>
        <div className="grid grid-cols-5 gap-3">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setPrimaryColor(preset.color)}
              className="group relative w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              style={{ backgroundColor: preset.color, outlineColor: preset.color }}
            >
              {primaryColor === preset.color && (
                <Check size={16} className="text-white" strokeWidth={3} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};