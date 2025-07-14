import { useState, useEffect, useCallback } from 'react';

/**
 * Interfaz para definir la estructura de una notificación
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: number;
  read?: boolean;
}

/**
 * Hook para manejar notificaciones globales con persistencia en localStorage
 * 
 * @returns {Object} Objeto con métodos y estado de notificaciones
 * @property {Notification[]} notifications - Lista de notificaciones
 * @property {Function} addNotification - Añade una nueva notificación
 * @property {Function} clearNotifications - Elimina todas las notificaciones
 * @property {Function} removeNotification - Elimina una notificación específica
 * @property {Function} markNotificationRead - Marca una notificación como leída
 * @property {Function} markAllNotificationsRead - Marca todas las notificaciones como leídas
 */
export function useNotifications() {
  // Estado inicial de notificaciones desde localStorage
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const storedNotifications = localStorage.getItem('mexxaflow_notifications');
      return storedNotifications ? JSON.parse(storedNotifications) : [];
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
      return [];
    }
  });

  // Efecto para guardar notificaciones en localStorage cuando cambian
  useEffect(() => {
    try {
      localStorage.setItem('mexxaflow_notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error al guardar notificaciones:', error);
    }
  }, [notifications]);

  // Agregar una notificación con validación
  const addNotification = useCallback((
    type: Notification['type'], 
    message: string
  ) => {
    if (!message) {
      console.warn('Intento de añadir notificación sin mensaje');
      return;
    }

    const newNotification: Notification = {
      id: Math.random().toString(36).slice(2),
      type,
      message,
      timestamp: Date.now(),
      read: false
    };

    setNotifications((prev) => {
      // Limitar número de notificaciones para evitar sobrecarga
      const updatedNotifications = [...prev, newNotification];
      return updatedNotifications.slice(-50); // Mantener solo las últimas 50
    });
  }, []);

  // Limpiar todas las notificaciones
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Eliminar una notificación por id
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
  }, []);

  // Marcar una notificación específica como leída
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  // Marcar todas las notificaciones como leídas
  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => 
      prev.map(n => ({ ...n, read: true }))
    );
  }, []);

  // Obtener número de notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    addNotification,
    clearNotifications,
    removeNotification,
    markNotificationRead,
    markAllNotificationsRead
  };
} 