import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['html', 'json', 'lcov'],
    },
    setupFiles: ['./test/setup.ts'],
  },
})
