import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  maxWidth: '400px',
  width: '100%',
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        console.log('User authenticated:', data);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('firstName', data.first_name);
        localStorage.setItem('lastName', data.last_name);
        navigate('/');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('There was an error!', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledPaper elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ingresa a Apuntes de diseño UDP
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            label="Correo"
            fullWidth
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <StyledButton type="submit" variant="contained" color="primary">
            Login
          </StyledButton>
        </StyledForm>
        <Typography variant="body2" mt={2}>
          Aun no tienes cuenta? <a href="/register">Registrarse</a>
        </Typography>
        {message && (
          <Typography color="error" variant="body2" mt={2}>
            {message}
          </Typography>
        )}
      </StyledPaper>
    </StyledContainer>
  );
}

export default Login;
