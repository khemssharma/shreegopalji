import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, CircularProgress, Snackbar, Alert, Box, Typography
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const API_URL = process.env.REACT_APP_API_URL;

export default function UpdateDailyExpenseDialog({ open, onClose, projectId }) {
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  React.useEffect(() => {
    if (open) {
      setExpense({
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/projects/${projectId}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
      });
      if (res.ok) {
        setSnackbar({ open: true, message: "Expense updated!", severity: "success" });
        setExpense({
          amount: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
        onClose();
      } else {
        const data = await res.json();
        setSnackbar({ open: true, message: data.error || "Failed to update expense.", severity: "error" });
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
          <CurrencyRupeeIcon sx={{ mr: 1, color: "success.main" }} />
          Update Daily Expense
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Typography variant="subtitle1" gutterBottom>
              Log daily expense for this project
            </Typography>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={expense.amount}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={expense.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={2}
              required
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={expense.date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <DialogActions>
              <Button onClick={onClose} disabled={loading}>Cancel</Button>
              <Button type="submit" variant="contained" color="success" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Update Expense"}
              </Button>
            </DialogActions>
          </form>
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