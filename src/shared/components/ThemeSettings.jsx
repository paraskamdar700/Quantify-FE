// src/shared/components/ThemeSettings.jsx
import React from 'react';
import { useTheme, THEME_PRESETS } from '../context/ThemeContext.jsx';
import { Moon, Sun, Check } from 'lucide-react';

export const ThemeSettings = ({ isOpen, onClose }) => {
  const { themeMode, setThemeMode, primaryColor, setPrimaryColor } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-xl shadow-xl z-50 p-4 dropdown-animate">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-card-foreground">Theme Settings</h3>
        <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground font-medium px-2 py-1 rounded-md hover:bg-muted transition-colors">
          Close
        </button>
      </div>

      {/* Mode Toggle */}
      <div className="mb-4">
        <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">Color Mode</label>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setThemeMode('light')}
            className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
              themeMode === 'light'
                ? 'bg-card text-card-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sun size={14} /> Light
          </button>
          <button
            onClick={() => setThemeMode('dark')}
            className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
              themeMode === 'dark'
                ? 'bg-card text-card-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Moon size={14} /> Dark
          </button>
        </div>
      </div>

      {/* Color Presets */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2.5 block uppercase tracking-wider">Theme Color</label>
        <div className="flex gap-2.5 flex-wrap">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setPrimaryColor(preset.color)}
              className="group relative w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card"
              style={{ backgroundColor: preset.color, focusRingColor: preset.color }}
              title={preset.name}
            >
              {primaryColor === preset.color && (
                <Check size={14} className="text-white" strokeWidth={3} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};