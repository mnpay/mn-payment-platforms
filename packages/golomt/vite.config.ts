import { createViteConfig } from '@packages/core/createViteConfig.mjs'

export default createViteConfig({
  build: {
    lib: {
      entry: 'index.ts',
      name: 'golomt',
      fileName: 'index',
    },
  },
})
