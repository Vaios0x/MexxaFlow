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

// 1. Importar componentes necesarios
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';

const NavbarContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openConfig, setOpenConfig] = React.useState(false);
  const [notifAnchor, setNotifAnchor] = React.useState<null | HTMLElement>(null);
  const notifOpen = Boolean(notifAnchor);
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: 'success' | 'info' }>({ open: false, message: '', severity: 'info' });
  const [appBarKey, setAppBarKey] = React.useState(0); // Para animación

  // Estado para el Drawer
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  // Contexto global simulado
  const { 
    user = null, 
    login = () => {}, 
    logout = () => {}, 
    notifications = [], 
    markNotificationRead = () => {}, 
    markAllNotificationsRead = () => {}, 
    theme = 'dark', 
    language = 'es', 
    toggleTheme = () => {}, 
    setLanguage = () => {} 
  } = useMockApp() || {};

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
                fontSize: { xs: 22, sm: 28, md: 36 },
                cursor: 'pointer'
              }}
            >
              MexxaFlow
            </Typography>
          </Link>
        </Box>

        {/* Botón de menú hamburguesa solo en mobile */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Drawer lateral con navegación y elementos móviles */}
        <Drawer 
          anchor="left" 
          open={drawerOpen} 
          onClose={handleDrawerClose}
          PaperProps={{
            sx: {
              width: { xs: '85vw', sm: 320 },
              background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              border: 'none',
              boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
              '& .MuiDrawer-paper': {
                background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              }
            }
          }}
        >
        <Box sx={{ 
            width: '100%', 
            height: '100%',
          display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Header del drawer con gradiente y logo */}
            <Box sx={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
              p: 3,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Efecto de brillo */}
              <Box sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 100,
                height: 100,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                filter: 'blur(20px)'
              }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 800,
                    color: 'white',
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  MexxaFlow
                </Typography>
                
                <IconButton 
                  onClick={handleDrawerClose}
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Box component="span" sx={{ fontSize: '1.5rem' }}>×</Box>
                </IconButton>
              </Box>
              
              {/* Subtítulo */}
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  mt: 1,
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                Pagos inteligentes para Latinoamérica
              </Typography>
            </Box>

            {/* Contenido scrollable */}
            <Box sx={{ 
              flex: 1, 
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px'
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255,255,255,0.05)'
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '3px'
              }
            }}>
              <List sx={{ p: 0 }}>
                {/* Navegación principal */}
                <Box sx={{ p: 2 }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      mb: 1
                    }}
                  >
                    NAVEGACIÓN
                  </Typography>
                </Box>
                
                <ListItemButton 
                  onClick={() => { navigate('/'); handleDrawerClose(); }}
                  sx={{
                    mx: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    bgcolor: location.pathname === '/' ? 'rgba(59,130,246,0.2)' : 'transparent',
                    border: location.pathname === '/' ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === '/' ? '#3B82F6' : 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                    <Box component="span" sx={{ fontSize: '1.25rem' }}>🏠</Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Inicio" 
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: location.pathname === '/' ? 600 : 400,
                        color: location.pathname === '/' ? '#3B82F6' : 'white'
                      }
                    }}
                  />
                </ListItemButton>

                <ListItemButton 
                  onClick={() => { navigate('/dashboard'); handleDrawerClose(); }}
                  sx={{
                    mx: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    bgcolor: location.pathname === '/dashboard' ? 'rgba(59,130,246,0.2)' : 'transparent',
                    border: location.pathname === '/dashboard' ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === '/dashboard' ? '#3B82F6' : 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                    <Box component="span" sx={{ fontSize: '1.25rem' }}>📊</Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dashboard" 
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: location.pathname === '/dashboard' ? 600 : 400,
                        color: location.pathname === '/dashboard' ? '#3B82F6' : 'white'
                      }
                    }}
                  />
                </ListItemButton>

                <ListItemButton 
                  onClick={() => { navigate('/segmentos'); handleDrawerClose(); }}
                  sx={{
                    mx: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    bgcolor: location.pathname === '/segmentos' ? 'rgba(59,130,246,0.2)' : 'transparent',
                    border: location.pathname === '/segmentos' ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === '/segmentos' ? '#3B82F6' : 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                    <Box component="span" sx={{ fontSize: '1.25rem' }}>🎯</Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Segmentos" 
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: location.pathname === '/segmentos' ? 600 : 400,
                        color: location.pathname === '/segmentos' ? '#3B82F6' : 'white'
                      }
                    }}
                  />
                </ListItemButton>

                <ListItemButton 
                  onClick={() => { navigate('/precios'); handleDrawerClose(); }}
                  sx={{
                    mx: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    bgcolor: location.pathname === '/precios' ? 'rgba(59,130,246,0.2)' : 'transparent',
                    border: location.pathname === '/precios' ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === '/precios' ? '#3B82F6' : 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                    <Box component="span" sx={{ fontSize: '1.25rem' }}>💰</Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Precios" 
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: location.pathname === '/precios' ? 600 : 400,
                        color: location.pathname === '/precios' ? '#3B82F6' : 'white'
                      }
                    }}
                  />
                </ListItemButton>

                <ListItemButton 
                  onClick={() => { navigate('/ayuda'); handleDrawerClose(); }}
                  sx={{
                    mx: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    bgcolor: location.pathname === '/ayuda' ? 'rgba(59,130,246,0.2)' : 'transparent',
                    border: location.pathname === '/ayuda' ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === '/ayuda' ? '#3B82F6' : 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                    <Box component="span" sx={{ fontSize: '1.25rem' }}>❓</Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Ayuda" 
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: location.pathname === '/ayuda' ? 600 : 400,
                        color: location.pathname === '/ayuda' ? '#3B82F6' : 'white'
                      }
                    }}
                  />
                </ListItemButton>
                
                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
                
                {/* Balance MXNB en mobile */}
                <Box sx={{ p: 2 }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      mb: 1
                    }}
                  >
                    BALANCE
                  </Typography>
                </Box>
                
                <Box sx={{ mx: 2, mb: 3 }}>
                  <Box sx={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 100%)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: 3,
                    p: 2,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Efecto de brillo */}
                    <Box sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      width: 40,
                      height: 40,
                      background: 'rgba(59,130,246,0.1)',
                      borderRadius: '50%',
                      filter: 'blur(10px)'
                    }} />
                    
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                      Balance MXNB
                    </Typography>
                    <MXNBBalance compact={true} showAddTokenButton={false} />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
                
                {/* Utilidades */}
                <Box sx={{ p: 2 }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      mb: 1
                    }}
                  >
                    UTILIDADES
                  </Typography>
                </Box>
                
                {/* Notificaciones en mobile */}
                <ListItemButton 
                  onClick={handleNotifClick}
                  sx={{
                    mx: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40, position: 'relative' }}>
                    <Badge badgeContent={unreadCount} color="error" sx={{
                      '& .MuiBadge-badge': {
                        bgcolor: '#ef4444',
                        color: 'white',
                        fontWeight: 'bold'
                      }
                    }}>
                      <NotificationsIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Notificaciones" 
                    primaryTypographyProps={{
                      sx: { color: 'white', fontWeight: 400 }
                    }}
                  />
                </ListItemButton>
                
                {/* Tema en mobile */}
                <ListItemButton 
                  onClick={handleThemeClick}
                  sx={{
                    mx: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                    {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'} 
                    primaryTypographyProps={{
                      sx: { color: 'white', fontWeight: 400 }
                    }}
                  />
                </ListItemButton>
                
                {/* Idioma en mobile */}
                <ListItemButton 
                  onClick={handleLangClick}
                  sx={{
                    mx: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                    <TranslateIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Idioma" 
                    primaryTypographyProps={{
                      sx: { color: 'white', fontWeight: 400 }
                    }}
                  />
                </ListItemButton>
                
                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
                
                {/* Red blockchain en mobile */}
                <Box sx={{ p: 2 }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      mb: 1
                    }}
                  >
                    BLOCKCHAIN
                  </Typography>
                </Box>
                
                <Box sx={{ mx: 2, mb: 3 }}>
                  <Box sx={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    p: 2
                  }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                      Red Blockchain
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                      {currentChain ? `Red: ${currentChain.name}` : 'Red: -'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {chains.map((c) => (
                        <Button
                          key={c.id}
                          size="small"
                          variant={chainId === c.id ? 'contained' : 'outlined'}
                          onClick={() => switchChain?.({ chainId: c.id })}
                          disabled={chainId === c.id}
                          sx={{ 
                            fontSize: '0.75rem',
                            minWidth: 'auto',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            bgcolor: chainId === c.id ? '#3B82F6' : 'transparent',
                            color: chainId === c.id ? 'white' : 'rgba(255,255,255,0.7)',
                            border: chainId === c.id ? 'none' : '1px solid rgba(255,255,255,0.3)',
                            '&:hover': {
                              bgcolor: chainId === c.id ? '#2563eb' : 'rgba(255,255,255,0.1)'
                            }
                          }}
                        >
                          {c.name}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                </Box>
                
                {/* Wallet conectado en mobile */}
                {isConnected && connector && (
                  <>
                    <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Box sx={{ p: 2 }}>
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.6)',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          letterSpacing: '1px',
                          mb: 1
                        }}
                      >
                        WALLET
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mx: 2, mb: 3 }}>
                      <Box sx={{
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.2)',
                        borderRadius: 3,
                        p: 2
                      }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                          Wallet Conectado
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          {connector.icon && (
                            <img src={connector.icon} alt={connector.name} width={32} height={32} style={{ borderRadius: 6 }} />
                          )}
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                            {connector.name}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
                
                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
                
                {/* Usuario en mobile */}
                <Box sx={{ p: 2 }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      mb: 1
                    }}
                  >
                    CUENTA
                  </Typography>
                </Box>
                
                {user ? (
                  <>
                    <Box sx={{ mx: 2, mb: 2 }}>
                      <Box sx={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 3,
                        p: 2
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            src={user.avatar} 
                            alt={user.name} 
                            sx={{ 
                              width: 48, 
                              height: 48,
                              border: '2px solid rgba(59,130,246,0.3)'
                            }} 
                          />
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
                              {user.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    
                    <ListItemButton 
                      onClick={() => { handleOpenConfig(); handleDrawerClose(); }}
                      sx={{
                        mx: 2,
                        mb: 0.5,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.05)',
                          transform: 'translateX(4px)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                        <Box component="span" sx={{ fontSize: '1.25rem' }}>⚙️</Box>
                      </ListItemIcon>
                      <ListItemText 
                        primary="Configuración" 
                        primaryTypographyProps={{
                          sx: { color: 'white', fontWeight: 400 }
                        }}
                      />
                    </ListItemButton>
                    
                    <ListItemButton 
                      onClick={() => { logout(); handleDrawerClose(); }}
                      sx={{
                        mx: 2,
                        mb: 0.5,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(239,68,68,0.1)',
                          transform: 'translateX(4px)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
                        <Box component="span" sx={{ fontSize: '1.25rem' }}>🚪</Box>
                      </ListItemIcon>
                      <ListItemText 
                        primary="Cerrar sesión" 
                        primaryTypographyProps={{
                          sx: { color: '#ef4444', fontWeight: 400 }
                        }}
                      />
                    </ListItemButton>
                  </>
                ) : (
                  <>
                    <ListItemButton 
                      onClick={() => { navigate('/login'); handleDrawerClose(); }}
                      sx={{
                        mx: 2,
                        mb: 0.5,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.05)',
                          transform: 'translateX(4px)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Iniciar Sesión" 
                        primaryTypographyProps={{
                          sx: { color: 'white', fontWeight: 400 }
                        }}
                      />
                    </ListItemButton>
                    
                    <ListItemButton 
                      onClick={() => { navigate('/registro'); handleDrawerClose(); }}
                      sx={{
                        mx: 2,
                        mb: 0.5,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.05)',
                          transform: 'translateX(4px)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                        <Box component="span" sx={{ fontSize: '1.25rem' }}>👤</Box>
                      </ListItemIcon>
                      <ListItemText 
                        primary="Crear Cuenta" 
                        primaryTypographyProps={{
                          sx: { color: 'white', fontWeight: 400 }
                        }}
                      />
                    </ListItemButton>
                  </>
                )}
                
                {/* Footer del drawer */}
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                    MexxaFlow v1.0.0
                  </Typography>
                </Box>
              </List>
            </Box>
          </Box>
        </Drawer>

        {/* Accesos rápidos (botones de navegación) solo en desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2, justifyContent: 'center', flex: 2 }}>
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

        {/* Botones de la derecha - SOLO VISIBLES EN DESKTOP */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          alignItems: 'center', 
          gap: 2,
          justifyContent: 'flex-start',
          flex: 1
        }}>
          {/* Balance MXNB compacto */}
          <Box sx={{ 
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
          )}

          {/* Modal de configuración - hacer fullscreen en mobile */}
          <Dialog 
            open={openConfig} 
            onClose={handleCloseConfig}
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
            <DialogTitle sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }}>Configuración</DialogTitle>
            <DialogContent sx={{ p: { xs: 3, md: 2 } }}>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1rem' } }}>
                Configuración de la aplicación
              </Typography>
            </DialogContent>
            <DialogActions sx={{ p: { xs: 3, md: 2 } }}>
              <Button 
                onClick={handleCloseConfig}
                sx={{ 
                  fontSize: { xs: '1rem', md: '0.875rem' },
                  minHeight: { xs: 48, md: 40 }
                }}
              >
                Cerrar
              </Button>
            </DialogActions>
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

const Navbar: React.FC = () => {
  return (
    <MockAppProvider>
      <NavbarContent />
    </MockAppProvider>
  );
};

export default Navbar; 