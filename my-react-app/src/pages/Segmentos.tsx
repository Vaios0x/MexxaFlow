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
import type { OverridableStringUnion } from '@mui/types';
import type { ChipPropsColorOverrides } from '@mui/material/Chip';

type SegmentoColor = OverridableStringUnion<'default' | 'primary' | 'success' | 'secondary' | 'info' | 'warning' | 'error', ChipPropsColorOverrides>;

type Segmento = {
  titulo: string;
  emoji: string;
  color: SegmentoColor;
  descripcion: string;
  beneficios: string[];
  comision: string;
};

const segmentosData: Segmento[] = [
  {
    titulo: 'Freelancers Tecnológicos',
    emoji: '💻',
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
  },
  {
    titulo: 'Estudiante',
    emoji: '🎓',
    color: 'info',
    descripcion: 'Universitarios, preparatorianos y estudiantes de cursos digitales que buscan recibir pagos, becas o apoyos de manera rápida y segura.',
    beneficios: [
      'Pagos de becas instantáneos',
      'Apoyos y premios directos',
      'Gestión de colegiaturas',
      'Descuentos exclusivos'
    ],
    comision: '0.1%'
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
      <Typography align="center" sx={{ mb: 2, color: 'text.secondary', fontSize: 20 }}>
        Elige el perfil que mejor se adapta a ti y descubre cómo MexxaFlow potencia tu actividad con pagos instantáneos, comisiones mínimas y herramientas digitales.
      </Typography>
      <Typography align="center" sx={{ mb: 6, color: 'primary.main', fontWeight: 700, fontSize: 18 }}>
        ¡Personaliza tu experiencia según tu segmento!
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
          <Box key={segmento.titulo} sx={{ position: 'relative' }}>
            <Card
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
                overflow: 'visible',
                '&:hover': {
                  transform: 'scale(1.04)',
                  boxShadow: '0 8px 32px 0 #3B82F6',
                }
              }}
              onClick={() => handleOpenDetails(segmento)}
              onMouseEnter={e => {
                const btn = e.currentTarget.querySelector('.simular-btn') as HTMLElement | null;
                if (btn) btn.style.opacity = '1';
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget.querySelector('.simular-btn') as HTMLElement | null;
                if (btn) btn.style.opacity = '0';
              }}
            >
              <Box sx={{ position: 'absolute', top: 24, right: 24, zIndex: 2 }}>
                <Chip
                  label={segmento.comision}
                  color={segmento.color}
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
              <Box
                className="simular-btn"
                sx={{
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 24,
                  display: 'flex',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 3
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: 16,
                    boxShadow: '0 2px 8px rgba(59,130,246,0.15)',
                    pointerEvents: 'auto',
                  }}
                >
                  Simular flujo
                </Box>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
      {/* Diálogo de detalles */}
      <Dialog
        open={!!selectedSegmento}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {selectedSegmento && (
          <>
            <DialogTitle
              sx={{
                textAlign: 'center',
                background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                color: 'white',
                fontWeight: 900,
                fontSize: 32,
                letterSpacing: 1
              }}
            >
              {selectedSegmento.titulo}
            </DialogTitle>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: { xs: 2, sm: 4 }
              }}
            >
              <Box
                sx={{
                  fontSize: '5rem',
                  mb: 2,
                  color: '#3B82F6',
                  textShadow: '0 2px 12px rgba(59,130,246,0.15)'
                }}
              >
                {selectedSegmento.emoji}
              </Box>
              <Chip
                label={`Comisión: ${selectedSegmento.comision}`}
                color={selectedSegmento.color}
                sx={{ fontWeight: 'bold', fontSize: 18, px: 2, py: 1, mb: 2, borderRadius: 2 }}
              />
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
                    variant="filled"
                    color="primary"
                    sx={{ m: 0.5, fontWeight: 600 }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: 18,
                    boxShadow: '0 2px 8px rgba(59,130,246,0.15)',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  onClick={() => alert('Simulación de flujo para ' + selectedSegmento.titulo)}
                >
                  Simular flujo
                </Box>
                <Box
                  sx={{
                    bgcolor: 'success.main',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: 18,
                    boxShadow: '0 2px 8px rgba(16,185,129,0.15)',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'success.dark' }
                  }}
                  onClick={() => { handleCloseDetails(); alert('Segmento seleccionado: ' + selectedSegmento.titulo); }}
                >
                  Seleccionar este segmento
                </Box>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Box
                  sx={{
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontSize: 16
                  }}
                >
                  ¿Tienes dudas? <b>Contáctanos para una demo personalizada.</b>
                </Box>
              </Box>
            </DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
              <Box
                sx={{
                  mt: 2,
                  bgcolor: 'grey.200',
                  color: 'primary.main',
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'grey.300' }
                }}
                onClick={handleCloseDetails}
              >
                Cerrar
              </Box>
            </Box>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Segmentos; 
