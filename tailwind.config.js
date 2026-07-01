/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          300: '#4ade80',
          400: '#22c55e',
          500: '#16a34a',
        },
      },
    },
  },
  plugins: [],
};
