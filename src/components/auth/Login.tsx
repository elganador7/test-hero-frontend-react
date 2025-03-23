import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../services/useAuth";
import { config } from '../../config/env';

const Login: React.FC<{ returnTo: string }> = ({ returnTo }) => {
  console.log('Login component returnTo:', returnTo);
  
  const { googleAuth, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      setMessage("Login successful");
      navigate(returnTo);
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Login failed");
    }
  };

  const handleSuccess = async (response: any) => {
    try {
      const success = await googleAuth(response);
      if (success) {
        setMessage("Login successful");
        navigate(returnTo);
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      console.error("Google authentication failed:", error);
      setMessage("Login failed");
    }
  };

  const handleError = () => {
    setMessage("Login failed");
  };

  return (
    <div className={styles.centerWrapper}>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleLogin}
          className={styles.container}
        >
          <Typography variant="h4" className={styles.title}>
            Login
          </Typography>

          {message && (
            <Alert
              severity={message === "Login successful" ? "success" : "error"}
              className={styles.alert}
            >
              {message}
            </Alert>
          )}

          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={styles.button}
          >
            Login
          </Button>
          <GoogleOAuthProvider
            clientId={config.googleClientId}
          >
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </GoogleOAuthProvider>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
