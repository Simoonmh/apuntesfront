import React, { useEffect, useState } from 'react';
import { Typography, Box, Container, TextField, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import SideBar from './SideBar';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
}));

const GridItem = styled(Paper)(({ theme }) => ({
  height: 140,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2),
  backgroundColor: '#E3F2FD',  // Color celeste claro similar al sidebar
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  height: '30px', // Ajustar la altura
  '& .MuiInputBase-root': {
    height: '40px', // Ajustar la altura del input
  },
  '& .MuiInputLabel-root': {
    lineHeight: '18px', // Ajustar la altura del label
  }
}));

function BuscadorArchivos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState([]);
  const [fileTypeFilter, setFileTypeFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/files')
      .then(response => response.json())
      .then(data => setFiles(data.files))
      .catch(error => console.error('Error fetching files:', error));
  }, []);

  const filteredFiles = files
    .filter(file =>
      (fileTypeFilter === '' || file.file_type === fileTypeFilter) &&
      (courseFilter === '' || file.course === courseFilter) &&
      (file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.keywords.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else if (sortOrder === 'desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <StyledContainer maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Buscar Archivos
        </Typography>
        <SearchBox>
          <TextField
            placeholder="Buscar archivos..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <SearchIcon />
        </SearchBox>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
        <StyledFormControl sx={{ width: '30%', mr: 2 }}>
            <InputLabel>Tipo de Archivo</InputLabel>
            <Select
              value={fileTypeFilter}
              onChange={(e) => setFileTypeFilter(e.target.value)}
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="jpg">JPG</MenuItem>
              <MenuItem value="ps">PS</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledFormControl sx={{ width: '30%', mr: 2 }}>
            <InputLabel>Ramo</InputLabel>
            <Select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="Diseño de Información">Diseño de Información</MenuItem>
              <MenuItem value="Taller de Diseño Industrial III">Taller de Diseño Industrial III</MenuItem>
              <MenuItem value="Taller Factoría">Taller Factoría</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledFormControl sx={{ width: '30%', mr: 2 }}>
            <InputLabel>Orden</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value=""><em>Por Defecto</em></MenuItem>
              <MenuItem value="asc">Ascendente</MenuItem>
              <MenuItem value="desc">Descendente</MenuItem>
            </Select>
          </StyledFormControl>
        </Box>
        <Grid container spacing={4}>
          {filteredFiles.map((file) => (
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

export default BuscadorArchivos;
