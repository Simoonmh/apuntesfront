import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Upload from './Upload';
import ViewFile from './ViewFile';
import SideBar from './SideBar';
import BuscadorArchivos from './BuscadorArchivos';

const drawerWidth = 110; // Definimos el ancho del SideBar

function App() {
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      {location.pathname !== '/login' && <SideBar />}
      <div style={{ 
          flexGrow: 1, 
          marginLeft: location.pathname !== '/login' ? `${drawerWidth}px` : 0, 
          padding: '20px',
          width: `calc(80% - ${drawerWidth}px)`  // Ajustamos el tamaño del contenido principal
        }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/view/:id" element={<ViewFile />} />
          <Route path="/buscador_archivos" element={<BuscadorArchivos />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

