import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useMXNBBalance } from '../hooks/useMXNBBalance';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMockApp } from '../context/MockAppContext';

interface MXNBBalanceProps {
  showAddTokenButton?: boolean;
  compact?: boolean;
  onOpenSend?: () => void;
  onOpenReceive?: () => void;
}

const MXNB_TOKEN_DATA = {
  address: '0x82B9e52b26A2954E113F94Ff26647754d5a4247D',
  symbol: 'MXNB',
  decimals: 18,
  image: 'https://your-token-image-url.com/mxnb.png',
};

const MXNBBalance: React.FC<MXNBBalanceProps> = ({ 
  showAddTokenButton = true, 
  compact = false,
  onOpenSend,
  onOpenReceive
}) => {
  const { balance, user } = useMockApp();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [prevBalance, setPrevBalance] = useState<number | null>(null);

  // Simular refresco de balance
  const handleRefresh = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
    // Simulación: no cambia el balance, pero podrías randomizarlo si quieres
  };

  // Detectar cambio de balance (alerta animada)
  React.useEffect(() => {
    const mxnb = balance.find(b => b.symbol === 'MXNB')?.balance ?? 0;
    if (prevBalance !== null && mxnb !== prevBalance) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1500);
    }
    setPrevBalance(mxnb);
  }, [balance]);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1200);
  };

  const handleAddMXNBToken = () => {
    if (window.ethereum) {
      window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0x82B9e52b26A2954E113F94Ff26647754d5a4247D',
            symbol: 'MXNB',
            decimals: 18,
            image: 'https://your-token-image-url.com/mxnb.png'
          }
        }
      })
      .then((success: boolean) => {
        if (success) {
          alert('¡Token MXNB agregado a tu wallet!');
        } else {
          alert('No se pudo agregar el token.');
        }
      })
      .catch((error: any) => {
        alert('Error al agregar el token: ' + error.message);
      });
    } else {
      alert('MetaMask no está disponible');
    }
  };

  // Funciones para manejar envío y recepción
  const handleSendPayment = () => {
    if (onOpenSend) {
      onOpenSend();
    } else {
      alert('Función de envío de pago no implementada.');
    }
  };

  const handleReceivePayment = () => {
    if (onOpenReceive) {
      onOpenReceive();
    } else {
      alert('Función de recepción de pago no implementada.');
    }
  };

  if (compact) {
    const mxnb = balance.find(b => b.symbol === 'MXNB')?.balance ?? 0;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          MXNB:
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {mxnb.toFixed(2)} MXNB
        </Typography>
        <Tooltip title="Actualizar saldo">
          <IconButton size="small" onClick={handleRefresh}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  const mxnbBalance = balance.find(b => b.symbol === 'MXNB')?.balance ?? 0;

  return (
    <Card sx={{ 
      borderRadius: 3, 
      background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)', 
      color: 'white', 
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
      p: { xs: 2, md: 3 }
    }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Balance MXNB
          </Typography>
          {showAddTokenButton && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleOpenModal}
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.5 },
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Agregar Token
            </Button>
          )}
        </Box>
        
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold', 
            mb: { xs: 1, md: 2 },
            fontSize: { xs: '2rem', md: '3rem' }
          }}>
            {mxnbBalance.toLocaleString('es-MX', { 
              style: 'currency', 
              currency: 'MXN',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Typography>
          <Typography variant="body1" sx={{ 
            opacity: 0.8,
            fontSize: { xs: '1rem', md: '1.125rem' }
          }}>
            Stablecoin MXNB
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 3 }
        }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSendPayment}
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              px: { xs: 3, md: 4 },
              py: { xs: 1.5, md: 2 },
              minHeight: { xs: 48, md: 56 },
              backgroundColor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Enviar
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleReceivePayment}
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              px: { xs: 3, md: 4 },
              py: { xs: 1.5, md: 2 },
              minHeight: { xs: 48, md: 56 },
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Recibir
          </Button>
        </Box>

        {/* Información adicional */}
        <Box sx={{ 
          mt: { xs: 3, md: 4 },
          p: { xs: 2, md: 3 },
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 2
        }}>
          <Typography variant="body2" sx={{ 
            textAlign: 'center',
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}>
            <strong>Nota:</strong> MXNB es un stablecoin 1:1 con el peso mexicano.
          </Typography>
        </Box>
      </CardContent>

      {/* Modal para agregar token */}
      <Dialog 
        open={open} 
        onClose={handleCloseModal}
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
        <DialogTitle sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }}>Agregar MXNB a tu wallet</DialogTitle>
        <DialogContent sx={{ p: { xs: 3, md: 2 } }}>
          <Typography variant="body1" sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: '1rem', md: '1rem' } }}>
            Para agregar MXNB a tu wallet, necesitas:
          </Typography>
          
          <Box sx={{ mb: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ mb: { xs: 1, md: 2 }, fontWeight: 700, fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
              Dirección del Contrato MXNB
            </Typography>
            <Box sx={{ 
              p: { xs: 2, md: 2 }, 
              bgcolor: 'rgba(255,255,255,0.1)', 
              borderRadius: 1, 
              fontFamily: 'monospace',
              fontSize: { xs: '1rem', md: '1rem' }, // Cambiado de 0.875rem a 1rem en mobile
              wordBreak: 'break-all'
            }}>
              0x1234567890abcdef1234567890abcdef12345678
            </Box>
          </Box>
          
          <Box sx={{ mb: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ mb: { xs: 1, md: 2 }, fontWeight: 700, fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
              Red
            </Typography>
            <Chip 
              label="Arbitrum Sepolia" 
              color="primary" 
              sx={{ fontSize: { xs: '1rem', md: '1rem' } }} // Cambiado de 0.875rem a 1rem en mobile
            />
          </Box>
          
          <Box sx={{ mb: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ mb: { xs: 1, md: 2 }, fontWeight: 700, fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
              Símbolo
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1rem' } }}>
              MXNB
            </Typography>
          </Box>
          
          <Box sx={{ mb: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ mb: { xs: 1, md: 2 }, fontWeight: 700, fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
              Decimales
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1rem' } }}>
              18
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 3, md: 2 } }}>
          <Button 
            onClick={handleCloseModal}
            sx={{ 
              fontSize: { xs: '1rem', md: '0.875rem' },
              px: { xs: 3, md: 4 },
              py: { xs: 1.5, md: 2 },
              minHeight: { xs: 48, md: 40 }
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default MXNBBalance; 