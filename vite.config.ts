import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import cesium from 'vite-plugin-cesium';
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    cesium(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
      },
      manifest: {
        name: 'UPWr Wayfinder',
        short_name: 'Wayfinder',
        description: 'Aplikacja do nawigacji po kampusie Uniwersytetu Przyrodniczego we Wrocławiu.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'assets/logo_Upwr_wayfinder.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/logo_Upwr_wayfinder.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
