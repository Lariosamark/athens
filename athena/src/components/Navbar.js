import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { auth } from '../lib/firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          English Proficiency System
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
