/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        darkgrey: "#333333",
        nearlyblack: "#1A1A1A",
        darkwhite: "#ECECEC",
      },
      fontFamily: {
        roboto: ["Roboto, sans-serif"],
      },
    },
  },
  plugins: [],
};
