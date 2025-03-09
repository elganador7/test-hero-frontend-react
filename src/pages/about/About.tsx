import { Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import "./About.scss";
import {useThemeStore } from "../../App";


const sections = [
  {
    title: "Our Mission",
    content:
      "We believe high-quality test preparation should be accessible to all students, regardless of their background. Our mission is to harness AI to create personalized, adaptive study experiences that empower students to succeed.",
  },
  {
    title: "Our Philosophy",
    content:
      "Learning isn't one-size-fits-all. True mastery comes from identifying weaknesses and adapting in real time. We prioritize accessibility, efficiency, and smart learning strategies.",
  },
  {
    title: "Our Approach",
    content:
      "By combining generative AI with proven educational strategies, we provide students with personalized practice questions, real-time feedback, and an intuitive learning experience.",
  },
];

export default function About() {
  const { mode } = useThemeStore();
  const theme = useTheme();
  
  return (
    <div className={`about-container ${mode === 'dark' ? 'dark' : ''}`}>
      <motion.h1
        className="about-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.palette.primary.main }}
      >
        About Us
      </motion.h1>
      <div className="about-grid">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="about-card" elevation={3}>
              <CardHeader
                title={
                  <Typography 
                    variant="h4" 
                    color="primary.main"
                  >
                    {section.title}
                  </Typography>
                }
              />
              <CardContent>
                <Typography 
                  variant="body2"
                  color="text.primary"
                >
                  {section.content}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}