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
        mocha: {
          deep: '#352522',
          brown: '#805044',
          dark: '#2A1D1A',
          ink: '#1F1513',
          surface: '#392824',
        },
        terracotta: {
          DEFAULT: '#C77D63',
          hover: '#B46B52',
          deep: '#9C5A43',
          soft: '#E3A78F',
        },
        peach: '#EBC5AD',
        cream: '#FAF3EA',
      },
      fontFamily: {
        editorial: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        'arabic-display': ['"Noto Naskh Arabic"', 'serif'],
      },
      letterSpacing: {
        editorial: '-0.03em',
      },
      maxWidth: {
        shell: '1240px',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
        smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      boxShadow: {
        soft: '0 30px 80px -50px rgba(53, 37, 34, 0.48)',
        lift: '0 22px 50px -30px rgba(53, 37, 34, 0.42)',
      },
    },
  },
  plugins: [],
}
