import { defineProject, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineProject(
  mergeConfig(viteConfig, {
    test: {
      globals: true,
      setupFilesAfterEnv: ['./test/setup.ts'],
    },
  }),
)
