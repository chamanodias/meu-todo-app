import { create } from 'zustand';

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
  login: (email: string, pass: string) => Promise<boolean>; // Retorna true se sucesso
  register: (email: string, pass: string) => Promise<boolean>; // Retorna true se sucesso
  logout: () => Promise<void>;
  // Futuramente: checkAuthStatus, etc.
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false, // Começa deslogado
  user: null,
  isLoading: false,
  error: null,

  // Mock da função de login
  login: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula chamada à API

    // Lógica de login mockada (extremamente simples)
    if (email && pass) { // Não valida as credenciais, apenas verifica se foram preenchidas
      const mockUser: User = { id: 'user123', email: email };
      set({ isAuthenticated: true, user: mockUser, isLoading: false });
      console.log('Login mock bem-sucedido:', mockUser);
      return true;
    } else {
      const errorMsg = 'Email ou senha inválidos (mock)';
      set({ isAuthenticated: false, user: null, isLoading: false, error: errorMsg });
      console.error('Falha no login mock:', errorMsg);
      return false;
    }
  },

  // Mock da função de registro
  register: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Lógica de registro mockada
    if (email && pass) {
      const mockUser: User = { id: generateId(), email: email }; // Usando generateId se tiver
      // Em um app real, você não logaria o usuário automaticamente após o registro
      // ou logaria e já o colocaria como isAuthenticated: true
      console.log('Registro mock bem-sucedido para:', mockUser);
      // Por enquanto, o registro mock não loga o usuário automaticamente
      set({ isLoading: false });
      return true; // Indica sucesso no registro, o usuário pode então fazer login
    } else {
      const errorMsg = 'Dados de registro inválidos (mock)';
      set({ isLoading: false, error: errorMsg });
      console.error('Falha no registro mock:', errorMsg);
      return false;
    }
  },

  // Mock da função de logout
  logout: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ isAuthenticated: false, user: null, isLoading: false, error: null });
    console.log('Logout mock realizado.');
  },
}));

// Função simples para gerar IDs, se não tiver uma global
const generateId = () => Math.random().toString(36).substring(2, 15);