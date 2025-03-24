import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
      <Card
        sx={{
          width: 400,
          boxShadow: 5,
          borderRadius: 4,
          p: 3,
          backgroundColor: '#ffffff',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)', // Slight zoom effect on hover
          },
        }}
      >
        <CardContent>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img
              src="logo-icon.png" // Replace with your logo path
              alt="Logo"
              style={{ width: '100px', height: 'auto' }} // Adjust size as needed
            />
          </Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#0d47a1', // Darker blue for better contrast
            }}
          >
            Welcome to Your Dashboard!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              textAlign: 'center',
              color: '#546e7a', // Muted text color
              lineHeight: 1.5,
            }}
          >
            Track your progress and manage your profile easily. Let's get started!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textTransform: 'none',
                borderRadius: 3,
                px: 5,
                backgroundColor: '#1976d2', // Primary color
                '&:hover': {
                  backgroundColor: '#1565c0', // Darker shade on hover
                },
                boxShadow: 2,
              }}
              onClick={() => navigate('/User-Home')} // Navigate to user home
            >
              Get Started
            </Button>
          </Box>
        </CardContent>
      </Card>
  );
};

export default Dashboard;