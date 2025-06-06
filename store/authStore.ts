import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/api';

interface User { // Uma interface simples para o usuário
  id: string;
  email: string; // Ou username, etc.
  // Adicione mais campos do usuário conforme necessário
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean; // Para simular chamadas de API
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  // Futuramente: checkAuthStatus, etc.
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Validação básica
      if (!email || !password) {
        set({ 
          isLoading: false, 
          error: 'Email e senha são obrigatórios' 
        });
        return false;
      }

      const response = await authService.login(email, password);
      
      await AsyncStorage.setItem('token', response.token);
      
      set({
        isAuthenticated: true,
        user: response.user,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: errorMessage,
      });
      return false;
    }
  },

  register: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      // Validação básica
      if (!email || !password) {
        set({ 
          isLoading: false, 
          error: 'Email e senha são obrigatórios' 
        });
        return false;
      }

      if (password.length < 6) {
        set({ 
          isLoading: false, 
          error: 'A senha deve ter pelo menos 6 caracteres' 
        });
        return false;
      }

      const response = await authService.register(email, password);
      set({ 
        isLoading: false,
        error: null,
      });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao registrar';
      set({
        isLoading: false,
        error: errorMessage,
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('token');
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer logout';
      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },
}));

// Função simples para gerar IDs, se não tiver uma global
const generateId = () => Math.random().toString(36).substring(2, 15);