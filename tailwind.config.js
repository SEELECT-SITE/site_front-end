/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "1/8": "12%",
      },
      rotate: {
        135: "135deg",
      },
      colors: {
        "cian-700": "#44c1ba",
        "cian-400": "#84d1cf",
        white: "#f4f4f4",
        "dark-cian": "#0f3849",
        dark: "#101120",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "cafe-txt": "var(--cafe-font)",
        "bebas-txt": "var(--bebas-font)",
      },
      dropShadow: {
        "icon-xl": "12px 12px 0px rgba(0, 0, 0, 0.25)",
        icon: "8px 8px 0px #000",
        "icon-sm": "4px 4px 0px rgba(0, 0, 0, 0.40)",
      },
      screens: {
        xs: "350px",
      }
    },
  },
  plugins: [],
};
