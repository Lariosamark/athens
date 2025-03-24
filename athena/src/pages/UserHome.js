import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const navigate = useNavigate();

  // Navigate to exams page when "Get Started" is clicked
  const handleGetStarted = () => {
    navigate('/exams');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome to the Online Exam System!
      </Typography>
      <Typography variant="body1" mb={4}>
        Click below to get started with your exam.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default UserHome;
