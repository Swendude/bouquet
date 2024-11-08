import type { Config } from "tailwindcss";
import * as colors from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class", // or 'class'
  theme: {
    fontFamily: {
      sans: ["'Fira sans'", "ui-sans"],
    },

    extend: {
      animation: {
        pop: "pop 0.4s ease-out both",
      },
      keyframes: {
        pop: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(-3deg)",
          },
          "75%": {
            transform: "rotate(3deg)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
