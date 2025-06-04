import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, Box, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, IconButton
} from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CloseIcon from "@mui/icons-material/Close";

const statusOptions = ["Operational", "Under Maintenance", "Idle"];

const initialMachinery = [
  { id: 1, name: "Excavator", status: "Operational", location: "Site A" },
  { id: 2, name: "Bulldozer", status: "Under Maintenance", location: "Site B" },
  { id: 3, name: "Crane", status: "Operational", location: "Site C" },
];

export default function ManageMachinery({ open, onClose }) {
  const [machinery, setMachinery] = useState(initialMachinery);
  const [newMachine, setNewMachine] = useState({ name: "", status: "Operational", location: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewMachine({ ...newMachine, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newMachine.name || !newMachine.location) {
      setError("Please fill all fields.");
      return;
    }
    setMachinery([
      ...machinery,
      {
        id: Date.now(),
        ...newMachine,
      },
    ]);
    setNewMachine({ name: "", status: "Operational", location: "" });
    setError("");
  };

  const handleStatusChange = (id, status) => {
    setMachinery(
      machinery.map((m) =>
        m.id === id ? { ...m, status } : m
      )
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PrecisionManufacturingIcon color="primary" />
        <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
          Manage Machinery
        </Typography>
        <IconButton onClick={onClose} edge="end" size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
          For Site Incharges at <b>Shree Gopalji Infratech Pvt. Ltd.</b>
        </Typography>
        <Box component="form" onSubmit={handleAdd} sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            name="name"
            label="Machinery Name"
            value={newMachine.name}
            onChange={handleChange}
            required
            sx={{ flex: 2 }}
          />
          <TextField
            select
            name="status"
            label="Status"
            value={newMachine.status}
            onChange={handleChange}
            sx={{ flex: 1 }}
          >
            {statusOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
          <TextField
            name="location"
            label="Location"
            value={newMachine.location}
            onChange={handleChange}
            required
            sx={{ flex: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ flex: 1, minWidth: 100 }}>
            Add
          </Button>
        </Box>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
        )}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Change Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {machinery.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.status}</TableCell>
                <TableCell>{m.location}</TableCell>
                <TableCell>
                  <TextField
                    select
                    value={m.status}
                    onChange={(e) => handleStatusChange(m.id, e.target.value)}
                    size="small"
                  >
                    {statusOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
// This component allows site incharges to manage machinery, including adding new machinery and changing their status.