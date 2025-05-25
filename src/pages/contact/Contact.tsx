import React, { useState } from "react";
import { 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme
} from "@mui/material";
import { motion } from "framer-motion";
import "./Contact.scss";

const AUTO_HIDE_DURATION = 6000;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    severity: 'success' | 'error' | 'info';
  } | null>(null);

  const theme = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult({ message: "Sending...", severity: 'info' });

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "26a4d20f-d5f2-4d70-8c90-f5e0ab5c7ce6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult({ 
          message: "Message sent successfully!", 
          severity: 'success' 
        });
        (event.target as HTMLFormElement).reset();
      } else {
        setResult({ 
          message: data.message || "Something went wrong", 
          severity: 'error' 
        });
      }
    } catch (error) {
      setResult({ 
        message: "Failed to send message. Please try again.", 
        severity: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <motion.h1
        className="contact-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.palette.primary.main }}
      >
        Contact Us
      </motion.h1>

      <Container className="contact-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper className="contact-card" elevation={3}>
            <Typography variant="h4" color="primary" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" paragraph>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Typography>
            
            <form onSubmit={handleSubmit}>
              {/* Honeypot field */}
              <input
                type="text"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              <TextField
                fullWidth
                label="Name"
                name="name"
                margin="normal"
                required
                disabled={isSubmitting}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                margin="normal"
                required
                disabled={isSubmitting}
              />
              <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  margin="normal"
                  multiline
                  rows={4}
                  required
                  disabled={isSubmitting}
              />
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
                <Button 
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>

      <Snackbar
        open={!!result}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={() => setResult(null)}
      >
        <Alert 
          onClose={() => setResult(null)} 
          severity={result?.severity || 'info'}
          sx={{ width: '100%' }}
        >
          {result?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Contact;