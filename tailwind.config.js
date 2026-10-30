/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'sans-serif'],
        display: ['Vazirmatn', 'Tahoma', 'serif'],
      },
      colors: {
        ivory: {
          50: '#fdfbf7',
          100: '#faf6ef',
          200: '#f5efe4',
          300: '#ede4d3',
          400: '#e0d4bf',
        },
        ink: {
          300: '#a89c8e',
          400: '#837868',
          500: '#5f574b',
          600: '#423d34',
          700: '#2e2a23',
          800: '#1f1c17',
          900: '#15130f',
        },
        gold: {
          200: '#e6d4b0',
          300: '#d4be93',
          400: '#b8945f',
          500: '#a07e4c',
          600: '#8a6a3a',
          700: '#6e5330',
          800: '#544027',
        },
        sage: {
          300: '#bccbb8',
          400: '#94a890',
          500: '#6f8a6b',
          600: '#52704e',
        },
        wine: {
          300: '#d4a8a8',
          400: '#b97777',
          500: '#9a5454',
          600: '#7d3f3f',
        },
      },
      letterSpacing: {
        luxe: '0.18em',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'fade-in': 'fadeIn 0.6s ease-out backwards',
        'line-grow': 'lineGrow 1.1s cubic-bezier(0.65, 0, 0.35, 1) backwards',
      },
    },
  },
  plugins: [],
};
