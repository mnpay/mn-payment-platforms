interface ImportMetaEnv extends NodeJS.ProcessEnv {
  VITE_SANDBOX?: 'true'
  VITE_GOLOMT_ENDPOINT: string
  VITE_GOLOMT_SECRET: string
  VITE_GOLOMT_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
