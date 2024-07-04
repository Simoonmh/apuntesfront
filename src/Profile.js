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

function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [files, setFiles] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    const userId = localStorage.getItem('userId');

    if (storedFirstName && storedLastName) {
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }

    fetch(`http://localhost:5000/users/${userId}/files`)
      .then(response => response.json())
      .then(data => setFiles(data.files))
      .catch(error => console.error('Error fetching user files:', error));

    fetch(`http://localhost:5000/users/${userId}/favorites`)
      .then(response => response.json())
      .then(data => setFavorites(data.files))
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <StyledContainer maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Perfil
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Archivos Subidos
        </Typography>
        <Grid container spacing={4}>
          {files.map((file) => (
            <Grid item xs={12} sm={6} md={4} key={file.id}>
              <GridItem>
                <Typography variant="h6">{file.title}</Typography>
                <Typography variant="body2">{file.description}</Typography>
                <Button variant="contained" color="primary" href={`/view/${file.id}`}>
                  Ver
                </Button>
              </GridItem>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Archivos Favoritos
        </Typography>
        <Grid container spacing={4}>
          {favorites.map((file) => (
            <Grid item xs={12} sm={6} md={4} key={file.id}>
              <GridItem>
                <Typography variant="h6">{file.title}</Typography>
                <Typography variant="body2">{file.description}</Typography>
                <Button variant="contained" color="primary" href={`/view/${file.id}`}>
                  Ver
                </Button>
              </GridItem>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </Box>
  );
}

export default Profile;
