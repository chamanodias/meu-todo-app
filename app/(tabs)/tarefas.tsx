// app/(tabs)/tarefas.tsx
import React, { useEffect, useState } from "react";
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
} from "react-native";
import { useTodoStore } from "../../store/todoStore"; // ajuste o caminho se sua store estiver em outro lugar

interface Task {
  id: string;
  title: string;
  completed: boolean;
  categoryId: string | null;
}

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
    <TouchableOpacity
      onPress={() => onToggle(task.id)}
      style={styles.taskTextContainer}
    >
      <Text style={[styles.taskText, task.completed && styles.taskCompleted]}>
        {task.title}
      </Text>
    </TouchableOpacity>
    <View style={styles.taskButtonsContainer}>
      <Button title="✏️" onPress={() => onEdit(task)} color="#ffc107" />
      <Button title="🗑️" onPress={() => onDelete(task.id)} color="#dc3545" />
    </View>
  </View>
);

export default function TarefasScreen() {
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
  } = useTodoStore();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddOrUpdateTask = async () => {
    if (newTaskTitle.trim() === "") {
      Alert.alert("Atenção", "O título da tarefa não pode ser vazio.");
      return;
    }

    if (editingTask) {
      await updateTask(editingTask.id, newTaskTitle, editingTask.categoryId);
      Alert.alert("Sucesso", "Tarefa atualizada!");
      setEditingTask(null);
    } else {
      await addTask(newTaskTitle, null);
      Alert.alert("Sucesso", "Tarefa adicionada!");
    }

    setNewTaskTitle("");
  };

  const handleEditTask = (task: Task) => {
    setNewTaskTitle(task.title);
    setEditingTask(task);
  };

  const handleDeleteTask = (id: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () => deleteTask(id),
          style: "destructive",
        },
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
        <Text style={styles.errorText}>
          Erro ao carregar/modificar tarefas:
        </Text>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={fetchTasks} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Minhas Tarefas 📋</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={
            editingTask ? "Editar tarefa..." : "Adicionar nova tarefa..."
          }
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={handleAddOrUpdateTask}
        />
        <Button
          title={editingTask ? "Atualizar" : "Adicionar"}
          onPress={handleAddOrUpdateTask}
          disabled={isLoading}
        />
      </View>

      {isLoading && (
        <ActivityIndicator style={styles.inlineLoading} color="#007bff" />
      )}

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
            <Text style={styles.emptyText}>
              Nenhuma tarefa ainda! Adicione uma acima.
            </Text>
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
    paddingTop: Platform.OS === "android" ? 20 : 0,
    backgroundColor: "#f4f7f6",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f7f6",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ced4da",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "white",
    fontSize: 16,
  },
  taskItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
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
    color: "#333",
  },
  taskCompleted: {
    textDecorationLine: "line-through",
    color: "gray",
    fontStyle: "italic",
  },
  taskButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "gray",
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inlineLoading: {
    marginVertical: 10,
  },
});
