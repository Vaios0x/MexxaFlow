import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button, 
  Divider,
  TextField,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tooltip,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CancelIcon from '@mui/icons-material/Cancel';

// Configuración de Analytics (simulado)
const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  console.log('Analytics Event:', eventName, eventProperties);
  // Aquí iría la integración real con Google Analytics, Amplitude, etc.
  // window.gtag('event', eventName, eventProperties);
};

// Datos de planes con variantes para A/B testing
const planesData = [
  {
    nombre: 'Básico',
    precio: '0',
    caracteristicas: [
      'Hasta 5 transacciones/mes',
      'Soporte por correo',
      'Comisión: 0.5% por transacción',
      'Sin cuota mensual'
    ],
    recomendado: false,
    color: 'primary',
    ejemploAhorro: {
      escenario: 'Freelancer principiante',
      transacciones: 3,
      montoTotal: 15000,
      ahorroMensual: 75,
      ahorroAnual: 900
    },
    // Variantes para A/B testing
    ctaVariants: [
      { texto: 'Comenzar Gratis', color: 'primary' },
      { texto: 'Prueba Ahora', color: 'secondary' }
    ]
  },
  {
    nombre: 'Pro',
    precio: '19.99',
    caracteristicas: [
      'Hasta 50 transacciones/mes',
      'Soporte prioritario',
      'Reportes detallados',
      'Comisión: 0.3% por transacción'
    ],
    recomendado: true,
    color: 'success',
    ejemploAhorro: {
      escenario: 'Negocio en crecimiento',
      transacciones: 30,
      montoTotal: 150000,
      ahorroMensual: 450,
      ahorroAnual: 5400
    },
    // Variantes para A/B testing
    ctaVariants: [
      { texto: 'Comenzar Ahora', color: 'success' },
      { texto: 'Elegir Plan', color: 'primary' }
    ]
  },
  {
    nombre: 'Enterprise',
    precio: 'Personalizado',
    caracteristicas: [
      'Transacciones ilimitadas',
      'Soporte dedicado 24/7',
      'Integración personalizada',
      'Comisión: 0.1% por transacción'
    ],
    recomendado: false,
    color: 'secondary',
    ejemploAhorro: {
      escenario: 'Empresa con alto volumen',
      transacciones: 200,
      montoTotal: 1000000,
      ahorroMensual: 1000,
      ahorroAnual: 12000
    },
    // Variantes para A/B testing
    ctaVariants: [
      { texto: 'Comenzar Ahora', color: 'secondary' },
      { texto: 'Elegir Plan', color: 'primary' }
    ]
  }
];

const faqData = [
  {
    pregunta: '¿Cómo se calculan las comisiones?',
    respuesta: 'Las comisiones se calculan sobre el monto de cada transacción. Por ejemplo, en el plan Básico, una transacción de $1,000 MXN tendría una comisión de $5 MXN (0.5%).'
  },
  {
    pregunta: '¿Puedo cambiar de plan en cualquier momento?',
    respuesta: 'Sí, puedes cambiar de plan en cualquier momento. Los cambios se aplican inmediatamente y se prorratean los costos.'
  },
  {
    pregunta: '¿Hay costos ocultos?',
    respuesta: 'No hay costos ocultos. Solo pagas la cuota mensual del plan (si aplica) y las comisiones por transacción según tu plan.'
  },
  {
    pregunta: '¿Qué incluye el soporte prioritario?',
    respuesta: 'El soporte prioritario incluye respuesta en menos de 2 horas, chat en vivo y asistencia telefónica durante horario laboral.'
  }
];

const caracteristicas = [
  'Transacciones por mes',
  'Comisión por transacción',
  'Soporte',
  'Reportes'
];

const Precios: React.FC = () => {
  const [transactionCount, setTransactionCount] = useState(10);
  const [inputError, setInputError] = useState('');
  const [openContactModal, setOpenContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    interes: '',
    mensaje: ''
  });

  const calculateMonthlyCost = (index: number) => {
    const baseRates = [9.99, 29.99, 49.99]; // Tasas base para cada plan
    const transactionVolume = transactionCount; // Usar el estado de transactionCount

    // Lógica de cálculo de precio basado en el volumen de transacciones
    const multiplier = index === 0 ? 1 : (index === 1 ? 1.5 : 2);
    return baseRates[index] * multiplier * (transactionVolume / 10);
  };

  // Tracking de eventos
  const handlePlanSelection = (planNombre: string) => {
    trackEvent('plan_selected', { plan: planNombre });
  };

  const handleContactSubmit = () => {
    trackEvent('contact_form_submitted', { 
      plan: contactForm.interes,
      source: 'pricing_page'
    });
    // Lógica de envío de formulario
    setOpenContactModal(false);
  };

  // Manejo de formulario de contacto
  const handleContactChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  // Renderizado de tooltips explicativos
  const renderTooltip = (content: string) => (
    <Tooltip 
      title={content} 
      placement="top" 
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'primary.main',
            color: 'white',
            fontSize: '0.875rem'
          }
        }
      }}
    >
      <HelpOutlineIcon 
        color="primary" 
        sx={{ 
          ml: 1, 
          fontSize: 20, 
          verticalAlign: 'middle',
          cursor: 'help'
        }} 
      />
    </Tooltip>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header con tracking de impresión */}
      <Box 
        sx={{ textAlign: 'center', mb: 6 }}
        onMouseEnter={() => trackEvent('pricing_page_viewed')}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 900, 
            mb: 2, 
            background: 'linear-gradient(45deg, #3B82F6, #10B981)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Planes y Precios
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Elige el plan perfecto para tu negocio
          {renderTooltip('Cada plan está diseñado para diferentes volúmenes de transacciones y necesidades de negocio')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sin costos ocultos. Solo pagas por lo que usas.
        </Typography>
      </Box>

      {/* Calculadora de Comisiones */}
      <Card sx={{ mb: 6, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CalculateIcon sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Calculadora de Comisiones
            </Typography>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 4 }}>
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Monto por transacción</Typography>
              {/* Calculadora de comisiones - hacer responsive */}
              <TextField
                fullWidth
                type="number"
                value={transactionCount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value < 0) {
                    setInputError('El monto debe ser un número positivo');
                    return;
                  }
                  if (value > 1000000) {
                    setInputError('El monto máximo es de $1,000,000');
                    return;
                  }
                  setTransactionCount(value);
                  setInputError('');
                }}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1, fontSize: { xs: '1rem', md: '1rem' } }}>$</Typography>,
                }}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  borderRadius: 1,
                  '& .MuiInputBase-root': {
                    minHeight: { xs: 56, md: 48 },
                    fontSize: { xs: '1rem', md: '1rem' }
                  },
                  '& input': { 
                    color: 'white',
                    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                      WebkitAppearance: 'none',
                      margin: 0
                    }
                  }
                }}
                inputProps={{
                  min: 0,
                  max: 1000000,
                  step: 100
                }}
              />
              {inputError && (
                <Alert severity="error" sx={{ mt: 2, bgcolor: 'rgba(255,0,0,0.1)', color: 'white' }}>
                  <AlertTitle>Error de Validación</AlertTitle>
                  {inputError}
                </Alert>
              )}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Transacciones por mes</Typography>
              <Slider
                value={transactionCount}
                onChange={(_, value) => setTransactionCount(value as number)}
                min={1}
                max={100}
                marks={[
                  { value: 1, label: '1' },
                  { value: 50, label: '50' },
                  { value: 100, label: '100' }
                ]}
                sx={{ color: 'white' }}
              />
            </Box>
          </Box>

          {/* Resultados de la calculadora */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { default: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {planesData.map((plan, index) => (
              <Box 
                key={plan.nombre} 
                sx={{ 
                  textAlign: 'center', 
                  p: 2, 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  borderRadius: 2,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>{plan.nombre}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  ${calculateMonthlyCost(index).toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  por mes
                </Typography>
              </Box>
            ))}
          </Box>
          
          {/* Botón de contacto para planes personalizados */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                trackEvent('contact_sales_clicked');
                setOpenContactModal(true);
              }}
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Necesito un plan personalizado
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Modal de Contacto */}
      {/* Modal de contacto - hacer fullscreen en mobile */}
      <Dialog
        open={openContactModal}
        onClose={() => setOpenContactModal(false)}
        fullScreen={window.innerWidth < 600}
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
        <DialogTitle sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }}>Contacta con Ventas</DialogTitle>
        <DialogContent sx={{ p: { xs: 3, md: 2 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 3 }, mt: 1 }}>
            <TextField
              label="Nombre"
              value={contactForm.nombre}
              onChange={(e) => handleContactChange('nombre', e.target.value)}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  minHeight: { xs: 56, md: 48 },
                  fontSize: { xs: '1rem', md: '1rem' }
                },
                '& .MuiInputLabel-root': {
                  fontSize: { xs: '1rem', md: '1rem' }
                }
              }}
            />
            <TextField
              label="Email"
              type="email"
              value={contactForm.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  minHeight: { xs: 56, md: 48 },
                  fontSize: { xs: '1rem', md: '1rem' }
                },
                '& .MuiInputLabel-root': {
                  fontSize: { xs: '1rem', md: '1rem' }
                }
              }}
            />
            <TextField
              label="Teléfono"
              type="tel"
              value={contactForm.telefono}
              onChange={(e) => handleContactChange('telefono', e.target.value)}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  minHeight: { xs: 56, md: 48 },
                  fontSize: { xs: '1rem', md: '1rem' }
                },
                '& .MuiInputLabel-root': {
                  fontSize: { xs: '1rem', md: '1rem' }
                }
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ fontSize: { xs: '1rem', md: '1rem' } }}>Plan de Interés</InputLabel>
              <Select
                value={contactForm.interes}
                label="Plan de Interés"
                onChange={(e) => handleContactChange('interes', e.target.value as string)}
                sx={{
                  '& .MuiSelect-select': {
                    minHeight: { xs: 56, md: 48 },
                    fontSize: { xs: '1rem', md: '1rem' }
                  }
                }}
              >
                {planesData.map(plan => (
                  <MenuItem key={plan.nombre} value={plan.nombre}>
                    {plan.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Mensaje"
              multiline
              rows={4}
              value={contactForm.mensaje}
              onChange={(e) => handleContactChange('mensaje', e.target.value)}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  fontSize: { xs: '1rem', md: '1rem' }
                },
                '& .MuiInputLabel-root': {
                  fontSize: { xs: '1rem', md: '1rem' }
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 3, md: 2 } }}>
          <Button 
            onClick={() => setOpenContactModal(false)} 
            color="secondary"
            sx={{ 
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleContactSubmit} 
            color="primary" 
            variant="contained"
            sx={{ 
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Planes */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
          Planes Disponibles
        </Typography>
        
        {/* Cards de planes - hacer responsive */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
          gap: { xs: 3, md: 4 } 
        }}>
          {planesData.map((plan, index) => (
            <Card 
              key={plan.nombre}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                border: plan.recomendado ? '3px solid' : '1px solid',
                borderColor: plan.recomendado ? 'success.main' : 'grey.300',
                transform: plan.recomendado ? 'scale(1.05)' : 'none',
                transition: 'transform 0.3s ease',
                width: '100%',
                '&:hover': {
                  transform: plan.recomendado ? 'scale(1.08)' : 'scale(1.02)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                }
              }}
            >
              {plan.recomendado && (
                <Box sx={{ 
                  bgcolor: 'success.main', 
                  color: 'white', 
                  textAlign: 'center', 
                  py: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}>
                  <StarIcon />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    MÁS POPULAR
                  </Typography>
                </Box>
              )}
              
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: { xs: 3, md: 4 } }}>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  color={plan.recomendado ? 'success.main' : 'inherit'}
                  sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.5rem', md: '2.125rem' } }}
                >
                  {plan.nombre}
                </Typography>
                
                <Typography 
                  variant="h3" 
                  component="p" 
                  sx={{ my: 3, fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' } }}
                >
                  {plan.precio === 'Personalizado' 
                    ? plan.precio 
                    : `$${plan.precio}/mes`}
                </Typography>
                
                <Divider sx={{ my: 3 }} />
                
                {plan.caracteristicas.map((caracteristica, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                    <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                      {caracteristica}
                    </Typography>
                  </Box>
                ))}
                
                <Button 
                  variant="contained"
                  color={plan.recomendado ? 'success' : 'primary'}
                  size="large"
                  fullWidth
                  sx={{ 
                    mt: 3,
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    fontWeight: 'bold'
                  }}
                  onClick={() => handlePlanSelection(plan.nombre)}
                >
                  {plan.recomendado ? 'COMENZAR AHORA' : 'SABER MÁS'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Tabla Comparativa Mejorada */}
      {/* Tabla de comparación de precios - convertir a cards en mobile */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center', fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Comparación de Planes
          </Typography>
          
        {/* Vista de tabla para desktop */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <TableContainer component={Paper} sx={{ 
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    fontSize: '1.125rem'
                  }}>
                    Característica
                  </TableCell>
                  {planesData.map((plan, index) => (
                    <TableCell
                      key={plan.nombre}
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        bgcolor: index === 0 ? 'rgba(59,130,246,0.8)' : 
                                index === 1 ? 'rgba(16,185,129,0.8)' : 
                                'rgba(139,92,246,0.8)',
                        fontSize: '1.125rem'
                      }}
                    >
                      {plan.nombre}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {caracteristicas.map((caracteristica) => (
                  <TableRow key={caracteristica}>
                    <TableCell sx={{ 
                      fontWeight: 'bold',
                      bgcolor: 'rgba(255,255,255,0.05)',
                      fontSize: '1rem'
                    }}>
                      {caracteristica}
                    </TableCell>
                    {planesData.map((plan, index) => {
                      const isIncluded = plan.caracteristicas.includes(caracteristica);
                      return (
                        <TableCell
                          key={plan.nombre}
                          sx={{
                            textAlign: 'center',
                            bgcolor: isIncluded ? 
                              (index === 0 ? 'rgba(34,197,94,0.2)' : 
                               index === 1 ? 'rgba(34,197,94,0.2)' : 
                               'rgba(34,197,94,0.2)') : 
                              'rgba(239,68,68,0.1)',
                            borderLeft: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)'
                          }}
                        >
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1
                          }}>
                            {isIncluded ? (
                              <>
                                <CheckCircleIcon sx={{ 
                                  color: 'success.main', 
                                  fontSize: '1.5rem',
                                  filter: 'drop-shadow(0 2px 4px rgba(34,197,94,0.3))'
                                }} />
                                <Typography sx={{ 
                                  color: 'success.main', 
                                  fontWeight: 600,
                                  fontSize: '0.875rem'
                                }}>
                                  Incluido
                                </Typography>
                              </>
                            ) : (
                              <>
                                <CancelIcon sx={{ 
                                  color: 'error.main', 
                                  fontSize: '1.5rem',
                                  filter: 'drop-shadow(0 2px 4px rgba(239,68,68,0.3))'
                                }} />
                                <Typography sx={{ 
                                  color: 'error.main', 
                                  fontWeight: 600,
                                  fontSize: '0.875rem'
                                }}>
                                  No incluido
                                </Typography>
                              </>
                            )}
                          </Box>
                        </TableCell>
                      );
                    })}
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Vista de cards para mobile */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Stack spacing={3}>
            {caracteristicas.map((caracteristica) => (
              <Card
                key={caracteristica}
                sx={{
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #23272F 0%, #1A1D23 100%)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  p: 3,
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Typography variant="h6" sx={{ 
                  fontWeight: 700, 
                  mb: 3, 
                  color: 'white',
                  fontSize: '1.25rem',
                  textAlign: 'center',
                  pb: 2,
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {caracteristica}
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {planesData.map((plan, index) => {
                    const isIncluded = plan.caracteristicas.includes(caracteristica);
                    const planColors = [
                      { bg: 'rgba(59,130,246,0.2)', border: 'rgba(59,130,246,0.4)' },
                      { bg: 'rgba(16,185,129,0.2)', border: 'rgba(16,185,129,0.4)' },
                      { bg: 'rgba(139,92,246,0.2)', border: 'rgba(139,92,246,0.4)' }
                    ];
                    
                    return (
                      <Box
                        key={plan.nombre}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 3,
                          borderRadius: 3,
                          background: isIncluded ? planColors[index].bg : 'rgba(239,68,68,0.1)',
                          border: `2px solid ${isIncluded ? planColors[index].border : 'rgba(239,68,68,0.3)'}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 20px ${isIncluded ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: planColors[index].bg,
                            border: `2px solid ${planColors[index].border}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: 'white'
                          }}>
                            {index === 0 ? 'B' : index === 1 ? 'P' : 'E'}
                          </Box>
                          <Typography variant="body1" sx={{ 
                            fontWeight: 600,
                            color: 'white',
                            fontSize: '1.125rem'
                          }}>
                            {plan.nombre}
                          </Typography>
                        </Box>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          p: 1,
                          borderRadius: 2,
                          background: isIncluded ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'
                        }}>
                          {isIncluded ? (
                            <>
                              <CheckCircleIcon sx={{ 
                                color: 'success.main', 
                                fontSize: '1.5rem',
                                filter: 'drop-shadow(0 2px 4px rgba(34,197,94,0.3))'
                              }} />
                              <Typography variant="body2" sx={{ 
                                color: 'success.main', 
                                fontWeight: 700,
                                fontSize: '0.875rem'
                              }}>
                                Incluido
                              </Typography>
                            </>
                          ) : (
                            <>
                              <CancelIcon sx={{ 
                                color: 'error.main', 
                                fontSize: '1.5rem',
                                filter: 'drop-shadow(0 2px 4px rgba(239,68,68,0.3))'
                              }} />
                              <Typography variant="body2" sx={{ 
                                color: 'error.main', 
                                fontWeight: 700,
                                fontSize: '0.875rem'
                              }}>
                                No incluido
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Ejemplos de Ahorro */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
          Casos de Ahorro Real
        </Typography>
        {/* Cards de casos de ahorro - hacer responsive */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
          gap: { xs: 3, md: 4 } 
        }}>
          {planesData.map((plan) => (
            <Card key={plan.nombre} sx={{ 
              height: '100%', 
              p: { xs: 3, md: 3 },
              width: '100%'
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
                {plan.ejemploAhorro.escenario}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>Transacciones:</Typography>
                <Typography fontWeight="bold" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>{plan.ejemploAhorro.transacciones}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>Monto Total:</Typography>
                <Typography fontWeight="bold" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>${plan.ejemploAhorro.montoTotal.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>Ahorro Mensual:</Typography>
                <Typography fontWeight="bold" color="success.main" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                  ${plan.ejemploAhorro.ahorroMensual.toLocaleString()}
                </Typography>
              </Box>
              <Chip 
                label={`Ahorro Anual: $${plan.ejemploAhorro.ahorroAnual.toLocaleString()}`} 
                color="primary" 
                variant="outlined" 
                sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', md: '0.875rem' } }} 
              />
      </Card>
          ))}
        </Box>
      </Box>

      {/* FAQ */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
          Preguntas Frecuentes
        </Typography>
        
        {faqData.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2, borderRadius: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {faq.pregunta}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary">
                {faq.respuesta}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Call to Action con A/B Testing */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        borderRadius: 4, 
        p: 6, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)'
      }}>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>
          ¡Comienza tu viaje con MexxaFlow!
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.8 }}>
          Transforma tus finanzas con pagos instantáneos y sin complicaciones
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          {planesData[0].ctaVariants.map((variant, index) => (
        <Button 
              key={index}
          variant="contained" 
              color={variant.color as 'primary' | 'secondary'}
          size="large"
              startIcon={<SendIcon />}
          sx={{ 
            px: 4,
                py: 2, 
                fontWeight: 'bold', 
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}
              onClick={() => trackEvent('cta_clicked', { variant: variant.texto })}
            >
              {variant.texto}
        </Button>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Precios; 