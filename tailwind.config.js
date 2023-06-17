/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '30em', // equivalent to 480px
      md: '42em', // equivalent to 672px
      lg: '62em', // equivalent to 992px
      xl: '80em', // equivalent to 1280px
    },
    extend: {},
  },
  plugins: [],
};
