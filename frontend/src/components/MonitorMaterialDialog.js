import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Collapse,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function MonitorMaterialDialog({ open, onClose }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_URL}/materials`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch materials");
          return res.json();
        })
        .then((data) => {
          setMaterials(data);
          setLoading(false);
        })
        .catch((err) => {
          setSnackbar({ open: true, message: err.message, severity: "error" });
          setLoading(false);
        });
    }
  }, [open]);

  const handleExpandClick = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <InventoryIcon sx={{ mr: 1, color: "primary.main" }} />
          Monitor Material
        </DialogTitle>
        <DialogContent>
          <Box mt={2}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight={180}>
                <CircularProgress />
              </Box>
            ) : materials.length === 0 ? (
              <Typography color="text.secondary" align="center">
                No material records found.
              </Typography>
            ) : (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell><b>Site</b></TableCell>
                      <TableCell><b>Material</b></TableCell>
                      <TableCell><b>Quantity Dumped</b></TableCell>
                      <TableCell><b>Unit</b></TableCell>
                      <TableCell><b>Date</b></TableCell>
                      <TableCell><b>Bill/Proof</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {materials.map((mat) => (
                      <React.Fragment key={mat._id}>
                        <TableRow hover>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleExpandClick(mat._id)}
                              aria-label={expanded[mat._id] ? "Hide usage" : "Show usage"}
                            >
                              {expanded[mat._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell>{mat.site}</TableCell>
                          <TableCell>{mat.material}</TableCell>
                          <TableCell>{mat.quantity}</TableCell>
                          <TableCell>{mat.unit}</TableCell>
                          <TableCell>
                            {mat.date ? new Date(mat.date).toLocaleDateString() : ""}
                          </TableCell>
                          <TableCell>
                            {mat.fileUrl ? (
                              <a
                                href={mat.fileUrl.startsWith("http") ? mat.fileUrl : `${process.env.REACT_APP_API_URL}${mat.fileUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <AttachFileIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                                View
                              </a>
                            ) : (
                              <Typography variant="caption" color="text.secondary">
                                N/A
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                            <Collapse in={expanded[mat._id]} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 2, background: "#f9f9fc", borderRadius: 2, p: 2 }}>
                                <Typography variant="subtitle2" color="primary" gutterBottom>
                                  <b>Usage History</b>
                                </Typography>
                                {mat.usage && mat.usage.length > 0 ? (
                                  <Stack spacing={1}>
                                    {mat.usage.map((u, idx) => (
                                      <Paper
                                        key={u._id || idx}
                                        elevation={2}
                                        sx={{
                                          p: 2,
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 2,
                                          background: "#f5faff",
                                        }}
                                      >
                                        <Box flex={1}>
                                          <Typography>
                                            <b>Date:</b> {u.date ? new Date(u.date).toLocaleDateString() : "N/A"}
                                          </Typography>
                                          <Typography>
                                            <b>Quantity Used:</b> {u.quantity} {u.unit}
                                          </Typography>
                                        </Box>
                                        {u.fileUrl ? (
                                          <a
                                            href={u.fileUrl.startsWith("http") ? u.fileUrl : `${process.env.REACT_APP_API_URL}${u.fileUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <Chip
                                              icon={<AttachFileIcon />}
                                              label="Proof"
                                              color="primary"
                                              variant="outlined"
                                              size="small"
                                            />
                                          </a>
                                        ) : (
                                          <Chip label="No Proof" size="small" color="default" />
                                        )}
                                      </Paper>
                                    ))}
                                  </Stack>
                                ) : (
                                  <Typography color="text.secondary" sx={{ ml: 1 }}>
                                    No usage recorded for this material.
                                  </Typography>
                                )}
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
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