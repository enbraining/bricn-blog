import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        icon: "var(--icon-color)",
        line: "var(--line-color)",
        secondary: "var(--secondary-color)",
        hover: "var(--hover-color)",
        selected: "var(--selected-color)",
        headerHover: "var(--header-hover-color)",
        header: "var(--header-color)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
