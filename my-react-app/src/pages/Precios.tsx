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
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

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
    color: 'primary'
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
    color: 'success'
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
    color: 'secondary'
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

const Precios: React.FC = () => {
  const [transactionAmount, setTransactionAmount] = useState(1000);
  const [monthlyTransactions, setMonthlyTransactions] = useState(10);

  const calculateCommission = (amount: number, planIndex: number) => {
    const rates = [0.005, 0.003, 0.001]; // 0.5%, 0.3%, 0.1%
    return amount * rates[planIndex];
  };

  const calculateMonthlyCost = (planIndex: number) => {
    const monthlyFee = planIndex === 0 ? 0 : planIndex === 1 ? 19.99 : 0;
    const totalTransactions = transactionAmount * monthlyTransactions;
    const commission = calculateCommission(totalTransactions, planIndex);
    return monthlyFee + commission;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
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
              <TextField
                fullWidth
                type="number"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(Number(e.target.value))}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
              />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Transacciones por mes</Typography>
              <Slider
                value={monthlyTransactions}
                onChange={(_, value) => setMonthlyTransactions(value as number)}
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
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {planesData.map((plan, index) => (
              <Box key={plan.nombre} sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
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
        </CardContent>
      </Card>

      {/* Planes */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
          Planes Disponibles
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
          gap: 4 
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
              
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  color={plan.recomendado ? 'success.main' : 'inherit'}
                  sx={{ fontWeight: 700, mb: 2 }}
                >
                  {plan.nombre}
                </Typography>
                
                <Typography 
                  variant="h3" 
                  component="p" 
                  sx={{ my: 3, fontWeight: 900 }}
                >
                  {plan.precio === 'Personalizado' 
                    ? plan.precio 
                    : `$${plan.precio}/mes`}
                </Typography>
                
                <Divider sx={{ my: 3 }} />
                
                {plan.caracteristicas.map((caracteristica, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                    <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body1">
                      {caracteristica}
                    </Typography>
                  </Box>
                ))}
                
                <Button 
                  variant={plan.recomendado ? 'contained' : 'outlined'} 
                  color={plan.recomendado ? 'success' : 'primary'}
                  size="large"
                  sx={{ 
                    mt: 4, 
                    width: '100%', 
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: 16
                  }}
                >
                  {plan.recomendado ? 'Comenzar Ahora' : 'Elegir Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Tabla Comparativa */}
      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
            Comparación de Planes
          </Typography>
          
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Característica</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>Básico</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>Pro</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>Enterprise</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Cuota Mensual</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>$0</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>$19.99</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Personalizada</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Comisión por Transacción</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>0.5%</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>0.3%</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>0.1%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Transacciones/Mes</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>5</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>50</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Ilimitadas</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Soporte</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Email</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Prioritario</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>24/7 Dedicado</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

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

      {/* CTA Final */}
      <Card sx={{ 
        background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)', 
        color: 'white',
        textAlign: 'center',
        p: 4
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          ¿Listo para comenzar?
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Únete a miles de usuarios que ya confían en MexxaFlow
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          sx={{ 
            bgcolor: 'white', 
            color: 'primary.main',
            px: 4,
            py: 1.5,
            fontWeight: 700,
            fontSize: 18,
            '&:hover': {
              bgcolor: 'grey.100'
            }
          }}
        >
          Crear Cuenta Gratis
        </Button>
      </Card>
    </Container>
  );
};

export default Precios; 