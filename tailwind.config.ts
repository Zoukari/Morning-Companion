import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0b",
        bgElevated: "#141417",
        card: "#1b1b1f",
        ink: "#f3f2ee",
        inkDim: "#93938e",
        inkFaint: "#55555a",
        emerald: "#16A34A",
        gold: "#C8A75D",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        arabic: ["var(--font-amiri)", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
