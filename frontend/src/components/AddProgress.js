import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, LinearProgress, Typography, Box
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useProjectStore from "../store/useProjectStore";
import useStore from "../store/useAuthStore";

const AddProgress = ({ open, onClose, onAdd }) => {
  const [description, setDescription] = useState("");
  const [progressPercent, setProgressPercent] = useState("");
  const [projectId, setProjectId] = useState(""); // You may want to select project
  const { user } = useStore();
  const { addProgress, progressLoading, progressError } = useProjectStore();
  const [success, setSuccess] = useState("");

  const handleAdd = async () => {
    if (!projectId || !description || progressPercent === "") return;
    const ok = await addProgress({
      projectId,
      description,
      progressPercent: Number(progressPercent),
      updatedBy: user?.email || "siteincharge"
    });
    if (ok) {
      setSuccess("Progress update added!");
      setTimeout(() => {
        setSuccess("");
        setDescription("");
        setProgressPercent("");
        setProjectId("");
        if (onAdd) onAdd();
        onClose();
      }, 1000);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <AddCircleOutlineIcon color="primary" />
          <Typography variant="h6" color="primary">
            Add Progress Update
          </Typography>
        </Box>
        <Typography variant="subtitle2" color="textSecondary">
          Shree Gopalji Infratech Pvt Ltd
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Project ID"
          fullWidth
          margin="normal"
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
        />
        <TextField
          label="Progress (%)"
          type="number"
          fullWidth
          margin="normal"
          value={progressPercent}
          onChange={e => setProgressPercent(e.target.value)}
          inputProps={{ min: 0, max: 100 }}
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {progressLoading && (
          <Box mt={2}>
            <LinearProgress />
          </Box>
        )}
        {progressError && (
          <Typography color="error" sx={{ mt: 2 }}>{progressError}</Typography>
        )}
        {success && (
          <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={progressLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          color="primary"
          variant="contained"
          disabled={progressLoading || !projectId || !progressPercent || !description}
        >
          Add Progress
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProgress;