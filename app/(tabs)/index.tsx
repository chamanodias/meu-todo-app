import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useTodoStore } from '../../store/todoStore'; // Verifique se o caminho está correto

// Interface para uma Tarefa (refletindo a store com categoryId)
interface Task {
  id: string;
  title: string;
  completed: boolean;
  categoryId: string | null; // Adicionado para consistência, embora não usado no TaskItem ainda
}

// Componente para cada item da lista
const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}) => (
  <View style={styles.taskItemContainer}>
    <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.taskTextContainer}>
      {/* Exibindo o título da tarefa. No futuro, poderíamos mostrar a qual categoria ela pertence */}
      <Text style={[styles.taskText, task.completed && styles.taskCompleted]}>
        {task.title}
      </Text>
      {/* Exemplo: <Text style={styles.taskCategory}>Categoria: {task.categoryId || 'Nenhuma'}</Text> */}
    </TouchableOpacity>
    <View style={styles.taskButtonsContainer}>
      <Button title="✏️" onPress={() => onEdit(task)} color="#ffc107" />
      <Button title="🗑️" onPress={() => onDelete(task.id)} color="#dc3545" />
    </View>
  </View>
);

export default function HomeScreen() {
  const {
    tasks, // Agora as tarefas da store têm categoryId
    isLoading,
    error,
    fetchTasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    // categories, // Poderíamos pegar as categorias aqui no futuro para um Picker, por exemplo
    // addCategory, // Poderíamos ter um botão para adicionar categorias
  } = useTodoStore();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  // No futuro, poderíamos ter um estado para a categoria selecionada ao adicionar tarefa:
  // const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks(); // Busca as tarefas (e categorias, se fetchTasks fosse ajustada) da store
  }, [fetchTasks]);

  const handleAddOrUpdateTask = async () => {
    if (newTaskTitle.trim() === '') {
      Alert.alert('Atenção', 'O título da tarefa não pode ser vazio.');
      return;
    }

    if (editingTask) {
      // Atualizar tarefa existente
      // Por enquanto, atualiza apenas o título. A categoria não é alterada aqui.
      // Para alterar a categoria, precisaríamos de um seletor de categoria no modo de edição
      // e passar o novo editingTask.categoryId para updateTask.
      await updateTask(editingTask.id, newTaskTitle, editingTask.categoryId); // Passando o categoryId existente
      Alert.alert('Sucesso', 'Tarefa atualizada!');
      setEditingTask(null);
    } else {
      // Adicionar nova tarefa
      // CORRIGIDO: Novas tarefas são adicionadas com categoryId: null (sem categoria) por enquanto.
      // No futuro, teremos um Picker para o usuário selecionar a categoria.
      await addTask(newTaskTitle, null); // ou selectedCategoryId se tivéssemos um seletor
      Alert.alert('Sucesso', 'Tarefa adicionada!');
    }
    setNewTaskTitle('');
  };

  const handleEditTask = (task: Task) => {
    setNewTaskTitle(task.title);
    setEditingTask(task); // editingTask agora contém o categoryId da tarefa
  };

  const handleDeleteTask = (id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteTask(id), style: 'destructive' },
      ]
    );
  };

  if (isLoading && !tasks.length) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando tarefas...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Erro ao carregar/modificar tarefas:</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={fetchTasks} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Minhas Tarefas 📋</Text>

      {/* No futuro: Adicionar UI para criar e selecionar categorias aqui */}
      {/* Exemplo: <TextInput placeholder="Nova Categoria" ... /> <Button title="Add Cat" onPress={() => addCategory(...)} /> */}
      {/* Exemplo: <Picker selectedValue={selectedCategoryId} onValueChange={(itemValue) => setSelectedCategoryId(itemValue)}> ... </Picker> */}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={editingTask ? "Editar tarefa..." : "Adicionar nova tarefa..."}
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={handleAddOrUpdateTask}
        />
        <Button
          title={editingTask ? 'Atualizar' : 'Adicionar'}
          onPress={handleAddOrUpdateTask}
          disabled={isLoading}
        />
      </View>

      {isLoading && <ActivityIndicator style={styles.inlineLoading} color="#007bff" />}

      {/* A FlatList abaixo ainda lista todas as tarefas juntas.
          O próximo passo será agrupar ou filtrar tarefas por categoria. */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        )}
        ListEmptyComponent={
          !isLoading ? (
            <Text style={styles.emptyText}>Nenhuma tarefa ainda! Adicione uma acima.</Text>
          ) : null
        }
        contentContainerStyle={tasks.length === 0 && styles.emptyListContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    backgroundColor: '#f4f7f6',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f7f6',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ced4da',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  taskItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontStyle: 'italic',
  },
  // taskCategory: { // Estilo para exibir categoria, se quisermos
  //   fontSize: 12,
  //   color: 'darkgray',
  // },
  taskButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: 'gray',
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inlineLoading: {
    marginVertical: 10,
  }
});