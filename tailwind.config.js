/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#0066FF',
          600: '#0052CC',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}