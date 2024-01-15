/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGreen: "#003e21",
        normalGreen: "#067242",
        lightGreen: "#098b54",
        sandBeige: "#f8d098",
        gold: "#FFD700",
        silver: "#C0C0C0",
        bronze: "#CD7F32"
      },
      minWidth: {
        '14': '14rem'
      }
    },
  },
  plugins: [],
};
