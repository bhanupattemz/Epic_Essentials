import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This handles routing in development when refreshing non-root routes
    historyApiFallback: true,
  },
})



// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import fs from 'fs';
// import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
//       cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
//     },
//     port: 5173,
//   },
// });
