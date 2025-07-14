import { useState } from 'react';

/**
 * Hook para manejar notificaciones globales simuladas.
 * Permite agregar, obtener y limpiar notificaciones.
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    timestamp: number;
  }[]>([]);

  // Agregar una notificación
  const addNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setNotifications((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        type,
        message,
        timestamp: Date.now()
      }
    ]);
  };

  // Limpiar todas las notificaciones
  const clearNotifications = () => setNotifications([]);

  // Eliminar una notificación por id
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
  };

  return {
    notifications,
    addNotification,
    clearNotifications,
    removeNotification
  };
} 