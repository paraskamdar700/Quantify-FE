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
        /* ── Theme-aware semantic tokens (CSS vars) ── */
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        ring: 'var(--ring)',
        input: 'var(--input-border)',

        /* ── Sidebar tokens ── */
        sidebar: {
          DEFAULT: 'var(--sidebar-bg)',
          border: 'var(--sidebar-border)',
          muted: 'var(--sidebar-muted)',
          foreground: 'var(--sidebar-foreground)',
          'foreground-muted': 'var(--sidebar-foreground-muted)',
        },

        /* ── Header tokens ── */
        header: {
          DEFAULT: 'var(--header-bg)',
          border: 'var(--header-border)',
        },

        /* ── Dynamic primary from ThemeContext ── */
        primary: 'var(--primary-color)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
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