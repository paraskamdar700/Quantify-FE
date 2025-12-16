

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
        primary: 'var(--primary-color)', 
        primary: '#2563eb', // Example brand color
        secondary: '#64748b',
      }
    },
  },
  plugins: [],
}

