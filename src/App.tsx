import React from "react";
import { MathJaxContext } from "better-react-mathjax";
import { ThemeProvider, useMediaQuery, CssBaseline } from "@mui/material";
import AuthProvider from "react-auth-kit";
import { refresh } from "./services/refresh";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import createStore from "react-auth-kit/createStore";
import Router from "./router/Router";
import getTheme from "./theme/theme";
import { create } from 'zustand';

interface ThemeStore {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: 'light',
  toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
}));

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { mode, toggleMode } = useThemeStore();
  const theme = React.useMemo(() => getTheme(mode), [mode]);
  
  React.useEffect(() => {
    useThemeStore.setState({ mode: prefersDarkMode ? 'dark' : 'light' });
  }, [prefersDarkMode]);

  const store = createStore({
    authType: "localstorage",
    authName: "_auth",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
    refresh: refresh,
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MathJaxContext>
            <Router />
          </MathJaxContext>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
