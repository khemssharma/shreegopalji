import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import useEmployeeStore from '../store/useEmployeeStore';

const AddEmployeeDialog = ({ open, onClose }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const createEmployee = useEmployeeStore((state) => state.createEmployee);
    const loading = useEmployeeStore((state) => state.loading);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await createEmployee({ name, email, password, role });
        if (success) {
            setName('');
            setRole('');
            setEmail('');
            setPassword('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Employee</DialogTitle>
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
                        label="Role"
                        fullWidth
                        margin="normal"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEmployeeDialog;