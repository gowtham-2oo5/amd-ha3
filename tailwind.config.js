/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F4FE',
          500: '#0a7ea4',
          600: '#0969a3',
        },
        mgnrega: {
          excellent: '#10B981',
          good: '#F59E0B',
          average: '#F97316',
          poor: '#EF4444',
        }
      },
    },
  },
  plugins: [],
}