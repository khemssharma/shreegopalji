import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import useProjectStore from '../store/useProjectStore';

const CreateProjectDialog = ({ open, onClose }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Ongoing');
    const createProject = useProjectStore((state) => state.createProject);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await createProject({ name, location, description, startDate, endDate, status });
        if (success) {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Project Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Location"
                        fullWidth
                        margin="normal"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        label="Start Date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                    <TextField
                        select
                        label="Status"
                        fullWidth
                        margin="normal"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="Ongoing">Ongoing</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="On Hold">On Hold</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </TextField>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateProjectDialog;