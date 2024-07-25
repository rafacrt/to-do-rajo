import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import PartnerForm from './PartnerForm';

const ClientForm = ({ open, onClose, onClientAdded }) => {
  const [client, setClient] = useState({ name: '', email: '', phone: '', isPartner: false, partner: '' });
  const [partners, setPartners] = useState([]);
  const [partnerDialogOpen, setPartnerDialogOpen] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/partners');
      setPartners(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePartnerAdded = (newPartner) => {
    setPartners([...partners, newPartner]);
    setClient(prevClient => ({ ...prevClient, partner: newPartner._id }));
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setClient((prevClient) => ({ ...prevClient, [name]: name === 'isPartner' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting client:', client); // Adicione este log para verificar os dados
    try {
      const response = await axios.post('http://localhost:3000/api/clients', client);
      console.log('Client added:', response.data); // Adicione este log para verificar a resposta
      onClientAdded(response.data);
      onClose();
    } catch (err) {
      console.error('Error adding client:', err); // Adicione este log para verificar erros
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Cliente</DialogTitle>
      <DialogContent>
        <TextField label="Nome do Cliente" fullWidth margin="normal" name="name" value={client.name} onChange={handleChange} required />
        <TextField label="Email" fullWidth margin="normal" name="email" value={client.email} onChange={handleChange} />
        <TextField label="Telefone" fullWidth margin="normal" name="phone" value={client.phone} onChange={handleChange} />
        <FormControlLabel
          control={<Checkbox checked={client.isPartner} onChange={handleChange} name="isPartner" />}
          label="Veio de parceiro?"
        />
        {client.isPartner && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Parceiro</InputLabel>
              <Select name="partner" value={client.partner} onChange={handleChange}>
                <MenuItem value="" onClick={() => setPartnerDialogOpen(true)}>Registrar novo parceiro</MenuItem>
                {partners.map(partner => (
                  <MenuItem key={partner._id} value={partner._id}>{partner.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <PartnerForm
              open={partnerDialogOpen}
              onClose={() => setPartnerDialogOpen(false)}
              onPartnerAdded={handlePartnerAdded}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientForm;
