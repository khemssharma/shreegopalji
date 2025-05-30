import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, LinearProgress, Typography, Box, MenuItem
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import useProjectStore from "../store/useProjectStore";
import useStore from "../store/useAuthStore";

const materialTypes = [
  "Cement", "Steel", "Bricks", "Sand", "Gravel", "Paint", "Tiles", "Pipes", "Other"
];

const RequestMaterial = ({ open, onClose, onRequest }) => {
  const [projectId, setProjectId] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");
  const { user } = useStore();
  const { requestMaterial, materialLoading, materialError } = useProjectStore();
  const [success, setSuccess] = useState("");

  const handleRequest = async () => {
    if (!projectId || !materialName || !quantity) return;
    const ok = await requestMaterial({
      projectId,
      materialName,
      quantity: Number(quantity),
      requestedBy: user?.email || "siteincharge"
    });
    if (ok) {
      setSuccess("Material request submitted!");
      setTimeout(() => {
        setSuccess("");
        setProjectId("");
        setMaterialName("");
        setQuantity("");
        if (onRequest) onRequest();
        onClose();
      }, 1000);
    }
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
          label="Project ID"
          fullWidth
          margin="normal"
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
          required
        />
        <TextField
          select
          label="Material Type"
          fullWidth
          margin="normal"
          value={materialName}
          onChange={e => setMaterialName(e.target.value)}
          required
        >
          {materialTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Quantity"
          type="number"
          margin="normal"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          inputProps={{ min: 1 }}
          fullWidth
          required
        />
        {materialLoading && (
          <Box mt={2}>
            <LinearProgress />
          </Box>
        )}
        {materialError && (
          <Typography color="error" sx={{ mt: 2 }}>{materialError}</Typography>
        )}
        {success && (
          <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={materialLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleRequest}
          color="primary"
          variant="contained"
          disabled={materialLoading || !projectId || !materialName || !quantity}
        >
          Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestMaterial;