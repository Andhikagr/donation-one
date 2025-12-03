import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Semua dari node_modules masuk vendor
                    if (id.includes("node_modules")) {
                        // Pisahkan React & React DOM
                        if (id.includes("react") || id.includes("react-dom")) {
                            return "vendor-react";
                        }
                        // Pisahkan Motion / Framer Motion
                        if (id.includes("motion")) {
                            return "vendor-motion";
                        }
                        // Library lain dari node_modules
                        return "vendor";
                    }
                },
            },
        },
        chunkSizeWarningLimit: 600, // Optional: atur peringatan chunk besar
        sourcemap: true, // Optional: buat debugging lebih mudah
    },
});
