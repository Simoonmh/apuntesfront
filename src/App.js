import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './Login';
import Home from './Home';
import Upload from './Upload';
import Profile from './Profile';
import BuscadorArchivos from './BuscadorArchivos';
import ViewFile from './ViewFile';
import SideBar from './SideBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="*"
              element={
                <>
                  <SideBar />
                  <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '95px' }}>
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/upload" element={<Upload />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/buscador_archivos" element={<BuscadorArchivos />} />
                      <Route path="/view/:id" element={<ViewFile />} />
                    </Routes>
                  </Box>
                </>
              }
            />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
