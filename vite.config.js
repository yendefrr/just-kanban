import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [vue()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: "./index.js",
      name: "JustKanban",
      fileName: (format) => `just-kanban.${format}.js`,
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
