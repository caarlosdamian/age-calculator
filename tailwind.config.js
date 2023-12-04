/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          lightGrey: '#F0F0F0',
          grey: '#716F6F',
          black: '#151515',
          line: '#DCDCDC',
          purple: '#854DFF',
        },
      },
    },
  },
  plugins: [],
};
