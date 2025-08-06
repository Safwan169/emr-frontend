/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
      },
      screens: {
        'lg': '1024px',  
        'xl': '1190px',  
        '2xl': '1350px', 
      },
    },
  },
  plugins: [],
};
