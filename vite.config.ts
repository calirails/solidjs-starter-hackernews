import solid from "solid-start/vite";
import { defineConfig } from "vite";
import vercel from "solid-start-vercel";

export default defineConfig({
  // NOTE!: Vercel project must have a custom "Build Output" set to "dist"
  // and in addition requires this "deployment adapter" that is outlined
  // in greater detail here: https://github.com/solidjs/solid-start/issues/591
  plugins: [solid({ adapter: vercel({ edge: true }) })],
});
