import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RandomQuestion from './components/questions/RandomQuestion';
import { MathJaxContext } from 'better-react-mathjax';
import HomePage from './pages/HomePage';
import { Header } from './components/header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PerformanceSummary from './components/performance/PerformanceSummary';
import AuthProvider from 'react-auth-kit';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import { refresh } from './services/refresh';

import createStore from 'react-auth-kit/createStore';

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0D3B66', // Muted Navy
      },
      secondary: {
        main: '#FAE1DD', // Soft Peach
      },
      background: {
        default: '#F9F9F9', // Off-White
      },
      text: {
        primary: '#2E2E2E', // Dark Gray
        secondary: '#6B6B6B', // Medium Gray
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
    cookieSecure: window.location.protocol === 'https:',
    refresh: refresh
  });
  
  return(
    <AuthProvider
      store={store}
    >
      <ThemeProvider theme={theme}>
        <MathJaxContext>
          <BrowserRouter>
            <Header/>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<AuthOutlet fallbackPath='/login' />}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/randomQuestion" element={<RandomQuestion />} />
                <Route path="/userPerformance" element={<PerformanceSummary />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MathJaxContext>
      </ThemeProvider>
    </AuthProvider>
  )
};

export default App;
