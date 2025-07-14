import React, { useState } from 'react';
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
  FormControl
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

  const handleOpenSend = () => setOpenSend(true);
  const handleCloseSend = () => setOpenSend(false);
  const handleOpenReceive = () => setOpenReceive(true);
  const handleCloseReceive = () => setOpenReceive(false);
  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  // Enviar pago simulado
  const handleSend = () => {
    if (sendTo && sendAmount && !isNaN(Number(sendAmount))) {
      sendPayment(sendTo, Number(sendAmount), selectedToken);
    }
    setSendTo('');
    setSendAmount('');
    setSelectedToken('MXNB');
    setOpenSend(false);
  };
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

  // Exportar transacciones a CSV
  const handleExportCSV = () => {
    if (!transactions.length) return;
    const headers = ['Fecha', 'Contraparte', 'Tipo', 'Monto', 'Token', 'Estado'];
    const rows = transactions.map(tx => [
      tx.date.toLocaleString('es-MX', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
      tx.type === 'sent' ? tx.to : tx.from,
      tx.type === 'sent' ? 'Enviado' : 'Recibido',
      tx.amount,
      tx.token,
      tx.status === 'completed' ? 'Completado' : tx.status === 'pending' ? 'Pendiente' : 'Fallido',
    ]);
    const csvContent = [headers, ...rows]
      .map(e => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transacciones.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrar transacciones según búsqueda y filtros
  const filteredTransactions = transactions.filter(tx => {
    const contraparte = tx.type === 'sent' ? tx.to : tx.from;
    const matchSearch = contraparte.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || (filterType === 'sent' && tx.type === 'sent') || (filterType === 'received' && tx.type === 'received');
    const matchToken = filterToken === 'all' || tx.token === filterToken;
    return matchSearch && matchType && matchToken;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Acciones rápidas */}
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 4, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleOpenSend}
          sx={{ fontWeight: 'bold', px: 4, py: 1.5, borderRadius: 3 }}
        >
          Enviar Pago
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleOpenReceive}
          sx={{ fontWeight: 'bold', px: 4, py: 1.5, borderRadius: 3 }}
        >
          Recibir Pago
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => setOpenDeposit(true)}
          sx={{ fontWeight: 'bold', px: 4, py: 1.5, borderRadius: 3 }}
        >
          Depositar MXNB
        </Button>
        <Button
          variant="outlined"
          color="success"
          size="large"
          onClick={() => setOpenWithdraw(true)}
          sx={{ fontWeight: 'bold', px: 4, py: 1.5, borderRadius: 3 }}
        >
          Retirar MXNB
        </Button>
      </Stack>
      {/* Modal Enviar Pago */}
      <Dialog open={openSend} onClose={handleCloseSend}>
        <DialogTitle>Enviar Pago MXNB</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Envía MXNB a cualquier dirección de wallet en la red Arbitrum Sepolia.
          </Typography>
          <TextField
            label="Dirección de destino"
            value={sendTo}
            onChange={e => setSendTo(e.target.value)}
            fullWidth
            autoFocus
            placeholder="0x..."
          />
          <TextField
            label="Monto en MXNB"
            value={sendAmount}
            onChange={e => setSendAmount(e.target.value)}
            fullWidth
            type="number"
            placeholder="0.00"
          />
          <FormControl fullWidth>
            <InputLabel id="token-select-label">Token</InputLabel>
            <Select
              labelId="token-select-label"
              value={selectedToken}
              label="Token"
              onChange={e => setSelectedToken(e.target.value)}
            >
              {balance.map((b) => (
                <MenuItem key={b.symbol} value={b.symbol}>{b.symbol}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 1, color: 'primary.contrastText' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Transacción instantánea
            </Typography>
            <Typography variant="caption">
              Comisión de red: ~$0.01 USD. Confirmación en segundos.
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            * Esta es una demo visual. El pago se simula y actualiza el balance y las transacciones.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSend} color="primary">Cancelar</Button>
          <Button onClick={handleSend} color="primary" variant="contained">Enviar</Button>
        </DialogActions>
      </Dialog>
      {/* Modal Recibir Pago */}
      <Dialog open={openReceive} onClose={handleCloseReceive}>
        <DialogTitle>Recibir Pago MXNB</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Comparte tu dirección para recibir MXNB de otros usuarios.
          </Typography>
          <Box sx={{ p: 2, bgcolor: 'primary.main', borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>Tu dirección:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ wordBreak: 'break-all', fontFamily: 'monospace', color: 'white' }}>
                {address || '0x1234...5678'}
              </Typography>
              <Button
                size="small"
                onClick={handleCopy}
                startIcon={<ContentCopyIcon />}
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.08)' } }}
              >
                {copied ? 'Copiado' : 'Copiar'}
              </Button>
            </Box>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 1, color: 'secondary.contrastText' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Recibir MXNB
            </Typography>
            <Typography variant="caption">
              Sin comisiones. Transacción instantánea en la red Arbitrum Sepolia.
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleReceive} 
            fullWidth
            sx={{ mt: 2 }}
          >
            Simular pago recibido
          </Button>
          <Typography variant="caption" color="text.secondary">
            * Esta es una demo visual. En producción, otros usuarios podrían enviarte MXNB a esta dirección.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReceive} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Depositar MXNB */}
      <Dialog open={openDeposit} onClose={() => setOpenDeposit(false)}>
        <DialogTitle>Depositar MXN → MXNB</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
          />
          <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 1, color: 'success.contrastText' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Conversión 1:1 MXN → MXNB
            </Typography>
            <Typography variant="caption">
              Sin comisiones adicionales. Conversión instantánea.
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            * Esta es una demo visual. En producción, se integraría con Bitso Business y Juno Platform.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeposit(false)} color="primary">Cancelar</Button>
          <Button onClick={handleDeposit} color="primary" variant="contained">Depositar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Retirar MXNB */}
      <Dialog open={openWithdraw} onClose={() => setOpenWithdraw(false)}>
        <DialogTitle>Retirar MXNB → MXN</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
          />
          <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1, color: 'info.contrastText' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Conversión 1:1 MXNB → MXN
            </Typography>
            <Typography variant="caption">
              Transferencia SPEI en 24-48 horas. Comisión: $15 MXN.
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            * Esta es una demo visual. En producción, se integraría con Juno Platform para redención fiat.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWithdraw(false)} color="primary">Cancelar</Button>
          <Button onClick={handleWithdraw} color="primary" variant="contained">Retirar</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {/* Balance multi-token */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
          Balances de Tokens
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2 }}>
          {balance.map((b) => (
            <Card key={b.symbol} sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)', color: 'white', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold">
                  {b.balance.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.8 }}>{b.symbol}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      {/* Balance MXNB */}
      <Box sx={{ mb: 4 }}>
        <MXNBBalance showAddTokenButton={true} />
      </Box>
      {/* Badges/Gamificación */}
      <Badges />
      {/* Estadísticas de Pagos */}
      {/* ... puedes dejar la sección de estadísticas mock o eliminarla ... */}
      {/* Estadísticas de MXNB */}
      <Box sx={{ mb: 4 }}>
        <MXNBStats showDetailedStats={true} />
      </Box>
      {/* Últimas Transacciones */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary'
              }}
            >
              Últimas Transacciones
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleExportCSV}
              sx={{ fontWeight: 'bold' }}
            >
              Exportar historial
            </Button>
          </Box>
          {/* Filtros y búsqueda */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="filter-type-label">Tipo</InputLabel>
              <Select
                labelId="filter-type-label"
                value={filterType}
                label="Tipo"
                onChange={e => setFilterType(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="sent">Enviado</MenuItem>
                <MenuItem value="received">Recibido</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="filter-token-label">Token</InputLabel>
              <Select
                labelId="filter-token-label"
                value={filterToken}
                label="Token"
                onChange={e => setFilterToken(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                {balance.map((b) => (
                  <MenuItem key={b.symbol} value={b.symbol}>{b.symbol}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <TextField
                size="small"
                placeholder="Buscar contraparte..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                fullWidth
              />
            </Box>
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['Fecha', 'Contraparte', 'Tipo', 'Monto', 'Estado'].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontWeight: 'bold',
                        color: 'text.secondary'
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.slice(0, 8).map((tx, idx) => (
                  <TableRow
                    key={tx.id}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>{tx.date.toLocaleString('es-MX', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</TableCell>
                    <TableCell>{tx.type === 'sent' ? tx.to : tx.from}</TableCell>
                    <TableCell>
                      <Chip
                        label={tx.type === 'sent' ? 'Enviado' : 'Recibido'}
                        color={tx.type === 'sent' ? 'primary' : 'secondary'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {tx.amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} {tx.token}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={tx.status === 'completed' ? 'Completado' : tx.status === 'pending' ? 'Pendiente' : 'Fallido'}
                        color={tx.status === 'completed' ? 'success' : tx.status === 'pending' ? 'warning' : 'error'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Acordeón de simulaciones avanzadas */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main', letterSpacing: 1 }}>
          Funciones Avanzadas (Simulación)
        </Typography>
        <Accordion sx={{ mb: 2, borderRadius: 3, background: 'linear-gradient(135deg, #23272F 0%, #1A1D23 100%)', boxShadow: '0 2px 12px rgba(59,130,246,0.10)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ScheduleIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography fontWeight={700} color="white">Transferencias Programadas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} mb={1} color="grey.200">Nueva transferencia programada</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField label="Destinatario (wallet)" value={newScheduled.to} onChange={e => setNewScheduled(s => ({ ...s, to: e.target.value }))} size="small" sx={{ bgcolor: 'background.paper', borderRadius: 2, input: { color: 'white' } }} InputLabelProps={{ style: { color: '#bbb' } }} />
                <TextField label="Monto MXNB" value={newScheduled.amount} onChange={e => setNewScheduled(s => ({ ...s, amount: e.target.value }))} size="small" type="number" sx={{ bgcolor: 'background.paper', borderRadius: 2, input: { color: 'white' } }} InputLabelProps={{ style: { color: '#bbb' } }} />
                <TextField label="Fecha" type="date" value={newScheduled.date} onChange={e => setNewScheduled(s => ({ ...s, date: e.target.value }))} size="small" InputLabelProps={{ shrink: true, style: { color: '#bbb' } }} sx={{ bgcolor: 'background.paper', borderRadius: 2, input: { color: 'white' } }} />
                <Button variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }} onClick={() => {
                  if (newScheduled.to && newScheduled.amount && newScheduled.date) {
                    mxnbWallet.scheduleTransfer(newScheduled.to, Number(newScheduled.amount), new Date(newScheduled.date));
                    setNewScheduled({ to: '', amount: '', date: '' });
                  }
                }}>Programar</Button>
              </Stack>
            </Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1} color="grey.300">Próximas transferencias</Typography>
            {mxnbWallet.scheduledTransfers.length === 0 && <Typography color="grey.500">No hay transferencias programadas.</Typography>}
            <Box>
              {mxnbWallet.scheduledTransfers.map(t => (
                <Card key={t.id} sx={{ mb: 2, p: 2, borderRadius: 2, background: t.status === 'pendiente' ? 'linear-gradient(90deg, #23272F 60%, #1A1D23 100%)' : t.status === 'enviada' ? 'linear-gradient(90deg, #14532d 60%, #166534 100%)' : 'grey.900', boxShadow: '0 2px 8px rgba(59,130,246,0.10)' }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography fontWeight={700} color="white">A: {t.to}</Typography>
                      <Typography color="grey.200">Monto: <b>{t.amount} MXNB</b></Typography>
                      <Typography color="grey.400">Fecha: {t.date.toLocaleDateString()}</Typography>
                      <Chip label={t.status.toUpperCase()} color={t.status === 'pendiente' ? 'info' : t.status === 'enviada' ? 'success' : 'default'} size="small" sx={{ mt: 1, fontWeight: 700, letterSpacing: 1 }} />
                    </Box>
                    <Stack direction="row" spacing={1}>
                      {t.status === 'pendiente' && <Button size="small" color="success" variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }} onClick={() => mxnbWallet.updateScheduledTransfer(t.id, 'enviada')}>Marcar como enviada</Button>}
                      {t.status === 'pendiente' && <Button size="small" color="error" variant="outlined" sx={{ borderRadius: 2, fontWeight: 700 }} onClick={() => mxnbWallet.updateScheduledTransfer(t.id, 'cancelada')}>Cancelar</Button>}
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ mb: 2, borderRadius: 3, background: 'linear-gradient(135deg, #1A1D23 0%, #23272F 100%)', boxShadow: '0 2px 12px rgba(16,185,129,0.10)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccountBalanceWalletIcon sx={{ color: 'success.main', mr: 1 }} />
            <Typography fontWeight={700} color="white">Integración Portal (MPC Wallet)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} mb={1} color="grey.200">Estado de vinculación:</Typography>
              {mxnbWallet.portalLinked ? (
                <Box>
                  <Typography color="success.main">Vinculado a: <b>{mxnbWallet.portalWallet}</b></Typography>
                  <Button variant="outlined" color="error" sx={{ mt: 1, borderRadius: 2, fontWeight: 700 }} onClick={mxnbWallet.unlinkPortalWallet}>Desvincular</Button>
                </Box>
              ) : (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="Dirección MPC" value={mpcInput} onChange={e => setMpcInput(e.target.value)} size="small" sx={{ bgcolor: 'background.paper', borderRadius: 2, input: { color: 'white' } }} InputLabelProps={{ style: { color: '#bbb' } }} />
                  <Button variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }} onClick={() => { if (mpcInput) { mxnbWallet.linkPortalWallet(mpcInput); setMpcInput(''); } }}>Vincular</Button>
                </Stack>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #23272F 0%, #1A1D23 100%)', boxShadow: '0 2px 12px rgba(59,130,246,0.10)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccountBalanceIcon sx={{ color: 'info.main', mr: 1 }} />
            <Typography fontWeight={700} color="white">Cuentas Bancarias (MultiCLABE)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} mb={1} color="grey.200">Agregar nueva CLABE</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField label="CLABE" value={newClabe} onChange={e => setNewClabe(e.target.value)} size="small" sx={{ bgcolor: 'background.paper', borderRadius: 2, input: { color: 'white' } }} InputLabelProps={{ style: { color: '#bbb' } }} />
                <Button variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }} onClick={() => { if (newClabe) { mxnbWallet.addClabe(newClabe); setNewClabe(''); } }}>Agregar</Button>
              </Stack>
            </Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1} color="grey.300">Cuentas asociadas</Typography>
            {mxnbWallet.clabes.length === 0 && <Typography color="grey.500">No hay cuentas CLABE asociadas.</Typography>}
            <Box>
              {mxnbWallet.clabes.map(clabe => (
                <Card key={clabe} sx={{ mb: 2, p: 2, borderRadius: 2, background: 'linear-gradient(90deg, #23272F 60%, #1A1D23 100%)', boxShadow: '0 2px 8px rgba(59,130,246,0.10)' }}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Typography fontWeight={700} color="white">{clabe}</Typography>
                    <Button size="small" color="error" variant="outlined" sx={{ borderRadius: 2, fontWeight: 700 }} onClick={() => mxnbWallet.removeClabe(clabe)}>Eliminar</Button>
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