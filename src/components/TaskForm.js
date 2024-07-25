import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import ClientForm from './ClientForm';
import ProjectForm from './ProjectForm';

const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState({
    clientName: '',
    projectName: '',
    partnerName: '',
    serviceTime: '',
    status: '',
    taskName: '',
    date: '',
    observations: '',
    priority: ''
  });
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  useEffect(() => {
    fetchClients();
    fetchProjects();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clients');
      setClients(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/projects');
      setProjects(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClientAdded = (newClient) => {
    setClients([...clients, newClient]);
    setTask(prevTask => ({ ...prevTask, clientName: newClient.name }));
  };

  const handleProjectAdded = (newProject) => {
    setProjects([...projects, newProject]);
    setTask(prevTask => ({ ...prevTask, projectName: newProject.name }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({
      clientName: '',
      projectName: '',
      partnerName: '',
      serviceTime: '',
      status: '',
      taskName: '',
      date: '',
      observations: '',
      priority: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Nome do Cliente</InputLabel>
            <Select name="clientName" value={task.clientName} onChange={handleChange}>
              <MenuItem value="" onClick={() => setClientDialogOpen(true)}>Registrar novo cliente</MenuItem>
              {clients.map(client => (
                <MenuItem key={client._id} value={client.name}>{client.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Projeto</InputLabel>
            <Select name="projectName" value={task.projectName} onChange={handleChange}>
              <MenuItem value="" onClick={() => setProjectDialogOpen(true)}>Registrar novo projeto</MenuItem>
              {projects.filter(project => project.client.name === task.clientName).map(project => (
                <MenuItem key={project._id} value={project.name}>{project.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="taskName" label="Nome da Tarefa" value={task.taskName} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="date" label="Data" type="date" value={task.date} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="observations" label="Observações" value={task.observations} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Prioridade</InputLabel>
            <Select name="priority" value={task.priority} onChange={handleChange}>
              <MenuItem value="Baixa">Baixa</MenuItem>
              <MenuItem value="Média">Média</MenuItem>
              <MenuItem value="Alta">Alta</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Enviar</Button>
        </Grid>
      </Grid>

      <ClientForm
        open={clientDialogOpen}
        onClose={() => setClientDialogOpen(false)}
        onClientAdded={handleClientAdded}
      />

      <ProjectForm
        open={projectDialogOpen}
        onClose={() => setProjectDialogOpen(false)}
        onProjectAdded={handleProjectAdded}
      />
    </form>
  );
};

export default TaskForm;
