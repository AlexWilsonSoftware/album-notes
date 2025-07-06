import type { Config } from "tailwindcss"

const config: Config = {
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)", // Tailwind will use your CSS variable
            },
        },
    },
    plugins: [],
};

export default config;