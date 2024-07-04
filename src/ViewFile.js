import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Container, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import SideBar from './SideBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ImageWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  maxHeight: '80vh',
  overflowY: 'auto', // Permitir desplazamiento vertical
  width: '100%',
});

const StyledImage = styled('img')({
  width: 'auto',
  height: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});

function ViewFile() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fileResponse = await fetch(`http://localhost:5000/files/${id}`);
      const fileData = await fileResponse.json();
      setFile(fileData);

      const userId = localStorage.getItem('userId');
      const favoritesResponse = await fetch(`http://localhost:5000/users/${userId}/favorites`);
      const favoritesData = await favoritesResponse.json();
      const favoriteIds = favoritesData.files.map(fav => fav.id);
      setIsFavorite(favoriteIds.includes(parseInt(id, 10)));
    };

    fetchData();
  }, [id]);

  const toggleFavorite = async () => {
    const userId = localStorage.getItem('userId');
    const response = await fetch('http://localhost:5000/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, file_id: id }),
    });

    if (response.ok) {
      setIsFavorite(!isFavorite);
    }
  };

  if (!file) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <StyledContainer maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          {file.title}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          {file.course}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {file.description}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {file.keywords}
        </Typography>
        <Button variant="contained" color="primary" href={`http://localhost:5000/download/${file.filename}`} target="_blank" rel="noopener noreferrer">
          Descargar
        </Button>
        <IconButton onClick={toggleFavorite}>
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Box sx={{ mt: 4, width: '100%' }}>
          {file.file_type === 'png' || file.file_type === 'jpg' ? (
            <ImageWrapper>
              <StyledImage src={`http://localhost:5000/download/${file.filename}`} alt={file.title} />
            </ImageWrapper>
          ) : (
            <iframe src={`http://localhost:5000/download/${file.filename}`} width="100%" height="600px" style={{ border: 'none' }} title={file.title} />
          )}
        </Box>
      </StyledContainer>
    </Box>
  );
}

export default ViewFile;
