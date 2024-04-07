interface ImportMetaEnv extends NodeJS.ProcessEnv {
  VITE_SANDBOX?: 'true'
  VITE_BASE_URL?: string
  VITE_USERNAME?: string
  VITE_PASSWORD?: string
  VITE_INVOICE_CODE?: string
  VITE_MERCHANT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
