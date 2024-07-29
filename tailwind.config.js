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

      boxShadow: {
        thin: "0 0 1px 0",
        "thin-purple": "0 0 1px 1px rgb(147, 51, 234)",
        "thin-puple-light": "0 0 2px 1px rgb(168, 86, 247)",
      },
    },
  },
  plugins: [],
};
