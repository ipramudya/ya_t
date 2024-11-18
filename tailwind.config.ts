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
                subtitle: "rgba(255, 255, 255, 0.52)"
            }
        }
    },
    plugins: []
} satisfies Config;
