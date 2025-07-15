import React from 'react';
import { useMockApp } from '../context/MockAppContext';
import { Box, Typography, Tooltip, Card, CardContent, Paper } from '@mui/material';

const Badges: React.FC = () => {
  const { badges } = useMockApp();
  if (!badges || badges.length === 0) return null;

  return (
    <Card sx={{ 
      borderRadius: 3, 
      mb: 4, 
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      background: 'linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(16,185,129,0.05) 100%)',
      border: '1px solid rgba(59,130,246,0.1)'
    }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            fontWeight: 700, 
            color: 'text.primary',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          🏆 Logros y Badges
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
          width: '100%'
        }}>
          {badges.map(badge => (
            <Box key={badge.id} sx={{ width: '100%' }}>
              <Tooltip title={badge.description} arrow placement="top">
                <Paper
                  elevation={badge.achieved ? 4 : 1}
                  sx={{
                    p: { xs: 2, sm: 2.5 },
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: badge.achieved 
                      ? 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)'
                      : 'rgba(255,255,255,0.02)',
                    border: badge.achieved 
                      ? '2px solid rgba(16,185,129,0.3)' 
                      : '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: badge.achieved 
                        ? '0 12px 24px rgba(16,185,129,0.2)' 
                        : '0 8px 16px rgba(0,0,0,0.1)',
                      background: badge.achieved 
                        ? 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.08) 100%)'
                        : 'rgba(255,255,255,0.05)'
                    }
                  }}
                >
                  {/* Efecto de brillo para badges logrados */}
                  {badge.achieved && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 40,
                        height: 40,
                        background: 'rgba(16,185,129,0.2)',
                        borderRadius: '50%',
                        filter: 'blur(15px)',
                        animation: 'pulse 2s infinite'
                      }}
                    />
                  )}
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                    height: '100%',
                    justifyContent: 'center'
                  }}>
                    {/* Icono */}
                    <Box
                      sx={{
                        fontSize: { xs: '2rem', sm: '2.5rem' },
                        mb: 1.5,
                        opacity: badge.achieved ? 1 : 0.4,
                        filter: badge.achieved ? 'drop-shadow(0 2px 4px rgba(16,185,129,0.3))' : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {badge.icon}
                    </Box>
                    
                    {/* Nombre del badge */}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: badge.achieved ? 700 : 500,
                        color: badge.achieved ? 'success.main' : 'text.secondary',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        mb: 0.5,
                        lineHeight: 1.2
                      }}
                    >
                      {badge.name}
                    </Typography>
                    
                    {/* Estado */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mt: 0.5
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: badge.achieved ? 'success.main' : 'text.disabled',
                          boxShadow: badge.achieved ? '0 0 8px rgba(16,185,129,0.5)' : 'none'
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: badge.achieved ? 'success.main' : 'text.disabled',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      >
                        {badge.achieved ? 'Logrado' : 'Pendiente'}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Tooltip>
            </Box>
          ))}
        </Box>
        
        {/* Información adicional */}
        <Box sx={{ 
          mt: 3, 
          p: 2, 
          bgcolor: 'rgba(255,255,255,0.02)', 
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              textAlign: 'center',
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            💡 Completa desafíos para desbloquear más badges y mostrar tu progreso en MexxaFlow
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Badges; 