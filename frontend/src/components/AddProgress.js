import React, { useState } from "react";
import {
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        Button,
        TextField,
        LinearProgress,
        Typography,
        Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddProgress = ({ open, onClose, onAdd }) => {
const [progress, setProgress] = useState("");
const [description, setDescription] = useState("");
const [loading, setLoading] = useState(false);

const handleAdd = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        onAdd({ progress, description });
        setProgress("");
        setDescription("");
        onClose();
    }, 1200);
};

return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
            <Box display="flex" alignItems="center" gap={1}>
                <AddCircleOutlineIcon color="primary" />
                <Typography variant="h6" color="primary">
                    Add Progress Update
                </Typography>
            </Box>
            <Typography variant="subtitle2" color="textSecondary">
                Shree Gopalji Infratech Pvt Ltd
            </Typography>
        </DialogTitle>
        <DialogContent>
            <TextField
                label="Progress (%)"
                type="number"
                fullWidth
                margin="normal"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                inputProps={{ min: 0, max: 100 }}
            />
            <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {loading && (
                <Box mt={2}>
                    <LinearProgress />
                </Box>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary" disabled={loading}>
                Cancel
            </Button>
            <Button
                onClick={handleAdd}
                color="primary"
                variant="contained"
                disabled={loading || !progress || !description}
            >
                Add Progress
            </Button>
        </DialogActions>
    </Dialog>
);
};

export default AddProgress;