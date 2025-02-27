// Mock Vite's import.meta.env
const env = {
  VITE_REACT_APP_BASE_URL: 'http://test-api.example.com/api',
  VITE_REACT_APP_BASE_URL_DEV: 'http://localhost:8080/api',
  PROD: false,
  DEV: true,
};

// @ts-ignore - add env to global import.meta
if (!global.import) {
  (global as any).import = { meta: { env } };
} 