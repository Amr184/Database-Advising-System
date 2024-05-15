/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			gridTemplateColumns: {
				// Simple 20 column grid
				20: "repeat(20, minmax(0, 1fr))",
			},
			colors: {
				danger: "#f04438",
				primary: {
					50: "#eff6ff",
					100: "#dbeafe",
					200: "#bfdbfe",
					300: "#93c5fd",
					400: "#60a5fa",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
					900: "#1e3a8a",
					950: "#172554",
				},
			},
			transitionDuration: {
				280: "280ms",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
