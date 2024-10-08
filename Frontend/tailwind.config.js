/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '5xl': '0 35px 60px -15px rgba(0, 0, 0, 0.5)', // Customize the shadow here
      },
    },
  },
  plugins: [],
}

