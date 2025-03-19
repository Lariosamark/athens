import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate();
  return (
    
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          width: 400,
          boxShadow: 3,
          borderRadius: 3,
          p: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1e3a8a' }}
          >
            Welcome to Your Dashboard!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              textAlign: 'center',
              color: '#6b7280',
            }}
          >
            Track your progress and manage your profile easily.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
  variant="contained"
  color="primary"
  size="large"
  sx={{
    textTransform: 'none',
    borderRadius: 2,
    px: 4,
    backgroundColor: '#1e3a8a',
    '&:hover': {
      backgroundColor: '#172554',
    },
  }}
  onClick={() => navigate('/User-Home')} // Navigate to user home
>
  Get Started
</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
