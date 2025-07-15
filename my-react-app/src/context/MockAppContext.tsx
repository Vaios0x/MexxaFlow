import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Tipos simulados
export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isLogged: boolean;
}

export type ThemeMode = 'dark' | 'light';
export type Language = 'es' | 'en';

export interface MockNotification {
  id: string;
  type: 'info' | 'success' | 'error';
  message: string;
  read: boolean;
  date: Date;
}

export interface MockTransaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  token: string;
  to: string;
  from: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

export interface MockStats {
  totalTransactions: number;
  monthlyGrowth: number;
  averageTransaction: number;
  topTransaction: number;
  weeklyVolume: number;
}

export interface MockTokenBalance {
  symbol: string;
  balance: number;
}

export interface MockBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  achieved: boolean;
}

interface MockAppContextType {
  user: MockUser | null;
  login: () => void;
  logout: () => void;
  notifications: MockNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  balance: MockTokenBalance[];
  sendPayment: (to: string, amount: number, token: string) => void;
  receivePayment: (from: string, amount: number, token: string) => void;
  transactions: MockTransaction[];
  stats: MockStats;
  badges: MockBadge[];
  theme: ThemeMode;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

const MockAppContext = createContext<MockAppContextType | undefined>(undefined);

// Datos iniciales simulados
const initialUser: MockUser = {
  id: '1',
  name: 'Vaios0x Demo',
  email: 'vaios@demo.com',
  avatar: 'https://i.pravatar.cc/150?img=3',
  isLogged: true,
};

const hackwinnerUser: MockUser = {
  id: '2',
  name: 'Hackwinner',
  email: 'hackwinner@mexxaflow.com',
  avatar: 'https://i.pravatar.cc/150?img=12',
  isLogged: true,
};

const initialNotifications: MockNotification[] = [
  { id: 'n1', type: 'success', message: '¡Pago recibido de Ana!', read: false, date: new Date() },
  { id: 'n2', type: 'info', message: 'Tu balance ha sido actualizado.', read: false, date: new Date() },
];

const initialBalance: MockTokenBalance[] = [
  { symbol: 'MXNB', balance: 12500.75 },
  { symbol: 'USDT', balance: 300.00 },
  { symbol: 'ETH', balance: 0.12 },
];

const initialTransactions: MockTransaction[] = [
  { id: 't1', type: 'received', amount: 1200, token: 'MXNB', to: 'Vaios0x Demo', from: 'Ana López', date: new Date(), status: 'completed' },
  { id: 't2', type: 'sent', amount: 500, token: 'MXNB', to: 'Carlos Ruiz', from: 'Vaios0x Demo', date: new Date(), status: 'completed' },
];

const initialStats: MockStats = {
  totalTransactions: 156,
  monthlyGrowth: 12.5,
  averageTransaction: 850.50,
  topTransaction: 5000.00,
  weeklyVolume: 12500.75,
};

const initialBadges: MockBadge[] = [
  { id: 'b1', name: 'Primer Pago', description: 'Enviaste tu primer pago', icon: '🎉', achieved: false },
  { id: 'b2', name: 'Pagador Frecuente', description: 'Enviaste 5 pagos', icon: '🚀', achieved: false },
  { id: 'b3', name: 'Receptor Activo', description: 'Recibiste 5 pagos', icon: '💸', achieved: false },
  { id: 'b4', name: 'Balance Superior', description: 'Tu balance superó 10,000 MXNB', icon: '🏆', achieved: false },
];

export const MockAppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(initialUser);
  const [notifications, setNotifications] = useState<MockNotification[]>(initialNotifications);
  const [balance, setBalance] = useState<MockTokenBalance[]>(initialBalance);
  const [transactions, setTransactions] = useState<MockTransaction[]>(initialTransactions);
  const [stats, setStats] = useState<MockStats>(initialStats);
  const [badges, setBadges] = useState<MockBadge[]>(initialBadges);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [language, setLanguageState] = useState<Language>('es');

  // Simular login/logout
  const login = () => {
    // Determinar qué usuario establecer basado en las credenciales
    const currentUser = user?.email === 'hackwinner@mexxaflow.com' ? hackwinnerUser : initialUser;
    setUser(currentUser);
  };
  const logout = () => setUser(null);

  // Notificaciones
  const markNotificationRead = (id: string) => {
    setNotifications(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  };
  const markAllNotificationsRead = () => {
    setNotifications(n => n.map(notif => ({ ...notif, read: true })));
  };

  // Simular pagos
  const sendPayment = (to: string, amount: number, token: string) => {
    setTransactions(txs => [
      { id: `t${Date.now()}`, type: 'sent', amount, token, to, from: user?.name || 'Tú', date: new Date(), status: 'completed' },
      ...txs,
    ]);
    setBalance(bal => bal.map(b => b.symbol === token ? { ...b, balance: b.balance - amount } : b));
    setNotifications(n => [
      { id: `n${Date.now()}`, type: 'success', message: `¡Pago enviado a ${to}!`, read: false, date: new Date() },
      ...n,
    ]);
  };
  const receivePayment = (from: string, amount: number, token: string) => {
    setTransactions(txs => [
      { id: `t${Date.now()}`, type: 'received', amount, token, to: user?.name || 'Tú', from, date: new Date(), status: 'completed' },
      ...txs,
    ]);
    setBalance(bal => bal.map(b => b.symbol === token ? { ...b, balance: b.balance + amount } : b));
    setNotifications(n => [
      { id: `n${Date.now()}`, type: 'success', message: `¡Pago recibido de ${from}!`, read: false, date: new Date() },
      ...n,
    ]);
  };

  // Lógica de badges/gamificación
  React.useEffect(() => {
    // Primer pago enviado
    const pagosEnviados = transactions.filter(t => t.type === 'sent').length;
    // Pagos recibidos
    const pagosRecibidos = transactions.filter(t => t.type === 'received').length;
    // Balance MXNB
    const mxnb = balance.find(b => b.symbol === 'MXNB')?.balance ?? 0;
    setBadges(prev => prev.map(b => {
      if (b.id === 'b1') return { ...b, achieved: pagosEnviados >= 1 };
      if (b.id === 'b2') return { ...b, achieved: pagosEnviados >= 5 };
      if (b.id === 'b3') return { ...b, achieved: pagosRecibidos >= 5 };
      if (b.id === 'b4') return { ...b, achieved: mxnb > 10000 };
      return b;
    }));
  }, [transactions, balance]);

  // Personalización
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const setLanguage = (lang: Language) => setLanguageState(lang);

  return (
    <MockAppContext.Provider value={{
      user,
      login,
      logout,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      balance,
      sendPayment,
      receivePayment,
      transactions,
      stats,
      badges,
      theme,
      language,
      toggleTheme,
      setLanguage,
    }}>
      {children}
    </MockAppContext.Provider>
  );
};

export const useMockApp = () => {
  const ctx = useContext(MockAppContext);
  if (!ctx) throw new Error('useMockApp debe usarse dentro de MockAppProvider');
  return ctx;
}; 