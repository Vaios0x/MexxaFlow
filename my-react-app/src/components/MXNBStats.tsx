import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Divider,
  Paper
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useMockApp } from '../context/MockAppContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

interface MXNBStatsProps {
  showDetailedStats?: boolean;
}

const MXNBStats: React.FC<MXNBStatsProps> = ({ showDetailedStats = true }) => {
  const { balance, stats, user } = useMockApp();

  // Datos mock para gráfico histórico (últimos 7 días)
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const mockHistory = [12000, 12300, 12100, 12500, 12700, 12600, balance.find(b => b.symbol === 'MXNB')?.balance || 0];
  const chartData = {
    labels: days,
    datasets: [
      {
        label: 'Balance MXNB',
        data: mockHistory,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: '#10B981',
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: { color: '#fff' },
      },
      x: {
        ticks: { color: '#fff' },
      },
    },
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    });
  };

  if (!user) {
    return (
      <Card sx={{ borderRadius: 3, p: 3 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Inicia sesión para ver las estadísticas de MXNB
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Gráfico histórico de balance */}
      <Card sx={{ 
        borderRadius: 3, 
        mb: 4, 
        background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)', 
        color: 'white',
        boxShadow: '0 8px 32px rgba(59,130,246,0.2)'
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              fontWeight: 700, 
              color: 'white',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}
          >
            📈 Evolución del Balance (7 días)
          </Typography>
          <Line data={chartData} options={chartOptions} height={80} />
        </CardContent>
      </Card>

      {/* Estadísticas principales */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: { xs: 2, sm: 3 },
        mb: 4,
        width: '100%'
      }}>
        {/* Balance Actual */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.05) 100%)',
            border: '1px solid rgba(59,130,246,0.2)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(59,130,246,0.2)'
            }
          }}
        >
          {/* Efecto de brillo */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 40,
              height: 40,
              background: 'rgba(59,130,246,0.2)',
              borderRadius: '50%',
              filter: 'blur(15px)'
            }}
          />
          
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <AccountBalanceWalletIcon 
              sx={{ 
                fontSize: { xs: 32, sm: 40 }, 
                mb: 1.5,
                color: '#3B82F6',
                filter: 'drop-shadow(0 2px 4px rgba(59,130,246,0.3))'
              }} 
            />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.secondary', 
                mb: 1,
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Balance Actual
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#3B82F6',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: 1.5,
                textShadow: '0 2px 4px rgba(59,130,246,0.2)'
              }}
            >
              {formatCurrency(balance.find(b => b.symbol === 'MXNB')?.balance || 0)}
            </Typography>
            <Chip 
              label="MXNB" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(59,130,246,0.1)',
                color: '#3B82F6',
                border: '1px solid rgba(59,130,246,0.3)',
                fontWeight: 600
              }}
            />
          </Box>
        </Paper>

        {/* Crecimiento Mensual */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)',
            border: '1px solid rgba(16,185,129,0.2)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(16,185,129,0.2)'
            }
          }}
        >
          {/* Efecto de brillo */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 40,
              height: 40,
              background: 'rgba(16,185,129,0.2)',
              borderRadius: '50%',
              filter: 'blur(15px)'
            }}
          />
          
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <TrendingUpIcon 
              sx={{ 
                fontSize: { xs: 32, sm: 40 }, 
                mb: 1.5,
                color: '#10B981',
                filter: 'drop-shadow(0 2px 4px rgba(16,185,129,0.3))'
              }} 
            />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.secondary', 
                mb: 1,
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Crecimiento Mensual
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#10B981',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: 1.5,
                textShadow: '0 2px 4px rgba(16,185,129,0.2)'
              }}
            >
              +{stats.monthlyGrowth}%
            </Typography>
            <Chip 
              label="Este mes" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(16,185,129,0.1)',
                color: '#10B981',
                border: '1px solid rgba(16,185,129,0.3)',
                fontWeight: 600
              }}
            />
          </Box>
        </Paper>

        {/* Transacciones */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.05) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(99,102,241,0.2)'
            }
          }}
        >
          {/* Efecto de brillo */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 40,
              height: 40,
              background: 'rgba(99,102,241,0.2)',
              borderRadius: '50%',
              filter: 'blur(15px)'
            }}
          />
          
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <TrendingDownIcon 
              sx={{ 
                fontSize: { xs: 32, sm: 40 }, 
                mb: 1.5,
                color: '#6366F1',
                filter: 'drop-shadow(0 2px 4px rgba(99,102,241,0.3))'
              }} 
            />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.secondary', 
                mb: 1,
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Transacciones
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#6366F1',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: 1.5,
                textShadow: '0 2px 4px rgba(99,102,241,0.2)'
              }}
            >
              {stats.totalTransactions}
            </Typography>
            <Chip 
              label="Total" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(99,102,241,0.1)',
                color: '#6366F1',
                border: '1px solid rgba(99,102,241,0.3)',
                fontWeight: 600
              }}
            />
          </Box>
        </Paper>

        {/* Volumen Semanal */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0.05) 100%)',
            border: '1px solid rgba(245,158,11,0.2)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(245,158,11,0.2)'
            }
          }}
        >
          {/* Efecto de brillo */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 40,
              height: 40,
              background: 'rgba(245,158,11,0.2)',
              borderRadius: '50%',
              filter: 'blur(15px)'
            }}
          />
          
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <AccountBalanceWalletIcon 
              sx={{ 
                fontSize: { xs: 32, sm: 40 }, 
                mb: 1.5,
                color: '#F59E0B',
                filter: 'drop-shadow(0 2px 4px rgba(245,158,11,0.3))'
              }} 
            />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.secondary', 
                mb: 1,
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Volumen Semanal
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#F59E0B',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: 1.5,
                textShadow: '0 2px 4px rgba(245,158,11,0.2)'
              }}
            >
              {formatCurrency(stats.weeklyVolume)}
            </Typography>
            <Chip 
              label="MXNB" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(245,158,11,0.1)',
                color: '#F59E0B',
                border: '1px solid rgba(245,158,11,0.3)',
                fontWeight: 600
              }}
            />
          </Box>
        </Paper>
      </Box>

      {showDetailedStats && (
        <>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          
          {/* Estadísticas detalladas */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 2, sm: 3 },
            width: '100%'
          }}>
            {/* Métricas de Transacciones */}
            <Card sx={{ 
              borderRadius: 3,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 600,
                    fontSize: { xs: '1.125rem', sm: '1.25rem' }
                  }}
                >
                  📊 Métricas de Transacciones
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Transacción Promedio
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                      {formatCurrency(stats.averageTransaction)}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={70} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'rgba(59,130,246,0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#3B82F6'
                      }
                    }}
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Transacción Máxima
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="success.main">
                      {formatCurrency(stats.topTransaction)}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={100} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'rgba(16,185,129,0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#10B981'
                      }
                    }}
                  />
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Eficiencia de Red
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="info.main">
                      99.8%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={99.8} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'rgba(99,102,241,0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#6366F1'
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Resumen de Actividad */}
            <Card sx={{ 
              borderRadius: 3,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 600,
                    fontSize: { xs: '1.125rem', sm: '1.25rem' }
                  }}
                >
                  📈 Resumen de Actividad
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)',
                    border: '1px solid rgba(16,185,129,0.2)'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Transacciones Exitosas
                    </Typography>
                    <Chip 
                      label="98%" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(16,185,129,0.2)',
                        color: '#10B981',
                        fontWeight: 600
                      }} 
                    />
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.05) 100%)',
                    border: '1px solid rgba(99,102,241,0.2)'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Tiempo Promedio
                    </Typography>
                    <Chip 
                      label="2.3s" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(99,102,241,0.2)',
                        color: '#6366F1',
                        fontWeight: 600
                      }} 
                    />
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0.05) 100%)',
                    border: '1px solid rgba(245,158,11,0.2)'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Comisiones Ahorradas
                    </Typography>
                    <Chip 
                      label="$1,250 MXN" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(245,158,11,0.2)',
                        color: '#F59E0B',
                        fontWeight: 600
                      }} 
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MXNBStats; 