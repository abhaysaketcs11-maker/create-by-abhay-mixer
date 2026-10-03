import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'disable-vite-hmr-ws-client',
        transform(code, id) {
          if (id.includes('vite/dist/client/client.mjs')) {
            return code.replace(
              'transport.connect(createHMRHandler(handleMessage));',
              '/* HMR WebSocket disabled in AI Studio preview */'
            );
          }
          return null;
        },
      },
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio.
      hmr: false,
      watch: null,
    },
  };
});
