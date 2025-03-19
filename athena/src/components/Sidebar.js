import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define routes for active state
  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, route: '/dashboard' },
    { text: 'About', icon: <InfoIcon />, route: '/about' },
    { text: 'Manage Account', icon: <SettingsIcon />, route: '/settings' },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f4f6f8',
          color: '#1e293b',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Logo Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        my={2}
        sx={{

          py: 2,
        }}
      >
        <img
          src="/logo-icon.png" // Ensure correct path
          alt="Athena Logo"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            ml: 1,
            color: 'Black',
            fontWeight: 'bold',
          }}
        >
          Athena Institute
        </Typography>
      </Box>

      <Divider />

      {/* Sidebar Links */}
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              bgcolor: location.pathname === item.route ? '#e3f2fd' : 'transparent',
              '&:hover': { bgcolor: '#e3f2fd' },
            }}
          >
            <ListItemButton onClick={() => navigate(item.route)}>
              <ListItemIcon
                sx={{
                  color: location.pathname === item.route ? '#1e3a8a' : '#1e293b',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.route ? 'bold' : 'normal',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mt: 'auto' }} />
    </Drawer>
  );
};

export default Sidebar;
