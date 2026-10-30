/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'sans-serif'],
        display: ['Vazirmatn', 'Tahoma', 'sans-serif'],
        serif: ['Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      letterSpacing: { luxe: '0.18em' },
      colors: {
        ivory: { 50: '#fdfbf7', 100: '#faf6ef', 200: '#f5efe4', 300: '#ede4d3', 400: '#e0d4bf' },
        ink: { 300: '#a89c8e', 400: '#837868', 500: '#5f574b', 600: '#423d34', 700: '#2e2a23', 800: '#1f1c17', 900: '#15130f' },
        gold: { 200: '#e6d4b0', 300: '#d4be93', 400: '#b8945f', 500: '#a07e4c', 600: '#8a6a3a', 700: '#6e5330', 800: '#544027' },
        wine: { 300: '#d4a8a8', 400: '#b97777', 500: '#9a5454', 600: '#7d3f3f' },
        charcoal: {
          50: '#192f2e',
          100: '#344c4a',
          200: '#526966',
          300: '#607772',
          400: '#80928c',
          500: '#a5b5ad',
          600: '#bdcdc4',
          700: '#dbe5dd',
          800: '#eaf0e9',
          900: '#ffffff',
          950: '#f7f8f3',
        },
        cream: {
          50: '#172f2b',
          100: '#263f3b',
          200: '#405954',
          300: '#607772',
        },
        bronze: {
          300: '#27695c',
          400: '#317d6d',
          500: '#408b7a',
          600: '#2b7163',
          700: '#20584d',
        },
        sage: {
          300: '#bccbb8',
          400: '#9db09a',
          500: '#7f9a7b',
          600: '#607a5c',
        },
        rose: {
          300: '#f0b8b8',
          400: '#e08b8b',
          500: '#c96a6a',
          600: '#a84f4f',
        },
      },
      transitionDuration: { 400: '400ms' },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: { '0%': { transform: 'scaleX(0)' }, '100%': { transform: 'scaleX(1)' } },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'line-grow': 'lineGrow 1.1s cubic-bezier(0.65, 0, 0.35, 1) backwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'fade-in': 'fadeIn 0.4s ease-out backwards',
      },
    },
  },
  plugins: [],
};
