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
				"bricn-100": "var(--bricn-100)",
				"bricn-200": "var(--bricn-200)",
				"bricn-300": "var(--bricn-300)",
				"bricn-400": "var(--bricn-400)",
				"bricn-500": "var(--bricn-500)",
                "bricn-600": "var(--bricn-600)",
			},
		},
	},
	plugins: [],
} satisfies Config;
