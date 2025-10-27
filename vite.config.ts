import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "prompts",
          dest: "."
        }
      ]
    })
  ],
  build: {
    target: "node18",
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/mcp-entry.ts"),
      name: "mcp-generic-prompt",
      fileName: "mcp-entry",
      formats: ["cjs"],
    },
    rollupOptions: {
      external: [
        "fs",
        "fs/promises",
        "path",
        "url",
        "process",
        "stream",
        "util",
        "events",
        "@modelcontextprotocol/sdk/server/index.js",
        "@modelcontextprotocol/sdk/server/stdio.js",
        "@modelcontextprotocol/sdk/types.js",
        "mustache",
      ],
      output: {
        banner: "#!/usr/bin/env node",
        format: "cjs",
      },
    },
    minify: false,
    sourcemap: true,
  },

  server: {
    hmr: false, // Disable HMR for Node.js applications
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  define: {
    global: "globalThis",
  },
});
