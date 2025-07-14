import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Divider,
  Link
} from '@mui/material';

const Cookies: React.FC = () => {
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
          Política de Cookies
        </Typography>
        
        <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 4, color: 'text.secondary' }}>
          Última actualización: {new Date().toLocaleDateString()}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>1. ¿Qué son las Cookies?</Typography>
          <Typography variant="body1" paragraph>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a mejorar tu experiencia de navegación y entender cómo interactúas con nuestro sitio.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>2. Tipos de Cookies que Utilizamos</Typography>
          <Typography variant="body1" paragraph>
            - Cookies esenciales: Necesarias para el funcionamiento básico del sitio
            - Cookies de rendimiento: Nos ayudan a analizar el uso del sitio
            - Cookies de funcionalidad: Mejoran la experiencia del usuario
            - Cookies de marketing: Para personalizar contenido y publicidad
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>3. Gestión de Cookies</Typography>
          <Typography variant="body1" paragraph>
            Puedes gestionar tus preferencias de cookies en cualquier momento:
            - Configuración de tu navegador
            - Herramientas de gestión de consentimiento
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>4. Cookies de Terceros</Typography>
          <Typography variant="body1" paragraph>
            Utilizamos servicios de terceros que también pueden establecer cookies, como:
            - Google Analytics
            - Plataformas de publicidad
            - Servicios de redes sociales
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>5. Actualizaciones de la Política</Typography>
          <Typography variant="body1" paragraph>
            Podemos actualizar esta política periódicamente. Te recomendamos revisar esta página regularmente.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Para más información, consulta nuestra <Link href="/privacidad">Política de Privacidad</Link> o contáctanos a cookies@mexxaflow.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default Cookies; 