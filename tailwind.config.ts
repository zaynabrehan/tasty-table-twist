import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        border: "#FF6600",           // orange border
        input: "#FFA500",            // orange input
        ring: "#FF4500",             // reddish-orange focus ring
        background: "#1A1A1A",      // dark background
        foreground: "#FFFFFF",       // light text
        primary: {
          DEFAULT: "#FFA500",        // bright orange
          foreground: "#1A1A1A",
        },
        secondary: {
          DEFAULT: "#800000",        // blood red / maroon
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#8B0000",        // deeper blood red for errors
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#555555",
          foreground: "#CCCCCC",
        },
        accent: {
          DEFAULT: "#800000",        // blood red accent
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#2F2F2F",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#2A2A2A",
          foreground: "#FFFFFF",
        },
        orange: {
          DEFAULT: "#FFA500",
          light: "#FFB733",
          soft: "#FFD699",
        },
        red: {
          deep: "#800000",           // maroon
          dark: "#8B0000",           // dark blood red
        },
        cream: {
          DEFAULT: "#FFF5E6",
          muted: "#FFEEDD",
        },
        sidebar: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
          primary: "#FFA500",
          "primary-foreground": "#1A1A1A",
          accent: "#800000",
          "accent-foreground": "#FFFFFF",
          border: "#333333",
          ring: "#FF6600",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;