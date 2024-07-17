/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        darkgrey: "#333333",
        nearlyblack: "#1A1A1A",
        primary: "#212121",
        darkwhite: "#ECECEC",
      },
      fontFamily: {
        roboto: ["Roboto, sans-serif"],
      },

      keyframes: {
        pulsating: {
          "40%": { transform: "scale(1.2)" },
          "60%": { transform: "scale(0.9)" },
          "80%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
