import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@locales": resolve(__dirname, "src/i18n/locales").replace(/\\/g, "/"),
    },
  },
});
