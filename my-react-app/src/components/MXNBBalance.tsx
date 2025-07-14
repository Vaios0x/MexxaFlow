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

interface MXNBBalanceProps {
  showAddTokenButton?: boolean;
  compact?: boolean;
}

const MXNB_TOKEN_DATA = {
  address: '0x82B9e52b26A2954E113F94Ff26647754d5a4247D',
  symbol: 'MXNB',
  decimals: 18,
  image: 'https://your-token-image-url.com/mxnb.png',
};

const MXNBBalance: React.FC<MXNBBalanceProps> = ({ 
  showAddTokenButton = true, 
  compact = false 
}) => {
  const { balance, loading, error, refresh, isConnected } = useMXNBBalance();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleRefresh = () => {
    refresh();
  };

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
            image: 'https://your-token-image-url.com/mxnb.png' // Cambia por la URL real si tienes una
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

  if (compact) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          MXNB:
        </Typography>
        {loading ? (
          <CircularProgress size={16} />
        ) : !isConnected ? (
          <Typography variant="body2" color="text.secondary">
            No conectado
          </Typography>
        ) : error ? (
          <Box>
            <Typography variant="body2" color="error">
              Error
            </Typography>
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" fontWeight="bold">
            {balance !== null ? `${balance.toFixed(2)} MXNB` : '0.00 MXNB'}
          </Typography>
        )}
        <Tooltip title="Actualizar saldo">
          <IconButton size="small" onClick={handleRefresh} disabled={loading}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
          color: 'white',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          position: 'relative',
          overflow: 'visible'
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
            position: 'relative'
          }}
        >
          {/* Botón de actualizar */}
          <Tooltip title="Actualizar saldo">
            <IconButton
              onClick={handleRefresh}
              disabled={loading}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              width: 80,
              height: 80,
              mb: 2
            }}
          >
            <AccountBalanceWalletIcon
              sx={{
                fontSize: 48,
                color: 'white'
              }}
            />
          </Avatar>

          <Typography
            variant="h5"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            Balance MXNB
          </Typography>

          {!isConnected ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Conecta tu billetera
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Para ver tu saldo de MXNB
              </Typography>
            </Box>
          ) : loading ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <CircularProgress sx={{ color: 'white', mb: 2 }} />
              <Typography variant="body2">
                Cargando saldo...
              </Typography>
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
                Error: {error}
              </Alert>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleRefresh}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Reintentar
              </Button>
            </Box>
          ) : (
            <>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  fontWeight: 'bold',
                  textShadow: '0 4px 6px rgba(0,0,0,0.2)'
                }}
              >
                {balance !== null 
                  ? `${balance.toLocaleString('es-MX', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })} MXNB`
                  : '0.00 MXNB'
                }
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Chip
                  label="Stablecoin MXNB"
                  color="default"
                  sx={{
                    color: 'white',
                    background: 'rgba(255,255,255,0.2)'
                  }}
                />
                
                {showAddTokenButton && (
                  <Button 
                    variant="outlined" 
                    color="inherit"
                    onClick={handleOpenModal}
                    sx={{ 
                      color: 'white', 
                      borderColor: 'rgba(255,255,255,0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Agregar Token MXNB
                  </Button>
                )}
              </Box>

              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  opacity: 0.7,
                  textAlign: 'center'
                }}
              >
                Actualizado automáticamente
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      {/* Modal para mostrar los datos del token */}
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Agregar MXNB a tu wallet</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Sigue estos pasos para agregar MXNB a tu wallet:
            </Typography>
            <ol style={{ marginLeft: 16, marginBottom: 16, color: '#fff' }}>
              <li>Abre tu wallet (MetaMask, Rabby, etc).</li>
              <li>
                Cámbiate a la red <b>Arbitrum Sepolia</b>.<br/>
                <span style={{ fontSize: 13, color: '#aaa' }}>
                  Si no la tienes, agrégala:<br/>
                  <b>Nombre:</b> Arbitrum Sepolia<br/>
                  <b>RPC:</b> https://sepolia-rollup.arbitrum.io/rpc<br/>
                  <b>Chain ID:</b> 421614<br/>
                  <b>Símbolo:</b> ETH<br/>
                  <b>Block Explorer:</b> https://sepolia.arbiscan.io
                </span>
              </li>
              <li>Ve a la sección “Agregar token” o “Importar token”.</li>
              <li>Copia y pega estos datos:</li>
            </ol>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <strong>Dirección:</strong>
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{MXNB_TOKEN_DATA.address}</Typography>
              <IconButton size="small" onClick={() => handleCopy(MXNB_TOKEN_DATA.address, 'Dirección')}> <ContentCopyIcon fontSize="small" /> </IconButton>
              {copied === 'Dirección' && <Typography color="success.main" variant="caption">¡Copiado!</Typography>}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <strong>Símbolo:</strong>
              <Typography variant="body2">{MXNB_TOKEN_DATA.symbol}</Typography>
              <IconButton size="small" onClick={() => handleCopy(MXNB_TOKEN_DATA.symbol, 'Símbolo')}> <ContentCopyIcon fontSize="small" /> </IconButton>
              {copied === 'Símbolo' && <Typography color="success.main" variant="caption">¡Copiado!</Typography>}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <strong>Decimales:</strong>
              <Typography variant="body2">{MXNB_TOKEN_DATA.decimals}</Typography>
              <IconButton size="small" onClick={() => handleCopy(String(MXNB_TOKEN_DATA.decimals), 'Decimales')}> <ContentCopyIcon fontSize="small" /> </IconButton>
              {copied === 'Decimales' && <Typography color="success.main" variant="caption">¡Copiado!</Typography>}
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, fontWeight: 'bold' }}
              onClick={handleAddMXNBToken}
              fullWidth
            >
              Agregar automáticamente a MetaMask
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MXNBBalance; 