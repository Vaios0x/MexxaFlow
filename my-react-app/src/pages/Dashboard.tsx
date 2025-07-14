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
  Button
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Acciones rápidas */}
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 4 }}>
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
      </Stack>
      {/* Modal Enviar Pago */}
      <Dialog open={openSend} onClose={handleCloseSend}>
        <DialogTitle>Enviar Pago MXNB</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <TextField
            label="Dirección de destino"
            value={sendTo}
            onChange={e => setSendTo(e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="Monto a enviar (MXNB)"
            value={sendAmount}
            onChange={e => setSendAmount(e.target.value)}
            fullWidth
            type="number"
          />
          <Typography variant="caption" color="text.secondary">
            * Esta es una demo visual. Integra la lógica de envío real con wagmi/viem para transferir MXNB.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSend} color="primary">Cancelar</Button>
          <Button onClick={handleCloseSend} color="primary" variant="contained">Enviar</Button>
        </DialogActions>
      </Dialog>
      {/* Modal Recibir Pago */}
      <Dialog open={openReceive} onClose={handleCloseReceive}>
        <DialogTitle>Recibir Pago MXNB</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Tu dirección:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{address}</Typography>
            <Button size="small" onClick={handleCopy} startIcon={<ContentCopyIcon />}>
              {copied ? '¡Copiado!' : 'Copiar'}
            </Button>
          </Box>
          {address && (
            <Box
              component="img"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(address)}`}
              alt="QR Code"
              sx={{ width: 128, height: 128, border: '1px solid #ddd', borderRadius: 1 }}
            />
          )}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
            Comparte tu dirección o QR para recibir pagos MXNB.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReceive} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
      {/* Balance MXNB */}
      <Box sx={{ mb: 4 }}>
        <MXNBBalance showAddTokenButton={true} />
      </Box>

      {/* Estadísticas de Pagos */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: 'text.primary'
          }}
        >
          Estadísticas de Pagos
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {paymentStats.map((stat, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                minWidth: 250,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  {stat.icon}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    color: `${stat.color}.main`,
                    mb: 1
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  {stat.label}
                </Typography>
                {stat.amount && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 'medium'
                    }}
                  >
                    ${stat.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXNB
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

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
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              color: 'text.primary'
            }}
          >
            Últimas Transacciones
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['Fecha', 'Destinatario', 'Tipo', 'Monto', 'Estado'].map((header) => (
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
                {mockTransactions.map((tx, idx) => (
                  <TableRow
                    key={idx}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>{tx.to}</TableCell>
                    <TableCell>
                      <Chip
                        label={tx.type}
                        color={tx.type === 'Enviado' ? 'primary' : 'secondary'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {tx.amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={tx.status}
                        color={tx.status === 'Completado' ? 'success' : 'warning'}
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
    </Container>
  );
};

export default Dashboard; 