// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server", // Włączamy tryb SSR, aby middleware działało
});
