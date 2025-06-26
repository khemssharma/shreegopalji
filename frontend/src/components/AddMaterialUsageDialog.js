import React, { useState } from "react";
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
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

// Example data for sites, materials, and units
const sites = [
  { value: "Site A", label: "Obedullahganj" },
  { value: "Site C", label: "Indore" },
  { value: "Site D", label: "Gwalior" },
  { value: "Site E", label: "Jabalpur" },
];
const materials = [
  { label: "Cement", value: "cement" },
  { label: "Bitumen", value: "bitumen" },
  { label: "Aggregate", value: "Aggregate" },
  { label: "Soil", value: "soil" },
  { label: "Sand", value: "sand" },
];
const units = [
  { label: "Cubic Meter", value: "cum" },
  { label: "Cubbic Feet", value: "cuf" },
  { label: "Kilogram", value: "kg" },
  { label: "Tonne", value: "tonne" },
  { label: "Litre", value: "litre" },
];

export default function AddMaterialUsageDialog({ open, onClose }) {
  const [usage, setUsage] = useState({
    site: "",
    material: "",
    quantity: "",
    unit: "",
    date: new Date().toISOString().split("T")[0],
    file: null,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleUsageChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setUsage({ ...usage, file: files[0] });
    } else {
      setUsage({ ...usage, [name]: value });
    }
  };

  const handleUsageSubmit = (e) => {
    e.preventDefault();
    // Here you would send usage data and file to backend (use FormData for file upload)
    setSnackbar({ open: true, message: "Material usage recorded!", severity: "success" });
    setUsage({ site: "", material: "", quantity: "", unit: "", date: new Date().toISOString().split("T")[0], file: null });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Record Material Usage</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <form onSubmit={handleUsageSubmit}>
              <Typography variant="subtitle1" gutterBottom>
                Record daily material usage at site
              </Typography>
              <TextField
                select
                label="Site"
                name="site"
                value={usage.site}
                onChange={handleUsageChange}
                fullWidth
                margin="normal"
                required
              >
                {sites.map((site) => (
                  <MenuItem key={site.value} value={site.value}>
                    {site.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Material"
                name="material"
                value={usage.material}
                onChange={handleUsageChange}
                fullWidth
                margin="normal"
                required
              >
                {materials.map((mat) => (
                  <MenuItem key={mat.value} value={mat.value}>
                    {mat.label}
                  </MenuItem>
                ))}
              </TextField>
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
                {units.map((mat) => (
                  <MenuItem key={mat.value} value={mat.value}>
                    {mat.label}
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