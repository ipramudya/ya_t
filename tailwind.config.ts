import type { Config } from "tailwindcss";

export default {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    900: "rgba(9, 20, 26, 1)",
                    800: "rgba(14, 25, 31, 1)",
                    700: "rgba(22, 35, 41, 1)"
                },
                "gradient-from": "rgba(31, 66, 71, 1)",
                "gradient-mid": "rgba(13, 29, 35, 1)",
                "gradient-to": "rgba(9, 20, 26, 1)",
                subtitle: "rgba(255, 255, 255, 0.52)",
                "white-input": "rgba(255, 255, 255, 0.06)",
                "darken-input": "rgba(217, 217, 217, 0.06)",
                "input-border": "rgba(255, 255, 255, 0.22)",
                golden: "linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)"
            }
        }
    },
    plugins: []
} satisfies Config;
