import * as React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import GroupsIcon from "@mui/icons-material/Groups";
import InventoryIcon from "@mui/icons-material/Inventory";
import useProjectStore from "../store/useProjectStore";

export default function ProjectManagement() {
  const { id } = useParams();
  const { projects, fetchProjects } = useProjectStore();
  const [project, setProject] = React.useState(null);

  React.useEffect(() => {
    if (!projects.length) fetchProjects();
    else setProject(projects.find((p) => p._id === id));
  }, [projects, id, fetchProjects]);

  React.useEffect(() => {
    if (projects.length) setProject(projects.find((p) => p._id === id));
  }, [projects, id]);

  if (!project) {
    return (
      <Box p={4}>
        <Typography>Loading project...</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary">
          {project.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {project.location}
        </Typography>
        <Typography variant="body2" mt={1}>
          {project.description}
        </Typography>
      </Paper>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ConstructionIcon />}
          sx={{
            minWidth: 180,
            fontWeight: 700,
            fontSize: "1.1rem",
            background: "linear-gradient(90deg, #ff9800 30%, #ffc107 90%)",
            boxShadow: 3,
            borderRadius: 2,
            '&:hover': { background: "linear-gradient(90deg, #f57c00 30%, #ffd54f 90%)" }
          }}
        >
          Machinery
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<GroupsIcon />}
          sx={{
            minWidth: 180,
            fontWeight: 700,
            fontSize: "1.1rem",
            background: "linear-gradient(90deg, #388e3c 30%, #81c784 90%)",
            boxShadow: 3,
            borderRadius: 2,
            '&:hover': { background: "linear-gradient(90deg, #2e7d32 30%, #a5d6a7 90%)" }
          }}
        >
          Manpower
        </Button>
        <Button
          variant="contained"
          color="info"
          startIcon={<InventoryIcon />}
          sx={{
            minWidth: 180,
            fontWeight: 700,
            fontSize: "1.1rem",
            background: "linear-gradient(90deg, #0288d1 30%, #4fc3f7 90%)",
            boxShadow: 3,
            borderRadius: 2,
            '&:hover': { background: "linear-gradient(90deg, #0277bd 30%, #81d4fa 90%)" }
          }}
        >
          Material
        </Button>
      </Stack>
    </Box>
  );
}