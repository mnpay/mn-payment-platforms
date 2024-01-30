import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['html', 'json', 'lcov'],
    },
    setupFiles: ['./test/setup.ts'],
  },
})
