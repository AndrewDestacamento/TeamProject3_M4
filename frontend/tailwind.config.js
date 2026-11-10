/** @type {import('tailwindcss').Config} */
// Colors come from CSS variables in src/index.css so light and dark mode share one set of names.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: v("canvas"), surface: v("surface"), sunken: v("sunken"), line: v("line"),
        ink: v("ink"), muted: v("muted"), faint: v("faint"),
        forest: v("forest"), "forest-soft": v("forest-soft"),
        marigold: v("marigold"), "marigold-soft": v("marigold-soft"),
        berry: v("berry"), "berry-soft": v("berry-soft"),
        sky: v("sky"),
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        sans: ['"Figtree Variable"', "system-ui", "sans-serif"],
      },
      borderRadius: { xl: "14px", "2xl": "20px", "3xl": "28px" },
      boxShadow: {
        lift: "0 1px 0 rgb(var(--line) / 1), 0 8px 24px -12px rgb(var(--shadow) / 0.35)",
      },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "none" } },
        pulseDot: { "0%,100%": { opacity: ".35" }, "50%": { opacity: "1" } },
      },
      animation: { rise: "rise .35s ease-out both", pulseDot: "pulseDot 1.2s ease-in-out infinite" },
    },
  },
  plugins: [],
};
