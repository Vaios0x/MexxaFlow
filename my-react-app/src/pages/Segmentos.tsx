import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  CardContent,
  Slide,
  Stack
} from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { motion, AnimatePresence } from 'framer-motion';
import ShareIcon from '@mui/icons-material/Share';
import type { OverridableStringUnion } from '@mui/types';
import type { ChipPropsColorOverrides } from '@mui/material/Chip';
import type { TransitionProps } from '@mui/material/transitions';

type SegmentoColor = 'primary' | 'success' | 'secondary' | 'info' | 'warning' | 'error';

type Segmento = {
  titulo: string;
  emoji: string;
  color: SegmentoColor;
  descripcion: string;
  beneficios: string[];
  comision: string;
  ejemploFlujo: {
    titulo: string;
    pasos: string[];
    tiempoEstimado: string;
  };
};

const segmentosData: Segmento[] = [
  {
    titulo: 'Freelancers Tecnológicos',
    emoji: '💻',
    color: 'primary',
    descripcion: 'Potencia tu carrera digital con pagos instantáneos y contratos inteligentes. Desde desarrollo web hasta diseño UX/UI, transforma tu talento en ingresos seguros.',
    beneficios: [
      'Pagos instantáneos',
      'Sin comisiones de plataformas',
      'Contratos inteligentes',
      'Portafolio verificado'
    ],
    comision: '0.3%',
    ejemploFlujo: {
      titulo: 'Desarrollo de Landing Page para Startup',
      pasos: [
        'Crear propuesta con contrato inteligente',
        'Cliente aprueba y deposita fondos',
        'Desarrollo del proyecto',
        'Entrega y liberación de fondos'
      ],
      tiempoEstimado: '1-2 semanas'
    }
  },
  {
    titulo: 'Repartidores y Logística',
    emoji: '🚴',
    color: 'success',
    descripcion: 'Optimiza tus entregas con liquidación inmediata. Transforma cada pedido en una oportunidad de crecimiento, sin intermediarios ni demoras.',
    beneficios: [
      'Pagos por entrega',
      'Liquidación inmediata',
      'Rastreo de rutas',
      'Bonificaciones por desempeño'
    ],
    comision: '0.5%',
    ejemploFlujo: {
      titulo: 'Entrega de Mercancía Local',
      pasos: [
        'Recibir pedido y confirmar disponibilidad',
        'Preparar mercancía y verificar detalles',
        'Realizar entrega en el lugar solicitado',
        'Confirmar recepción y cerrar pedido'
      ],
      tiempoEstimado: '1-2 horas'
    }
  },
  {
    titulo: 'Vendedores Online',
    emoji: '🛒',
    color: 'secondary',
    descripcion: 'Impulsa tu negocio digital sin comisiones de marketplace. Gestiona ventas, inventario y pagos en una plataforma diseñada para emprendedores.',
    beneficios: [
      'Sin comisiones de marketplace',
      'Integración de pagos',
      'Reportes de ventas',
      'Gestión de inventario'
    ],
    comision: '0.4%',
    ejemploFlujo: {
      titulo: 'Venta de Productos Digitales',
      pasos: [
        'Definir el producto y precio',
        'Crear página de venta con integración de pago',
        'Promocionar y recibir pagos',
        'Entrega del producto digital'
      ],
      tiempoEstimado: '1-3 días'
    }
  },
  {
    titulo: 'Creadores de Contenido',
    emoji: '🎨',
    color: 'info',
    descripcion: 'Monetiza tu creatividad sin intermediarios. Desde YouTube hasta Twitch, convierte tu pasión en ingresos directos y seguros.',
    beneficios: [
      'Pagos por suscripciones',
      'Donaciones directas',
      'Monetización flexible',
      'Protección de derechos'
    ],
    comision: '0.35%',
    ejemploFlujo: {
      titulo: 'Creación de Contenido para Plataforma',
      pasos: [
        'Planificar contenido y estrategia de publicación',
        'Producción de video/audio/texto',
        'Publicación y promoción',
        'Monetización de suscripciones/donaciones'
      ],
      tiempoEstimado: '1-2 semanas'
    }
  },
  {
    titulo: 'Educadores Digitales',
    emoji: '📚',
    color: 'warning',
    descripcion: 'Transforma el conocimiento en oportunidades. Gestiona clases, certificaciones y pagos con una herramienta diseñada para educadores modernos.',
    beneficios: [
      'Pagos por sesión',
      'Certificaciones verificadas',
      'Agenda de clases',
      'Gestión de estudiantes'
    ],
    comision: '0.25%',
    ejemploFlujo: {
      titulo: 'Enseñanza Online de Curso',
      pasos: [
        'Definir el curso y materiales',
        'Crear plataforma de aprendizaje (Zoom, Google Meet, etc.)',
        'Publicar contenido y programar sesiones',
        'Gestión de estudiantes y seguimiento'
      ],
      tiempoEstimado: '1-3 meses'
    }
  },
  {
    titulo: 'Profesionales de Salud',
    emoji: '🩺',
    color: 'error',
    descripcion: 'Consultas online con la máxima privacidad y seguridad. Conecta con pacientes, gestiona historiales y recibe pagos de manera instantánea.',
    beneficios: [
      'Consultas online',
      'Pagos seguros',
      'Historial médico',
      'Confidencialidad'
    ],
    comision: '0.2%',
    ejemploFlujo: {
      titulo: 'Asesoría Médica Online',
      pasos: [
        'Identificar necesidad del paciente',
        'Proporcionar diagnóstico y recomendaciones',
        'Seguimiento y ajustes',
        'Cierre de consulta'
      ],
      tiempoEstimado: '1-2 horas'
    }
  },
  {
    titulo: 'Artesanos y Makers',
    emoji: '🧵',
    color: 'primary',
    descripcion: 'Lleva tus creaciones únicas al mundo digital. Vende, promociona y recibe pagos directos por tus productos artesanales.',
    beneficios: [
      'Tienda online',
      'Pagos directos',
      'Reputación verificada',
      'Comunidad de makers'
    ],
    comision: '0.45%',
    ejemploFlujo: {
      titulo: 'Venta de Productos Artesanales',
      pasos: [
        'Diseñar y crear productos únicos',
        'Crear página de venta con integración de pago',
        'Publicar productos y promocionar',
        'Gestión de pedidos y envío'
      ],
      tiempoEstimado: '1-2 semanas'
    }
  },
  {
    titulo: 'Remesas y Transferencias',
    emoji: '💸',
    color: 'secondary',
    descripcion: 'Envía dinero al instante sin fronteras. Reduce costos, elimina intermediarios y conecta con tus seres queridos de manera rápida y segura.',
    beneficios: [
      'Transferencias instantáneas',
      'Tasas más bajas',
      'Sin intermediarios',
      'Conversión de divisas'
    ],
    comision: '0.5%',
    ejemploFlujo: {
      titulo: 'Envío de Dinero Internacional',
      pasos: [
        'Identificar destinatario y monto',
        'Seleccionar método de transferencia (Western Union, MoneyGram, etc.)',
        'Realizar pago y obtener código de seguimiento',
        'Entrega del dinero al destinatario'
      ],
      tiempoEstimado: '1-3 días'
    }
  },
  {
    titulo: 'Estudiante',
    emoji: '🎓',
    color: 'info',
    descripcion: 'Gestiona becas, apoyos y pagos académicos con total transparencia. Enfócate en tu educación mientras simplificamos tus finanzas.',
    beneficios: [
      'Pagos de becas instantáneos',
      'Apoyos y premios directos',
      'Gestión de colegiaturas',
      'Descuentos exclusivos'
    ],
    comision: '0.1%',
    ejemploFlujo: {
      titulo: 'Obtención de Becas para Estudiantes',
      pasos: [
        'Identificar oportunidades de becas (universidades, fondos, etc.)',
        'Preparar documentación requerida',
        'Aplicar a la institución o fondo',
        'Seguimiento del proceso y notificación de resultado'
      ],
      tiempoEstimado: '1-2 meses'
    }
  }
];

const Segmentos: React.FC = () => {
  const [selectedSegmento, setSelectedSegmento] = useState<Segmento | null>(null);

  const handleOpenDetails = (segmento: Segmento) => {
    setSelectedSegmento(segmento);
  };

  const handleCloseDetails = () => {
    setSelectedSegmento(null);
  };

  const handleShareSegmento = () => {
    if (selectedSegmento) {
      const shareText = `Descubre el segmento de ${selectedSegmento.titulo} en MexxaFlow: ${selectedSegmento.descripcion}`;
      const shareUrl = `https://mexxaflow.com/segmentos/${selectedSegmento.titulo.toLowerCase().replace(/\s+/g, '-')}`;
      
      if (navigator.share) {
        navigator.share({
          title: `Segmento ${selectedSegmento.titulo} - MexxaFlow`,
          text: shareText,
          url: shareUrl
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        alert('Enlace copiado al portapapeles');
      }
    }
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
      {/* Cards de segmentos - hacer responsive */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: { xs: 3, md: 4 },
          justifyContent: 'center',
        }}
      >
        {segmentosData.map((segmento) => (
          <Box key={segmento.titulo} sx={{ position: 'relative' }}>
            <Card
              sx={{
                position: 'relative',
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                background: 'linear-gradient(135deg, #23272F 60%, #1A1D23 100%)',
                color: 'white',
                minHeight: { xs: 240, md: 260 },
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                overflow: 'visible',
                width: '100%',
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
              <Box sx={{ position: 'absolute', top: { xs: 16, md: 24 }, right: { xs: 16, md: 24 }, zIndex: 2 }}>
                <Chip
                  label={segmento.comision}
                  color={segmento.color}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: 14, md: 16 },
                    px: { xs: 1.5, md: 2 },
                    py: 0.5,
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(59,130,246,0.15)'
                  }}
                />
              </Box>
              <Box sx={{ fontSize: { xs: 48, md: 56 }, mb: 2, textAlign: 'center' }}>{segmento.emoji}</Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, textAlign: 'center', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                {segmento.titulo}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: { xs: 16, md: 18 } }}>
                {segmento.descripcion}
              </Typography>
              <Box sx={{ 
                position: 'absolute', 
                bottom: { xs: 16, md: 24 }, 
                left: '50%', 
                transform: 'translateX(-50%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                width: '100%',
                px: { xs: 2, md: 3 }
              }} className="simular-btn">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    py: { xs: 1, md: 1.5 },
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleSimularClick(segmento); // This function is not defined in the original file
                  }}
                >
                  Simular Comisión
                </Button>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
      {/* Diálogo de detalles - hacer fullscreen en mobile */}
      <AnimatePresence>
        {selectedSegmento && (
          <Dialog
            open={!!selectedSegmento}
            onClose={handleCloseDetails}
            fullScreen={{ xs: true, sm: false }}
            TransitionComponent={Slide}
            TransitionProps={{
              direction: 'up'
            } as TransitionProps}
            PaperProps={{
              component: motion.div,
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.9 },
              transition: { duration: 0.3 },
              sx: {
                borderRadius: { xs: 0, sm: 3 },
                background: 'linear-gradient(135deg, #1E1E1E 0%, #121212 100%)',
                color: 'white',
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: '100%', sm: 800 }
              }
            }}
          >
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              fontSize: { xs: '1.5rem', md: '1.25rem' }
            }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 1, sm: 2 } }}>
                <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                  {selectedSegmento.emoji} {selectedSegmento.titulo}
                </Typography>
                <Chip 
                  label={`Comisión: ${selectedSegmento.comision}`} 
                  color={selectedSegmento.color} 
                  size="small"
                  sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }} // Cambiado de 0.75rem a 0.875rem en mobile
                />
              </Box>
              <IconButton onClick={handleShareSegmento} sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }}>
                <ShareIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: { xs: 3, md: 2 } }}>
              <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: '1rem', md: '1rem' } }}>
                {selectedSegmento.descripcion}
              </Typography>
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
                Beneficios
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {selectedSegmento.beneficios.map((beneficio) => (
                  <Chip 
                    key={beneficio} 
                    label={beneficio} 
                    variant="outlined" 
                    color={selectedSegmento.color}
                    sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
                  />
                ))}
              </Box>

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
                Ejemplo de Flujo de Trabajo
              </Typography>
              {/* Timeline de flujo de trabajo - convertir a cards en mobile */}
              <Card variant="outlined" sx={{ mb: 3, background: 'rgba(255,255,255,0.05)' }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, fontSize: { xs: '1rem', md: '1.125rem' } }}>
                    {selectedSegmento.ejemploFlujo.titulo}
                  </Typography>
                  
                  {/* Vista de Timeline para desktop */}
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Timeline>
                      {selectedSegmento.ejemploFlujo.pasos.map((paso, index) => (
                        <TimelineItem key={paso}>
                          <TimelineSeparator>
                            <TimelineDot color={selectedSegmento.color} />
                            {index < selectedSegmento.ejemploFlujo.pasos.length - 1 && <TimelineConnector />}
                          </TimelineSeparator>
                          <TimelineContent sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>{paso}</TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </Box>

                  {/* Vista de cards para mobile */}
                  <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <Stack spacing={2}>
                      {selectedSegmento.ejemploFlujo.pasos.map((paso, index) => (
                        <Card
                          key={paso}
                          sx={{
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #23272F 0%, #1A1D23 100%)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            p: 2,
                            position: 'relative'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${selectedSegmento.color === 'primary' ? '#3B82F6' : 
                                  selectedSegmento.color === 'success' ? '#10B981' : 
                                  selectedSegmento.color === 'secondary' ? '#8B5CF6' : 
                                  selectedSegmento.color === 'info' ? '#06B6D4' : 
                                  selectedSegmento.color === 'warning' ? '#F59E0B' : '#EF4444'} 0%, 
                                  ${selectedSegmento.color === 'primary' ? '#1D4ED8' : 
                                  selectedSegmento.color === 'success' ? '#059669' : 
                                  selectedSegmento.color === 'secondary' ? '#7C3AED' : 
                                  selectedSegmento.color === 'info' ? '#0891B2' : 
                                  selectedSegmento.color === 'warning' ? '#D97706' : '#DC2626'} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                mt: 0.5
                              }}
                            >
                              <Typography variant="body2" sx={{ 
                                fontWeight: 700, 
                                color: 'white',
                                fontSize: '0.875rem'
                              }}>
                                {index + 1}
                              </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ 
                              color: 'white',
                              fontSize: '1rem',
                              lineHeight: 1.5
                            }}>
                              {paso}
                            </Typography>
                          </Box>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, fontSize: { xs: '0.875rem', md: '0.75rem' } }}>
                    Tiempo estimado: {selectedSegmento.ejemploFlujo.tiempoEstimado}
                  </Typography>
                </CardContent>
              </Card>
            </DialogContent>
            <DialogActions sx={{ p: { xs: 3, md: 2 } }}>
              <Button 
                onClick={handleCloseDetails} 
                color="primary"
                sx={{ 
                  fontSize: { xs: '1rem', md: '0.875rem' },
                  minHeight: { xs: 48, md: 40 }
                }}
              >
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Segmentos; 
