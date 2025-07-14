import { createBrowserRouter } from 'react-router-dom';
import { MockAppProvider } from './context/MockAppContext';
import { Web3Provider } from './web3/rainbowConfig';
import App from './App';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Precios from './pages/Precios';
import Segmentos from './pages/Segmentos';
import Ayuda from './pages/Ayuda';
import Terminos from './pages/Terminos';
import Privacidad from './pages/Privacidad';
import Cookies from './pages/Cookies';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Registro from './pages/Registro';
import React from 'react';

const ErrorBoundary = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#d32f2f' }}>Algo salió mal</h1>
      <p>Lo sentimos, ha ocurrido un error inesperado.</p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#3f51b5',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Recargar página
      </button>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Web3Provider>
        <MockAppProvider>
          <App />
        </MockAppProvider>
      </Web3Provider>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'registro', element: <Registro /> },
      { path: 'precios', element: <Precios /> },
      { path: 'ayuda', element: <Ayuda /> },
      { path: 'terminos', element: <Terminos /> },
      { path: 'privacidad', element: <Privacidad /> },
      { path: 'cookies', element: <Cookies /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'segmentos', element: <Segmentos /> }
        ]
      },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

export default router; 