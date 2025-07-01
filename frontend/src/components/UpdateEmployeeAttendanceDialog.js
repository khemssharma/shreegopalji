import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, CircularProgress, Snackbar, Alert, Box, Typography
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";

const API_URL = process.env.REACT_APP_API_URL;

export default function UpdateEmployeeAttendanceDialog({ open, onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [attendance, setAttendance] = useState({
    status: "",
    date: new Date().toISOString().split("T")[0],
    remarks: "",
    location: null, // { lat, lng }
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loadingLoc, setLoadingLoc] = useState(false);

  // Fetch all users when dialog opens
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
      setAttendance({
        status: '',
        date: new Date().toISOString().split("T")[0],
        remarks: '',
        location: null,
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setAttendance((prev) => ({
          ...prev,
          location: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
        }));
        setLoadingLoc(false);
      },
      () => {
        setSnackbar({ open: true, message: "Unable to fetch location.", severity: "error" });
        setLoadingLoc(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/${selectedUser}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(attendance),
      });
      if (res.ok) {
        setSnackbar({ open: true, message: "Attendance updated!", severity: "success" });
        setSelectedUser('');
        setAttendance({
          status: '',
          date: new Date().toISOString().split("T")[0],
          remarks: '',
          location: null,
        });
        onClose();
      } else {
        const data = await res.json();
        setSnackbar({ open: true, message: data.error || "Failed to update attendance.", severity: "error" });
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
          <GroupsIcon sx={{ mr: 1, color: "secondary.main" }} />
          Update Employee Attendance
        </DialogTitle>
        <DialogContent>
          {fetching ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <Typography variant="subtitle1" gutterBottom>
                Mark daily attendance for an employee
              </Typography>
              <TextField
                select
                label="Select Employee"
                value={selectedUser}
                onChange={e => setSelectedUser(e.target.value)}
                fullWidth
                margin="normal"
                required
                disabled={loading}
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Status"
                name="status"
                value={attendance.status}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              >
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
                <MenuItem value="Leave">Leave</MenuItem>
              </TextField>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={attendance.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Remarks"
                name="remarks"
                value={attendance.remarks}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
              <Box sx={{ mt: 2, mb: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleGetLocation}
                  disabled={loadingLoc}
                >
                  {loadingLoc ? "Fetching Location..." : "Upload Location"}
                </Button>
                {attendance.location && (
                  <Box sx={{ mt: 1 }}>
                    <iframe
                      title="Google Map"
                      width="100%"
                      height="180"
                      frameBorder="0"
                      style={{ borderRadius: 8 }}
                      src={`https://maps.google.com/maps?q=${attendance.location.lat},${attendance.location.lng}&z=16&output=embed`}
                      allowFullScreen
                    />
                    <Box sx={{ fontSize: 12, color: "#555", mt: 1 }}>
                      Lat: {attendance.location.lat.toFixed(5)}, Lng: {attendance.location.lng.toFixed(5)}
                    </Box>
                  </Box>
                )}
                {!attendance.location && (
                  <Box sx={{ fontSize: 12, color: "#888", mt: 1 }}>
                    (You may submit without location)
                  </Box>
                )}
              </Box>
              <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <Button type="submit" variant="contained" color="secondary" disabled={loading || !selectedUser}>
                  {loading ? <CircularProgress size={24} /> : "Update Attendance"}
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