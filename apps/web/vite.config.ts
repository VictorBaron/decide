import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin({
      // Good dev DX: readable classnames in dev
      identifiers: "debug",
    }),
    svgr({
      include: "./src/mimir/icons/**/*.svg?react",
      svgrOptions: {
        svgProps: {
          width: "20px",
          height: "20px",
        },
        replaceAttrValues: {
          "#344054": "currentColor",
        },
      },
    }),
  ],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
