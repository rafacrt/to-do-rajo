import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const TaskList = ({ tasks, onDelete, onView, onCloseTask }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome do Cliente</TableCell>
            <TableCell>Nome da Tarefa</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Prioridade</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index} style={{ backgroundColor: task.status === 'Fechada' ? '#e0e0e0' : '#fff' }}>
              <TableCell>{task.clientName}</TableCell>
              <TableCell>{task.taskName}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.date}</TableCell>
              <TableCell>
                <Button onClick={() => onView(task)} variant="contained" color="primary" size="small">Ver</Button>
                <Button onClick={() => onDelete(index)} variant="contained" color="secondary" size="small" style={{ marginLeft: '10px' }}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
