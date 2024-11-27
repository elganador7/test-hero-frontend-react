import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RandomQuestion from './components/questions/RandomQuestion';
import { MathJaxContext } from 'better-react-mathjax';
import HomePage from './pages/HomePage';
import { Header } from './components/header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
  
  return(
    <ThemeProvider theme={theme}>
      <MathJaxContext>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/randomQuestion" element={<RandomQuestion />} />
          </Routes>
        </Router>
      </MathJaxContext>
    </ThemeProvider>
  )
};

export default App;
