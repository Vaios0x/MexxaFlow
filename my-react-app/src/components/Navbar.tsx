import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

// Importaciones de RainbowKit
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MXNBBalance from './MXNBBalance';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openConfig, setOpenConfig] = React.useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenConfig = () => {
    setOpenConfig(true);
    handleClose();
  };
  const handleCloseConfig = () => setOpenConfig(false);

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)', width: '100vw', boxShadow: 2 }}>
      <Toolbar sx={{ 
        width: '100%', 
        minHeight: { xs: 56, sm: 72 }, 
        px: { xs: 3, sm: 4 }, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Logo MexxaFlow con Link a Inicio */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          flex: 1
        }}>
          <Link to="/" style={{ 
            textDecoration: 'none', 
            color: 'inherit', 
            display: 'flex', 
            alignItems: 'center'
          }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 'bold', 
                display: 'flex', 
                alignItems: 'center', 
                fontSize: { xs: 24, sm: 36 },
                cursor: 'pointer'
              }}
            >
              MexxaFlow
            </Typography>
          </Link>
        </Box>

        {/* Enlaces */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          justifyContent: 'center',
          flex: 2
        }}>
          <Button 
            component={Link} 
            to="/" 
            color="inherit" 
            variant={location.pathname === '/' ? 'outlined' : 'text'} 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: 16, 
              px: 1.5,
              textTransform: 'none',
              borderRadius: 2,
              '&.Mui-outlined': {
                border: '1px solid white'
              }
            }}
          >
            INICIO
          </Button>
          <Button 
            component={Link} 
            to="/dashboard" 
            color="inherit" 
            variant={location.pathname === '/dashboard' ? 'outlined' : 'text'} 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: 16, 
              px: 1.5,
              textTransform: 'none',
              borderRadius: 2,
              '&.Mui-outlined': {
                border: '1px solid white'
              }
            }}
          >
            DASHBOARD
          </Button>
          <Button 
            component={Link} 
            to="/segmentos" 
            color="inherit" 
            variant={location.pathname === '/segmentos' ? 'outlined' : 'text'} 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: 16, 
              px: 1.5,
              textTransform: 'none',
              borderRadius: 2,
              '&.Mui-outlined': {
                border: '1px solid white'
              }
            }}
          >
            SEGMENTOS
          </Button>
          <Button 
            component={Link} 
            to="/precios" 
            color="inherit" 
            variant={location.pathname === '/precios' ? 'outlined' : 'text'} 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: 16, 
              px: 1.5,
              textTransform: 'none',
              borderRadius: 2,
              '&.Mui-outlined': {
                border: '1px solid white'
              }
            }}
          >
            PRECIOS
          </Button>
          <Button 
            component={Link} 
            to="/ayuda" 
            color="inherit" 
            variant={location.pathname === '/ayuda' ? 'outlined' : 'text'} 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: 16, 
              px: 1.5,
              textTransform: 'none',
              borderRadius: 2,
              '&.Mui-outlined': {
                border: '1px solid white'
              }
            }}
          >
            AYUDA
          </Button>
        </Box>

        {/* Botones de la derecha */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          justifyContent: 'flex-start',
          flex: 1
        }}>
          {/* Balance MXNB compacto */}
          <Box sx={{ 
            display: { xs: 'none', md: 'block' },
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <MXNBBalance compact={true} showAddTokenButton={false} />
          </Box>
          
          <ConnectButton 
            label="Conectar Wallet"
            chainStatus="full"
            showBalance={false}
          />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenu}
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
          >
            <MenuItem onClick={() => { handleClose(); navigate('/dashboard'); }}>Dashboard</MenuItem>
            <MenuItem onClick={handleOpenConfig}>Configuración</MenuItem>
          </Menu>
         <Dialog open={openConfig} onClose={handleCloseConfig}>
           <DialogTitle>Configuración</DialogTitle>
           <DialogContent>
             <p>Aquí puedes poner las opciones de configuración de usuario.</p>
           </DialogContent>
         </Dialog>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 