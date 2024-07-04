import React, { useEffect, useState } from 'react';
import { Typography, Box, Container, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import SideBar from './SideBar';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const GridItem = styled(Paper)(({ theme }) => ({
  height: 140,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));

function Home() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const courses = [
    "Diseño de Información",
    "Taller de Diseño Industrial III",
    "Taller Factoría"
  ];

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    if (storedFirstName && storedLastName) {
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <StyledContainer maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Bienvenidos a la biblioteca colaborativa UDP
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center">
          {`Hola, ${firstName} ${lastName}`}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Explora categorías
        </Typography>
        <Grid container spacing={4}>
          {courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GridItem>
                <Typography variant="h6">{course}</Typography>
              </GridItem>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </Box>
  );
}

export default Home;
