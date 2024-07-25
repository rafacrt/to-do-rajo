import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';

const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState({
    clientName: '',
    partnerName: '',
    serviceTime: '',
    status: '',
    project: '',
    taskName: '',
    date: '',
    observations: '',
    priority: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({
      clientName: '',
      partnerName: '',
      serviceTime: '',
      status: '',
      project: '',
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
          <TextField name="clientName" label="Nome do Cliente" value={task.clientName} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="partnerName" label="Nome do Parceiro" value={task.partnerName} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="serviceTime" label="Tempo de Serviço" value={task.serviceTime} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={task.status} onChange={handleChange}>
              <MenuItem value="Aberta">Aberta</MenuItem>
              <MenuItem value="Fechada">Fechada</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="project" label="Projeto" value={task.project} onChange={handleChange} fullWidth margin="normal" />
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
    </form>
  );
};

export default TaskForm;
