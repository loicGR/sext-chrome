import { defineConfig } from 'vite';
import { resolve } from 'path';
import makeManifest from './scripts/make-manifest';
import WindiCSS from 'vite-plugin-windicss';
import vue from "@vitejs/plugin-vue";

const src = resolve(__dirname, 'src');
const assetsDir = resolve(src, 'assets');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

export default defineConfig({
  resolve: {
    alias: {
      '@src': src,
      '@assets': assetsDir,
    },
  },
  plugins: [makeManifest(), vue(), WindiCSS()],
  publicDir,
  build: {
    outDir,
    rollupOptions: {
      input: {
        content: resolve(src, 'content', 'index.ts'),
        background: resolve(src, 'background', 'index.ts'),
        popup: resolve(src, 'popup', 'index.html'),
        // newtab: resolve(src, 'newtab', 'index.html'),
        // devtools: resolve(src, 'devtools', 'index.html'),
        options: resolve(src, 'options', 'index.html'),
      },
      output: {
        entryFileNames: chunk => `src/${chunk.name}/index.js`,
      },
    },
  },
});
