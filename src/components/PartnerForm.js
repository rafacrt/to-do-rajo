import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const PartnerForm = ({ open, onClose, onPartnerAdded }) => {
  const [partner, setPartner] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner((prevPartner) => ({ ...prevPartner, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting partner:', partner); // Adicione este log para verificar os dados
    try {
      const response = await axios.post('http://localhost:3000/api/partners', partner); // Ajuste a porta para 3000
      console.log('Partner added:', response.data); // Adicione este log para verificar a resposta
      onPartnerAdded(response.data);
      onClose();
    } catch (err) {
      console.error('Error adding partner:', err); // Adicione este log para verificar erros
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Parceiro</DialogTitle>
      <DialogContent>
        <TextField label="Nome do Parceiro" fullWidth margin="normal" name="name" value={partner.name} onChange={handleChange} required />
        <TextField label="Email" fullWidth margin="normal" name="email" value={partner.email} onChange={handleChange} />
        <TextField label="Telefone" fullWidth margin="normal" name="phone" value={partner.phone} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartnerForm;
