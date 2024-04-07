import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { externalizeDeps } from 'vite-plugin-externalize-deps'
import path from 'node:path'

export default defineConfig({
  plugins: [externalizeDeps(), tsconfigPaths()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'qpay',
      fileName: 'index',
    },
  },
})
