import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, CircularProgress, Snackbar, Alert, Box, Typography
} from "@mui/material";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

const API_URL = process.env.REACT_APP_API_URL;

export default function UpdateMachineUsageDialog({ open, onClose, projectId }) {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [usage, setUsage] = useState({
    hoursUsed: "",
    fuelConsumed: "",
    remarks: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch all machines for this project when dialog opens
  useEffect(() => {
    if (open) {
      setFetching(true);
      fetch(`${API_URL}/machines`)
        .then(res => res.json())
        .then(data => {
          setMachines(data);
          setFetching(false);
        })
        .catch(() => setFetching(false));
      setSelectedMachine('');
      setUsage({
        hoursUsed: '',
        fuelConsumed: '',
        remarks: '',
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [open, projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMachine) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/machines/${selectedMachine}/usage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usage),
      });
      if (res.ok) {
        setSnackbar({ open: true, message: "Machine usage updated!", severity: "success" });
        setSelectedMachine('');
        setUsage({
          hoursUsed: '',
          fuelConsumed: '',
          remarks: '',
          date: new Date().toISOString().split("T")[0],
        });
        onClose();
      } else {
        const data = await res.json();
        setSnackbar({ open: true, message: data.error || "Failed to update usage.", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "Network error. Please try again.", severity: "error" });
    }
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <BuildCircleIcon sx={{ mr: 1, color: "warning.main" }} />
          Update Machine Usage
        </DialogTitle>
        <DialogContent>
          {fetching ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <Typography variant="subtitle1" gutterBottom>
                Log daily usage for a machine at this site
              </Typography>
              <TextField
                select
                label="Select Machine"
                value={selectedMachine}
                onChange={e => setSelectedMachine(e.target.value)}
                fullWidth
                margin="normal"
                required
                disabled={loading}
              >
                {machines.map((machine) => (
                  <MenuItem key={machine._id} value={machine._id}>
                    {machine.name} ({machine.type}) - SN: {machine.serialNumber}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Hours Used"
                name="hoursUsed"
                type="number"
                value={usage.hoursUsed}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Fuel Consumed (litres)"
                name="fuelConsumed"
                type="number"
                value={usage.fuelConsumed}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Remarks"
                name="remarks"
                value={usage.remarks}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
              <TextField
                label="Date"
                name="date"
                type="date"
                value={usage.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
              <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <Button type="submit" variant="contained" color="warning" disabled={loading || !selectedMachine}>
                  {loading ? <CircularProgress size={24} /> : "Update Usage"}
                </Button>
              </DialogActions>
            </form>
          )}
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