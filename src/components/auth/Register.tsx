import React, { useState } from "react";
import { registerUser } from "../../services/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  // Initialize useNavigate
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ username, password });
      setMessage("Registration successful");

      // Redirect to the /login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Registration failed");
    }
  };

  return (
    <div className={styles.centerWrapper}>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleRegister}
          className={styles.container}
        >
          <Typography variant="h4" className={styles.title}>
            Register
          </Typography>

          {message && (
            <Alert
              severity={
                message === "Registration successful" ? "success" : "error"
              }
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
            className={styles.inputField}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            className={styles.inputField}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={styles.button}
          >
            Register
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
