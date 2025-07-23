import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from '@mui/material';

const AddObjectiveDialog = ({ open, onClose, projectId, onSuccess }) => {
  const [objective, setObjective] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  // Calculate default end date as 7 days ahead of start date
  const getDefaultEndDate = (startDate) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  };
  const [endDate, setEndDate] = useState(getDefaultEndDate(date));
  const [loading, setLoading] = useState(false);

  // Update end date when start date changes
  React.useEffect(() => {
    setEndDate(getDefaultEndDate(date));
  }, [date]);

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
          activity: `Daily Objective: ${objective} (${targetValue})`,
          details: { startDate: date, endDate, objective, targetValue },
        }),
      });
      setLoading(false);
      if (res.ok) {
        setObjective('');
        setTargetValue('');
        setDate(new Date().toISOString().split("T")[0]);
        setEndDate(getDefaultEndDate(new Date().toISOString().split("T")[0]));
        if (onSuccess) onSuccess();
        onClose();
      } else {
        alert("Failed to create objective");
      }
    } catch {
      setLoading(false);
      alert("Network error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Weekly Target</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Objective"
              fullWidth
              margin="normal"
              value={objective}
              onChange={e => setObjective(e.target.value)}
              required
            />
            <TextField
              label="Target Value"
              type="number"
              fullWidth
              margin="normal"
              value={targetValue}
              onChange={e => setTargetValue(e.target.value)}
              required
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              margin="normal"
              value={date}
              onChange={e => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              margin="normal"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
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
        <Button onClick={handleSubmit} color="primary" disabled={loading || !objective || !targetValue}>
          {loading ? "Saving..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddObjectiveDialog;