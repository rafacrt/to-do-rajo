import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: uuidv4(), status: 'Aberta' }]);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const viewTask = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };

  const closeTask = (id, completionDate, closeObservations) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: 'Fechada', completionDate, closeObservations } : task));
    setSelectedTask(null);
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
