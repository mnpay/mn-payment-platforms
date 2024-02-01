import esbuild, { type BuildOptions } from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import lodash from 'lodash'

export const build = async (options?: BuildOptions) => {
  await esbuild.build(
    lodash.merge<BuildOptions, BuildOptions | undefined>(
      {
        entryPoints: ['./index.ts'],
        bundle: true,
        outdir: 'dist',
        outExtension: { '.js': '.mjs' },
        platform: 'node',
        format: 'esm',
        plugins: [nodeExternalsPlugin({ allowWorkspaces: true })],
      },
      options,
    ),
  )

  // eslint-disable-next-line no-console
  console.log('Built dist/index.cjs')
}
