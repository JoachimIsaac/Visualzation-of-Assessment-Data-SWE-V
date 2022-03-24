import { defineConfig } from 'vite'
    
    export default defineConfig({
      server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  },
      css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
            },
        },
    }
})