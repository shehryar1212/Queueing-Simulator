/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // 1. DO NOT put colors here unless you want to delete Tailwind's defaults.
    extend: {
      // 2. Put them here to keep 'bg-blue-500' AND use 'bg-brand-primary'
      colors: {
        cream: {
          DEFAULT: '#c2b38c',
        },
        accent: '#ffed4a',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}