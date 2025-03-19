import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { auth, googleProvider, adminEmail } from '../lib/firebase/firebaseConfig';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if a user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Google Sign-In
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;

      if (userEmail === adminEmail) {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <Container>
      <Box mt={10} display="flex" justifyContent="center">
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', width: '400px' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the English Proficiency Online Exam System
          </Typography>

          {user ? (
            <>
              <Typography variant="body1" mb={2}>
                Signed in as: <strong>{user.email}</strong>
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                style={{ marginBottom: '10px' }}
              >
                Sign Out
              </Button>
              <Typography variant="body2" color="textSecondary">
                Click 'Sign Out' to log in with another account.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body1" mb={3}>
                Please sign in using your Google account to proceed.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Sign in with Google
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
