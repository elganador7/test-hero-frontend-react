export const config = {
  apiUrl: import.meta.env.PROD 
    ? import.meta.env.VITE_REACT_APP_BASE_URL 
    : import.meta.env.VITE_REACT_APP_BASE_URL_DEV,
  googleClientId: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
} as const; 