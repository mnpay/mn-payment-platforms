import { defineProject, mergeConfig } from 'vitest/config'
import { createViteConfig } from './createViteConfig.mjs'

/**
 * @param {import('vitest/config').UserConfig} options
 */
export const createVitestConfig = (options = {}) => {
  const config = createViteConfig(options)

  /** @type {import('vitest/config').UserProjectConfigExport} */
  const testConfig = {
    test: {
      globals: true,
      setupFiles: ['./test/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['html', 'json', 'lcov'],
      },
    },
  }

  return defineProject(mergeConfig(config, testConfig))
}
