/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#0870B8",
      },
      boxShadow: {
        'custom-blue': '0 20px 50px rgba(8, 112, 184, 0.7)',
      },
    },
  },
  plugins: [],
};
