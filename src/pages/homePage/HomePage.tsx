import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container, Grid, Button, Box, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from "./HomePage.module.scss";
import logo from "../../assets/test-hero-logo.png";
import darkLogo from "../../assets/test-hero-logo-dark.png";
import {useThemeStore } from "../../App";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import MissionStatement from "../../components/homePage/MissionStatement";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { mode } = useThemeStore();

  const handleLogin = () => {
    navigate("/login");
  };

  const handlePractice = () => {
    navigate("/randomQuestion");
  };

  const scrollToContent = () => {
    const missionSection = document.getElementById('mission-section');
    missionSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      {/* Hero Section - Full Viewport Height */}
      <Box className={styles.hero}>
        <Container maxWidth="lg" className={styles.heroContent}>
          <Grid 
            container 
            spacing={4} 
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={6} className={styles.heroText}>
              <Typography
                variant="h2"
                component="h1"
                color="primary"
                gutterBottom
              >
                Empower Your Future
              </Typography>
              <Typography 
                variant="h5" 
                color="textSecondary" 
                gutterBottom
                sx={{ mb: 4 }}
              >
                AI-powered standardized test preparation at a price attainable
                for all students.
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                {!isAuthenticated ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleLogin}
                    className={styles.primaryButton}
                  >
                    Get Started
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handlePractice}
                    className={styles.primaryButton}
                  >
                    Start Practicing
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={styles.imageWrapper}>
                <img
                  src={mode === "dark" ? darkLogo : logo}
                  alt="TestScoreHero Logo"
                  className={styles.heroImage}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
        
        {/* Scroll Indicator */}
        <IconButton 
          className={styles.scrollIndicator}
          onClick={scrollToContent}
          color="primary"
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Content Below */}
      <div id="mission-section">
        <MissionStatement />
      </div>

      {/* Footer */}
      <Box
        component="footer"
        className={styles.footer}
      >
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} TestScoreHero. All Rights Reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default HomePage;
