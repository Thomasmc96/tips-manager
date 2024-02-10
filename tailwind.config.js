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
        gold: "#FCBC02",
        silver: "#C0C0C0",
        bronze: "#CD7F32",
        darkestGreenNew: "#183417",
        darkGreenNew: "#1b401a",
        lightGreenNew: "#387236",
        red: "#9b1414",
        grey: "#D9D9D9",
      },
      minWidth: {
        '14': '14rem'
      }
    },
  },
  plugins: [],
};
