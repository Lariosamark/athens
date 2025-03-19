import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();

  // Define features with paths
  const features = [
    { title: 'Manage Users', description: 'Approve, block, and manage users.', icon: '👥', path: '/manage-users' },
    { title: 'Manage Exams', description: 'Create and manage online exams.', icon: '📝', path: '/manage-exams' },
    { title: 'Review Results', description: 'View and analyze exam results.', icon: '📊', path: '/review-result'},
  ];

  // Handle click navigation
  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Home
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={3}
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { boxShadow: 6, transform: 'translateY(-5px)' },
                transition: 'all 0.3s',
              }}
              onClick={() => handleFeatureClick(feature.path)}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {feature.icon} {feature.title}
                </Typography>
                <Typography variant="body2">{feature.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminHome;
