import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container, Grid, Button, Box } from "@mui/material";
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

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <Box className={styles.hero}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} className={styles.heroText}>
              <Typography
                variant="h2"
                component="h1"
                color="primary"
                gutterBottom
              >
                Empower Your Future
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                AI-powered standardized test preparation at a price attainable
                for all students.
              </Typography>
              <Box mt={3}>
                {!isAuthenticated ? (
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
                  src={mode === "dark" ? darkLogo : logo}
                  alt="TestHero Logo"
                  className={styles.heroImage}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <MissionStatement />

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
