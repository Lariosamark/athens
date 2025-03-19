import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/dashboard');
  };

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h4" gutterBottom>
            About English Proficiency Online Exam System
          </Typography>
          <Typography variant="body1" paragraph>
            The <strong>English Proficiency Online Exam System</strong> is a comprehensive platform designed to assess and enhance the English language skills of users through a streamlined and secure online environment.
          </Typography>
          <Typography variant="body1" paragraph>
            This system evaluates various aspects of English proficiency, including:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Reading Comprehension</Typography>
            </li>
            <li>
              <Typography variant="body1">Listening Skills</Typography>
            </li>
            <li>
              <Typography variant="body1">Grammar and Vocabulary</Typography>
            </li>
            <li>
              <Typography variant="body1">Writing Ability</Typography>
            </li>
          </ul>
          <Typography variant="body1" paragraph>
            Our platform is designed to ensure accurate evaluation with real-time scoring and personalized feedback to help users identify their strengths and areas for improvement.
          </Typography>
          <Typography variant="body1" paragraph>
            With an intuitive interface and seamless user experience, the English Proficiency Online Exam System aims to provide a reliable and efficient solution for learners, educators, and institutions.
          </Typography>

          {/* Return Button */}
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleReturn}
            >
              Return to Dashboard
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
