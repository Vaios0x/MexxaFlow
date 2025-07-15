import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#6AB4FF', // Aumentado el brillo para mejor contraste
      main: '#2C7EF6', // Ajustado para mayor contraste
      dark: '#1A5AD3', // Oscurecido para mejor legibilidad
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#4AEDC0', // Aumentado el brillo
      main: '#0FD3A2', // Ajustado para mayor contraste
      dark: '#047857', // Mantenido, buen contraste
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#0A0A0F', // Ligeramente más oscuro para mejor contraste
      paper: '#161622' // Ajustado para diferenciar de fondo
    },
    text: {
      primary: '#F0F0F5', // Ligeramente más claro
      secondary: '#B0B0C0' // Ajustado para mejor legibilidad
    },
    error: {
      main: '#FF6B6B', // Más brillante para mayor visibilidad
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#4ADE80', // Más brillante
      contrastText: '#FFFFFF'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
        lineHeight: 1.1
      }
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
        lineHeight: 1.2
      }
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
        lineHeight: 1.2
      }
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
        lineHeight: 1.3
      }
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1rem',
        lineHeight: 1.3
      }
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1rem',
        lineHeight: 1.3
      }
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1rem', // Cambiado de 0.875rem a 1rem (16px)
        lineHeight: 1.4
      }
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1rem', // Cambiado de 0.75rem a 1rem (16px)
        lineHeight: 1.4
      }
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '0.875rem', // Cambiado de 0.625rem a 0.875rem (14px)
        lineHeight: 1.3
      }
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1rem', // Cambiado de 0.75rem a 1rem (16px)
        lineHeight: 1.3
      }
    }
  },
  spacing: 8,
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          '@media (max-width:600px)': {
            fontSize: '1rem' // Asegurar mínimo 16px en mobile
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            '& .MuiInputBase-input': {
              fontSize: '1rem' // Asegurar mínimo 16px en mobile
            },
            '& .MuiInputLabel-root': {
              fontSize: '1rem' // Asegurar mínimo 16px en mobile
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            fontSize: '0.875rem' // Mínimo 14px para chips
          }
        }
      }
    }
  }
});

export default theme;