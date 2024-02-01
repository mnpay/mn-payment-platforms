interface ImportMetaEnv extends NodeJS.ProcessEnv {
  VITE_HIPAY_ENTITY_ID: string
  VITE_HIPAY_CLIENT_SECRET: string
  VITE_HIPAY_AUTH_CODE: string
  VITE_HIPAY_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
