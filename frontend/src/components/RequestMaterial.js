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
    MenuItem
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const materialTypes = [
    "Cement",
    "Steel",
    "Bricks",
    "Sand",
    "Gravel",
    "Paint",
    "Tiles",
    "Pipes",
    "Other"
];

const RequestMaterial = ({ open, onClose, onRequest }) => {
    const [site, setSite] = useState("");
    const [material, setMaterial] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");
    const [remarks, setRemarks] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleRequest = async () => {
        setError("");
        setSuccess("");
        if (!site || !material || !quantity || !unit) {
            setError("Please fill all required fields.");
            return;
        }
        setLoading(true);
        try {
            // Replace with your backend endpoint and auth if needed
            const token = localStorage.getItem("token");
            const response = await fetch("https://shreegopalji.onrender.com/api/material/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ site, material, quantity, unit, remarks })
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Failed to request material.");
            } else {
                setSuccess("Material request submitted!");
                setSite("");
                setMaterial("");
                setQuantity("");
                setUnit("");
                setRemarks("");
                if (onRequest) onRequest(data);
                setTimeout(() => {
                    setSuccess("");
                    onClose();
                }, 1200);
            }
        } catch (err) {
            setError("Network error. Please try again.");
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center" gap={1}>
                    <Inventory2OutlinedIcon color="primary" />
                    <Typography variant="h6" color="primary">
                        Request Material
                    </Typography>
                </Box>
                <Typography variant="subtitle2" color="textSecondary">
                    Shree Gopalji Infratech Pvt Ltd
                </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Site Name / Code"
                    fullWidth
                    margin="normal"
                    value={site}
                    onChange={e => setSite(e.target.value)}
                />
                <TextField
                    select
                    label="Material Type"
                    fullWidth
                    margin="normal"
                    value={material}
                    onChange={e => setMaterial(e.target.value)}
                >
                    {materialTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                </TextField>
                <Box display="flex" gap={2}>
                    <TextField
                        label="Quantity"
                        type="number"
                        margin="normal"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        inputProps={{ min: 1 }}
                        sx={{ flex: 2 }}
                    />
                    <TextField
                        label="Unit"
                        margin="normal"
                        value={unit}
                        onChange={e => setUnit(e.target.value)}
                        placeholder="e.g. bags, tons, pieces"
                        sx={{ flex: 3 }}
                    />
                </Box>
                <TextField
                    label="Remarks (optional)"
                    multiline
                    rows={2}
                    fullWidth
                    margin="normal"
                    value={remarks}
                    onChange={e => setRemarks(e.target.value)}
                />
                {loading && (
                    <Box mt={2}>
                        <LinearProgress />
                    </Box>
                )}
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
                )}
                {success && (
                    <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleRequest}
                    color="primary"
                    variant="contained"
                    disabled={loading || !site || !material || !quantity || !unit}
                >
                    Request
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RequestMaterial;