import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useGetTodosQuery, useAddTodoMutation, useRemoveTodoMutation, useEditTodoMutation } from '../services/toDoService';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const ToDo = () => {
  const { data: initialTodos = [], isLoading, error, refetch } = useGetTodosQuery();
  const [todos, setTodos] = useState([]);
  const [addTodo] = useAddTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const { user } = useSelector((state) => state.auth.value);

  useEffect(() => {
    if (initialTodos.length > 0) {
      // Ensure each todo has an ID
      const todosWithId = initialTodos.map((todo, index) => ({
        ...todo,
        id: todo.id ?? index + 1, // Assign a sequential ID if none exists
      }));
      setTodos(todosWithId);
    }
  }, [initialTodos]);

  const getNextId = () => {
    if (todos.length === 0) {
      return 1;
    }
    const highestId = Math.max(...todos.map(todo => todo.id));
    return highestId + 1;
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoObject = {
        text: newTodo,
        completed: false,
        created_date: new Date().toLocaleDateString('en-GB'),
        userId: user?.email,
        id: getNextId(),
      };

      addTodo(newTodoObject).unwrap()
        .then((newTodoResponse) => {
          if (newTodoResponse && newTodoResponse.id) {
            setTodos([newTodoResponse, ...todos]);
            setNewTodo('');
          } else {
            console.error('Error adding todo: newTodoResponse or its ID is undefined', newTodoResponse);
          }
        })
        .catch((error) => {
          console.error('Error adding todo:', error);
        });
    }
  };

  const handleRemoveTodo = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            removeTodo(id).unwrap()
              .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
              })
              .catch((error) => {
                console.error('Error removing todo:', error);
              });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleStartEdit = (id, text) => {
    setNewTodo(text);
    setEditMode(true);
    setEditId(id);
  };

  const handleConfirmEdit = () => {
    const todoToEdit = todos.find(todo => todo.id === editId);
    const updatedTodo = {
      ...todoToEdit,
      text: newTodo,
    };

    editTodo(updatedTodo).unwrap()
      .then(() => {
        setTodos(todos.map(todo => todo.id === editId ? updatedTodo : todo));
        setNewTodo('');
        setEditMode(false);
        setEditId(null);
      })
      .catch((error) => {
        console.error('Error editing todo:', error);
      });
  };

  const handleRefresh = () => {
    refetch();
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.created_date} - {item.text}</Text>
      <TouchableOpacity onPress={() => handleStartEdit(item.id, item.text)}>
        <Icon name="edit" size={20} color="green" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
        <Icon name="trash" size={20} color="green" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button
          title={editMode ? "Save Task" : "Add Task"}
          onPress={editMode ? handleConfirmEdit : handleAddTodo}
        />
      </View>
      <Button title="Refresh" onPress={handleRefresh} />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  todoText: {
    fontSize: 18,
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
});

export default ToDo;

