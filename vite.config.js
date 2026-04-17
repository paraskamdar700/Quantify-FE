import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url' // Import this to recreate __dirname

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      // Use the recreated __dirname here
      "react-is": path.resolve(__dirname, "node_modules/react-is/index.js"),
    },
  },

  optimizeDeps: {
    include: ['recharts'], 
  },
  
  build: {
    commonjsOptions: {
      include: [/recharts/, /react-is/],
    },
  },
  // server: {
  //     allowedHosts: ["speed-belief-successfully-undertaken.trycloudflare.com"],
  // }
})