/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_BASE_URL: string
  readonly VITE_REACT_APP_BASE_URL_DEV: string
  readonly VITE_REACT_APP_GOOGLE_CLIENT_ID: string
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 