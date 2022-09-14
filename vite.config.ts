import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
   resolve: {
      alias: {
         '~': path.resolve(__dirname, './src'),
      },
   },
   plugins: [
      react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
   ],
});
