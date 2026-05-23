import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yuhangyang.site",
  output: "static",
  integrations: [sitemap()]
});
