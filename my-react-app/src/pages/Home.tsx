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
    <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            mb: { xs: 4, md: 6 }, 
            background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Cómo funciona MexxaFlow
        </Typography>
        <Grid container spacing={{ xs: 3, md: 4 }}>
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
                    p: { xs: 2, md: 3 }, 
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
                  <Typography variant="h1" sx={{ mb: { xs: 1, md: 2 }, fontSize: { xs: '2.5rem', md: '3rem' } }}>
                    {step.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: { xs: 1, md: 1 }, fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
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
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 }
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              color: 'white',
              mb: { xs: 4, md: 6 },
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
                mb: { xs: 2, md: 3 },
                fontSize: { xs: '2.5rem', sm: '4rem' }
              }}
            >
              MexxaFlow
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mb: { xs: 3, md: 4 },
                color: 'text.secondary',
                maxWidth: 800,
                fontSize: { xs: '1.2rem', sm: '1.8rem' }
              }}
            >
              Plataforma de pagos instantáneos, seguros y sin fronteras para trabajadores independientes en Latinoamérica.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, md: 3 }, mb: { xs: 4, md: 6 } }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/dashboard')}
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.5, md: 2 },
                  minHeight: { xs: 48, md: 56 }
                }}
              >
                Comenzar
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/segmentos')}
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.5, md: 2 },
                  minHeight: { xs: 48, md: 56 }
                }}
              >
                Ver Segmentos
              </Button>
            </Box>
          </Box>

          {/* Beneficios */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography 
              variant="h4" 
              align="center" 
              sx={{ 
                mb: { xs: 4, md: 6 }, 
                fontWeight: 700, 
                color: 'white',
                fontSize: { xs: '1.75rem', md: '2.25rem' }
              }}
            >
              ¿Por qué MexxaFlow?
            </Typography>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: { xs: 3, md: 4 },
              maxWidth: 800,
              mx: 'auto'
            }}>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card sx={{ 
                    p: { xs: 3, md: 4 }, 
                    textAlign: 'center', 
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                    borderRadius: 4,
                    height: '100%',
                    minHeight: { xs: 160, md: 200 },
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%'
                    }}>
                      <Box sx={{
                        width: { xs: 60, md: 80 },
                        height: { xs: 60, md: 80 },
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${benefit.color === 'primary' ? '#3B82F6' : 
                                                            benefit.color === 'success' ? '#10B981' : 
                                                            benefit.color === 'error' ? '#EF4444' : '#06B6D4'} 0%, 
                                                            ${benefit.color === 'primary' ? '#1D4ED8' : 
                                                            benefit.color === 'success' ? '#059669' : 
                                                            benefit.color === 'error' ? '#DC2626' : '#0891B2'} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: { xs: 2, md: 3 },
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                      }}>
                        <Typography variant="h2" sx={{ 
                          fontSize: { xs: '1.75rem', md: '2.25rem' },
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}>
                          {benefit.emoji}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold', 
                          fontSize: { xs: '1.125rem', md: '1.25rem' },
                          color: 'white',
                          lineHeight: 1.3
                        }}
                      >
                        {benefit.text}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* Segmentos */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="h4" align="center" sx={{ mb: { xs: 3, md: 4 }, fontWeight: 700, color: 'white' }}>
              Segmentos Principales
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {segments.slice(0, 4).map((segment, index) => (
                <Grid item xs={12} sm={6} md={3} key={segment.title}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      sx={{ 
                        p: { xs: 2, md: 3 }, 
                        textAlign: 'center', 
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 3,
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)'
                        }
                      }}
                      onClick={() => navigate('/segmentos')}
                    >
                      <Typography variant="h2" sx={{ mb: { xs: 1, md: 2 }, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                        {segment.emoji}
                      </Typography>
                      <Typography variant="h6" sx={{ mb: { xs: 1, md: 2 }, fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.125rem' } }}>
                        {segment.title}
                      </Typography>
                      <Chip 
                        label={`${segment.commission} comisión`} 
                        color={segment.color as any} 
                        size="small"
                        sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
                      />
                      <Typography variant="body2" sx={{ mt: { xs: 1, md: 2 }, fontSize: { xs: '1rem', md: '1rem' } }}>
                        {segment.desc}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
      <HowItWorks />
    </Box>
  );
};

export default Home; 