/// <reference types="vitest" />
import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
export default defineConfig({
  plugins: [vuePlugin(), vueJsx()],
  test: {
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
});
