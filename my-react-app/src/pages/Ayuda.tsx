import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Grid, 
  Paper, 
  TextField, 
  Button 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const preguntasFrecuentes = [
  {
    pregunta: '¿Cómo funciona MexaFlow?',
    respuesta: 'MexaFlow es una plataforma que permite a trabajadores independientes recibir pagos instantáneos utilizando tecnología blockchain.'
  },
  {
    pregunta: '¿Cuáles son los requisitos para usar MexaFlow?',
    respuesta: 'Necesitas una wallet de MetaMask, ser mayor de edad y tener una cuenta verificada en nuestra plataforma.'
  },
  {
    pregunta: '¿Qué tipos de pagos puedo recibir?',
    respuesta: 'Puedes recibir pagos en criptomonedas estables como USDC, USDT y DAI, así como en monedas locales.'
  },
  {
    pregunta: '¿Cómo protegen mi información?',
    respuesta: 'Utilizamos encriptación de última generación y almacenamiento descentralizado para proteger tus datos personales y financieros.'
  }
];

const Ayuda: React.FC = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envío de mensaje de soporte
    console.log('Mensaje enviado', { email, mensaje });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ mb: 4 }}
      >
        Centro de Ayuda
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
          >
            Preguntas Frecuentes
          </Typography>
          
          {preguntasFrecuentes.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{faq.pregunta}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.respuesta}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              backgroundColor: 'background.paper' 
            }}
          >
            <Typography 
              variant="h5" 
              component="h3" 
              gutterBottom
            >
              Contacta Soporte
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Tu Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <TextField
                fullWidth
                label="Mensaje"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              />
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Enviar Mensaje
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Ayuda; 