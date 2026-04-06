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
        darkBackGround: '#09090b',
        darkBorder: '#272723',
        darkText: '#A1A19B',
        darkLeftSiderBar: '#191916',

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
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatDelay: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'floatDelay': 'floatDelay 5s ease-in-out infinite 1s',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
      },
    },
  },
  plugins: [],
}