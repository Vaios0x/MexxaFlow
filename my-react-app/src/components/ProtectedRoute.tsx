import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useMockApp } from '../context/MockAppContext';

const ProtectedRoute: React.FC = () => {
  const { user } = useMockApp();
  const location = useLocation();

  if (!user || !user.isLogged) {
    // Redirigir a página de login con un estado de redirección
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 