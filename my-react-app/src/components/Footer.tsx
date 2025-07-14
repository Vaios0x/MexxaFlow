import React from 'react';
import { Box, Typography, Grid, Link, IconButton, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';

const Footer: React.FC = () => (
  <Box sx={{
    width: '100%',
    py: 4,
    mt: 8,
    background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
    color: 'white',
    boxShadow: 2,
  }}>
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
      <Grid container spacing={4}>
        {/* Logo y descripción */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            MexxaFlow
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
            Plataforma de pagos instantáneos, seguros y sin fronteras para trabajadores independientes en Latinoamérica.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="inherit" size="small" href="https://github.com/Vaios0x/MexxaFlow" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton color="inherit" size="small" href="https://twitter.com/mexxaflow" target="_blank">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" size="small" href="https://linkedin.com/company/mexxaflow" target="_blank">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit" size="small" href="https://discord.gg/mexxaflow" target="_blank">
              <ChatIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Enlaces rápidos */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Producto
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="/segmentos" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Segmentos
            </Link>
            <Link href="/precios" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Precios
            </Link>
            <Link href="/dashboard" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Dashboard
            </Link>
          </Box>
        </Grid>

        {/* Soporte */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Soporte
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="/ayuda" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Centro de ayuda
            </Link>
            <Link href="mailto:soporte@mexxaflow.com" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Contacto
            </Link>
            <Link href="https://discord.gg/mexxaflow" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Discord
            </Link>
          </Box>
        </Grid>

        {/* Recursos */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Recursos
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="https://docs.mexxaflow.com" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Documentación
            </Link>
            <Link href="https://github.com/Vaios0x/MexxaFlow" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              GitHub
            </Link>
            <Link href="https://blog.mexxaflow.com" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Blog
            </Link>
          </Box>
        </Grid>

        {/* Legal */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Legal
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="/terminos" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Términos de servicio
            </Link>
            <Link href="/privacidad" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Política de privacidad
            </Link>
            <Link href="/cookies" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Política de cookies
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* Copyright y links adicionales */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} MexxaFlow. Todos los derechos reservados.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Desarrollado con ❤️ por Vaios0x
          </Typography>
          <IconButton color="inherit" size="small" href="https://mxnbhackathon.com" target="_blank">
            <LanguageIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Footer; 