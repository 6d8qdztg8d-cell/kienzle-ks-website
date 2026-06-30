/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          brand: '#E31E24',
          dark: '#ba0013',
          soft: 'rgba(227,30,36,0.08)',
        },
        gray: {
          apple: '#f5f5f7',
          card: 'rgba(255,255,255,0.72)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Archivo Narrow"', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backdropBlur: {
        apple: '20px',
      },
    },
  },
  plugins: [],
}
