/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'rapimoni-primary': '#3B82F6',
        'rapimoni-secondary': '#10B981',
        'rapimoni-background': '#242424',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
      },
    },
  },
  plugins: [],
} 