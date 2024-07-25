import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Login from './components/Login';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', { ...task, id: uuidv4(), status: 'Aberta' });
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const viewTask = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };

  const closeTask = async (id, completionDate, closeObservations, serviceTime) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${id}`, { status: 'Fechada', completionDate, closeObservations, serviceTime });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setSelectedTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Sistema de Gerenciamento de Tarefas
      </Typography>
      <TaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onView={viewTask} onCloseTask={closeTask} />
      {selectedTask && <TaskDetails task={selectedTask} onClose={closeTaskDetails} onCloseTask={closeTask} />}
    </Container>
  );
};

export default App;
