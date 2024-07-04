import React, { useState } from 'react';
import { Typography, Box, Container, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import SideBar from './SideBar';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [course, setCourse] = useState('');
  const [fileType, setFileType] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !title || !description || !keywords || !course || !fileType) {
      setMessage('Por favor, complete todos los campos.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', localStorage.getItem('userId'));
    formData.append('title', title);
    formData.append('description', description);
    formData.append('keywords', keywords);
    formData.append('course', course);
    formData.append('file_type', fileType);

    try {
      const response = await fetch('http://localhost:5000/files', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Archivo subido correctamente');
        setFile(null);
        setTitle('');
        setDescription('');
        setKeywords('');
        setCourse('');
        setFileType('');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <StyledContainer maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Subir Archivo
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField type="file" onChange={handleFileChange} />
          <TextField label="Título" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <TextField label="Descripción" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={4} />
          <TextField label="Palabras Clave" variant="outlined" value={keywords} onChange={(e) => setKeywords(e.target.value)} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Ramo</InputLabel>
            <Select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <MenuItem value="Diseño de Información">Diseño de Información</MenuItem>
              <MenuItem value="Taller de Diseño Industrial III">Taller de Diseño Industrial III</MenuItem>
              <MenuItem value="Taller Factoría">Taller Factoría</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Tipo de Archivo</InputLabel>
            <Select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="jpg">JPG</MenuItem>
              <MenuItem value="ps">PS</MenuItem>
            </Select>
          </FormControl>
          <StyledButton type="submit" variant="contained" color="primary">
            Subir
          </StyledButton>
        </Box>
        {message && (
          <Typography color="error" variant="body2" mt={2}>
            {message}
          </Typography>
        )}
      </StyledContainer>
    </Box>
  );
}

export default Upload;
