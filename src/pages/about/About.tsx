import React from "react";
import { Box, Paper, Typography, Container } from "@mui/material";
import "./About.scss"; // Import the SCSS file

const About: React.FC = () => {
  return (
    <Container className="about-page">
      <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
        About Us
      </Typography>
      <Typography sx={{ mb: 4 }}>
        We are dedicated to providing the best experience.
      </Typography>
      
      <Paper elevation={3} sx={{ mb: 4, p: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Our Mission
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam 
          innovatis technologiae et excellentiae dedicati sumus. Proin 
          digital solutions vehicula tortor id maximus. Sed efficiency 
          et quality sunt nostri propositi fundamentales.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ mb: 4, p: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Our Expertise
        </Typography>
        <Typography>
          Vestibulum ante ipsum primis in development et implementation 
          faucibus orci luctus; Fusce customer satisfaction nec tellus 
          consequat innovative. Integer cutting-edge solutions nec elit 
          professional services gravida auctor.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ mb: 4, p: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Our Commitment
        </Typography>
        <Typography>
          Maecenas partnership et collaboration vel nisi excellence in 
          delivery. Cras reliable solutions ac libero sustainable growth 
          vitae client success ullamcorper. Donec continuous improvement 
          sit amet felis strategic planning hendrerit.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;