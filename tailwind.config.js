/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f4f6fb',
          100: '#e8ecf5',
          200: '#cdd5e8',
          300: '#a7b3d1',
          400: '#7b89b5',
          500: '#5a6897',
          600: '#475177',
          700: '#3a4160',
          800: '#1f2440',
          900: '#0d1126',
          950: '#070a1a',
        },
        royal: {
          50: '#eef3ff',
          100: '#dde6ff',
          200: '#bccfff',
          300: '#8fadff',
          400: '#5b7fff',
          500: '#3a5dff',
          600: '#2240f5',
          700: '#1b30e0',
          800: '#1d2bb5',
          900: '#1d2a8f',
          950: '#151c57',
        },
        cyan: {
          glow: '#22d3ee',
        },
        accent: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(58, 93, 255, 0.45)',
        'glow-cyan': '0 0 40px -10px rgba(34, 211, 238, 0.45)',
        'glow-violet': '0 0 40px -10px rgba(139, 92, 246, 0.45)',
        glass: '0 8px 32px -8px rgba(7, 10, 26, 0.5)',
      },
      keyframes: {
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', filter: 'blur(40px)' },
          '50%': { opacity: '1', filter: 'blur(50px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'border-spin': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'border-spin': 'border-spin 4s linear infinite',
      },
    },
  },
  plugins: [],
};
