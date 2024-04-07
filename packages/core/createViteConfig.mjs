import { mergeConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { externalizeDeps } from 'vite-plugin-externalize-deps'

/**
 * @param {import('vite').UserConfig} options
 * @returns
 */
export const createViteConfig = (options = {}) => {
  const config = mergeConfig(
    {
      plugins: [externalizeDeps(), tsconfigPaths()],
    },
    options,
  )

  return config
}
