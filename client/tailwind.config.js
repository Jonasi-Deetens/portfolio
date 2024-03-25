/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode based on class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: '#ff6347',
        secondaryDark: '#242424',
        ctaDark: '#333333',
        linkDark: '#333333',
        lightColor: '#FAFAFA'
      },
    },
  },
  plugins: [],
}