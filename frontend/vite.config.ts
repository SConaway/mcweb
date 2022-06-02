import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { ViteTips } from "vite-plugin-tips";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(), //
        // ViteTips(),
    ],
    server: {
        port: 4000,
        proxy: {
            "/list": "http://localhost:3000",
            "/send": "http://localhost:3000",
        },
    },
});
