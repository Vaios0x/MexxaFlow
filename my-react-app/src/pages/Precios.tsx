import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Divider 
} from '@mui/material';

const planesData = [
  {
    nombre: 'Básico',
    precio: '0',
    caracteristicas: [
      'Hasta 5 transacciones/mes',
      'Soporte por correo',
      'Sin comisiones'
    ],
    recomendado: false
  },
  {
    nombre: 'Pro',
    precio: '19.99',
    caracteristicas: [
      'Hasta 50 transacciones/mes',
      'Soporte prioritario',
      'Reportes detallados',
      'Sin comisiones'
    ],
    recomendado: true
  },
  {
    nombre: 'Enterprise',
    precio: 'Personalizado',
    caracteristicas: [
      'Transacciones ilimitadas',
      'Soporte dedicado 24/7',
      'Integración personalizada',
      'Sin comisiones'
    ],
    recomendado: false
  }
];

const Precios: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ mb: 4 }}
      >
        Planes y Precios
      </Typography>
      
      <Grid container spacing={4}>
        {planesData.map((plan, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                border: plan.recomendado ? '2px solid' : 'none',
                borderColor: plan.recomendado ? 'primary.main' : 'transparent',
                transform: plan.recomendado ? 'scale(1.05)' : 'none'
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  color={plan.recomendado ? 'primary' : 'inherit'}
                >
                  {plan.nombre}
                </Typography>
                
                <Typography 
                  variant="h3" 
                  component="p" 
                  sx={{ my: 2 }}
                >
                  {plan.precio === 'Personalizado' 
                    ? plan.precio 
                    : `$${plan.precio}/mes`}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                {plan.caracteristicas.map((caracteristica, idx) => (
                  <Typography 
                    key={idx} 
                    variant="body1" 
                    sx={{ my: 1 }}
                  >
                    ✅ {caracteristica}
                  </Typography>
                ))}
                
                <Button 
                  variant={plan.recomendado ? 'contained' : 'outlined'} 
                  color="primary" 
                  sx={{ mt: 3, width: '100%' }}
                >
                  Elegir Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Precios; 