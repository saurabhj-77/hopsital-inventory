import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/Auth';
import lawLogo from "../../assets/img/lawLogo.jpeg";
import hospitalInventory from '../../assets/img/hospitalInventory.png';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = auth.login(formData.email, formData.password);

    if (result.success) {
      navigate(result.user.role === 'lawyer' ? '/lawyer' : '/client');
    } else {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 6,
            width: '100%',
            borderRadius: 3,
          }}
        >
          {/* Logo + Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              src={hospitalInventory}
              alt="Law Logo"
              sx={{
                width: '200px',
                height: '180px',
                mb: 2,
                mx: 'auto',
                backgroundColor: 'transparent',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                '& img': {
                  mixBlendMode: 'multiply', // hides white pixels
                  filter: 'contrast(1.1) brightness(1.05)',
                },
              }}
            />

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ color: 'primary.main', fontWeight: 600 }}
            >
             Hospital Inventory
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Sign in to your account
            </Typography>
          </Box>

          {/* Error */}
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              Sign In
            </Button>
          </Box>

          {/* Demo Credentials */}
          <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              Demo Credentials:
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             John@gmail.com / password123
            </Typography>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Client: alice@gmail.com / password123
            </Typography> */}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
