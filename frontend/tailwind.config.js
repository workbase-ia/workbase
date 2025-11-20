export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern: /dark:/,
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
