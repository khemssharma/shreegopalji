import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from '@mui/material';

const UpdateProgressDialog = ({ open, onClose, projectId, onSuccess }) => {
  const [progressNote, setProgressNote] = useState('');
  const [progressValue, setProgressValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId,
          activity: `Daily Progress Update: ${progressNote} (${progressValue})`,
          details: { date, progressNote, progressValue },
        }),
      });
      setLoading(false);
      if (res.ok) {
        setProgressNote('');
        setProgressValue('');
        setDate(new Date().toISOString().split("T")[0]);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        alert("Failed to update progress");
      }
    } catch {
      setLoading(false);
      alert("Network error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Daily Progress</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Progress Note"
              fullWidth
              margin="normal"
              value={progressNote}
              onChange={e => setProgressNote(e.target.value)}
              required
            />
            <TextField
              label="Progress Value"
              type="number"
              fullWidth
              margin="normal"
              value={progressValue}
              onChange={e => setProgressValue(e.target.value)}
              required
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              margin="normal"
              value={date}
              onChange={e => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading || !progressNote || !progressValue}>
          {loading ? "Saving..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProgressDialog;