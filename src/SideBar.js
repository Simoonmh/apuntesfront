import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/CloudUpload';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/system';

const Sidebar = styled(Box)(({ theme }) => ({
  width: '95px',
  height: '100vh',
  backgroundColor: '#EDF5FF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  left: 0,
  top: 0,
  padding: '20px 0',
}));

const SidebarItemContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const SidebarItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  cursor: 'pointer',
  textAlign: 'center',
  padding: '20px 0',
});

const SidebarText = styled(Typography)({
  fontSize: '11px',
  textDecoration: 'none',
  color: '#000',
  textAlign: 'center',
});

const SideBar = () => (
  <Sidebar>
    <SidebarItemContainer>
      <SidebarItem>
        <IconButton component={Link} to="/home">
          <HomeIcon />
        </IconButton>
        <SidebarText component={Link} to="/">Inicio</SidebarText>
      </SidebarItem>
      <SidebarItem>
        <IconButton component={Link} to="/profile">
          <PersonIcon />
        </IconButton>
        <SidebarText component={Link} to="/profile">Perfil</SidebarText>
      </SidebarItem>
      <SidebarItem>
        <IconButton component={Link} to="/buscador_archivos">
          <SearchIcon />
        </IconButton>
        <SidebarText component={Link} to="/buscador_archivos">Buscador</SidebarText>
      </SidebarItem>
      <SidebarItem>
        <IconButton component={Link} to="/upload">
          <UploadIcon />
        </IconButton>
        <SidebarText component={Link} to="/upload">Subir</SidebarText>
      </SidebarItem>
    </SidebarItemContainer>
    <SidebarItem>
      <IconButton component={Link} to="/">
        <ExitToAppIcon />
      </IconButton>
      <SidebarText component={Link} to="/">Salir</SidebarText>
    </SidebarItem>
  </Sidebar>
);

export default SideBar;