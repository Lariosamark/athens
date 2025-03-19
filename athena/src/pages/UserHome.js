import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/exams'); // Redirect to exams page
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome to the Online Exam System!
      </Typography>
      <Typography variant="body1" mb={4}>
        Prepare yourself by taking a variety of exams curated by the admin.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
    </Container>
  );
};

export default UserHome;
