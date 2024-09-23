import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Animated } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [slideAnim] = useState(new Animated.Value(0));

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { text: task, done: false }]);
      setTask('');
      slideUp();
    }
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((item, i) => {
      if (i === index) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const slideUp = () => {
    slideAnim.setValue(0);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#B0B0B0"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={addTask} color="#FF6F61" />
      </View>
      <Animated.View style={[styles.taskList, { opacity: slideAnim }]}>
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <View style={styles.taskBox}>
              <Text style={[styles.task, item.done && styles.doneTask]}>{item.text}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => toggleTask(index)}>
                  <Text style={styles.doneText}>{item.done ? 'Undo' : 'Done'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeTask(index)}>
                  <Text style={styles.removeText}>✖</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Animated.View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: '#FF6F61',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: '85%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    color: '#333',
  },
  taskList: {
    marginTop: 20,
    width: '100%',
  },
  taskBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  task: {
    color: '#4A4A4A',
    fontSize: 16,
  },
  doneTask: {
    textDecorationLine: 'line-through',
    color: '#A0A0A0', // Gray color for completed tasks
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneText: {
    color: '#4CAF50', // Green for done text
    marginRight: 10,
  },
  removeText: {
    color: '#FF4B5C',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
