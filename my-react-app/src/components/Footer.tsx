import React from 'react';
import { Box, Typography, Grid, Link, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1E1E1E 0%, #121212 100%)',
        color: 'white',
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Grid container spacing={{ xs: 3, md: 4 }} direction={{ xs: 'column', md: 'row' }}>
            {/* Logo y descripción */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '1.5rem', md: '1.875rem' }
                  }}
                >
                  MexxaFlow
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9, 
                    mb: { xs: 3, md: 4 },
                    fontSize: { xs: '1rem', md: '0.875rem' }, // Cambiado de 0.875rem a 1rem en mobile
                    lineHeight: 1.6
                  }}
                >
                  Plataforma de pagos instantáneos, seguros y sin fronteras para trabajadores independientes en Latinoamérica.
                </Typography>
              </Box>
            </Grid>

            {/* Enlaces rápidos */}
            <Grid item xs={12} md={2}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: { xs: 2, md: 3 }, 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.125rem', md: '1.25rem' }
                }}
              >
                Producto
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 2 } }}>
                <Link href="/segmentos" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  Segmentos
                </Link>
                <Link href="/precios" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  Precios
                </Link>
                <Link href="/dashboard" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  Dashboard
                </Link>
              </Box>
            </Grid>

            {/* Soporte */}
            <Grid item xs={12} md={2}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: { xs: 2, md: 3 }, 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.125rem', md: '1.25rem' }
                }}
              >
                Soporte
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 2 } }}>
                <Link href="/ayuda" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  Centro de Ayuda
                </Link>
                <Link href="/contacto" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  Contacto
                </Link>
              </Box>
            </Grid>

            {/* Legal */}
            <Grid item xs={12} md={2}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: { xs: 2, md: 3 }, 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.125rem', md: '1.25rem' }
                }}
              >
                Legal
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 2 } }}>
                <Link href="/terminos" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  Términos
                </Link>
                <Link href="/privacidad" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  Privacidad
                </Link>
                <Link href="/cookies" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  Cookies
                </Link>
              </Box>
            </Grid>

            {/* Redes sociales */}
            <Grid item xs={12} md={2}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: { xs: 2, md: 3 }, 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.125rem', md: '1.25rem' }
                }}
              >
                Síguenos
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 2 } }}>
                <Link href="#" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  Twitter
                </Link>
                <Link href="#" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  LinkedIn
                </Link>
                <Link href="#" color="inherit" sx={{ textDecoration: 'none', fontSize: { xs: '1rem', md: '1rem' } }}>
                  GitHub
                </Link>
              </Box>
            </Grid>
          </Grid>

          {/* Línea divisoria */}
          <Box sx={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            mt: { xs: 4, md: 6 }, 
            pt: { xs: 3, md: 4 } 
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center', 
                opacity: 0.7,
                fontSize: { xs: '0.875rem', md: '0.875rem' } // Cambiado de 0.75rem a 0.875rem en mobile
              }}
            >
              © {new Date().getFullYear()} MexxaFlow. Todos los derechos reservados.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 