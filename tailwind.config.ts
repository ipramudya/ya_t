import type { Config } from "tailwindcss";

export default {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                "gradient-from": "rgba(31, 66, 71, 1)",
                "gradient-mid": "rgba(13, 29, 35, 1)",
                "gradient-to": "rgba(9, 20, 26, 1)"
            }
        }
    },
    plugins: []
} satisfies Config;
