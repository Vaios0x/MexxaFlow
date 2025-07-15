import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Box, 
  Paper, 
  Divider, 
  IconButton, 
  InputAdornment,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Google, 
  Facebook, 
  Apple 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMockApp } from '../context/MockAppContext';

// Función de validación de email
const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// Función de validación de contraseña
const validatePassword = (password: string): boolean => {
  // Al menos 8 caracteres, una mayúscula, un número y un carácter especial
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useMockApp();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError('Ingresa un correo electrónico válido');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (newPassword && !validatePassword(newPassword)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    // Validar antes de intentar login
    if (!validateEmail(email)) {
      setEmailError('Ingresa un correo electrónico válido');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('La contraseña no cumple con los requisitos');
      return;
    }

    try {
      // Simulación de login con validación
      if (
        (email === 'demo@mexxaflow.com' && password === 'MexxaFlow2024!') ||
        (email === 'hackwinner' && password === 'building')
      ) {
        login();
        
        // Redirigir a la página original o al dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        // Credenciales incorrectas
        setLoginError('Correo o contraseña incorrectos');
        setOpenSnackbar(true);
      }
    } catch (error) {
      // Manejo de errores de login
      setLoginError('Ocurrió un error al iniciar sesión. Intenta de nuevo.');
      setOpenSnackbar(true);
      console.error('Login error:', error);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implementar login con redes sociales
    setLoginError(`Login con ${provider} próximamente`);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xs" sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {loginError}
        </Alert>
      </Snackbar>

      {/* Formulario de Login - hacer responsive */}
      <Paper 
        elevation={6} 
        sx={{ 
          padding: { xs: 3, md: 4 }, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          width: '100%',
          borderRadius: 3
        }}
      >
        <Typography 
          component="h1" 
          variant="h4" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold', 
            color: 'primary.main',
            fontSize: { xs: '1.75rem', md: '2.125rem' }
          }}
        >
          MexxaFlow
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo electrónico"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          sx={{
            '& .MuiInputBase-root': {
              minHeight: { xs: 56, md: 48 },
              fontSize: { xs: '1rem', md: '1rem' }
            },
            '& .MuiInputLabel-root': {
              fontSize: { xs: '1rem', md: '1rem' }
            },
            mb: { xs: 2, md: 1 }
          }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
          helperText={passwordError}
          sx={{
            '& .MuiInputBase-root': {
              minHeight: { xs: 56, md: 48 },
              fontSize: { xs: '1rem', md: '1rem' }
            },
            '& .MuiInputLabel-root': {
              fontSize: { xs: '1rem', md: '1rem' }
            },
            mb: { xs: 2, md: 1 }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{ fontSize: { xs: '1.25rem', md: '1.25rem' } }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ 
            mt: { xs: 3, md: 3 }, 
            mb: { xs: 3, md: 2 },
            py: { xs: 2, md: 1.5 },
            fontWeight: 'bold',
            fontSize: { xs: '1.125rem', md: '1rem' },
            minHeight: { xs: 56, md: 48 }
          }}
          onClick={handleLogin}
          disabled={!email || !password || !!emailError || !!passwordError}
        >
          Iniciar Sesión
        </Button>

        <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center" 
          sx={{ mb: 2, fontSize: { xs: '1rem', md: '0.875rem' } }}
        >
          O continúa con
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between', 
            width: '100%',
            gap: { xs: 2, md: 1 }
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Google />}
            sx={{ 
              flex: 1, 
              mr: { xs: 0, md: 1 },
              mb: { xs: 1, md: 0 },
              py: { xs: 1.5, md: 1 },
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
            onClick={() => handleSocialLogin('Google')}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Facebook />}
            sx={{ 
              flex: 1, 
              mr: { xs: 0, md: 1 },
              mb: { xs: 1, md: 0 },
              py: { xs: 1.5, md: 1 },
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
            onClick={() => handleSocialLogin('Facebook')}
          >
            Facebook
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Apple />}
            sx={{ 
              flex: 1,
              py: { xs: 1.5, md: 1 },
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
            onClick={() => handleSocialLogin('Apple')}
          >
            Apple
          </Button>
        </Box>

        <Divider sx={{ width: '100%', my: { xs: 3, md: 3 } }}>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '1rem', md: '0.875rem' } }}>
            ¿Primera vez?
          </Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => navigate('/registro')}
          sx={{
            py: { xs: 1.5, md: 1.5 },
            fontSize: { xs: '1rem', md: '1rem' },
            minHeight: { xs: 48, md: 40 }
          }}
        >
          Crear Cuenta
        </Button>
      </Paper>

      <Typography 
        variant="body2" 
        color="textSecondary" 
        sx={{ mt: 3 }}
      >
        © {new Date().getFullYear()} MexxaFlow. Todos los derechos reservados.
      </Typography>
    </Container>
  );
};

export default Login; 