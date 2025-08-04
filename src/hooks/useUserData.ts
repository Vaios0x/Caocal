import useSWR from 'swr';
import { useState } from 'react';
import type { User, Notification } from '../data/mockData.js';

// Fetcher simulado para SWR
const fetcher = async (url: string) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Simular diferentes endpoints
  if (url === '/api/user') {
    return import('../data/mockData.js').then(module => module.mockUser);
  }
  
  if (url === '/api/earnings') {
    return import('../data/mockData.js').then(module => module.mockEarnings);
  }
  
  if (url === '/api/portfolio') {
    return import('../data/mockData.js').then(module => module.mockPortfolio);
  }

  if (url === '/api/notifications') {
    return import('../data/mockData.js').then(module => module.mockNotifications);
  }
  
  throw new Error('Endpoint no encontrado');
};

export const useUserData = () => {
  const { data: user, error: userError, isLoading: userLoading } = useSWR('/api/user', fetcher);
  const { data: earnings, error: earningsError, isLoading: earningsLoading } = useSWR('/api/earnings', fetcher);
  const { data: portfolio, error: portfolioError, isLoading: portfolioLoading } = useSWR('/api/portfolio', fetcher);

  return {
    user: user as User | undefined,
    earnings,
    portfolio,
    isLoading: userLoading || earningsLoading || portfolioLoading,
    error: userError || earningsError || portfolioError,
  };
};

export const useNotifications = () => {
  const { data: notifications = [], error, isLoading, mutate } = useSWR('/api/notifications', fetcher);
  const [isUpdating, setIsUpdating] = useState(false);

  const unreadCount = (notifications as Notification[]).filter(n => !n.isRead).length;

  const markAsRead = async (notificationId: string) => {
    setIsUpdating(true);
    try {
      // Simular actualización en el servidor
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const updatedNotifications = (notifications as Notification[]).map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      );
      
      await mutate(updatedNotifications, false);
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const markAllAsRead = async () => {
    setIsUpdating(true);
    try {
      // Simular actualización en el servidor
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedNotifications = (notifications as Notification[]).map(notification => ({
        ...notification,
        isRead: true
      }));
      
      await mutate(updatedNotifications, false);
    } catch (error) {
      console.error('Error al marcar todas como leídas:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    setIsUpdating(true);
    try {
      // Simular eliminación en el servidor
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const updatedNotifications = (notifications as Notification[]).filter(
        notification => notification.id !== notificationId
      );
      
      await mutate(updatedNotifications, false);
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const addNotification = async (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    setIsUpdating(true);
    try {
      // Simular creación en el servidor
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      const updatedNotifications = [newNotification, ...(notifications as Notification[])];
      await mutate(updatedNotifications, false);
    } catch (error) {
      console.error('Error al agregar notificación:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    notifications: notifications as Notification[],
    unreadCount,
    isLoading: isLoading || isUpdating,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    mutate
  };
};

export const useSavingsRate = () => {
  const [savingsRate, setSavingsRate] = useState(5); // 5% por defecto
  
  const updateSavingsRate = (rate: number) => {
    setSavingsRate(rate);
    // Aquí se llamaría a la API para actualizar la tasa de ahorro
    console.log('Tasa de ahorro actualizada:', rate);
  };

  return {
    savingsRate,
    updateSavingsRate,
  };
}; 