import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import glsl from "vite-plugin-glsl";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    glsl(),
  ],
  server: {
    host: true,
    port: 1993,
    origin: "http://localhost:1993",
  },
});
