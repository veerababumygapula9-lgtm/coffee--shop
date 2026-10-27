/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"] },
      colors: {
        coffee: {
          DEFAULT: "#C67C4E", // primary
          light: "#EDD6C8",
          dark: "#313131",
          muted: "#E3E3E3",
          cream: "#F9F2ED",
          promo: "#977255",
        },
        surface: "#F9F9F9",
        danger: "#ED5151",
        success: "#36C07E",
        gold: "#FBBE21",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: "translateY(6px)" },
          to: { opacity: 1, transform: "none" },
        },
      },
      animation: {
        "fade-in": "fadeIn .25s ease-out",
      },
    },
  },
  plugins: [],
};
