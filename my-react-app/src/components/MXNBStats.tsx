import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Divider
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useMXNBBalance } from '../hooks/useMXNBBalance';

interface MXNBStatsProps {
  showDetailedStats?: boolean;
}

const MXNBStats: React.FC<MXNBStatsProps> = ({ showDetailedStats = true }) => {
  const { balance, loading, isConnected } = useMXNBBalance();

  // Datos mock para estadísticas (en un caso real, estos vendrían de una API)
  const mockStats = {
    totalTransactions: 156,
    monthlyGrowth: 12.5,
    averageTransaction: 850.50,
    topTransaction: 5000.00,
    weeklyVolume: 12500.75
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    });
  };

  if (!isConnected) {
    return (
      <Card sx={{ borderRadius: 3, p: 3 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Conecta tu billetera para ver las estadísticas de MXNB
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      {/* Estadísticas principales */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <AccountBalanceWalletIcon 
                color="primary" 
                sx={{ fontSize: 40, mb: 1 }} 
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Balance Actual
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {loading ? '...' : formatCurrency(balance || 0)}
              </Typography>
              <Chip 
                label="MXNB" 
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <TrendingUpIcon 
                color="success" 
                sx={{ fontSize: 40, mb: 1 }} 
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Crecimiento Mensual
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                +{mockStats.monthlyGrowth}%
              </Typography>
              <Chip 
                label="Este mes" 
                size="small" 
                color="success" 
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <TrendingDownIcon 
                color="info" 
                sx={{ fontSize: 40, mb: 1 }} 
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Transacciones
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {mockStats.totalTransactions}
              </Typography>
              <Chip 
                label="Total" 
                size="small" 
                color="info" 
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <AccountBalanceWalletIcon 
                color="warning" 
                sx={{ fontSize: 40, mb: 1 }} 
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Volumen Semanal
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {formatCurrency(mockStats.weeklyVolume)}
              </Typography>
              <Chip 
                label="MXNB" 
                size="small" 
                color="warning" 
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {showDetailedStats && (
        <>
          <Divider sx={{ my: 3 }} />
          
          {/* Estadísticas detalladas */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Métricas de Transacciones
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Transacción Promedio
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(mockStats.averageTransaction)}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={70} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Transacción Máxima
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(mockStats.topTransaction)}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={100} 
                      color="success"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Eficiencia de Red
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        99.8%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={99.8} 
                      color="info"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Resumen de Actividad
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'success.light',
                      color: 'success.contrastText'
                    }}>
                      <Typography variant="body2">
                        Transacciones Exitosas
                      </Typography>
                      <Chip label="98%" size="small" color="success" />
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'info.light',
                      color: 'info.contrastText'
                    }}>
                      <Typography variant="body2">
                        Tiempo Promedio
                      </Typography>
                      <Chip label="2.3s" size="small" color="info" />
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'warning.light',
                      color: 'warning.contrastText'
                    }}>
                      <Typography variant="body2">
                        Comisiones Ahorradas
                      </Typography>
                      <Chip label="$1,250 MXN" size="small" color="warning" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default MXNBStats; 