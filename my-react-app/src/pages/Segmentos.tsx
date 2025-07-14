import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';

const segmentosData = [
  {
    titulo: 'Freelancers Tecnológicos',
    emoji: '💻',
    icono: '💻',
    color: 'primary',
    descripcion: 'Desarrolladores, diseñadores UX/UI, programadores y especialistas en tecnología.',
    beneficios: [
      'Pagos instantáneos',
      'Sin comisiones de plataformas',
      'Contratos inteligentes',
      'Portafolio verificado'
    ],
    comision: '0.3%'
  },
  {
    titulo: 'Repartidores y Logística',
    emoji: '🚴',
    color: 'success',
    descripcion: 'Conductores de delivery, mensajeros y servicios de logística urbana.',
    beneficios: [
      'Pagos por entrega',
      'Liquidación inmediata',
      'Rastreo de rutas',
      'Bonificaciones por desempeño'
    ],
    comision: '0.5%'
  },
  {
    titulo: 'Vendedores Online',
    emoji: '🛒',
    color: 'secondary',
    descripcion: 'Emprendedores digitales, tiendas en línea y comercio electrónico.',
    beneficios: [
      'Sin comisiones de marketplace',
      'Integración de pagos',
      'Reportes de ventas',
      'Gestión de inventario'
    ],
    comision: '0.4%'
  },
  {
    titulo: 'Creadores de Contenido',
    emoji: '🎨',
    color: 'info',
    descripcion: 'Youtubers, streamers, podcasters, artistas digitales y influencers.',
    beneficios: [
      'Pagos por suscripciones',
      'Donaciones directas',
      'Monetización flexible',
      'Protección de derechos'
    ],
    comision: '0.35%'
  },
  {
    titulo: 'Educadores Digitales',
    emoji: '📚',
    color: 'warning',
    descripcion: 'Profesores online, tutores, coaches y mentores especializados.',
    beneficios: [
      'Pagos por sesión',
      'Certificaciones verificadas',
      'Agenda de clases',
      'Gestión de estudiantes'
    ],
    comision: '0.25%'
  },
  {
    titulo: 'Profesionales de Salud',
    emoji: '🩺',
    color: 'error',
    descripcion: 'Médicos, psicólogos, nutricionistas y terapeutas independientes.',
    beneficios: [
      'Consultas online',
      'Pagos seguros',
      'Historial médico',
      'Confidencialidad'
    ],
    comision: '0.2%'
  },
  {
    titulo: 'Artesanos y Makers',
    emoji: '🧵',
    color: 'primary',
    descripcion: 'Artistas, artesanos, diseñadores y creadores de productos únicos.',
    beneficios: [
      'Tienda online',
      'Pagos directos',
      'Reputación verificada',
      'Comunidad de makers'
    ],
    comision: '0.45%'
  },
  {
    titulo: 'Remesas y Transferencias',
    emoji: '💸',
    color: 'secondary',
    descripcion: 'Trabajadores migrantes, envío de dinero internacional y pagos transfronterizos.',
    beneficios: [
      'Transferencias instantáneas',
      'Tasas más bajas',
      'Sin intermediarios',
      'Conversión de divisas'
    ],
    comision: '0.5%'
  }
];

const Segmentos: React.FC = () => {
  const [selectedSegmento, setSelectedSegmento] = useState<any>(null);

  const handleOpenDetails = (segmento: any) => {
    setSelectedSegmento(segmento);
  };

  const handleCloseDetails = () => {
    setSelectedSegmento(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 900, mb: 2, color: 'primary.main' }}>
        Segmentos
      </Typography>
      <Typography align="center" sx={{ mb: 6, color: 'text.secondary', fontSize: 20 }}>
        Soluciones de pago personalizadas para cada tipo de trabajador independiente
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {segmentosData.map((segmento) => (
          <Card
            key={segmento.titulo}
            sx={{
              position: 'relative',
              p: 4,
              borderRadius: 4,
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              background: 'linear-gradient(135deg, #23272F 60%, #1A1D23 100%)',
              color: 'white',
              minHeight: 260,
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.04)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
              }
            }}
            onClick={() => handleOpenDetails(segmento)}
          >
            <Box sx={{ position: 'absolute', top: 24, right: 24 }}>
              <Chip
                label={segmento.comision}
                color="primary"
                sx={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(59,130,246,0.15)'
                }}
              />
            </Box>
            <Box sx={{ fontSize: 56, mb: 2, textAlign: 'center' }}>{segmento.emoji}</Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, textAlign: 'center' }}>
              {segmento.titulo}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: 18 }}>
              {segmento.descripcion}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Diálogo de detalles */}
      <Dialog
        open={!!selectedSegmento}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        {selectedSegmento && (
          <>
            <DialogTitle
              sx={{
                textAlign: 'center',
                background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                color: 'white',
                fontWeight: 900
              }}
            >
              {selectedSegmento.titulo}
            </DialogTitle>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 4
              }}
            >
              <Box
                sx={{
                  fontSize: '5rem',
                  mb: 2,
                  color: '#3B82F6'
                }}
              >
                {selectedSegmento.emoji}
              </Box>

              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  mb: 3,
                  maxWidth: 600
                }}
              >
                {selectedSegmento.descripcion}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 3 }}>
                {selectedSegmento.beneficios.map((beneficio: string, idx: number) => (
                  <Chip
                    key={idx}
                    label={beneficio}
                    variant="outlined"
                    color="primary"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>

              <Chip
                label={`Comisión: ${selectedSegmento.comision}`}
                color="primary"
                sx={{ fontWeight: 'bold' }}
              />
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Segmentos; 
