import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.cjs',
  platform: 'node',
  plugins: [nodeExternalsPlugin({ allowWorkspaces: true })],
  loader: {
    '.html': 'text',
  },
})
