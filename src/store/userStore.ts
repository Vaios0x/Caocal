import { create } from 'zustand';
import { mockUser, mockEarnings, mockPortfolio, type User, type Earnings, type Portfolio } from '../data/mockData.js';

interface UserState {
  user: User | null;
  earnings: Earnings[];
  portfolio: Portfolio | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadUserData: () => Promise<void>;
  loadEarnings: () => Promise<void>;
  loadPortfolio: () => Promise<void>;
  setSavingsRate: (rate: number) => void;
}

export const useUserStore = create<UserState>((set, _get) => ({
  user: null,
  earnings: [],
  portfolio: null,
  isLoading: false,
  error: null,

  loadUserData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ user: mockUser, isLoading: false });
    } catch (_error) {
      set({ error: 'Error al cargar datos del usuario', isLoading: false });
    }
  },

  loadEarnings: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ earnings: mockEarnings, isLoading: false });
    } catch (_error) {
      set({ error: 'Error al cargar ganancias', isLoading: false });
    }
  },

  loadPortfolio: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 600));
      set({ portfolio: mockPortfolio, isLoading: false });
    } catch (_error) {
      set({ error: 'Error al cargar portafolio', isLoading: false });
    }
  },

  setSavingsRate: (rate: number) => {
    // Esta función simularía actualizar la tasa de ahorro en el backend
    console.log('Tasa de ahorro actualizada:', rate);
  },
})); 