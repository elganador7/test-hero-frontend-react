import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from './HomePage.module.scss';
import logo from '../assets/test-hero-logo.png';

// Custom MUI Theme
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogin = () => {
    navigate('/login');
  };

  const handlePractice = () => {
    navigate('/randomQuestion');
  };

  return (
      <div className={styles.container}>
        {/* Hero Section */}
        <Box className={styles.hero}>
          <Container>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} className={styles.heroText}>
                <Typography variant="h2" component="h1" color="primary" gutterBottom>
                  Empower Your Future
                </Typography>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  AI-powered standardized test preparation at a price attainable for all students.
                </Typography>
                <Box mt={3}>
                  {!isLoggedIn ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleLogin}
                    >
                      Get Started
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      onClick={handlePractice}
                    >
                      Start Practicing
                    </Button>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={styles.imageWrapper}>
                  <img
                    src={logo}
                    alt="Hero Illustration"
                    className={styles.heroImage}
                  />
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Mission Section */}
        <Container>
          <Card className={styles.missionCard}>
            <CardContent>
              <Typography variant="h4" component="h2" className={styles.missionTitle}>
                Our Mission
              </Typography>
              <Typography variant="body1" className={styles.missionText}>
                TestHero is dedicated to bridging the education gap by providing personalized and accessible test
                preparation solutions. Using cutting-edge AI, we help students tackle their weaknesses and build
                confidence for exams like the SAT and ACT.
              </Typography>
            </CardContent>
          </Card>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          className={styles.footer}
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={2}
          mt={5}
        >
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} TestHero. All Rights Reserved.
          </Typography>
        </Box>
      </div>
  );
};

export default HomePage;
