import React from "react";
import { MathJaxContext } from "better-react-mathjax";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthProvider from "react-auth-kit";
import { refresh } from "./services/refresh";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import createStore from "react-auth-kit/createStore";
import Router from "./router/Router";

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0D3B66", // Muted Navy
      },
      secondary: {
        main: "#FAE1DD", // Soft Peach
      },
      background: {
        default: "#F9F9F9", // Off-White
      },
      text: {
        primary: "#2E2E2E", // Dark Gray
        secondary: "#6B6B6B", // Medium Gray
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
    },
  });

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
          <MathJaxContext>
            <Router />
          </MathJaxContext>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
