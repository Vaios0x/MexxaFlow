import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography 
} from '@mui/material';

const onboardingSteps = [
  {
    label: 'Bienvenido a MexxaFlow',
    content: 'Descubre cómo simplificar tus pagos como trabajador independiente.'
  },
  {
    label: 'Conecta tu Wallet',
    content: 'Vincula tu billetera blockchain para comenzar a recibir pagos instantáneos.'
  },
  {
    label: 'Explora Segmentos',
    content: 'Encuentra los mejores flujos de trabajo para tu sector profesional.'
  }
];

interface OnboardingProps {
  open: boolean;
  onClose: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < onboardingSteps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Modal de onboarding - hacer fullscreen en mobile
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={{ xs: true, sm: false }}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
          background: 'linear-gradient(135deg, #1E1E1E 0%, #121212 100%)',
          color: 'white',
          width: { xs: '100%', sm: 'auto' },
          maxWidth: { xs: '100%', sm: 600 }
        }
      }}
    >
      <DialogTitle sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }}>Bienvenido a MexxaFlow</DialogTitle>
      <DialogContent sx={{ p: { xs: 3, md: 2 } }}>
        <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1rem' } }}>
          ¡Bienvenido a MexxaFlow! La plataforma de pagos blockchain diseñada específicamente para trabajadores independientes en Latinoamérica.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1rem' } }}>
          Con MexxaFlow podrás:
        </Typography>
        <ul style={{ marginLeft: 16, marginBottom: 16, fontSize: '1rem' }}>
          <li>Recibir pagos instantáneos en MXNB (stablecoin 1:1 con MXN)</li>
          <li>Enviar pagos sin comisiones altas</li>
          <li>Gestionar tus finanzas con herramientas digitales avanzadas</li>
          <li>Acceder a servicios financieros inclusivos</li>
        </ul>
        <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1rem' } }}>
          ¿Estás listo para comenzar?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 3, md: 2 } }}>
        <Button 
          onClick={handleClose}
          sx={{ 
            fontSize: { xs: '1rem', md: '0.875rem' },
            minHeight: { xs: 48, md: 40 }
          }}
        >
          Cerrar
        </Button>
        <Button 
          variant="contained" 
          onClick={handleClose}
          sx={{ 
            fontSize: { xs: '1rem', md: '0.875rem' },
            minHeight: { xs: 48, md: 40 }
          }}
        >
          ¡Comenzar!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Onboarding; 