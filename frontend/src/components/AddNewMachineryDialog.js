import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress } from '@mui/material';

const AddNewMachineryDialog = ({ open, onClose }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [fuelCapacity, setFuelCapacity] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/machines/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                type,
                serialNumber,
                fuelCapacity: Number(fuelCapacity)
            }),
        });
        setLoading(false);
        if (res.ok) {
            setName('');
            setType('');
            setSerialNumber('');
            setFuelCapacity('');
            onClose();
        } else {
            alert('Failed to add new machinery');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Machinery</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Type"
                        fullWidth
                        margin="normal"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                    <TextField
                        label="Serial Number"
                        fullWidth
                        margin="normal"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                    />
                    <TextField
                        label="Fuel Capacity"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={fuelCapacity}
                        onChange={(e) => setFuelCapacity(e.target.value)}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddNewMachineryDialog;
