import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Divider 
} from '@mui/material';

const Terminos: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 900, 
            textAlign: 'center',
            background: 'linear-gradient(90deg, #3B82F6, #10B981)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}
        >
          Términos de Servicio
        </Typography>
        
        <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 4, color: 'text.secondary' }}>
          Última actualización: {new Date().toLocaleDateString()}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>1. Aceptación de Términos</Typography>
          <Typography variant="body1" paragraph>
            Al acceder y utilizar los servicios de MexxaFlow, aceptas cumplir y estar sujeto a estos Términos de Servicio.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>2. Descripción del Servicio</Typography>
          <Typography variant="body1" paragraph>
            MexxaFlow es una plataforma de pagos instantáneos para trabajadores independientes, que utiliza tecnología blockchain para facilitar transacciones seguras y rápidas.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>3. Uso del Servicio</Typography>
          <Typography variant="body1" paragraph>
            3.1 Debes ser mayor de edad y cumplir con los requisitos legales para utilizar nuestra plataforma.
            3.2 Te comprometes a proporcionar información precisa y actualizada.
            3.3 Prohíbese cualquier uso fraudulento o ilegal de la plataforma.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>4. Responsabilidad</Typography>
          <Typography variant="body1" paragraph>
            MexxaFlow no se hace responsable de pérdidas o daños derivados del uso de la plataforma más allá de lo establecido por la legislación vigente.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>5. Modificaciones</Typography>
          <Typography variant="body1" paragraph>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Si tienes alguna duda, por favor contáctanos a legal@mexxaflow.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default Terminos; 