import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import { Web3Provider } from './web3/rainbowConfig';
import Footer from './components/Footer';
import { MockAppProvider } from './context/MockAppContext';

// Importar páginas
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Segmentos from './pages/Segmentos';
import Precios from './pages/Precios';
import Ayuda from './pages/Ayuda';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6',
    },
    secondary: {
      main: '#10B981',
    },
  },
});

const App: React.FC = () => {
  return (
    <Web3Provider>
      <MockAppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/segmentos" element={<Segmentos />} />
              <Route path="/precios" element={<Precios />} />
              <Route path="/ayuda" element={<Ayuda />} />
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
      </MockAppProvider>
    </Web3Provider>
  );
};

export default App;
