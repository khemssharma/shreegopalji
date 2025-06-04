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

const MaterialDialog = ({ open, onClose, onRequest }) => {
  const [projectId, setProjectId] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materials, setMaterials] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [success, setSuccess] = useState("");
  const { user } = useStore();
  const {
    requestMaterial,
    materialLoading,
    materialError,
    getMaterials,
    updateMaterial,
    deleteMaterial
  } = useProjectStore();

  // Fetch materials when dialog opens
  React.useEffect(() => {
    if (open && getMaterials) {
      getMaterials().then(setMaterials);
    }
  }, [open, getMaterials]);

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
        if (getMaterials) getMaterials().then(setMaterials);
      }, 1000);
    }
  };

  const handleEdit = (index) => {
    const mat = materials[index];
    setProjectId(mat.projectId);
    setMaterialName(mat.materialName);
    setQuantity(mat.quantity);
    setEditIndex(index);
  };

  const handleUpdate = async () => {
    if (editIndex === null) return;
    const mat = materials[editIndex];
    const ok = await updateMaterial({
      ...mat,
      projectId,
      materialName,
      quantity: Number(quantity)
    });
    if (ok) {
      setSuccess("Material updated!");
      setTimeout(() => {
        setSuccess("");
        setProjectId("");
        setMaterialName("");
        setQuantity("");
        setEditIndex(null);
        if (getMaterials) getMaterials().then(setMaterials);
      }, 1000);
    }
  };

  const handleDelete = async (index) => {
    const mat = materials[index];
    if (window.confirm("Delete this material?")) {
      await deleteMaterial(mat.id);
      if (getMaterials) getMaterials().then(setMaterials);
    }
  };

  const handleCancelEdit = () => {
    setProjectId("");
    setMaterialName("");
    setQuantity("");
    setEditIndex(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Inventory2OutlinedIcon color="primary" />
          <Typography variant="h6" color="primary">
            Material Management
          </Typography>
        </Box>
        <Typography variant="subtitle2" color="textSecondary">
          Shree Gopalji Infratech Pvt Ltd
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* Material List */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>Materials</Typography>
          <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc" }}>Project ID</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Material</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Quantity</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials && materials.length > 0 ? materials.map((mat, idx) => (
                <tr key={mat.id || idx}>
                  <td style={{ borderBottom: "1px solid #eee" }}>{mat.projectId}</td>
                  <td style={{ borderBottom: "1px solid #eee" }}>{mat.materialName}</td>
                  <td style={{ borderBottom: "1px solid #eee" }}>{mat.quantity}</td>
                  <td style={{ borderBottom: "1px solid #eee" }}>
                    <Button size="small" onClick={() => handleEdit(idx)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(idx)}>Delete</Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4}><Typography color="textSecondary">No materials found.</Typography></td>
                </tr>
              )}
            </tbody>
          </Box>
        </Box>

        {/* Add/Edit Material Form */}
        <Typography variant="subtitle1" gutterBottom>
          {editIndex !== null ? "Edit Material" : "Request Material"}
        </Typography>
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
          Close
        </Button>
        {editIndex !== null ? (
          <>
            <Button
              onClick={handleUpdate}
              color="primary"
              variant="contained"
              disabled={materialLoading || !projectId || !materialName || !quantity}
            >
              Update
            </Button>
            <Button onClick={handleCancelEdit} color="inherit" disabled={materialLoading}>
              Cancel Edit
            </Button>
          </>
        ) : (
          <Button
            onClick={handleRequest}
            color="primary"
            variant="contained"
            disabled={materialLoading || !projectId || !materialName || !quantity}
          >
            Request
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MaterialDialog;