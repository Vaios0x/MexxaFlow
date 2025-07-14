import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Box, 
  Paper, 
  Checkbox, 
  FormControlLabel,
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
import { useNavigate } from 'react-router-dom';
import { useMockApp } from '../context/MockAppContext';

// Funciones de validación (reutilizables)
const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string): boolean => {
  // Al menos 8 caracteres, una mayúscula, un número y un carácter especial
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

const Registro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registroError, setRegistroError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
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

    // Validar confirmación de contraseña
    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    
    if (newConfirmPassword && password !== newConfirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegistro = () => {
    // Validaciones finales
    if (!validateEmail(email)) {
      setEmailError('Ingresa un correo electrónico válido');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('La contraseña no cumple con los requisitos');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      return;
    }

    if (!termsAccepted) {
      setRegistroError('Debes aceptar los términos y condiciones');
      setOpenSnackbar(true);
      return;
    }

    try {
      // Simulación de registro
      if (email && password && name) {
        // En un escenario real, esto sería una llamada a API
        login(); // Simula login después del registro
        navigate('/dashboard', { replace: true });
      } else {
        setRegistroError('Por favor, completa todos los campos');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setRegistroError('Ocurrió un error al registrarte. Intenta de nuevo.');
      setOpenSnackbar(true);
      console.error('Registro error:', error);
    }
  };

  const handleSocialRegistro = (provider: string) => {
    // TODO: Implementar registro con redes sociales
    setRegistroError(`Registro con ${provider} próximamente`);
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
          {registroError}
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
          Crear Cuenta
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nombre Completo"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo electrónico"
          name="email"
          autoComplete="email"
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
          autoComplete="new-password"
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

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label="Confirmar Contraseña"
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirm-password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              color="primary"
            />
          }
          label="Acepto los términos y condiciones"
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
          onClick={handleRegistro}
          disabled={!email || !password || !confirmPassword || !name || !termsAccepted || !!emailError || !!passwordError || !!confirmPasswordError}
        >
          Crear Cuenta
        </Button>

        <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center" 
          sx={{ mb: 2 }}
        >
          O regístrate con
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
            onClick={() => handleSocialRegistro('Google')}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Facebook />}
            sx={{ flex: 1, mr: 1 }}
            onClick={() => handleSocialRegistro('Facebook')}
          >
            Facebook
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Apple />}
            sx={{ flex: 1 }}
            onClick={() => handleSocialRegistro('Apple')}
          >
            Apple
          </Button>
        </Box>

        <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center" 
          sx={{ mt: 3 }}
        >
          ¿Ya tienes una cuenta? 
          <Button 
            color="primary" 
            onClick={() => navigate('/login')}
          >
            Iniciar Sesión
          </Button>
        </Typography>
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

export default Registro; 