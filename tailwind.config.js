/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      colors: {
        charcoal: {
          50: '#f5f1ea',
          100: '#e6dfd4',
          200: '#cfc5b8',
          300: '#a69a8c',
          400: '#7d7165',
          500: '#554d45',
          600: '#3a342f',
          700: '#2b2622',
          800: '#1f1b18',
          900: '#161311',
          950: '#0d0b0a',
        },
        cream: {
          50: '#fbf8f2',
          100: '#f5efe3',
          200: '#ece2d0',
          300: '#e0d2b8',
        },
        bronze: {
          300: '#d9b98a',
          400: '#c9a46f',
          500: '#b38b56',
          600: '#8f6d42',
          700: '#6e5333',
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
