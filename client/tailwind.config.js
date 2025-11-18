/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '!./src/**/*.test.{js,ts,jsx,tsx}',
    '!./node_modules/**'
  ],
  theme: {
    extend: {
      fontFamily: {
        baloo: ['"Baloo 2"', 'cursive'],
      },
    },
  },
  plugins: [],
};
