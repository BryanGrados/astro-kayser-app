import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), partytown(), tailwind()]
});