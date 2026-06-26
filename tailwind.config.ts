import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#000000",
          900: "#050506",
          800: "#0a0a0c",
          700: "#101013",
          600: "#16161a",
        },
        silver: {
          50: "#f7f7f8",
          100: "#e9e9ec",
          200: "#d2d2d8",
          300: "#b4b4bd",
          400: "#909099",
          500: "#6f6f78",
          600: "#52525a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 22s linear infinite",
        marquee: "marquee 45s linear infinite",
        "marquee-reverse": "marquee-reverse 45s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      backgroundImage: {
        "silver-gradient":
          "linear-gradient(110deg, #8a8a92 0%, #ffffff 45%, #c8c8d0 60%, #6f6f78 100%)",
        "radial-glow":
          "radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
