/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#080808',
          950: '#050505',
          900: '#080808',
          850: '#0a0a0a',
          800: '#0d0d0d',
          700: '#141414',
          600: '#1c1c1c',
          500: '#242424',
        },
        editorial: {
          DEFAULT: '#f7f5f0',
          50: '#faf9f6',
          100: '#f7f5f0',
          200: '#ece9e1',
          300: '#dfdacf',
          400: '#cbc4b4',
        },
        gold: {
          DEFAULT: '#c6aa72',
          50: '#f5efe2',
          100: '#e8dcc0',
          200: '#d9c79a',
          300: '#c6aa72',
          400: '#b3965d',
          500: '#9d8250',
          600: '#7c6741',
          700: '#5c4d31',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.34em',
        ultra: '0.4em',
      },
      maxWidth: {
        editorial: '1440px',
        prose: '640px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        38: '9.5rem',
        44: '11rem',
      },
      boxShadow: {
        luxury: '0 50px 100px -40px rgba(0,0,0,0.7)',
        'glow-gold':
          '0 0 0 1px rgba(198,170,114,0.15), 0 40px 90px -28px rgba(198,170,114,0.2)',
        'inner-gold': 'inset 0 0 0 1px rgba(198,170,114,0.12)',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
