import { create } from 'zustand';

// Interface para uma Categoria
interface Category {
  id: string;
  name: string;
  // color?: string; // Opcional: poderíamos adicionar uma cor para a categoria no futuro
}

// Interface para uma Tarefa (agora com categoryId)
interface Task {
  id: string;
  title: string;
  completed: boolean;
  categoryId: string | null; // ID da categoria à qual a tarefa pertence (null se não tiver categoria)
}

// Interface para o estado da store
interface TodoState {
  categories: Category[];
  tasks: Task[];
  isLoading: boolean;
  error: string | null;

  // Funções para Categorias
  addCategory: (name: string) => Promise<void>;
  // Futuramente: updateCategory, deleteCategory

  // Funções para Tarefas
  fetchTasks: () => Promise<void>; // Ainda mockada, mas poderia buscar tudo
  addTask: (title: string, categoryId: string | null) => Promise<void>; // Recebe categoryId
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, newTitle: string, newCategoryId?: string | null) => Promise<void>; // Pode mudar categoria
}

// Função para gerar IDs únicos simples para o mock
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


export const useTodoStore = create<TodoState>((set, get) => ({
  // --- DADOS INICIAIS MOCKADOS ---
  categories: [
    { id: 'cat1_study', name: 'Estudo' },
    { id: 'cat2_work', name: 'Trabalho' },
    { id: 'cat3_personal', name: 'Pessoal' },
  ],
  tasks: [
    { id: generateId(), title: 'Revisar aula de Zustand', completed: true, categoryId: 'cat1_study' },
    { id: generateId(), title: 'Preparar apresentação', completed: false, categoryId: 'cat2_work' },
    { id: generateId(), title: 'Ir ao mercado', completed: false, categoryId: 'cat3_personal' },
    { id: generateId(), title: 'Ler documentação do Expo Router', completed: false, categoryId: 'cat1_study' },
    { id: generateId(), title: 'Enviar emails importantes', completed: true, categoryId: 'cat2_work' },
    { id: generateId(), title: 'Agendar consulta', completed: false, categoryId: null }, // Tarefa sem categoria
  ],
  // ---------------------------------

  isLoading: false,
  error: null,

  // --- FUNÇÕES CRUD MOCKADAS PARA CATEGORIAS ---
  addCategory: async (name: string) => {
    set(state => ({ isLoading: true, error: null })); // Marcar isLoading true antes do timeout
    await new Promise(resolve => setTimeout(resolve, 300)); // Simula atraso da API
    const newCategory: Category = { id: generateId(), name };
    set(state => ({
      categories: [...state.categories, newCategory],
      isLoading: false,
    }));
    console.log("addCategory mockada:", newCategory);
  },

  // --- FUNÇÕES CRUD MOCKADAS PARA TAREFAS (AJUSTADAS) ---
  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    await new Promise(resolve => setTimeout(resolve, 500));
    // Na versão mockada, as tarefas já estão no estado. Apenas simulamos o carregamento.
    set({ isLoading: false });
    console.log("fetchTasks mockada foi chamada, usando dados locais.");
  },

  addTask: async (title: string, categoryId: string | null) => {
    set(state => ({ isLoading: true, error: null }));
    await new Promise(resolve => setTimeout(resolve, 300));
    const newTask: Task = {
      id: generateId(),
      title,
      completed: false,
      categoryId, // Associa a tarefa à categoria fornecida
    };
    set(state => ({
      tasks: [...state.tasks, newTask],
      isLoading: false,
    }));
    console.log("addTask mockada:", newTask);
  },

  toggleTask: async (id: string) => {
    set(state => ({ isLoading: true, error: null }));
    await new Promise(resolve => setTimeout(resolve, 200));
    set(state => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
      isLoading: false,
    }));
    console.log("toggleTask mockada para ID:", id);
  },

  deleteTask: async (id: string) => {
    set(state => ({ isLoading: true, error: null }));
    await new Promise(resolve => setTimeout(resolve, 300));
    set(state => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      isLoading: false,
    }));
    console.log("deleteTask mockada para ID:", id);
  },

  updateTask: async (id: string, newTitle: string, newCategoryId?: string | null) => {
    set(state => ({ isLoading: true, error: null }));
    await new Promise(resolve => setTimeout(resolve, 300));
    set(state => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? {
          ...task,
          title: newTitle,
          // Atualiza categoryId apenas se newCategoryId for explicitamente fornecido
          // (pode ser string ou null). Se for undefined, mantém o categoryId existente.
          categoryId: newCategoryId !== undefined ? newCategoryId : task.categoryId
        } : task
      ),
      isLoading: false,
    }));
    console.log("updateTask mockada para ID:", id, "Novo título:", newTitle, "Nova Cat ID:", newCategoryId);
  },
}));