/** @type {import('tailwindcss').Config} */
import colors  from 'tailwindcss/colors'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Poppins: ['Poppins', "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px"
      },

    },
    colors: {
      ...colors,
      vintage: {
        primary: "#fa991c",
        light: "#1c768f",
        neutral: "#ccc",
        background: "#fbf3f2",
        dark: "#032539",
        white: "#fff",
        black: "#141414"
      }
    }
  },
  plugins: [],
}

