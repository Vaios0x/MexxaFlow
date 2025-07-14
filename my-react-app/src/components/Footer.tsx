import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => (
  <Box sx={{
    width: '100%',
    py: 3,
    mt: 8,
    background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
    color: 'white',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: { xs: 14, sm: 16 },
    letterSpacing: 1,
    boxShadow: 2,
  }}>
    <Typography variant="body2">
      © {new Date().getFullYear()} MexxaFlow. Todos los derechos reservados.
    </Typography>
  </Box>
);

export default Footer; 