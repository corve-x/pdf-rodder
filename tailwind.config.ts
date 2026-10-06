import type { Config } from "tailwindcss";

//this is the website theme and the color accents used to design and build.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: { DEFAULT: "#111111", alt: "#141414" },
        surface: { DEFAULT: "#1B1B1B", raised: "#202020", hover: "#242424" },
        border: { DEFAULT: "#303030", strong: "#363636" },
        text: { DEFAULT: "#EDEDED", secondary: "#A3A3A3", muted: "#8A8A8A" },
        red: { DEFAULT: "#C0392B", hover: "#CC4636" },
        orange: "#D97732",
        yellow: "#D4A72C",
        success: "#4E9F6E",
        danger: "#E5776B", // readable red for text on dark surfaces
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: { control: "6px", card: "10px" },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: { "fade-in": "fade-in 0.2s ease-out" },
    },
  },
  plugins: [],
} satisfies Config;
