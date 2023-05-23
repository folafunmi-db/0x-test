/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
      },
      colors: {
        "th-background": "var(--background)",
        "th-background-secondary": "var(--background-secondary)",
        "th-foreground": "var(--foreground)",
        "th-accent-1": "var(--accent-1)",
        "th-accent-2": "var(--accent-2)",
        "th-accent-3": "var(--accent-3)",
        "th-accent-4": "var(--accent-4)",
        "th-accent-5": "var(--accent-5)",
        "th-accent-6": "var(--accent-6)",
        "th-accent-7": "var(--accent-7)",
        "th-accent-8": "var(--accent-8)",
        "th-accent-9": "var(--accent-9)",
        "th-accent-10": "var(--accent-10)",
        "th-accent-11": "var(--accent-11)",
        "th-accent-12": "var(--accent-12)",
        "th-orange-1": "var(--orange-1)",
        "th-orange-2": "var(--orange-2)",
        "th-orange-3": "var(--orange-3)",
        "th-orange-4": "var(--orange-4)",
        "th-orange-5": "var(--orange-5)",
        "th-yellow-1": "var(--yellow-1)",
        "th-yellow-2": "var(--yellow-2)",
        "th-green-1": "var(--green-1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
