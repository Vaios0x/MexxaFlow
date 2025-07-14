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

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Bienvenido a MexxaFlow</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {onboardingSteps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ mt: 4, mb: 4 }}
        >
          {onboardingSteps[activeStep].content}
        </Typography>
      </DialogContent>
      <DialogActions>
        {activeStep !== 0 && (
          <Button onClick={handleBack}>
            Atrás
          </Button>
        )}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNext}
        >
          {activeStep === onboardingSteps.length - 1 ? 'Comenzar' : 'Siguiente'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Onboarding; 