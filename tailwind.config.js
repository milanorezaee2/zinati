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
      colors: {
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
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'fade-in': 'fadeIn 0.4s ease-out backwards',
      },
    },
  },
  plugins: [],
};
