/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "montserrat": ["Montserrat", "sans-serif"],
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2200px",
      },
      colors: {
        "blue": {
          "main": "#2B579A",
          "dark": "#173D77",
          "light": "#F5F9FF",
          "contrast": "#5E7ED3",
          "middle": "#97C3F9",
          "light-contrast": "#DFE9FD",
        },
        "gray": {
          DEFAULT: "#7D7D7D",
          100: "#E0E0E0",
          "border": "#EBEAED",
          "middle": "#575757",
        },
        dark: "#0F172A",
      },
      boxShadow: {
        "around": "0px 0px 15px 5px rgba(43,87,154,0.1);"
      },
      borderRadius: {
        "main": "60px", 
      }
    },
  },
  plugins: [],
}

