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
import { useAuth } from "../../services/useAuth";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const { googleAuth, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await login(username, password);
      if (success) {
        setMessage("Login successful");
        navigate("/");
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const success = await googleAuth();
      if (success) {
        setMessage("Login successful");
        navigate("/");
      } else {
        setMessage("Google login failed");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      setMessage("Google login failed");
    }
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
            label="Email"
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

          <Button
            onClick={handleGoogleLogin}
            variant="contained"
            color="secondary"
            fullWidth
            className={styles.button}
            style={{ marginTop: "10px" }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
