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

      <Paper 
        elevation={6} 
        sx={{ 
          padding: 4, 
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
            color: 'primary.main' 
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
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
            mt: 3, 
            mb: 2,
            py: 1.5,
            fontWeight: 'bold'
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
          sx={{ mb: 2 }}
        >
          O continúa con
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%' 
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Google />}
            sx={{ flex: 1, mr: 1 }}
            onClick={() => handleSocialLogin('Google')}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Facebook />}
            sx={{ flex: 1, mr: 1 }}
            onClick={() => handleSocialLogin('Facebook')}
          >
            Facebook
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Apple />}
            sx={{ flex: 1 }}
            onClick={() => handleSocialLogin('Apple')}
          >
            Apple
          </Button>
        </Box>

        <Divider sx={{ width: '100%', my: 3 }}>
          <Typography variant="body2" color="textSecondary">
            ¿Primera vez?
          </Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => navigate('/registro')}
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