import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Container,
  Stack,
  Grid,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';

const segments = [
  {
    title: 'Freelancers',
    color: 'primary',
    emoji: '💻',
    commission: '0.3%',
    desc: 'Pagos directos, sin plataformas intermediarias.'
  },
  {
    title: 'Repartidores',
    color: 'success',
    emoji: '🚴',
    commission: '0.5%',
    desc: 'Pagos instantáneos por cada entrega.'
  },
  {
    title: 'Vendedores Online',
    color: 'secondary',
    emoji: '🛒',
    commission: '0.4%',
    desc: 'Sin comisiones de marketplace.'
  },
  {
    title: 'Creadores',
    color: 'info',
    emoji: '🎨',
    commission: '0.35%',
    desc: 'Pagos por suscripciones y contenido.'
  },
  {
    title: 'Educadores',
    color: 'warning',
    emoji: '📚',
    commission: '0.25%',
    desc: 'Pagos por sesión y certificaciones.'
  },
  {
    title: 'Salud',
    color: 'error',
    emoji: '🩺',
    commission: '0.2%',
    desc: 'Pagos seguros y confidenciales.'
  },
  {
    title: 'Artesanos',
    color: 'primary',
    emoji: '🧵',
    commission: '0.45%',
    desc: 'Pagos directos con reputación.'
  },
  {
    title: 'Remesas',
    color: 'secondary',
    emoji: '💸',
    commission: '0.5%',
    desc: 'Transferencias globales instantáneas.'
  },
];

const benefits = [
  { emoji: '💸', text: 'Comisiones ultra bajas', color: 'primary' },
  { emoji: '⚡', text: 'Pagos instantáneos', color: 'success' },
  { emoji: '🔒', text: 'Seguridad blockchain', color: 'error' },
  { emoji: '💳', text: 'Integración MXNB', color: 'info' },
];

// Testimonios mock
const testimonials = [
  {
    name: 'Ana López',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    segment: 'Freelancer',
    text: 'Antes perdía 8% en comisiones de PayPal. Con MXNB solo pago 0.3% y recibo mi dinero al instante. ¡Ahorro $2,400 MXN al mes!'
  },
  {
    name: 'Carlos Ruiz',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    segment: 'Repartidor',
    text: 'Los bancos me cobraban $50 MXN por transferencia. Ahora con MXNB pago $0.50 y recibo mi pago en segundos. ¡Revolucionó mi negocio!'
  },
  {
    name: 'Sofía Gómez',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    segment: 'Vendedora Online',
    text: 'Vendo en Mercado Libre y me cobraban 16% de comisión. Con MXNB solo pago 0.4% y mis clientes me pagan directo. ¡Gano $15,000 MXN más al mes!'
  }
];

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Regístrate',
      description: 'Crea tu cuenta con wallet Web3 en menos de 2 minutos',
      icon: '🚀'
    },
    {
      title: 'Conecta tu Wallet',
      description: 'Vincula MetaMask, WalletConnect o cualquier wallet compatible',
      icon: '💳'
    },
    {
      title: 'Recibe Pagos',
      description: 'Acepta pagos instantáneos en MXNB con comisiones mínimas',
      icon: '💸'
    },
    {
      title: 'Retira o Reinvierte',
      description: 'Transfiere a tu banco o mantén tu capital en blockchain',
      icon: '🏦'
    }
  ];

  return (
    <Box 
      id="como-funciona" 
      sx={{ 
        py: 8, 
        background: 'linear-gradient(135deg, #1E1E1E 0%, #121212 100%)',
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            mb: 6, 
            background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Cómo funciona MexxaFlow
        </Typography>
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={step.title}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h1" sx={{ mb: 2 }}>
                    {step.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {step.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)',
        minHeight: '100vh',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              color: 'white',
              mb: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="h1"
              sx={{
                background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900,
                mb: 3,
                fontSize: { xs: '2.5rem', sm: '4rem' }
              }}
            >
              MexxaFlow
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mb: 4,
                color: 'text.secondary',
                maxWidth: 800,
                fontSize: { xs: '1.2rem', sm: '1.8rem' }
              }}
            >
              Plataforma de pagos instantáneos, seguros y sin fronteras para trabajadores independientes en Latinoamérica.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mb: 4 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  fontSize: 18,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3
                }}
                onClick={() => navigate('/dashboard')}
              >
                COMENZAR AHORA
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{
                  fontSize: 18,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3
                }}
                onClick={() => {
                  const section = document.getElementById('como-funciona');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                CÓMO FUNCIONA
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <Chip
                label="8 segmentos"
                color="primary"
                variant="outlined"
                sx={{ fontSize: 16, px: 1 }}
              />
              <Chip
                label="0.2% comisión mínima"
                color="success"
                variant="outlined"
                sx={{ fontSize: 16, px: 1 }}
              />
              <Chip
                label="24/7 disponibilidad"
                color="secondary"
                variant="outlined"
                sx={{ fontSize: 16, px: 1 }}
              />
            </Stack>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card
            sx={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              mb: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 3
                }}
              >
                {benefits.map((b) => (
                  <Box
                    key={b.text}
                    sx={{
                      flex: { xs: '1 1 100%', sm: '1 1 40%', md: '1 1 20%' },
                      minWidth: 140,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      color: 'white',
                      mb: 2
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { xs: '2.5rem', sm: '3.5rem' },
                        mb: 2,
                        color: `${b.color}.main`
                      }}
                    >
                      {b.emoji}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'text.secondary'
                      }}
                    >
                      {b.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <HowItWorks />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ mt: 8, mb: 8 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 900, mb: 4, color: 'primary.main' }}>
              Testimonios de Usuarios
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center', alignItems: 'stretch' }}>
              {testimonials.map((t) => (
                <Card key={t.name} sx={{ flex: 1, minWidth: 260, maxWidth: 340, borderRadius: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', background: 'linear-gradient(135deg, #23272F 60%, #1A1D23 100%)', color: 'white', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', mb: 2, border: '3px solid #3B82F6' }}>
                    <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{t.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, mb: 2 }}>{t.segment}</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, textAlign: 'center', mb: 1 }}>
                    "{t.text}"
                  </Typography>
                </Card>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Segments Section */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 900, mb: 4, color: 'primary.main' }}>
            Segmentos
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 4,
              justifyContent: 'center',
            }}
          >
            {segments.map((s) => (
              <Card
                key={s.title}
                sx={{
                  position: 'relative',
                  p: 4,
                  borderRadius: 4,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                  background: 'linear-gradient(135deg, #23272F 60%, #1A1D23 100%)',
                  color: 'white',
                  minHeight: 220,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
                  }
                }}
              >
                <Box sx={{ position: 'absolute', top: 24, right: 24 }}>
                  <Box
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(59,130,246,0.15)'
                    }}
                  >
                    {s.commission}
                  </Box>
                </Box>
                <Box sx={{ fontSize: 56, mb: 2, textAlign: 'center' }}>{s.emoji}</Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, textAlign: 'center' }}>
                  {s.title}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: 18 }}>
                  {s.desc}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
            mb: 4
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              p: { xs: 2, sm: 6 }
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                mb: 3,
                fontSize: { xs: '1.8rem', sm: '2.5rem' }
              }}
            >
              ¿Listo para Revolucionar tus Pagos?
            </Typography>
            <Button
              variant="contained"
              color={isConnected ? 'success' : 'secondary'}
              size="large"
              sx={{
                fontSize: { xs: 16, sm: 20 },
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 'bold',
                boxShadow: isConnected ? '0 2px 12px rgba(16,185,129,0.15)' : '0 2px 12px rgba(59,130,246,0.15)'
              }}
              onClick={() => {
                if (!isConnected) {
                  navigate('/dashboard');
                }
              }}
              disabled={isConnected}
            >
              {isConnected ? 'WALLET CONECTADA' : 'CONECTAR WALLET'}
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Home; 