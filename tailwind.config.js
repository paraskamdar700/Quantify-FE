/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors
        primary: 'var(--primary-color)', 
        pureBlack: '#000000', 
        darkBackGround:'#09090b',
        darkBorder:'#272723',
        darkText:'#A1A19B',
        darkLeftSiderBar:'#191916',

        // text colors
        pureWhite: '#FFFFFF',


        "border-subtle": {
          DEFAULT: "#e5e7eb",  
          dark: "#374151",     
        }
      },
      fontFamily: {
      sans: ['Inter', 'sans-serif'], 
    },
    },
  },
  plugins: [],
}