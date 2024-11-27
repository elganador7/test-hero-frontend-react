import React, { useState } from 'react';
import { loginUser } from '../../services/api';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await loginUser({ username, password });
      console.log(resp);
      setMessage('Login successful');

      // Redirect to the /questions page after successful login
      navigate('/');
    } catch {
      setMessage('Login failed');
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
                <Alert severity={message === 'Login successful' ? 'success' : 'error'} className={styles.alert}>
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

                <Button type="submit" variant="contained" fullWidth className={styles.button}>
                    Login
                </Button>
            </Box>
        </Container>
    </div>
  );
};

export default Login;
