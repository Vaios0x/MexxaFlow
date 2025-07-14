import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center'
    }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" color="primary" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Página no encontrada
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </Typography>
      </Box>
      <Box>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/" 
          sx={{ mr: 2 }}
        >
          Ir al Inicio
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          component={Link} 
          to="/ayuda"
        >
          Ayuda
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound; 