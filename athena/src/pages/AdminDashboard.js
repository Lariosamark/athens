import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { auth } from '../lib/firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1e3a8a',
            color: '#fff',
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          my={3}
        >
          {/* Logo and Title */}
          <Avatar
            src="/logo-icon.png"
            alt="Athena Logo"
            sx={{ width: 60, height: 60, mb: 1 }}
          />
          <Typography variant="h6" fontWeight="bold" color="white">
            Athena Institute
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#3b82f6' }} />

        {/* Sidebar Menu */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admin-home')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Admin Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/manage-users')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/manage-exams')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Exams" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>


        {/* Content Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome to the Admin Dashboard!
          </Typography>
          <Typography variant="body1" mb={2}>
            Manage users, review exam submissions, and update system settings.
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
      </Box>
    
  );
};

export default AdminDashboard;
