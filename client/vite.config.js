import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({

  server: {
    proxy:  {
      '/api/v1':  {
      
        target: 'http://13.235.142.116:5200',  // Fixed the missing slash
        changeOrigin: true,  
        
      }
    }
  },

  plugins: [react()],

});


