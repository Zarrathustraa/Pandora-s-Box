/** @type {import('taSilwindcss').Config} */
module.exports = {
  content:  [
    './app/**/*.{js,ts,jsx,tsx}', // Next.js app folder
    './pages/**/*.{js,ts,jsx,tsx}', // Next.js pages
    './components/**/*.{js,ts,jsx,tsx}', // Next.js components
    './sections/**/*.{js,ts,jsx,tsx}', // If you have a custom sections folder
    './layouts/**/*.{js,ts,jsx,tsx}', // If you have custom layouts
    './public/**/*.html', // Public HTML files (optional)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

