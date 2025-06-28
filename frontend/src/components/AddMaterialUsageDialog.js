import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function AddMaterialUsageDialog({ open, onClose }) {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState("");
  const [usage, setUsage] = useState({
    quantity: "",
    unit: "",
    date: new Date().toISOString().split("T")[0],
    file: null,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);

  // Fetch dumped materials when dialog opens
  useEffect(() => {
    if (open) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_URL}/materials`)
        .then((res) => res.json())
        .then((data) => {
          setMaterials(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setSelectedMaterialId("");
      setUsage({
        quantity: "",
        unit: "",
        date: new Date().toISOString().split("T")[0],
        file: null,
      });
    }
  }, [open]);

  const handleMaterialSelect = (e) => {
    setSelectedMaterialId(e.target.value);
    setUsage({
      quantity: "",
      unit: "",
      date: new Date().toISOString().split("T")[0],
      file: null,
    });
  };

  const handleUsageChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setUsage({ ...usage, file: files[0] });
    } else {
      setUsage({ ...usage, [name]: value });
    }
  };

  const handleUsageSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMaterialId) {
      setSnackbar({ open: true, message: "Please select a material.", severity: "error" });
      return;
    }
    const formData = new FormData();
    formData.append("quantity", usage.quantity);
    formData.append("unit", usage.unit);
    formData.append("date", usage.date);
    if (usage.file) formData.append("file", usage.file);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/materials/dumped/${selectedMaterialId}/usage`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to record material usage");
      setSnackbar({ open: true, message: "Material usage recorded!", severity: "success" });
      setUsage({ quantity: "", unit: "", date: new Date().toISOString().split("T")[0], file: null });
      setSelectedMaterialId("");
      onClose();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Record Material Usage</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <TextField
                  select
                  label="Select Dumped Material"
                  value={selectedMaterialId}
                  onChange={handleMaterialSelect}
                  fullWidth
                  margin="normal"
                  required
                >
                  {materials.map((mat) => (
                    <MenuItem key={mat._id} value={mat._id}>
                      {mat.material} at {mat.site} (Dumped: {mat.quantity} {mat.unit} on{" "}
                      {mat.date ? new Date(mat.date).toLocaleDateString() : "N/A"})
                    </MenuItem>
                  ))}
                </TextField>
                {selectedMaterialId && (
                  <form onSubmit={handleUsageSubmit}>
                    <Typography variant="subtitle1" gutterBottom>
                      Add usage for selected material
                    </Typography>
                    <TextField
                      label="Quantity Used"
                      name="quantity"
                      type="number"
                      value={usage.quantity}
                      onChange={handleUsageChange}
                      fullWidth
                      margin="normal"
                      required
                    />
                    <TextField
                      select
                      label="Unit"
                      name="unit"
                      value={usage.unit}
                      onChange={handleUsageChange}
                      fullWidth
                      margin="normal"
                      required
                    >
                      {["cum", "cuf", "kg", "tonne", "litre"].map((unit) => (
                        <MenuItem key={unit} value={unit}>
                          {unit}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Date"
                      name="date"
                      type="date"
                      value={usage.date || ""}
                      onChange={handleUsageChange}
                      fullWidth
                      margin="normal"
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                    <Box mt={1} mb={2}>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<AttachFileIcon />}
                      >
                        {usage.file ? usage.file.name : "Upload Proof PDF/JPEG/Mp4"}
                        <input
                          type="file"
                          name="file"
                          accept="application/pdf,image/jpeg,image/png,image/jpg,video/mp4"
                          hidden
                          onChange={handleUsageChange}
                        />
                      </Button>
                      {usage.file && (
                        <Typography variant="caption" sx={{ ml: 2 }}>
                          {usage.file.name}
                        </Typography>
                      )}
                    </Box>
                    <DialogActions>
                      <Button onClick={onClose}>Cancel</Button>
                      <Button type="submit" variant="contained" color="primary">
                        Add Usage
                      </Button>
                    </DialogActions>
                  </form>
                )}
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}