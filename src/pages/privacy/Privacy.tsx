import { Typography, useTheme, Container } from "@mui/material";
import { motion } from "framer-motion";
import "./Privacy.scss";
import { useThemeStore } from "../../App";

const sections = [
  {
    title: "TL;DR",
    content: [
      "We collect your email address and usage data to provide and improve our services.",
      "We do not sell or rent your personal information.",
      "We do not sell ads. We do not and will not sell your data.",
      "We may update this policy periodically.",
      "We will notify you of significant changes."
    ]
  },
  {
    title: "Information We Collect",
    content: [
      "Personal information you provide directly (name, email address, etc.)",
      "Information about your device and how you interact with our services",
      "Usage data and analytics to improve our services"
    ]
  },
  {
    title: "How We Use Your Information",
    content: [
      "To provide and maintain our services",
      "To develop new features and improve existing ones",
      "To communicate with you about our services",
      "To send updates and promotional materials (with your consent)"
    ]
  },
  {
    title: "Information Sharing",
    content: [
      "We do not sell or rent your personal information",
      "We may share information with trusted service providers",
      "Information is shared only with parties who agree to maintain confidentiality"
    ]
  },
  {
    title: "Data Security",
    content: [
      "Implementation of appropriate technical and organizational measures",
      "Protection against unauthorized access and processing",
      "Regular security assessments and updates"
    ]
  },
  {
    title: "Your Rights",
    content: [
      "Access your personal information",
      "Correct or update your information",
      "Request deletion of your information",
      "Object to or restrict certain processing",
      "Receive your information in a portable format"
    ]
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this policy periodically",
      "Changes will be posted on this page",
      "We will notify you of significant changes"
    ]
  },
];

export default function Privacy() {
  const { mode } = useThemeStore();
  const theme = useTheme();
  
  return (
    <div className={`privacy-container ${mode === 'dark' ? 'dark' : ''}`}>
      <Container maxWidth="md">
        <motion.div
          className="privacy-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            className="privacy-title"
            style={{ color: theme.palette.primary.main }}
          >
            Privacy Policy
          </Typography>
          <Typography 
            variant="subtitle1" 
            className="privacy-subtitle"
            color="text.secondary"
          >
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </motion.div>

        <div className="privacy-content">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="privacy-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Typography 
                variant="h5" 
                color="primary"
                className="section-title"
                gutterBottom
              >
                {section.title}
              </Typography>
              <ul className="section-content">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Typography 
                      variant="body1"
                      color="text.primary"
                      className="section-item"
                    >
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
} 