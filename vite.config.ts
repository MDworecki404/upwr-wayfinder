import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import cesium from 'vite-plugin-cesium';
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify(), cesium()],
})
