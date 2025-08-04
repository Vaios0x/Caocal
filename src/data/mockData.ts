export interface User {
  name: string;
  avatarUrl: string;
  email?: string;
  role?: string;
  status?: 'online' | 'offline' | 'away';
  memberSince?: string;
  subscription?: 'free' | 'premium' | 'enterprise';
  lastActive?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  category: 'earnings' | 'portfolio' | 'savings' | 'system' | 'security';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  icon?: string;
}

export interface Earnings {
  id: string;
  date: string;
  amount: number;
  platform: string;
}

export interface Asset {
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change24h: number;
  imageUrl: string;
}

export interface Portfolio {
  totalValue: number;
  assets: Asset[];
}

export const mockUser: User = {
  name: 'Giovanny Amador',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  email: 'giovanny.amador@caocal.mx',
  role: 'Usuario Premium',
  status: 'online',
  memberSince: '2024-01-15',
  subscription: 'premium',
  lastActive: '2025-08-04T10:30:00Z'
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '¡Nuevo ingreso registrado!',
    message: 'Has recibido $45.50 por tu entrega en Rappi',
    type: 'success',
    category: 'earnings',
    isRead: false,
    createdAt: '2025-08-04T10:25:00Z',
    actionUrl: '/earnings',
    icon: '💰'
  },
  {
    id: '2',
    title: 'Meta de ahorro alcanzada',
    message: '¡Felicidades! Has completado tu meta "Fondo de Emergencia"',
    type: 'success',
    category: 'savings',
    isRead: false,
    createdAt: '2025-08-04T09:15:00Z',
    actionUrl: '/savings',
    icon: '🎯'
  },
  {
    id: '3',
    title: 'Actualización de portafolio',
    message: 'Tu inversión en BTT-2030 ha aumentado 1.2% hoy',
    type: 'info',
    category: 'portfolio',
    isRead: true,
    createdAt: '2025-08-04T08:30:00Z',
    actionUrl: '/portfolio',
    icon: '📈'
  },
  {
    id: '4',
    title: 'Recordatorio de seguridad',
    message: 'Te recomendamos cambiar tu contraseña cada 90 días',
    type: 'warning',
    category: 'security',
    isRead: true,
    createdAt: '2025-08-03T16:45:00Z',
    actionUrl: '/settings',
    icon: '🔒'
  },
  {
    id: '5',
    title: 'Nueva funcionalidad disponible',
    message: 'Ya puedes usar el análisis de gastos inteligente',
    type: 'info',
    category: 'system',
    isRead: true,
    createdAt: '2025-08-03T14:20:00Z',
    actionUrl: '/dashboard',
    icon: '✨'
  },
  {
    id: '6',
    title: 'Mantenimiento programado',
    message: 'El sistema estará en mantenimiento mañana de 2:00 a 4:00 AM',
    type: 'warning',
    category: 'system',
    isRead: false,
    createdAt: '2025-08-03T12:00:00Z',
    actionUrl: '/help',
    icon: '🔧'
  },
  {
    id: '7',
    title: 'Oportunidad de inversión',
    message: 'Nuevo RWA disponible: Fondo Inmobiliario Premium',
    type: 'info',
    category: 'portfolio',
    isRead: false,
    createdAt: '2025-08-03T10:15:00Z',
    actionUrl: '/portfolio',
    icon: '🏢'
  },
  {
    id: '8',
    title: 'Meta de ahorro próxima a vencer',
    message: 'Tu meta "Vacaciones de Verano" vence en 15 días',
    type: 'warning',
    category: 'savings',
    isRead: true,
    createdAt: '2025-08-02T18:30:00Z',
    actionUrl: '/savings',
    icon: '⏰'
  }
];

export const mockEarnings: Earnings[] = [
  { id: '1', date: '2025-08-03', amount: 45.50, platform: 'Rappi' },
  { id: '2', date: '2025-08-03', amount: 32.75, platform: 'Uber' },
  { id: '3', date: '2025-08-02', amount: 28.90, platform: 'DiDi' },
  { id: '4', date: '2025-08-02', amount: 55.20, platform: 'Rappi' },
  { id: '5', date: '2025-08-01', amount: 41.30, platform: 'Uber' },
  { id: '6', date: '2025-08-01', amount: 38.45, platform: 'DiDi' },
  { id: '7', date: '2025-07-31', amount: 62.80, platform: 'Rappi' },
  { id: '8', date: '2025-07-31', amount: 29.15, platform: 'Uber' },
  { id: '9', date: '2025-07-30', amount: 33.70, platform: 'DiDi' },
  { id: '10', date: '2025-07-30', amount: 48.90, platform: 'Rappi' },
  { id: '11', date: '2025-07-29', amount: 35.60, platform: 'Uber' },
  { id: '12', date: '2025-07-29', amount: 42.25, platform: 'DiDi' },
  { id: '13', date: '2025-07-28', amount: 51.40, platform: 'Rappi' },
  { id: '14', date: '2025-07-28', amount: 27.80, platform: 'Uber' },
  { id: '15', date: '2025-07-27', amount: 39.95, platform: 'DiDi' },
  { id: '16', date: '2025-07-27', amount: 44.70, platform: 'Rappi' },
  { id: '17', date: '2025-07-26', amount: 31.20, platform: 'Uber' },
  { id: '18', date: '2025-07-26', amount: 36.85, platform: 'DiDi' },
  { id: '19', date: '2025-07-25', amount: 58.30, platform: 'Rappi' },
  { id: '20', date: '2025-07-25', amount: 26.45, platform: 'Uber' },
  { id: '21', date: '2025-07-24', amount: 40.10, platform: 'DiDi' },
  { id: '22', date: '2025-07-24', amount: 47.60, platform: 'Rappi' },
  { id: '23', date: '2025-07-23', amount: 34.25, platform: 'Uber' },
  { id: '24', date: '2025-07-23', amount: 37.90, platform: 'DiDi' },
  { id: '25', date: '2025-07-22', amount: 53.75, platform: 'Rappi' },
  { id: '26', date: '2025-07-22', amount: 28.30, platform: 'Uber' },
  { id: '27', date: '2025-07-21', amount: 41.85, platform: 'DiDi' },
  { id: '28', date: '2025-07-21', amount: 46.20, platform: 'Rappi' },
  { id: '29', date: '2025-07-20', amount: 32.95, platform: 'Uber' },
  { id: '30', date: '2025-07-20', amount: 35.40, platform: 'DiDi' }
];

export const mockPortfolio: Portfolio = {
  totalValue: 127.50,
  assets: [
    {
      name: 'Bono del Tesoro Tokenizado',
      symbol: 'BTT-2030',
      amount: 0.0012,
      value: 75.30,
      change24h: 1.2,
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop'
    },
    {
      name: 'Fondo Inmobiliario Tokenizado',
      symbol: 'FIT-MEX',
      amount: 0.0050,
      value: 52.20,
      change24h: -0.8,
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=150&h=150&fit=crop'
    }
  ]
};

// Datos para gráficos de crecimiento del portafolio
export const portfolioGrowthData = [
  { date: '2025-07-01', value: 0 },
  { date: '2025-07-08', value: 15.20 },
  { date: '2025-07-15', value: 32.45 },
  { date: '2025-07-22', value: 58.70 },
  { date: '2025-07-29', value: 89.30 },
  { date: '2025-08-03', value: 127.50 }
]; 