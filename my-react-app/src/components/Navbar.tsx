import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useMockApp, MockAppProvider } from '../context/MockAppContext';

// Importaciones de RainbowKit
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MXNBBalance from './MXNBBalance';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import TranslateIcon from '@mui/icons-material/Translate';
// Ajuste de imports para wagmi v1/v2
import { useAccount, useSwitchChain, useChainId } from 'wagmi';
import { arbitrumSepolia, arbitrumOne } from '../web3/wagmiConfig';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const NavbarContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);
  const [openConfig, setOpenConfig] = useState(false);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const notifOpen = Boolean(notifAnchor);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'info' }>({ open: false, message: '', severity: 'info' });
  const [appBarKey, setAppBarKey] = useState(0);

  // Contexto global simulado
  const { 
    user = null, 
    login = () => {}, 
    logout = () => {}, 
    notifications = [], 
    markNotificationRead = () => {}, 
    markAllNotificationsRead = () => {}, 
    theme: appTheme = 'dark', 
    language = 'es', 
    toggleTheme = () => {}, 
    setLanguage = () => {} 
  } = useMockApp() || {};

  const unreadCount = notifications.filter(n => !n.read).length;
  const [themeAnchor, setThemeAnchor] = useState<null | HTMLElement>(null);
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);
  const themeOpen = Boolean(themeAnchor);
  const langOpen = Boolean(langAnchor);

  const { connector, isConnected } = useAccount();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();
  const currentChain = chains.find(c => c.id === chainId);

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

  // Menú móvil
  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'INICIO', path: '/' },
    { text: 'DASHBOARD', path: '/dashboard' },
    { text: 'SEGMENTOS', path: '/segmentos' },
    { text: 'PRECIOS', path: '/precios' },
    { text: 'AYUDA', path: '/ayuda' }
  ];

  const renderMobileMenu = (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleMobileMenuToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2,
          borderBottom: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          MexxaFlow
        </Typography>
        <IconButton color="inherit" onClick={handleMobileMenuToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem 
            key={item.path} 
            onClick={() => {
              navigate(item.path);
              handleMobileMenuToggle();
            }}
            sx={{ 
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              }
            }}
          >
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: 'bold', 
                textAlign: 'center',
                color: location.pathname === item.path ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.7)'
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        {!user ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button 
              fullWidth 
              variant="contained" 
              color="secondary"
              onClick={() => {
                navigate('/login');
                handleMobileMenuToggle();
              }}
            >
              Iniciar Sesión
            </Button>
            <Button 
              fullWidth 
              variant="outlined" 
              color="inherit"
              onClick={() => {
                navigate('/registro');
                handleMobileMenuToggle();
              }}
            >
              Crear Cuenta
            </Button>
          </Box>
        ) : (
          <Button 
            fullWidth 
            variant="contained" 
            color="secondary"
            onClick={() => {
              logout();
              handleMobileMenuToggle();
            }}
          >
            Cerrar Sesión
          </Button>
        )}
      </Box>
    </Drawer>
  );

  return (
    <AppBar 
      key={appBarKey} 
      position="static" 
      sx={{ 
        background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)', 
        width: '100vw', 
        boxShadow: 2 
      }}
    >
      <Toolbar sx={{ 
        width: '100%', 
        minHeight: { xs: 56, sm: 72 }, 
        px: { xs: 2, sm: 4 }, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        {/* Logo */}
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
              fontSize: { xs: 20, sm: 24 }
            }}
          >
            MexxaFlow
          </Typography>
        </Link>

        {/* Menú de escritorio */}
        {!isMobile ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2
          }}>
            {menuItems.map((item) => (
              <Button 
                key={item.path}
                component={Link} 
                to={item.path} 
                color="inherit" 
                variant={location.pathname === item.path ? 'outlined' : 'text'} 
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
                {item.text}
              </Button>
            ))}
          </Box>
        ) : null}

        {/* Botones de la derecha */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 0.5, sm: 1 }
        }}>
          {/* Menú hamburguesa para móviles */}
          {isMobile ? (
            <IconButton 
              color="inherit" 
              onClick={handleMobileMenuToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            // Menú de usuario para escritorio
            !user ? (
              <>
                <IconButton 
                  color="inherit" 
                  onClick={handleMenu}
                  sx={{ ml: 1 }}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => { handleClose(); navigate('/login'); }}>
                    Iniciar Sesión
                  </MenuItem>
                  <MenuItem onClick={() => { handleClose(); navigate('/registro'); }}>
                    Crear Cuenta
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <IconButton 
                  color="inherit" 
                  onClick={handleMenu}
                  sx={{ ml: 1 }}
                >
                  <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleOpenConfig}>Configuración</MenuItem>
                  <MenuItem onClick={() => { logout(); handleClose(); }}>Cerrar sesión</MenuItem>
                </Menu>
              </>
            )
          )}
        </Box>
      </Toolbar>

      {/* Menú móvil */}
      {isMobile && renderMobileMenu}
    </AppBar>
  );
};

const Navbar: React.FC = () => {
  return (
    <MockAppProvider>
      <NavbarContent />
    </MockAppProvider>
  );
};

export default Navbar; 