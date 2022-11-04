import { defineConfig } from 'vite';
import { resolve } from 'path';
import makeManifest from './scripts/make-manifest';
import vuePlugin from '@vitejs/plugin-vue2';

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
  plugins: [makeManifest(), vuePlugin()],
  publicDir,
  build: {
    outDir,
    rollupOptions: {
      input: {
        sidebar: resolve(src, 'sidebar', 'index.html'),
        content: resolve(src, 'content', 'index.ts'),
        background: resolve(src, 'background', 'index.ts'),
        options: resolve(src, 'options', 'index.html'),
        storage: resolve(src, 'utils', 'storage.utils.ts')
      },
      output: {
        entryFileNames: chunk => `src/${chunk.name}/index.js`,
      },
    },
  },
});
