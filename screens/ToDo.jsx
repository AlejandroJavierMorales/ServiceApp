import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useGetTodosQuery, useAddTodoMutation, useRemoveTodoMutation, useEditTodoMutation } from '../services/toDoService';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const ToDo = ({navigation, route}) => {
  const { user } = useSelector((state) => state.auth.value);
  const { data: initialTodos = [], isLoading, error, refetch } = useGetTodosQuery();
  const [todos, setTodos] = useState([]);
  const [todosOfUser, setTodosOfUser] = useState([])
  const [addTodo] = useAddTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (initialTodos.length > 0) {
      const todosWithId = initialTodos.map((todo, index) => ({
        ...todo,
        id: todo?.id ?? index + 1,
      }));
      setTodos(todosWithId);
    }
  }, [initialTodos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoObject = {
        text: newTodo,
        completed: false,
        created_date: new Date().toLocaleDateString('en-GB'),
        email: user,
      };

      addTodo(newTodoObject).unwrap()
        .then((newTodoResponse) => {
          if (newTodoResponse && newTodoResponse.id) {
            setTodos([newTodoResponse, ...todos]);
            setNewTodo('');
          } else {
            console.error('Error al agregar una tarea: ', newTodoResponse);
          }
        })
        .catch((error) => {
          console.error('Error al Agregar una Tarea:', error);
        });
    }
  };

  const handleRemoveTodo = (id) => {
    Alert.alert(
      'Confirmar Borrado!',
      'Está seguro de Eliminar esta Tarea?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Borrar',
          onPress: () => {
            removeTodo(id).unwrap()
              .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
              })
              .catch((error) => {
                console.error('Error al Eliminar  una Tarea:', error);
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

  const handleCancelEdit = () => {
    setNewTodo('');
    setEditMode(false);
    setEditId(null);
  };

  const handleRefresh = () => {
    refetch();
  };


  useEffect(()=>{
    //filtrar las notas del usuario logueado
    const filteredData = todos.filter(todo => todo?.email === user);
    setTodosOfUser(filteredData);
  },[todos])

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.created_date} - {item.text}</Text>
      <TouchableOpacity onPress={() => handleStartEdit(item.id, item.text)}>
        <Icon name="edit" size={24} color="green" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
        <Icon name="trash" size={24} color="red" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  if (error) {
    console.error('Error Fetching Todos:', error);
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una nueva nota"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={editMode ? handleConfirmEdit : handleAddTodo}
            style={styles.btnAddSave}
          >
            <Text style={styles.textButton}>{editMode ? "Guardar Tarea" : "Nueva Tarea"}</Text>
          </TouchableOpacity>
          {editMode && (
            <TouchableOpacity
              onPress={handleCancelEdit}
              style={styles.btnCancelEdit}
            >
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Icon name="refresh" size={21} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={todosOfUser}
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
    marginTop: 15,
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refreshButton: {
    width: 40,
    height: 40,
    backgroundColor: '#24af63',
    borderRadius: 50,
    padding: 10,
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
    fontSize: 14,
    flex: 1,
  },
  icon: {
    marginLeft: 15,
  },
  btnCancelEdit: {
    borderRadius: 3,
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  btnAddSave: {
    borderRadius: 3,
    backgroundColor: '#24af63', // verde background
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  textButton: {
    color: '#fff',
  },
});

export default ToDo;
