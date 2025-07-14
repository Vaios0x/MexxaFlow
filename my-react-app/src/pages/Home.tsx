import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Container,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

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
        {/* Hero Section */}
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

        {/* Benefits Section */}
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

        {/* Sección Cómo Funciona */}
        <section id="como-funciona" style={{ marginTop: 80, marginBottom: 80 }}>
          <Box
            sx={{
              maxWidth: 600,
              mx: 'auto',
              borderRadius: 4,
              background: 'rgba(30,34,40,0.85)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(12px)',
              p: { xs: 3, sm: 6 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ fontSize: 64, mb: 2, color: 'primary.main', animation: 'bounce 1.5s infinite alternate' }}>⚡</Box>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 900,
                background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                fontSize: { xs: '2rem', sm: '2.5rem' }
              }}
            >
              ¿Cómo funciona MexxaFlow?
            </Typography>
            <Box sx={{ width: '100%', mt: 2 }}>
              {[
                { icon: '🔗', text: 'Conecta tu wallet y recibe MXNB.' },
                { icon: '💸', text: 'Envía y recibe pagos instantáneos en la red Arbitrum Sepolia.' },
                { icon: '👀', text: 'Visualiza tu balance y movimientos en tiempo real.' },
                { icon: '🛡️', text: 'Disfruta de comisiones mínimas y máxima seguridad.' }
              ].map((step, idx, arr) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mb: idx < arr.length - 1 ? 3 : 0 }}>
                  <Box sx={{
                    minWidth: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6 60%, #10B981 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(59,130,246,0.15)',
                    mr: 2,
                    mt: 0.5
                  }}>{step.icon}</Box>
                  <Typography sx={{ color: 'white', fontSize: 20, lineHeight: 1.5 }}>{step.text}</Typography>
                </Box>
              ))}
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 4, fontSize: 18, textAlign: 'center' }}>
              ¡Así de fácil es usar MexxaFlow!
            </Typography>
          </Box>
        </section>

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