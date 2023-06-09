import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from 'vite-plugin-eslint';
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: true },
  plugins: [
    vue(),
    eslintPlugin(),
    VitePWA({
      devOptions: {
        enabled: false,
      },
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "masked-icon.svg",
        "images/festival-header.png",
        "images/paaspop-header.png",
        "images/lowlands-header.png",
        "images/dtrh-header.png",
        "images/pinkpop-header.png",
        "images/lowlands-logo.png",
        "images/paaspop-logo.png",
        "images/festival-logo.png",
        "images/pinkpop-logo.png",
        "images/dtrh-logo.png",
        "fonts/festival.ttf",
        "fonts/paaspop.ttf",
        "fonts/lowlands.ttf",
        "fonts/pinkpop.ttf",
        "fonts/dtrh.ttf",
      ],
      manifest: {
        name: "Festival Bingo App",
        short_name: "Festival Bingo",
        description: "Speel bingo op een festival",
        theme_color: "#D3D3D3",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
