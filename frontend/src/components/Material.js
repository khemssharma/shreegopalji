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
} from "@mui/material";

// Example data for sites and materials
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

export default function MaterialDialog({ open, onClose }) {
const [tab, setTab] = useState(0);

// State for Dumped Material Form
const [dumped, setDumped] = useState({
  site: "",
  material: "",
  quantity: "",
  unit: "",
  date: new Date().toISOString().split("T")[0], // Default to today's date
});

// State for Usage Form
const [usage, setUsage] = useState({
  site: "",
  material: "",
  quantity: "",
  unit: "",
  date: new Date().toISOString().split("T")[0], // Default to today's date
});


const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

const handleTabChange = (e, newValue) => setTab(newValue);

const handleDumpedChange = (e) => {
  setDumped({ ...dumped, [e.target.name]: e.target.value });
};

const handleUsageChange = (e) => {
  setUsage({ ...usage, [e.target.name]: e.target.value });
};

const handleDumpedSubmit = (e) => {
  e.preventDefault();
  // Here you would send dumped data to backend
  setSnackbar({ open: true, message: "Material dumped recorded!", severity: "success" });
  setDumped({ site: "", material: "", quantity: "" });
};

const handleUsageSubmit = (e) => {
  e.preventDefault();
  // Here you would send usage data to backend
  setSnackbar({ open: true, message: "Material usage recorded!", severity: "success" });
  setUsage({ site: "", material: "", quantity: "" });
};

return (
  <>
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Material Management - Shree Gopalji Infratech Pvt Ltd
      </DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Add Dumped Material" />
          <Tab label="Add Daily Usage" />
        </Tabs>
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
              />
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Add Dumped
                </Button>
              </DialogActions>
            </form>
          )}
          {tab === 1 && (
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
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Add Usage
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