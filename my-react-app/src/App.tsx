import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import theme from './theme/theme';
import { AccessibilityAnnouncer } from './components/AccessibleComponent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [accessibilityMessage, setAccessibilityMessage] = React.useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex flex-col min-h-screen">
        <AccessibilityAnnouncer message={accessibilityMessage} />
        <Navbar />
        <main 
          id="main-content" 
          tabIndex={-1} 
          className="flex-grow p-4"
          aria-label="Contenido principal"
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
