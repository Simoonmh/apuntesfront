import React from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Upload from './Upload';
import ViewFile from './ViewFile';
import SideBar from './SideBar';
import BuscadorArchivos from './BuscadorArchivos';

const drawerWidth = 110; // Definimos el ancho del SideBar

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('userId');

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [isAuthenticated, location, navigate]);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div style={{ display: 'flex' }}>
        {location.pathname !== '/login' && location.pathname !== '/register' && <SideBar />}
        <div style={{ 
            flexGrow: 1, 
            marginLeft: location.pathname !== '/login' && location.pathname !== '/register' ? `${drawerWidth}px` : 0, 
            padding: '20px',
            width: location.pathname !== '/login' && location.pathname !== '/register' ? `calc(80% - ${drawerWidth}px)` : '100%'  // Ajustamos el tamaño del contenido principal
          }}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/login" />} />
            <Route path="/view/:id" element={isAuthenticated ? <ViewFile /> : <Navigate to="/login" />} />
            <Route path="/buscador_archivos" element={isAuthenticated ? <BuscadorArchivos /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
