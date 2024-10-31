import type { Config } from "tailwindcss";
import * as colors from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class", // or 'class'
  theme: {
    fontFamily: {
      sans: ["'Fira Mono'", "ui-monospace"],
    },

    extend: {},
  },
  plugins: [],
} satisfies Config;
