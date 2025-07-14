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
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useMockApp } from '../context/MockAppContext.tsx';

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

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openConfig, setOpenConfig] = React.useState(false);
  const [notifAnchor, setNotifAnchor] = React.useState<null | HTMLElement>(null);
  const notifOpen = Boolean(notifAnchor);
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: 'success' | 'info' }>({ open: false, message: '', severity: 'info' });
  const [appBarKey, setAppBarKey] = React.useState(0); // Para animación

  // Contexto global simulado
  const { user, login, logout, notifications, markNotificationRead, markAllNotificationsRead, theme, language, toggleTheme, setLanguage } = useMockApp();
  const unreadCount = notifications.filter(n => !n.read).length;
  const [themeAnchor, setThemeAnchor] = React.useState<null | HTMLElement>(null);
  const [langAnchor, setLangAnchor] = React.useState<null | HTMLElement>(null);
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

  // Notificaciones
  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(event.currentTarget);
  };
  const handleNotifClose = () => {
    setNotifAnchor(null);
  };

  // Personalización
  const handleThemeClick = (event: React.MouseEvent<HTMLElement>) => {
    setThemeAnchor(event.currentTarget);
  };
  const handleThemeClose = () => {
    setThemeAnchor(null);
  };
  const handleThemeChange = () => {
    toggleTheme();
    setSnackbar({ open: true, message: theme === 'dark' ? 'Modo claro activado' : 'Modo oscuro activado', severity: 'info' });
    setAppBarKey(prev => prev + 1); // Trigger animación
    handleThemeClose();
  };
  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchor(event.currentTarget);
  };
  const handleLangClose = () => {
    setLangAnchor(null);
  };
  const handleLanguageChange = (lang: 'es' | 'en') => {
    setLanguage(lang);
    setSnackbar({ open: true, message: lang === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English', severity: 'success' });
    handleLangClose();
  };

  return (
    <AppBar key={appBarKey} position="static" sx={{ background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)', width: '100vw', boxShadow: 2, transition: 'box-shadow 0.4s, filter 0.4s', filter: snackbar.open ? 'drop-shadow(0 0 16px #3B82F6)' : 'none' }}>
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

          {/* Notificaciones mock */}
          <IconButton color="inherit" onClick={handleNotifClick} sx={{ ml: 1 }}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notifAnchor}
            open={notifOpen}
            onClose={handleNotifClose}
            PaperProps={{ sx: { minWidth: 280 } }}
          >
            <MenuItem disabled sx={{ fontWeight: 'bold' }}>Notificaciones</MenuItem>
            {notifications.length === 0 && (
              <MenuItem disabled>No hay notificaciones</MenuItem>
            )}
            {notifications.map(n => (
              <MenuItem
                key={n.id}
                onClick={() => { markNotificationRead(n.id); handleNotifClose(); }}
                sx={{ fontWeight: n.read ? 'normal' : 'bold', whiteSpace: 'normal' }}
              >
                {n.message}
                <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                  {n.date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </MenuItem>
            ))}
            {notifications.length > 0 && (
              <MenuItem onClick={() => { markAllNotificationsRead(); handleNotifClose(); }} sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Marcar todas como leídas
              </MenuItem>
            )}
          </Menu>

          {/* Selector de tema */}
          <IconButton color="inherit" onClick={handleThemeClick}>
            {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Menu
            anchorEl={themeAnchor}
            open={themeOpen}
            onClose={handleThemeClose}
            PaperProps={{ sx: { minWidth: 120 } }}
          >
            <MenuItem onClick={handleThemeChange}>
              {theme === 'dark' ? <LightModeIcon sx={{ mr: 1 }} /> : <DarkModeIcon sx={{ mr: 1 }} />}
              {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            </MenuItem>
          </Menu>

          {/* Selector de idioma */}
          <IconButton color="inherit" onClick={handleLangClick}>
            <TranslateIcon />
          </IconButton>
          <Menu
            anchorEl={langAnchor}
            open={langOpen}
            onClose={handleLangClose}
            PaperProps={{ sx: { minWidth: 120 } }}
          >
            <MenuItem onClick={() => handleLanguageChange('es')}>
              🇪🇸 Español
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange('en')}>
              🇺🇸 English
            </MenuItem>
          </Menu>

          {/* Selector de red */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#60a5fa', fontWeight: 600, fontSize: 14 }}>
              {currentChain ? `Red: ${currentChain.name}` : 'Red: -'}
            </span>
            {chains.map((c) => (
              <button
                key={c.id}
                style={{
                  background: chainId === c.id ? '#2563eb' : '#1e293b',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '4px 12px',
                  marginRight: 4,
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onClick={() => switchChain?.({ chainId: c.id })}
                disabled={chainId === c.id}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Logo y nombre del wallet conectado */}
          {isConnected && connector && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1e293b', borderRadius: 8, padding: '4px 10px' }}>
              {connector.icon && (
                <img src={connector.icon} alt={connector.name} width={24} height={24} style={{ borderRadius: 4 }} />
              )}
              <span style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>{connector.name}</span>
            </div>
          )}

          {/* Usuario simulado */}
          {user ? (
            <>
              <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
                <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32, mr: 1 }} />
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
                <MenuItem disabled>{user.name}</MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate('/dashboard'); }}>Dashboard</MenuItem>
                <MenuItem onClick={handleOpenConfig}>Configuración</MenuItem>
                <MenuItem onClick={() => { logout(); handleClose(); }}>Cerrar sesión</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" variant="outlined" onClick={login} sx={{ fontWeight: 'bold', borderColor: 'white', color: 'white' }}>
              Iniciar sesión
            </Button>
          )}

          <Dialog open={openConfig} onClose={handleCloseConfig}>
            <DialogTitle>Configuración</DialogTitle>
            <DialogContent>
              <p>Aquí puedes poner las opciones de configuración de usuario.</p>
            </DialogContent>
          </Dialog>
        </Box>
      </Toolbar>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Slide}
      >
        <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </AppBar>
  );
};

export default Navbar; 