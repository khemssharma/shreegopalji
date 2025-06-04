import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, IconButton
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import CloseIcon from "@mui/icons-material/Close";

// Mock data for demonstration
const mockLabours = [
  { id: 1, name: "Ramesh Kumar", role: "Mason", location: { lat: 28.6139, lng: 77.209 }, status: "Active" },
  { id: 2, name: "Suresh Singh", role: "Electrician", location: { lat: 28.7041, lng: 77.1025 }, status: "Inactive" },
  { id: 3, name: "Amit Sharma", role: "Plumber", location: { lat: 28.5355, lng: 77.391 }, status: "Active" },
];

// Google Maps Embed URL generator
const getMapUrl = (lat, lng) =>
  `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

export default function ManpowerDialog({ open, onClose }) {
  const [labours, setLabours] = useState([]);
  const [selectedLabour, setSelectedLabour] = useState(null);

  useEffect(() => {
    if (open) setLabours(mockLabours);
  }, [open]);

  const handleSelectLabour = (labour) => {
    setSelectedLabour(labour);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <GroupsIcon color="primary" />
        <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
          Manpower Live Tracking
        </Typography>
        <IconButton onClick={onClose} edge="end" size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
          For Site Incharges at <b>Shree Gopalji Infratech Pvt Ltd</b>
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" gutterBottom>All Manpower</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Live Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {labours.map((labour) => (
                  <TableRow
                    key={labour.id}
                    hover
                    selected={selectedLabour?.id === labour.id}
                    onClick={() => handleSelectLabour(labour)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{labour.name}</TableCell>
                    <TableCell>{labour.role}</TableCell>
                    <TableCell>{labour.status}</TableCell>
                    <TableCell>
                      <a
                        href={`https://maps.google.com/?q=${labour.location.lat},${labour.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Box sx={{ flex: 1 }}>
            {selectedLabour ? (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Live Location: {selectedLabour.name}
                </Typography>
                <iframe
                  title="Live Location"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  src={getMapUrl(selectedLabour.location.lat, selectedLabour.location.lng)}
                  allowFullScreen
                  style={{ borderRadius: 8 }}
                ></iframe>
                <Box mt={2}>
                  <strong>Role:</strong> {selectedLabour.role} <br />
                  <strong>Status:</strong> {selectedLabour.status}
                </Box>
              </Box>
            ) : (
              <Typography color="textSecondary" sx={{ mt: 8 }}>
                Select a manpower to view live location
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}