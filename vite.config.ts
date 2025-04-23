import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// @ts-expect-error vite-plugin-eslint is not typed
import eslint from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/**/*.tsx'],
      cache: false,
    }),
    checker({
      vueTsc: true,
    }),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      include: ['lib'],
    }),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
