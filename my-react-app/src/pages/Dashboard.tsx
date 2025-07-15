import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Tooltip,
  IconButton
} from '@mui/material';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SavingsIcon from '@mui/icons-material/Savings';
import { useAccount } from 'wagmi';
import MXNBBalance from '../components/MXNBBalance';
import MXNBStats from '../components/MXNBStats';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMockApp } from '../context/MockAppContext';
import Badges from '../components/Badges';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMXNBWallet } from '../services/mxnb-wallet.service';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SendIcon from '@mui/icons-material/Send';

// Estadísticas de pagos
const paymentStats = [
  {
    label: 'Pagos Enviados',
    value: 48,
    amount: 12500.75,
    icon: <TrendingUpIcon color="primary" sx={{ fontSize: 40 }} />,
    color: 'primary'
  },
  {
    label: 'Pagos Recibidos',
    value: 32,
    amount: 8900.50,
    icon: <TrendingDownIcon color="secondary" sx={{ fontSize: 40 }} />,
    color: 'secondary'
  },
  {
    label: 'Comisiones Ahorradas',
    value: '$1,250 MXN',
    icon: <SavingsIcon color="success" sx={{ fontSize: 40 }} />,
    color: 'success'
  },
];

const mockTransactions = [
  { date: '2025-07-10', to: 'Juan Pérez', type: 'Enviado', amount: 500, status: 'Completado' },
  { date: '2025-07-09', to: 'Sofía Gómez', type: 'Recibido', amount: 1200, status: 'Completado' },
  { date: '2025-07-08', to: 'Carlos Ruiz', type: 'Enviado', amount: 300, status: 'Pendiente' },
  { date: '2025-07-07', to: 'Ana López', type: 'Recibido', amount: 800, status: 'Completado' },
  { date: '2025-07-06', to: 'Marketplace', type: 'Enviado', amount: 1500, status: 'Completado' },
];

const Dashboard: React.FC = () => {
  const { address } = useAccount();
  const [openSend, setOpenSend] = useState(false);
  const [openReceive, setOpenReceive] = useState(false);
  const [sendTo, setSendTo] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedToken, setSelectedToken] = useState('MXNB');
  const { user, sendPayment, receivePayment, transactions, balance } = useMockApp();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterToken, setFilterToken] = useState('all');
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const mxnbWallet = useMXNBWallet();
  const [newScheduled, setNewScheduled] = useState({ to: '', amount: '', date: '' });
  const [newClabe, setNewClabe] = useState('');
  const [mpcInput, setMpcInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleOpenSend = () => setOpenSend(true);
  const handleCloseSend = () => setOpenSend(false);
  const handleOpenReceive = () => setOpenReceive(true);
  const handleCloseReceive = () => setOpenReceive(false);

  // Validaciones de formularios
  const validateWalletAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);
  const validateAmount = (amount: string) => {
    const numAmount = Number(amount);
    return !isNaN(numAmount) && numAmount > 0;
  };

  // Copiar dirección con feedback mejorado
  const handleCopy = useCallback(() => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [address]);

  // Enviar pago con validaciones
  const handleSend = useCallback(() => {
    setIsLoading(true);
    if (!validateWalletAddress(sendTo)) {
      setSnackbar({ open: true, message: 'Dirección de wallet inválida', severity: 'error' });
      setIsLoading(false);
      return;
    }
    if (!validateAmount(sendAmount)) {
      setSnackbar({ open: true, message: 'Monto de pago inválido', severity: 'error' });
      setIsLoading(false);
      return;
    }

    const mxnbBalance = balance.find(b => b.symbol === 'MXNB')?.balance || 0;
    if (Number(sendAmount) > mxnbBalance) {
      setSnackbar({ open: true, message: 'Saldo insuficiente', severity: 'error' });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      sendPayment(sendTo, Number(sendAmount), selectedToken);
      setSnackbar({ open: true, message: `Pago de ${sendAmount} MXNB enviado exitosamente`, severity: 'success' });
    setSendTo('');
    setSendAmount('');
    setSelectedToken('MXNB');
    setOpenSend(false);
      setIsLoading(false);
    }, 1500);
  }, [sendTo, sendAmount, selectedToken, balance, sendPayment]);

  // Recibir pago simulado (desde un remitente mock)
  const handleReceive = () => {
    receivePayment('Remitente Demo', Math.floor(Math.random() * 1000) + 100, 'MXNB');
    setOpenReceive(false);
  };

  // Simular depósito MXN → MXNB
  const handleDeposit = () => {
    if (depositAmount && !isNaN(Number(depositAmount))) {
      const amount = Number(depositAmount);
      // Simular conversión 1:1 MXN → MXNB
      receivePayment('Depósito MXN', amount, 'MXNB');
      setSnackbar({ open: true, message: `¡Depósito exitoso! ${amount.toLocaleString('es-MX')} MXN convertidos a MXNB`, severity: 'success' });
    }
    setDepositAmount('');
    setOpenDeposit(false);
  };

  // Simular retiro MXNB → MXN
  const handleWithdraw = () => {
    if (withdrawAmount && !isNaN(Number(withdrawAmount))) {
      const amount = Number(withdrawAmount);
      const mxnbBalance = balance.find(b => b.symbol === 'MXNB')?.balance || 0;
      if (amount <= mxnbBalance) {
        sendPayment('Retiro MXN', amount, 'MXNB');
        setSnackbar({ open: true, message: `¡Retiro procesado! ${amount.toLocaleString('es-MX')} MXNB enviados a tu cuenta bancaria`, severity: 'success' });
      } else {
        setSnackbar({ open: true, message: 'Saldo insuficiente para el retiro', severity: 'error' });
      }
    }
    setWithdrawAmount('');
    setOpenWithdraw(false);
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Exportación CSV mejorada
  const handleExportCSV = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (!transactions.length) {
        setSnackbar({ open: true, message: 'No hay transacciones para exportar', severity: 'error' });
        setIsLoading(false);
        return;
      }

      const headers = ['Fecha', 'Contraparte', 'Tipo', 'Monto', 'Token', 'Estado', 'Hash de Transacción'];
    const rows = transactions.map(tx => [
      tx.date.toLocaleString('es-MX', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
      tx.type === 'sent' ? tx.to : tx.from,
      tx.type === 'sent' ? 'Enviado' : 'Recibido',
        tx.amount.toFixed(2),
      tx.token,
      tx.status === 'completed' ? 'Completado' : tx.status === 'pending' ? 'Pendiente' : 'Fallido',
        `0x${Math.random().toString(36).substring(2, 15)}` // Simula hash de transacción
    ]);

    const csvContent = [headers, ...rows]
        .map(e => e.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
      link.setAttribute('download', `transacciones_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

      setSnackbar({ open: true, message: 'Exportación de CSV completada', severity: 'success' });
      setIsLoading(false);
    }, 1500);
  }, [transactions]);

  // Paginación de transacciones
  const paginatedTransactions = useMemo(() => {
    const filteredTxs = transactions.filter(tx => {
    const contraparte = tx.type === 'sent' ? tx.to : tx.from;
    const matchSearch = contraparte.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || (filterType === 'sent' && tx.type === 'sent') || (filterType === 'received' && tx.type === 'received');
    const matchToken = filterToken === 'all' || tx.token === filterToken;
    return matchSearch && matchType && matchToken;
  });

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTxs.slice(startIndex, startIndex + itemsPerPage);
  }, [transactions, search, filterType, filterToken, currentPage]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 4 } }}>
      {/* Acciones rápidas */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: { xs: 2, md: 3 }, fontWeight: 'bold', color: 'text.primary', fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Acciones Rápidas
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 3 }, 
          mb: { xs: 3, md: 4 }
        }}>
        <Button
          variant="contained"
            startIcon={<SendIcon />}
          onClick={handleOpenSend}
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              px: { xs: 3, md: 4 },
              py: { xs: 1.5, md: 2 },
              minHeight: { xs: 48, md: 56 }
            }}
        >
          Enviar Pago
        </Button>
        <Button
          variant="outlined"
            startIcon={<AccountBalanceWalletIcon />}
          onClick={handleOpenReceive}
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              px: { xs: 3, md: 4 },
              py: { xs: 1.5, md: 2 },
              minHeight: { xs: 48, md: 56 }
            }}
        >
          Recibir Pago
        </Button>
        <Button
            variant="outlined"
            startIcon={<AccountBalanceIcon />}
          onClick={() => setOpenDeposit(true)}
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              px: { xs: 3, md: 4 },
              py: { xs: 1.5, md: 2 },
              minHeight: { xs: 48, md: 56 }
            }}
        >
            Depositar
        </Button>
        <Button
          variant="outlined"
            startIcon={<ScheduleIcon />}
          onClick={() => setOpenWithdraw(true)}
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              px: { xs: 3, md: 4 },
              py: { xs: 1.5, md: 2 },
              minHeight: { xs: 48, md: 56 }
            }}
        >
            Retirar
        </Button>
        </Box>
      </Box>

      {/* Modales con transiciones y validaciones */}
      <Dialog 
        open={openSend} 
        onClose={handleCloseSend}
        TransitionComponent={motion.div}
        fullScreen={window.innerWidth < 600}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 3 },
            background: 'linear-gradient(135deg, #1E1E1E 0%, #121212 100%)',
            color: 'white',
            width: { xs: '100%', sm: 'auto' },
            maxWidth: { xs: '100%', sm: 500 }
          }
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }}>Enviar Pago MXNB</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 2 }, minWidth: { xs: '100%', sm: 320 }, p: { xs: 3, md: 2 } }}>
          <TextField
            label="Dirección de destino"
            value={sendTo}
            onChange={e => setSendTo(e.target.value)}
            fullWidth
            autoFocus
            error={sendTo.length > 0 && !validateWalletAddress(sendTo)}
            helperText={sendTo.length > 0 && !validateWalletAddress(sendTo) ? 'Dirección de wallet inválida' : ''}
            sx={{
              '& .MuiInputBase-root': {
                minHeight: { xs: 56, md: 48 },
                fontSize: { xs: '1rem', md: '1rem' }
              },
              '& .MuiInputLabel-root': {
                fontSize: { xs: '1rem', md: '1rem' }
              }
            }}
            InputProps={{
              endAdornment: sendTo.length > 0 && validateWalletAddress(sendTo) ? (
                <CheckCircleIcon color="success" />
              ) : sendTo.length > 0 ? (
                <ErrorIcon color="error" />
              ) : null
            }}
          />
          <TextField
            label="Monto a enviar"
            type="number"
            value={sendAmount}
            onChange={e => setSendAmount(e.target.value)}
            fullWidth
            error={sendAmount.length > 0 && !validateAmount(sendAmount)}
            helperText={sendAmount.length > 0 && !validateAmount(sendAmount) ? 'Monto inválido' : ''}
            sx={{
              '& .MuiInputBase-root': {
                minHeight: { xs: 56, md: 48 },
                fontSize: { xs: '1rem', md: '1rem' }
              },
              '& .MuiInputLabel-root': {
                fontSize: { xs: '1rem', md: '1rem' }
              }
            }}
            InputProps={{
              endAdornment: sendAmount.length > 0 && validateAmount(sendAmount) ? (
                <CheckCircleIcon color="success" />
              ) : sendAmount.length > 0 ? (
                <ErrorIcon color="error" />
              ) : null
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Token</InputLabel>
            <Select
              value={selectedToken}
              label="Token"
              onChange={e => setSelectedToken(e.target.value)}
            >
              <MenuItem value="MXNB">MXNB</MenuItem>
              <MenuItem value="USDT">USDT</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 3, md: 2 } }}>
          <Button 
            onClick={handleCloseSend} 
            color="secondary"
            sx={{ 
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSend} 
            color="primary" 
            variant="contained"
            disabled={!validateWalletAddress(sendTo) || !validateAmount(sendAmount) || isLoading}
            sx={{ 
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Enviar Pago'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Recibir Pago - hacer fullscreen en mobile */}
      <Dialog 
        open={openReceive} 
        onClose={handleCloseReceive}
        fullScreen={window.innerWidth < 600}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 3 },
            background: 'linear-gradient(135deg, #1E1E1E 0%, #121212 100%)',
            color: 'white',
            width: { xs: '100%', sm: 'auto' },
            maxWidth: { xs: '100%', sm: 500 }
          }
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }}>Recibir Pago MXNB</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 2 }, minWidth: { xs: '100%', sm: 320 }, p: { xs: 3, md: 2 } }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '1rem', md: '0.875rem' } }}>
            Comparte tu dirección para recibir MXNB de otros usuarios.
          </Typography>
          <Box sx={{ p: 2, bgcolor: 'primary.main', borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: 'white', fontSize: { xs: '1rem', md: '0.875rem' } }}>Tu dirección:</Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, gap: { xs: 1, sm: 1 } }}>
              <Typography variant="body2" sx={{ wordBreak: 'break-all', fontFamily: 'monospace', color: 'white', fontSize: { xs: '0.875rem', md: '0.875rem' } }}>
                {address || '0x1234...5678'}
              </Typography>
              <Button
                size="small"
                onClick={handleCopy}
                startIcon={<ContentCopyIcon />}
                variant="outlined"
                sx={{ 
                  color: 'white', 
                  borderColor: 'white', 
                  '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.08)' },
                  fontSize: { xs: '0.875rem', md: '0.875rem' },
                  minHeight: { xs: 48, md: 40 }
                }}
              >
                {copied ? 'Copiado' : 'Copiar'}
              </Button>
            </Box>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 1, color: 'secondary.contrastText' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '0.875rem' } }}>
              Recibir MXNB
            </Typography>
            <Typography variant="caption" sx={{ fontSize: { xs: '0.875rem', md: '0.75rem' } }}>
              Sin comisiones. Transacción instantánea en la red Arbitrum Sepolia.
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleReceive} 
            fullWidth
            sx={{ 
              mt: 2,
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 56, md: 48 }
            }}
          >
            Simular pago recibido
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '0.75rem' } }}>
            * Esta es una demo visual. En producción, otros usuarios podrían enviarte MXNB a esta dirección.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 3, md: 2 } }}>
          <Button 
            onClick={handleCloseReceive} 
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

      {/* Modal Depositar MXNB - hacer fullscreen en mobile */}
      <Dialog 
        open={openDeposit} 
        onClose={() => setOpenDeposit(false)}
        fullScreen={window.innerWidth < 600}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 3 },
            background: 'linear-gradient(135deg, #1E1E1E 0%, #121212 100%)',
            color: 'white',
            width: { xs: '100%', sm: 'auto' },
            maxWidth: { xs: '100%', sm: 500 }
          }
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }}>Depositar MXN → MXNB</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 2 }, minWidth: { xs: '100%', sm: 320 }, p: { xs: 3, md: 2 } }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '1rem', md: '0.875rem' } }}>
            Convierte pesos mexicanos a MXNB usando Bitso Business y Juno Platform.
          </Typography>
          <TextField
            label="Monto en MXN"
            value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
            fullWidth
            type="number"
            autoFocus
            placeholder="0.00"
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
          <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 1, color: 'success.contrastText' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '0.875rem' } }}>
              Conversión 1:1 MXN → MXNB
            </Typography>
            <Typography variant="caption" sx={{ fontSize: { xs: '0.875rem', md: '0.75rem' } }}>
              Sin comisiones adicionales. Conversión instantánea.
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '0.75rem' } }}>
            * Esta es una demo visual. En producción, se integraría con Bitso Business y Juno Platform.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 3, md: 2 } }}>
          <Button 
            onClick={() => setOpenDeposit(false)} 
            color="primary"
            sx={{ 
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDeposit} 
            color="primary" 
            variant="contained"
            sx={{ 
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
          >
            Depositar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Retirar MXNB - hacer fullscreen en mobile */}
      <Dialog 
        open={openWithdraw} 
        onClose={() => setOpenWithdraw(false)}
        fullScreen={window.innerWidth < 600}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 3 },
            background: 'linear-gradient(135deg, #1E1E1E 0%, #121212 100%)',
            color: 'white',
            width: { xs: '100%', sm: 'auto' },
            maxWidth: { xs: '100%', sm: 500 }
          }
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }}>Retirar MXNB → MXN</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 2 }, minWidth: { xs: '100%', sm: 320 }, p: { xs: 3, md: 2 } }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '1rem', md: '0.875rem' } }}>
            Convierte MXNB a pesos mexicanos y recibe en tu cuenta bancaria.
          </Typography>
          <TextField
            label="Monto en MXNB"
            value={withdrawAmount}
            onChange={e => setWithdrawAmount(e.target.value)}
            fullWidth
            type="number"
            autoFocus
            placeholder="0.00"
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
          <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1, color: 'info.contrastText' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '0.875rem' } }}>
              Conversión 1:1 MXNB → MXN
            </Typography>
            <Typography variant="caption" sx={{ fontSize: { xs: '0.875rem', md: '0.75rem' } }}>
              Transferencia SPEI en 24-48 horas. Comisión: $15 MXN.
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '0.75rem' } }}>
            * Esta es una demo visual. En producción, se integraría con Juno Platform para redención fiat.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 3, md: 2 } }}>
          <Button 
            onClick={() => setOpenWithdraw(false)} 
            color="primary"
            sx={{ 
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleWithdraw} 
            color="primary" 
            variant="contained"
            sx={{ 
              fontSize: { xs: '1rem', md: '0.875rem' },
              minHeight: { xs: 48, md: 40 }
            }}
          >
            Retirar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {/* Balance multi-token - hacer responsive con scroll horizontal si es necesario */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography variant="h6" sx={{ mb: { xs: 2, md: 3 }, fontWeight: 'bold', color: 'text.primary', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
          Balances de Tokens
        </Typography>
        {/* Cards de balance de tokens - hacer responsive con scroll horizontal */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 3 }, 
          mb: { xs: 3, md: 4 },
          overflowX: { xs: 'auto', md: 'visible' },
          '&::-webkit-scrollbar': {
            height: { xs: 8, md: 0 }
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 4
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 4
          }
        }}>
          {balance.map((b) => (
            <Card key={b.symbol} sx={{ 
              borderRadius: 3, 
              background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)', 
              color: 'white', 
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              minWidth: { xs: 280, md: 'auto' },
              flex: { xs: '0 0 auto', md: 1 },
              p: { xs: 2, md: 3 }
            }}>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
                <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                  {b.balance.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.8, fontSize: { xs: '1rem', md: '1.25rem' } }}>{b.symbol}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      {/* Balance MXNB */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <MXNBBalance 
          showAddTokenButton={true} 
          onOpenSend={handleOpenSend}
          onOpenReceive={handleOpenReceive}
        />
      </Box>
      {/* Badges/Gamificación */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
      <Badges />
      </Box>
      {/* Estadísticas de Pagos */}
      {/* ... puedes dejar la sección de estadísticas mock o eliminarla ... */}
      {/* Estadísticas de MXNB */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <MXNBStats showDetailedStats={true} />
      </Box>
      {/* Últimas Transacciones */}
      {/* Tabla de transacciones - convertir a cards en mobile */}
      <Card
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #23272F 0%, #1A1D23 100%)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          p: { xs: 2, md: 3 }
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
              Últimas Transacciones
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              onClick={handleExportCSV}
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.5 }
              }}
            >
              Exportar
            </Button>
          </Box>

          {/* Filtros y búsqueda */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 3 }, 
            mb: { xs: 3, md: 4 }
          }}>
            <TextField
              placeholder="Buscar por contraparte..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ 
                flex: 1,
                '& .MuiInputBase-root': {
                  minHeight: { xs: 48, md: 40 },
                  fontSize: { xs: '1rem', md: '0.875rem' }
                }
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
            <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 120 } }}>
              <InputLabel sx={{ fontSize: { xs: '1rem', md: '0.875rem' } }}>Tipo</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Tipo"
                sx={{
                  minHeight: { xs: 48, md: 40 },
                  fontSize: { xs: '1rem', md: '0.875rem' }
                }}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="sent">Enviados</MenuItem>
                <MenuItem value="received">Recibidos</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 120 } }}>
              <InputLabel sx={{ fontSize: { xs: '1rem', md: '0.875rem' } }}>Token</InputLabel>
              <Select
                value={filterToken}
                onChange={(e) => setFilterToken(e.target.value)}
                label="Token"
                sx={{
                  minHeight: { xs: 48, md: 40 },
                  fontSize: { xs: '1rem', md: '0.875rem' }
                }}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="MXNB">MXNB</MenuItem>
                <MenuItem value="USDC">USDC</MenuItem>
                <MenuItem value="USDT">USDT</MenuItem>
              </Select>
            </FormControl>
            </Box>

          {/* Tabla de transacciones - convertir a cards en mobile */}
          <Box sx={{ 
            overflowX: { xs: 'auto', md: 'visible' },
            '&::-webkit-scrollbar': {
              height: { xs: 8, md: 0 }
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 4
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.3)',
              borderRadius: 4
            }
          }}>
            {/* Vista de tabla para desktop */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <TableContainer component={Paper} sx={{ borderRadius: 2, minWidth: { xs: 600, md: 'auto' } }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['Fecha', 'Contraparte', 'Tipo', 'Monto', 'Estado'].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontWeight: 'bold',
                            color: 'text.secondary',
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            whiteSpace: 'nowrap'
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                    {paginatedTransactions.map((tx, idx) => (
                  <TableRow
                    key={tx.id}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                        <TableCell sx={{ fontSize: { xs: '1rem', md: '1rem' }, whiteSpace: 'nowrap' }}>
                          {tx.date.toLocaleString('es-MX', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                        </TableCell>
                        <TableCell sx={{ fontSize: { xs: '1rem', md: '1rem' } }}>
                          {tx.type === 'sent' ? tx.to : tx.from}
                        </TableCell>
                    <TableCell>
                      <Chip
                        label={tx.type === 'sent' ? 'Enviado' : 'Recibido'}
                        color={tx.type === 'sent' ? 'primary' : 'secondary'}
                        size="small"
                        variant="outlined"
                            sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
                      />
                    </TableCell>
                        <TableCell sx={{ fontSize: { xs: '1rem', md: '1rem' }, whiteSpace: 'nowrap' }}>
                      {tx.amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} {tx.token}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={tx.status === 'completed' ? 'Completado' : tx.status === 'pending' ? 'Pendiente' : 'Fallido'}
                        color={tx.status === 'completed' ? 'success' : tx.status === 'pending' ? 'warning' : 'error'}
                        size="small"
                        variant="outlined"
                            sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            </Box>

            {/* Vista de cards para mobile */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              {paginatedTransactions.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                    No hay transacciones para mostrar
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {paginatedTransactions.map((tx) => (
                    <Card
                      key={tx.id}
                      sx={{
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #23272F 0%, #1A1D23 100%)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        p: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>
                            {tx.type === 'sent' ? tx.to : tx.from}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                            {tx.date.toLocaleString('es-MX', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.125rem', mb: 0.5 }}>
                            {tx.amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                            {tx.token}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip
                          label={tx.type === 'sent' ? 'Enviado' : 'Recibido'}
                          color={tx.type === 'sent' ? 'primary' : 'secondary'}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                        <Chip
                          label={tx.status === 'completed' ? 'Completado' : tx.status === 'pending' ? 'Pendiente' : 'Fallido'}
                          color={tx.status === 'completed' ? 'success' : tx.status === 'pending' ? 'warning' : 'error'}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </Box>
                    </Card>
                  ))}
                </Stack>
              )}
            </Box>
          </Box>
          
          {/* Paginación */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'stretch', md: 'center' }, 
            mt: { xs: 3, md: 4 },
            gap: { xs: 2, md: 0 }
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ 
              fontSize: { xs: '0.875rem', md: '1rem' },
              textAlign: { xs: 'center', md: 'left' }
            }}>
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, paginatedTransactions.length)} de {transactions.length} transacciones
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 2, md: 1 },
              justifyContent: { xs: 'center', md: 'flex-end' }
            }}>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                sx={{
                  fontSize: { xs: '1rem', md: '1rem' },
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.5, md: 2 },
                  minHeight: { xs: 48, md: 40 },
                  minWidth: { xs: 100, md: 120 },
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  },
                  '&:disabled': {
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.3)'
                  }
                }}
              >
                ← Anterior
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage * itemsPerPage >= transactions.length}
                sx={{
                  fontSize: { xs: '1rem', md: '1rem' },
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.5, md: 2 },
                  minHeight: { xs: 48, md: 40 },
                  minWidth: { xs: 100, md: 120 },
                  background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)'
                  },
                  '&:disabled': {
                    background: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.3)'
                  }
                }}
              >
                Siguiente →
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>



      {/* Acordeón de simulaciones avanzadas - hacer responsive */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 700, 
          mb: 2, 
          color: 'primary.main', 
          letterSpacing: 1,
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}>
          Funciones Avanzadas
        </Typography>
        
        {/* Transferencias Programadas */}
        <Accordion sx={{ 
          mb: 2, 
          borderRadius: 3, 
          background: 'linear-gradient(135deg, #23272F 0%, #1A1D23 100%)', 
          boxShadow: '0 2px 12px rgba(59,130,246,0.10)'
        }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ScheduleIcon sx={{ color: 'primary.main', mr: 1, fontSize: { xs: '1.5rem', md: '1.25rem' } }} />
            <Typography fontWeight={700} color="white" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Transferencias Programadas
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} mb={1} color="grey.200" sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}>
                Nueva transferencia programada
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                  label="Destinatario (wallet)" 
                  value={newScheduled.to} 
                  onChange={e => setNewScheduled(s => ({ ...s, to: e.target.value }))} 
                  size="small" 
                  sx={{ 
                    bgcolor: 'background.paper', 
                    borderRadius: 2, 
                    input: { color: 'white' },
                    '& .MuiInputBase-root': {
                      minHeight: { xs: 48, md: 40 },
                      fontSize: { xs: '1rem', md: '0.875rem' }
                    }
                  }} 
                  InputLabelProps={{ style: { color: '#bbb', fontSize: { xs: '1rem', md: '0.875rem' } } }} 
                />
                <TextField 
                  label="Monto MXNB" 
                  value={newScheduled.amount} 
                  onChange={e => setNewScheduled(s => ({ ...s, amount: e.target.value }))} 
                  size="small" 
                  type="number" 
                  sx={{ 
                    bgcolor: 'background.paper', 
                    borderRadius: 2, 
                    input: { color: 'white' },
                    '& .MuiInputBase-root': {
                      minHeight: { xs: 48, md: 40 },
                      fontSize: { xs: '1rem', md: '0.875rem' }
                    }
                  }} 
                  InputLabelProps={{ style: { color: '#bbb', fontSize: { xs: '1rem', md: '0.875rem' } } }} 
                />
                <TextField 
                  label="Fecha" 
                  type="date" 
                  value={newScheduled.date} 
                  onChange={e => setNewScheduled(s => ({ ...s, date: e.target.value }))} 
                  size="small" 
                  InputLabelProps={{ 
                    shrink: true, 
                    style: { color: '#bbb', fontSize: { xs: '1rem', md: '0.875rem' } } 
                  }} 
                  sx={{ 
                    bgcolor: 'background.paper', 
                    borderRadius: 2, 
                    input: { color: 'white' },
                    '& .MuiInputBase-root': {
                      minHeight: { xs: 48, md: 40 },
                      fontSize: { xs: '1rem', md: '0.875rem' }
                    }
                  }} 
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    borderRadius: 2, 
                    fontWeight: 700,
                    fontSize: { xs: '1rem', md: '0.875rem' },
                    minHeight: { xs: 48, md: 40 }
                  }} 
                  onClick={() => {
                  if (newScheduled.to && newScheduled.amount && newScheduled.date) {
                    mxnbWallet.scheduleTransfer(newScheduled.to, Number(newScheduled.amount), new Date(newScheduled.date));
                    setNewScheduled({ to: '', amount: '', date: '' });
                  }
                  }}
                >
                  Programar
                </Button>
              </Stack>
            </Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1} color="grey.300" sx={{ fontSize: { xs: '1rem', md: '1rem' } }}>
              Próximas transferencias
            </Typography>
            {mxnbWallet.scheduledTransfers.length === 0 && <Typography color="grey.500" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>No hay transferencias programadas.</Typography>}
            <Box>
              {mxnbWallet.scheduledTransfers.map(t => (
                <Card key={t.id} sx={{ 
                  mb: 2, 
                  p: { xs: 3, md: 2 }, 
                  borderRadius: 2, 
                  background: t.status === 'pendiente' ? 'linear-gradient(90deg, #23272F 60%, #1A1D23 100%)' : t.status === 'enviada' ? 'linear-gradient(90deg, #14532d 60%, #166534 100%)' : 'grey.900', 
                  boxShadow: '0 2px 8px rgba(59,130,246,0.10)',
                  width: '100%'
                }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                    <Box sx={{ width: '100%' }}>
                      <Typography fontWeight={700} color="white" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>A: {t.to}</Typography>
                      <Typography color="grey.200" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>Monto: <b>{t.amount} MXNB</b></Typography>
                      <Typography color="grey.400" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>Fecha: {t.date.toLocaleDateString()}</Typography>
                      <Chip label={t.status.toUpperCase()} color={t.status === 'pendiente' ? 'info' : t.status === 'enviada' ? 'success' : 'default'} size="small" sx={{ mt: 1, fontWeight: 700, letterSpacing: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }} />
                    </Box>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                      {t.status === 'pendiente' && <Button size="small" color="success" variant="contained" sx={{ borderRadius: 2, fontWeight: 700, width: { xs: '100%', sm: 'auto' }, fontSize: { xs: '0.875rem', md: '0.875rem' } }} onClick={() => mxnbWallet.updateScheduledTransfer(t.id, 'enviada')}>Marcar como enviada</Button>}
                      {t.status === 'pendiente' && <Button size="small" color="error" variant="outlined" sx={{ borderRadius: 2, fontWeight: 700, width: { xs: '100%', sm: 'auto' }, fontSize: { xs: '0.875rem', md: '0.875rem' } }} onClick={() => mxnbWallet.updateScheduledTransfer(t.id, 'cancelada')}>Cancelar</Button>}
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        {/* MPC Wallet Accordion - hacer responsive */}
        <Accordion sx={{ 
          mb: 2, 
          borderRadius: 3, 
          background: 'linear-gradient(135deg, #1A1D23 0%, #23272F 100%)', 
          boxShadow: '0 2px 12px rgba(16,185,129,0.10)' 
        }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccountBalanceWalletIcon sx={{ color: 'success.main', mr: 1, fontSize: { xs: '1.5rem', md: '1.25rem' } }} />
            <Typography fontWeight={700} color="white" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Integración Portal (MPC Wallet)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} mb={1} color="grey.200" sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}>
                Estado de vinculación:
              </Typography>
              {mxnbWallet.portalLinked ? (
                <Box>
                  <Typography color="success.main" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                    Vinculado a: <b>{mxnbWallet.portalWallet}</b>
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    sx={{ 
                      mt: 1, 
                      borderRadius: 2, 
                      fontWeight: 700,
                      fontSize: { xs: '0.875rem', md: '0.875rem' },
                      minHeight: { xs: 48, md: 40 }
                    }} 
                    onClick={mxnbWallet.unlinkPortalWallet}
                  >
                    Desvincular
                  </Button>
                </Box>
              ) : (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField 
                    label="Dirección MPC" 
                    value={mpcInput} 
                    onChange={e => setMpcInput(e.target.value)} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'background.paper', 
                      borderRadius: 2, 
                      input: { color: 'white' },
                      '& .MuiInputBase-root': {
                        minHeight: { xs: 48, md: 40 },
                        fontSize: { xs: '1rem', md: '0.875rem' }
                      }
                    }} 
                    InputLabelProps={{ style: { color: '#bbb', fontSize: { xs: '1rem', md: '0.875rem' } } }} 
                  />
                  <Button 
                    variant="contained" 
                    sx={{ 
                      borderRadius: 2, 
                      fontWeight: 700,
                      fontSize: { xs: '1rem', md: '0.875rem' },
                      minHeight: { xs: 48, md: 40 }
                    }} 
                    onClick={() => { if (mpcInput) { mxnbWallet.linkPortalWallet(mpcInput); setMpcInput(''); } }}
                  >
                    Vincular
                  </Button>
                </Stack>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
        {/* CLABE Accordion - hacer responsive */}
        <Accordion sx={{ 
          borderRadius: 3, 
          background: 'linear-gradient(135deg, #23272F 0%, #1A1D23 100%)', 
          boxShadow: '0 2px 12px rgba(59,130,246,0.10)' 
        }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccountBalanceIcon sx={{ color: 'info.main', mr: 1, fontSize: { xs: '1.5rem', md: '1.25rem' } }} />
            <Typography fontWeight={700} color="white" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Cuentas Bancarias (MultiCLABE)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} mb={1} color="grey.200" sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}>
                Agregar nueva CLABE
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                  label="CLABE" 
                  value={newClabe} 
                  onChange={e => setNewClabe(e.target.value)} 
                  size="small" 
                  sx={{ 
                    bgcolor: 'background.paper', 
                    borderRadius: 2, 
                    input: { color: 'white' },
                    '& .MuiInputBase-root': {
                      minHeight: { xs: 48, md: 40 },
                      fontSize: { xs: '1rem', md: '0.875rem' }
                    }
                  }} 
                  InputLabelProps={{ style: { color: '#bbb', fontSize: { xs: '1rem', md: '0.875rem' } } }} 
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    borderRadius: 2, 
                    fontWeight: 700,
                    fontSize: { xs: '1rem', md: '0.875rem' },
                    minHeight: { xs: 48, md: 40 }
                  }} 
                  onClick={() => { if (newClabe) { mxnbWallet.addClabe(newClabe); setNewClabe(''); } }}
                >
                  Agregar
                </Button>
              </Stack>
            </Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1} color="grey.300" sx={{ fontSize: { xs: '1rem', md: '1rem' } }}>
              Cuentas asociadas
            </Typography>
            {mxnbWallet.clabes.length === 0 && <Typography color="grey.500" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>No hay cuentas CLABE asociadas.</Typography>}
            <Box>
              {mxnbWallet.clabes.map(clabe => (
                <Card key={clabe} sx={{ 
                  mb: 2, 
                  p: { xs: 3, md: 2 }, 
                  borderRadius: 2, 
                  background: 'linear-gradient(90deg, #23272F 60%, #1A1D23 100%)', 
                  boxShadow: '0 2px 8px rgba(59,130,246,0.10)',
                  width: '100%'
                }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                    <Typography fontWeight={700} color="white" sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, wordBreak: 'break-all' }}>{clabe}</Typography>
                    <Button 
                      size="small" 
                      color="error" 
                      variant="outlined" 
                      sx={{ 
                        borderRadius: 2, 
                        fontWeight: 700, 
                        width: { xs: '100%', sm: 'auto' },
                        fontSize: { xs: '0.875rem', md: '0.875rem' },
                        minHeight: { xs: 48, md: 40 }
                      }} 
                      onClick={() => mxnbWallet.removeClabe(clabe)}
                    >
                      Eliminar
                    </Button>
                  </Stack>
                </Card>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default Dashboard; 