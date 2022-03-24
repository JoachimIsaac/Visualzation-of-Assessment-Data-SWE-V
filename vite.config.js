import { defineConfig } from 'vite'
    
    export default defineConfig({
      server: {
    host: '0.0.0.0',
    hmr: {

      hostname:"localhost"
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