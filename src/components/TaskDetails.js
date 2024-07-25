import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';

const TaskDetails = ({ task, onClose, onCloseTask }) => {
  const [completionDate, setCompletionDate] = useState('');
  const [closeObservations, setCloseObservations] = useState('');

  const handleCloseTask = () => {
    onCloseTask(task.id, completionDate, closeObservations);
  };

  return (
    <Dialog open={Boolean(task)} onClose={onClose}>
      <DialogTitle>Detalhes da Tarefa</DialogTitle>
      <DialogContent>
        <DialogContentText>Nome do Cliente: {task.clientName}</DialogContentText>
        <DialogContentText>Nome do Parceiro: {task.partnerName}</DialogContentText>
        <DialogContentText>Tempo de Serviço: {task.serviceTime}</DialogContentText>
        <DialogContentText>Status: {task.status}</DialogContentText>
        <DialogContentText>Projeto: {task.project}</DialogContentText>
        <DialogContentText>Nome da Tarefa: {task.taskName}</DialogContentText>
        <DialogContentText>Data: {task.date}</DialogContentText>
        <DialogContentText>Observações: {task.observations}</DialogContentText>
        <DialogContentText>Prioridade: {task.priority}</DialogContentText>
        {task.status === 'Aberta' && (
          <>
            <TextField label="Data de Conclusão" type="date" fullWidth margin="normal" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} InputLabelProps={{ shrink: true }} />
            <TextField label="Observações de Fechamento" fullWidth margin="normal" value={closeObservations} onChange={(e) => setCloseObservations(e.target.value)} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Fechar</Button>
        {task.status === 'Aberta' && (
          <Button onClick={handleCloseTask} color="secondary">Fechar OS</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetails;
