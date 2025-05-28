import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'zvos-map-kit',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  plugins: [dts()],
  server: {
    open: '/demo/1_map_init.html',
    // open: '/demo/2_setCenter_setZoom.html',
    hmr: false // 禁用热模块替换
  }
})