/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 🌟 Double check this line captures .tsx files!
  ],
  theme: {
  extend: {
    keyframes: {
      move: {
        "0%": { transform: "translateX(-120%)" },
        "100%": { transform: "translateX(420%)" },
      },
    },
    animation: {
      move: "move 2.5s linear infinite",
    },
  },
},
  plugins: [],
}