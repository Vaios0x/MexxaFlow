import React, { useState, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Snackbar, 
  Alert, 
  InputAdornment, 
  IconButton, 
  Box, 
  Fab, 
  Slide, 
  Avatar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const preguntasFrecuentes = [
  {
    pregunta: '¿Cómo funciona MexaFlow?',
    respuesta: 'MexaFlow es una plataforma que permite a trabajadores independientes recibir pagos instantáneos utilizando tecnología blockchain.'
  },
  {
    pregunta: '¿Cuáles son los requisitos para usar MexaFlow?',
    respuesta: 'Necesitas una wallet de MetaMask, ser mayor de edad y tener una cuenta verificada en nuestra plataforma.'
  },
  {
    pregunta: '¿Qué tipos de pagos puedo recibir?',
    respuesta: 'Puedes recibir pagos en criptomonedas estables como USDC, USDT y DAI, así como en monedas locales.'
  },
  {
    pregunta: '¿Cómo protegen mi información?',
    respuesta: 'Utilizamos encriptación de última generación y almacenamiento descentralizado para proteger tus datos personales y financieros.'
  },
  {
    pregunta: '¿Cómo retiro mis fondos a mi cuenta bancaria?',
    respuesta: 'Puedes retirar tus fondos a una cuenta bancaria mexicana mediante la opción de retiro en el Dashboard. El proceso es rápido y seguro.'
  },
  {
    pregunta: '¿Qué hago si tengo un problema con una transacción?',
    respuesta: 'Contacta a soporte desde este mismo centro de ayuda o usa el chat en vivo para recibir asistencia inmediata.'
  }
];

const respuestasBot = [
  { keyword: 'hola', respuesta: '¡Hola! ¿En qué puedo ayudarte hoy?' },
  { keyword: 'retiro', respuesta: 'Para retirar tus fondos, ve al Dashboard y haz clic en "Retirar MXNB".' },
  { keyword: 'comisión', respuesta: 'Las comisiones dependen de tu plan. Puedes consultarlas en la sección de Precios.' },
  { keyword: 'error', respuesta: 'Lamentamos el inconveniente. ¿Podrías describir el error con más detalle?' },
  { keyword: 'gracias', respuesta: '¡De nada! Si tienes otra duda, aquí estoy.' },
  { keyword: 'soporte', respuesta: 'Puedes escribir tu problema aquí o usar el formulario de contacto para soporte personalizado.' },
];

const Ayuda: React.FC = () => {
  // FAQ Search
  const [search, setSearch] = useState('');
  const filteredFaq = preguntasFrecuentes.filter(faq =>
    faq.pregunta.toLowerCase().includes(search.toLowerCase()) ||
    faq.respuesta.toLowerCase().includes(search.toLowerCase())
  );

  // Contact Form
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [snackbar, setSnackbar] = useState(false);

  // Chatbot
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy el asistente virtual de MexxaFlow. ¿En qué puedo ayudarte?' }
  ]);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbar(true);
    setEmail('');
    setMensaje('');
  };

  // Chatbot logic
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { from: 'user', text: chatInput };
    setChatMessages(msgs => [...msgs, userMsg]);
    setChatInput('');
    setTyping(true);
    setTimeout(() => {
      const lower = userMsg.text.toLowerCase();
      const found = respuestasBot.find(r => lower.includes(r.keyword));
      setChatMessages(msgs => [
        ...msgs,
        { from: 'bot', text: found ? found.respuesta : '¿Podrías darme más detalles o escribir tu pregunta de otra forma?' }
      ]);
      setTyping(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1200);
  };

  // Auto-scroll chat
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatOpen]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: 'relative', minHeight: '80vh' }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ mb: 4, fontWeight: 900, background: 'linear-gradient(90deg, #3B82F6, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        Centro de Ayuda
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SearchIcon sx={{ color: 'primary.main', mr: 1 }} />
            <TextField
              placeholder="Buscar en preguntas frecuentes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="small"
              fullWidth
              sx={{ bgcolor: 'white', borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearch('')} size="small">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Preguntas Frecuentes
          </Typography>
          {filteredFaq.length === 0 && (
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              No se encontraron resultados para tu búsqueda.
            </Typography>
          )}
          {filteredFaq.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2, borderRadius: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{faq.pregunta}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.respuesta}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
              boxShadow: '0 4px 24px rgba(59,130,246,0.10)'
            }}
          >
            <Typography 
              variant="h5" 
              component="h3" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Contacta Soporte
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Tu Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <TextField
                fullWidth
                label="Mensaje"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, fontWeight: 700, fontSize: 16, py: 1.5 }}
              >
                Enviar Mensaje
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar de mensaje enviado */}
      <Snackbar
        open={snackbar}
        autoHideDuration={3500}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          ¡Mensaje enviado! Nuestro equipo te contactará pronto.
        </Alert>
      </Snackbar>

      {/* Botón flotante de chat */}
      <Fab 
        color="primary" 
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1200, boxShadow: '0 4px 24px rgba(59,130,246,0.25)' }}
        onClick={() => setChatOpen(true)}
        aria-label="Abrir chat de soporte"
      >
        <ChatIcon />
      </Fab>

      {/* Widget de chat simulado */}
      <Slide direction="up" in={chatOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: 96,
            right: 32,
            width: 340,
            maxWidth: '95vw',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(59,130,246,0.18)',
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'primary.main', color: 'white', px: 2, py: 1 }}>
            <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mr: 1, width: 32, height: 32 }}>
              <ChatIcon />
            </Avatar>
            <Typography sx={{ flex: 1, fontWeight: 700 }}>Soporte MexxaFlow</Typography>
            <IconButton onClick={() => setChatOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, p: 2, bgcolor: '#f8fafc', overflowY: 'auto', minHeight: 220, maxHeight: 320 }}>
            {chatMessages.map((msg, idx) => (
              <Box key={idx} sx={{ display: 'flex', mb: 1.5, flexDirection: msg.from === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                <Avatar sx={{ bgcolor: msg.from === 'bot' ? 'primary.main' : 'grey.300', width: 28, height: 28, fontSize: 18 }}>
                  {msg.from === 'bot' ? <ChatIcon fontSize="small" /> : 'Tú'}
                </Avatar>
                <Box
                  sx={{
                    bgcolor: msg.from === 'bot' ? 'white' : 'primary.light',
                    color: msg.from === 'bot' ? 'primary.main' : 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    mx: 1,
                    maxWidth: '75%',
                    fontSize: 15,
                    boxShadow: msg.from === 'bot' ? '0 2px 8px rgba(59,130,246,0.08)' : 'none'
                  }}
                >
                  {msg.text}
                </Box>
              </Box>
            ))}
            {typing && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, mb: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 28, height: 28, fontSize: 18 }}>
                  <ChatIcon fontSize="small" />
                </Avatar>
                <Box sx={{ bgcolor: 'white', color: 'primary.main', px: 2, py: 1, borderRadius: 2, mx: 1, fontSize: 15 }}>
                  Escribiendo...
                </Box>
              </Box>
            )}
            <div ref={chatEndRef} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderTop: '1px solid #e5e7eb', bgcolor: '#f8fafc' }}>
            <TextField
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
              placeholder="Escribe tu mensaje..."
              size="small"
              fullWidth
              sx={{ bgcolor: 'white', borderRadius: 1 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSendChat} color="primary">
                    <SendIcon />
                  </IconButton>
                )
              }}
            />
          </Box>
        </Box>
      </Slide>
    </Container>
  );
};

export default Ayuda; 