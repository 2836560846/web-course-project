import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
// https://vitejs.dev/config/
export default defineConfig({

    plugins: [vue(), UnoCSS()],
    server: {
      port: 5174,
      proxy: {
        '/api': {
          target: 'https://www.zhihu.com',
          changeOrigin: true,
          // optional: strip the /api prefix if backend doesn't expect it
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {}
});