import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, CircularProgress, Box, Typography, Paper, Chip, List, ListItem, ListItemText, Avatar
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";

const API_URL = process.env.REACT_APP_API_URL;

export default function MonitorEmployeesDialog({ open, onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (open) {
      setFetching(true);
      fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setUsers(data);
          setFetching(false);
        })
        .catch(() => setFetching(false));
      setSelectedUser('');
      setUserDetails(null);
    }
  }, [open]);

  useEffect(() => {
    if (selectedUser && users.length) {
      const found = users.find(u => u._id === selectedUser);
      setUserDetails(found || null);
    } else {
      setUserDetails(null);
    }
  }, [selectedUser, users]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <GroupsIcon sx={{ mr: 1, color: "secondary.main" }} />
        Monitor Employees
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
              label="Select Employee"
              value={selectedUser}
              onChange={e => setSelectedUser(e.target.value)}
              fullWidth
              margin="normal"
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </MenuItem>
              ))}
            </TextField>
            {userDetails && (
              <Paper
                elevation={4}
                sx={{
                  mt: 3,
                  p: 3,
                  background: "linear-gradient(135deg, #f3e7ff 0%, #e3f0ff 100%)",
                  borderRadius: 3,
                  boxShadow: 6,
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                    {userDetails.name?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" color="secondary" fontWeight={700}>
                      {userDetails.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {userDetails.email}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle1" gutterBottom>
                  <b>Role:</b> {userDetails.role || "N/A"}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <b>Status:</b> {userDetails.status || "Active"}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <b>Joined:</b> {userDetails.createdAt ? new Date(userDetails.createdAt).toLocaleDateString() : "N/A"}
                </Typography>
                {/* Attendance logs if available */}
                {Array.isArray(userDetails.attendance) && userDetails.attendance.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Attendance Logs
                    </Typography>
                    <List dense>
                      {userDetails.attendance.slice(-5).reverse().map((log, idx) => (
                        <ListItem key={log._id || idx} sx={{ px: 0 }}>
                          <ListItemText
                            primary={
                              <>
                                <b>Date:</b> {log.date ? new Date(log.date).toLocaleDateString() : "N/A"}
                                {" | "}
                                <b>Status:</b> {log.status}
                              </>
                            }
                            secondary={log.remarks ? `Remarks: ${log.remarks}` : null}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Paper>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}