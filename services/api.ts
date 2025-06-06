import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração base do axios
const api = axios.create({
  baseURL: 'http://192.168.0.174:3000/api', // IP da sua máquina
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    return config;
  }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('O servidor demorou muito para responder. Tente novamente.');
    }
    
    if (!error.response) {
      throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando e se o IP está correto.');
    }

    // Erros específicos do servidor
    if (error.response.status === 404) {
      throw new Error('Serviço não encontrado. Verifique a URL do servidor.');
    }

    if (error.response.status === 500) {
      throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
    }

    // Erro padrão com mensagem do servidor
    const errorMessage = error.response.data?.message || 'Ocorreu um erro. Tente novamente.';
    throw new Error(errorMessage);
  }
);

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
  };
}

export const authService = {
  // Função para verificar se o servidor está online
  checkServerStatus: async (): Promise<boolean> => {
    try {
      await api.get('/health');
      return true;
    } catch {
      return false;
    }
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erro ao fazer login');
      }
      throw error;
    }
  },

  register: async (email: string, password: string): Promise<RegisterResponse> => {
    try {
      const response = await api.post<RegisterResponse>('/auth/register', { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erro ao registrar');
      }
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem('token');
  },
};

export default api; 