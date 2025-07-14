import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Divider 
} from '@mui/material';

const Privacidad: React.FC = () => {
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
          Política de Privacidad
        </Typography>
        
        <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 4, color: 'text.secondary' }}>
          Última actualización: {new Date().toLocaleDateString()}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>1. Información que Recopilamos</Typography>
          <Typography variant="body1" paragraph>
            Recopilamos información personal necesaria para proporcionar y mejorar nuestros servicios, incluyendo:
            - Datos de contacto
            - Información de identificación
            - Datos de transacciones
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>2. Uso de la Información</Typography>
          <Typography variant="body1" paragraph>
            Utilizamos tu información para:
            - Procesar pagos
            - Comunicarnos contigo
            - Mejorar nuestros servicios
            - Cumplir obligaciones legales
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>3. Protección de Datos</Typography>
          <Typography variant="body1" paragraph>
            Implementamos medidas de seguridad avanzadas para proteger tu información personal, incluyendo:
            - Encriptación de datos
            - Almacenamiento seguro
            - Acceso restringido
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>4. Compartir Información</Typography>
          <Typography variant="body1" paragraph>
            No vendemos ni compartimos tu información personal con terceros sin tu consentimiento, excepto cuando sea necesario para prestar nuestros servicios.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>5. Tus Derechos</Typography>
          <Typography variant="body1" paragraph>
            Tienes derecho a:
            - Acceder a tu información personal
            - Solicitar corrección de datos
            - Solicitar eliminación de datos
            - Oponerte al tratamiento de tus datos
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Si tienes preguntas sobre nuestra política de privacidad, contáctanos a privacidad@mexxaflow.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default Privacidad; 