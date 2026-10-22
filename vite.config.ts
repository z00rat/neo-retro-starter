import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import { vite as vidstack } from 'vidstack/plugins';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vidstack(),
    enhancedImages(),
    tailwindcss(),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
      },
      adapter: adapter({ fallback: '404.html' }),
      preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx', '.md'] })],
      extensions: ['.svelte', '.svx', '.md'],
    }),
  ],
  server: { port: 12001, strictPort: true },
  build: {
    sourcemap: false,
    cssMinify: 'lightningcss',
    target: 'esnext',
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['@lucide/svelte', 'bits-ui', 'clsx', 'mode-watcher', 'tailwind-merge', 'tailwind-variants', 'vidstack'],
  },
});
