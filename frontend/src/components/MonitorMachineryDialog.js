import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, CircularProgress, Box, Typography, Paper, Chip, List, ListItem, ListItemText
} from "@mui/material";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

const API_URL = process.env.REACT_APP_API_URL;

export default function MonitorMachineryDialog({ open, onClose, projectId }) {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [machineDetails, setMachineDetails] = useState(null);
  const [usageLogs, setUsageLogs] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    if (open ) {
      setFetching(true);
      fetch(`${API_URL}/machines`)
        .then(res => res.json())
        .then(data => {
          setMachines(data);
          setFetching(false);
        })
        .catch(() => setFetching(false));
      setSelectedMachine('');
      setMachineDetails(null);
      setUsageLogs([]);
    }
  }, [open, projectId]);

  useEffect(() => {
    if (selectedMachine && machines.length) {
      const found = machines.find(m => m._id === selectedMachine);
      setMachineDetails(found || null);

      // Fetch usage logs for this machine
      setLogsLoading(true);
      fetch(`${API_URL}/machines/${selectedMachine}/usage`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setUsageLogs(Array.isArray(data) ? data : (data.usageLogs || []));
          setLogsLoading(false);
        })
        .catch(() => {
          setUsageLogs([]);
          setLogsLoading(false);
        });
    } else {
      setMachineDetails(null);
      setUsageLogs([]);
    }
  }, [selectedMachine, machines]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <BuildCircleIcon sx={{ mr: 1, color: "info.main" }} />
        Monitor Machinery
      </DialogTitle>
      <DialogContent>
        {fetching ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TextField
              select
              label="Select Machine"
              value={selectedMachine}
              onChange={e => setSelectedMachine(e.target.value)}
              fullWidth
              margin="normal"
            >
              {machines.map((machine) => (
                <MenuItem key={machine._id} value={machine._id}>
                  {machine.name} ({machine.type}) - SN: {machine.serialNumber}
                </MenuItem>
              ))}
            </TextField>
            {machineDetails && (
              <Paper
                elevation={4}
                sx={{
                  mt: 3,
                  p: 3,
                  background: "linear-gradient(135deg, #e3f0ff 0%, #f3e7ff 100%)",
                  borderRadius: 3,
                  boxShadow: 6,
                }}
              >
                <Typography variant="h6" color="primary" fontWeight={700} gutterBottom>
                  {machineDetails.name} <Chip label={machineDetails.type} color="info" size="small" sx={{ ml: 1 }} />
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <b>Serial Number:</b> {machineDetails.serialNumber || "N/A"}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <b>Fuel Capacity:</b> {machineDetails.fuelCapacity ? `${machineDetails.fuelCapacity} L` : "N/A"}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <b>Project:</b> {machineDetails.projectId?.name || machineDetails.projectId || "N/A"}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <b>Added On:</b> {machineDetails.createdAt ? new Date(machineDetails.createdAt).toLocaleString() : "N/A"}
                </Typography>
                {/* Usage Logs */}
                <Box mt={3}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Usage Logs
                  </Typography>
                  {logsLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={60}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : usageLogs.length === 0 ? (
                    <Typography color="text.secondary">No usage logs found.</Typography>
                  ) : (
                    <List dense>
                      {usageLogs.map((log, idx) => (
                        <ListItem key={log._id || idx} sx={{ px: 0 }}>
                          <ListItemText
                            primary={
                              <>
                                <b>Date:</b> {log.timestamp ? new Date(log.timestamp).toLocaleDateString() : "N/A"}
                                {" | "}
                                <b>Hours:</b> {log.rawData?.hoursUsed ?? "N/A"}
                                {" | "}
                                <b>Fuel:</b> {log.rawData?.fuelConsumed ?? "N/A"} L
                              </>
                            }
                            secondary={log.rawData?.remarks ? `Remarks: ${log.rawData.remarks}` : null}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              </Paper>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}