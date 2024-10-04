import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({

  server: {
    proxy: "http://13.235.142.116:5200"
  },

  plugins: [react()],

});


