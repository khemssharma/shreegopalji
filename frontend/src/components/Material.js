import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Box,
  Typography,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
  import { useParams } from "react-router-dom";

// Example data for sites and materials
const sites = [
  { value: "Obedullahganj", label: "Obedullahganj" },
  { value: "Indore", label: "Indore" },
  { value: "Rewa-Katni", label: "Rewa-Katni" },
  { value: "Jabalpur", label: "Jabalpur" },
  { value: "Itarsi", label: "Itarsi" },
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

export default function MaterialDialog({ open, onClose }) {
  const { id: projectId } = useParams(); // Get projectId from URL
  const [tab, setTab] = useState(0);

  // State for Dumped Material Form
  const [dumped, setDumped] = useState({
    site: "",
    material: "",
    quantity: "",
    unit: "",
    date: new Date().toISOString().split("T")[0],
    file: null,
  });

  // State for Usage Form
  const [usage, setUsage] = useState({
    site: "",
    material: "",
    quantity: "",
    unit: "",
    date: new Date().toISOString().split("T")[0],
    file: null,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleTabChange = (e, newValue) => setTab(newValue);

  const handleDumpedChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setDumped({ ...dumped, file: files[0] });
    } else {
      setDumped({ ...dumped, [name]: value });
    }
  };

  const handleUsageChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setUsage({ ...usage, file: files[0] });
    } else {
      setUsage({ ...usage, [name]: value });
    }
  };

  const handleDumpedSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("site", dumped.site);
    formData.append("material", dumped.material);
    formData.append("quantity", dumped.quantity);
    formData.append("unit", dumped.unit);
    formData.append("date", dumped.date);
    if (dumped.file) formData.append("file", dumped.file);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}/materials/dumped`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to record dumped material");
      setSnackbar({
        open: true,
        message: "Material dumped recorded!",
        severity: "success",
      });
      setDumped({
        site: "",
        material: "",
        quantity: "",
        unit: "",
        date: new Date().toISOString().split("T")[0],
        file: null,
      });
      onClose();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
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
        <DialogTitle>
          Material Management - Shree Gopalji Infratech Pvt Ltd
        </DialogTitle>
        <DialogContent>
          
          <Box mt={2}>
            {tab === 0 && (
              <form onSubmit={handleDumpedSubmit}>
                <Typography variant="subtitle1" gutterBottom>
                  Record material dumped at site
                </Typography>
                <TextField
                  select
                  label="Site"
                  name="site"
                  value={dumped.site}
                  onChange={handleDumpedChange}
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
                  value={dumped.material}
                  onChange={handleDumpedChange}
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
                  label="Quantity Dumped"
                  name="quantity"
                  type="number"
                  value={dumped.quantity}
                  onChange={handleDumpedChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  select
                  label="Unit"
                  name="unit"
                  value={dumped.unit}
                  onChange={handleDumpedChange}
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
                  value={dumped.date || ""}
                  onChange={handleDumpedChange}
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
                    {dumped.file ? dumped.file.name : "Upload Bill PDF/JPEG"}
                    <input
                      type="file"
                      name="file"
                      accept="application/pdf,image/jpeg,image/png,image/jpg"
                      hidden
                      onChange={handleDumpedChange}
                    />
                  </Button>
                  {dumped.file && (
                    <Typography variant="caption" sx={{ ml: 2 }}>
                      {dumped.file.name}
                    </Typography>
                  )}
                </Box>
                <DialogActions>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="submit" variant="contained" color="primary">
                    Add Dumped
                  </Button>
                </DialogActions>
              </form>
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