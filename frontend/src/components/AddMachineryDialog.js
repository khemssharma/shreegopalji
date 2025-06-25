import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, CircularProgress } from '@mui/material';

const AddMachineryDialog = ({ open, onClose, projectId }) => {
    const [machines, setMachines] = useState([]);
    const [selectedMachineId, setSelectedMachineId] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    // Fetch all machines when dialog opens
    useEffect(() => {
        if (open) {
            setFetching(true);
            fetch('https://shreegopalji.onrender.com/api/machines')
                .then(res => res.json())
                .then(data => {
                    setMachines(data);
                    setFetching(false);
                })
                .catch(() => setFetching(false));
        }
    }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedMachineId || !projectId) return;
        setLoading(true);
        const res = await fetch('https://shreegopalji.onrender.com/api/machines/assign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ machineId: selectedMachineId, projectId }),
        });
        setLoading(false);
        if (res.ok) {
            setSelectedMachineId('');
            onClose();
        } else {
            alert('Failed to assign machinery');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Existing Machinery to Site</DialogTitle>
            <DialogContent>
                {fetching ? (
                    <CircularProgress />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            select
                            label="Select Machine"
                            fullWidth
                            margin="normal"
                            value={selectedMachineId}
                            onChange={(e) => setSelectedMachineId(e.target.value)}
                            required
                        >
                            {machines.map((machine) => (
                                <MenuItem key={machine._id} value={machine._id}>
                                    {machine.name} ({machine.type}) - SN: {machine.serialNumber}
                                </MenuItem>
                            ))}
                        </TextField>
                    </form>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={loading || !selectedMachineId}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMachineryDialog;