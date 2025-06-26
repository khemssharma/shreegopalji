import * as React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Stack, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";
import useProjectStore from "../store/useProjectStore";

import AddMachineryDialog from '../components/AddMachineryDialog';
import AddEmployeeDialog from '../components/AddEmployeeDialog';
import MaterialDialog from '../components/Material';
import AddMaterialUsageDialog from '../components/AddMaterialUsageDialog';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import Manpower from '../components/Manpower';

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UpdateIcon from '@mui/icons-material/Update';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateMachineUsageDialog from '../components/UpdateMachineUsageDialog';
import UpdateEmployeeAttendanceDialog from '../components/UpdateEmployeeAttendanceDialog';
import UpdateDailyExpenseDialog from '../components/UpdateDailyExpenseDialog';

export default function ProjectManagement() {
  const { id } = useParams();
  const { projects, fetchProjects } = useProjectStore();
  const [project, setProject] = React.useState(null);

  // State for managing dialogs
  const [manageMachinery, setManageMachinery] = React.useState(false);
  const [manageManpower, setManageManpower] = React.useState(false);
  const [manageMaterial, setManageMaterial] = React.useState(false);

  const [addMachineDialogOpen, setAddMachineDialogOpen] = React.useState(false);
  const [addMaterialDialogOpen, setAddMaterialDialogOpen] = React.useState(false);
  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = React.useState(false);

  const [updateMaterialUsageDialogOpen, setUpdateMaterialUsageDialogOpen] = React.useState(false);
  const [updateMachineUsageDialogOpen, setUpdateMachineUsageDialogOpen] = React.useState(false);
  const [updateEmployeeAttendanceDialogOpen, setUpdateEmployeeAttendanceDialogOpen] = React.useState(false);
  const [updateDailyExpenseDialogOpen, setUpdateDailyExpenseDialogOpen] = React.useState(false);

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

  // Dummy recent activities data
  const recentActivities = [
    { time: "09:00 AM", activity: "Project created" },
    { time: "10:30 AM", activity: "Machinery assigned" },
    { time: "12:00 PM", activity: "Material delivered" },
    { time: "02:15 PM", activity: "Manpower updated" },
  ];

  const DEFAULT_IMAGE = "https://source.unsplash.com/600x400/?construction,site,infra";
  const imgSrc =
    project.images && project.images.length > 0
      ? project.images[0]
      : DEFAULT_IMAGE;

  const handleAddMachineAtSite = () => setAddMachineDialogOpen(true);
  const handleAddMaterialAtSite = () => setAddMaterialDialogOpen(true);
  const handleAddEmployeeAtSite = () => setAddEmployeeDialogOpen(true);

  const handleUpdateMaterialUsage = () => setUpdateMaterialUsageDialogOpen(true);
  const handleUpdateMachineUsage = () => setUpdateMachineUsageDialogOpen(true);
  const handleUpdateEmployeeAttendance = () => setUpdateEmployeeAttendanceDialogOpen(true);
  const handleUpdateDailyExpense = () => setUpdateDailyExpenseDialogOpen(true);

  return (
    <Box p={4}>
    <section style={{ marginBottom: 32 }}>
               <h1 style={{ color: '#1a237e', margin: 0 }}>Shree Gopalji Infratech Pvt Ltd</h1>
                <h2 style={{ color: '#3949ab', fontWeight: 400, marginTop: 8 }}>Site Incharges' Dashboard</h2>
            </section>
      <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            <Typography variant="h5" fontWeight={700} color="primary">
              {project.name}
            </Typography>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {project.location}
          </Typography>
          <Typography variant="body2" mt={1}>
            {project.description}
          </Typography>
        </div>
        <img
          src={imgSrc}
          alt={project.name}
          style={{
            width: 320,
            height: 220,
            objectFit: "cover",
            display: "block",
            borderRadius: 12,
          }}
        />
      </div>
      
      </Paper>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center">
        {/* Recent Activities */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            flex: 1,
            minWidth: 0,
            maxWidth: 400,
            width: '100%',
            mx: 'auto',
            borderRadius: 3,
            background: '#fff',
            mt: { xs: 2, md: 0 },
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#333', textAlign: 'center' }}>
            Recent Activities
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {recentActivities.map((item, idx) => (
              <ListItem key={idx} sx={{ px: 0 }}>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: '#e3f0ff', width: 32, height: 32 }}>
                    <AccessTimeIcon color="primary" />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={item.activity}
                  secondary={item.time}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        {/* Update Daily Usage */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            flex: 1,
            minWidth: 0,
            maxWidth: 400,
            width: '100%',
            mx: 'auto',
            borderRadius: 3,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #e3f0ff 0%, #f3e7ff 100%)',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#333' }}>
            Update Daily Usage
          </Typography>
          <Stack direction="column" spacing={2}>
            <Button fullWidth variant="outlined" color="primary" startIcon={<InventoryIcon />} onClick={handleUpdateMaterialUsage}>
              Update Material Usage
            </Button>
            <Button fullWidth variant="outlined" color="warning" startIcon={<BuildCircleIcon />} onClick={handleUpdateMachineUsage}>
              Update Machine Usage
            </Button>
            <Button fullWidth variant="outlined" color="secondary" startIcon={<GroupsIcon />} onClick={handleUpdateEmployeeAttendance}>
              Update Daily Employee Attendance
            </Button>
            <Button fullWidth variant="outlined" color="success" startIcon={<CurrencyRupeeIcon />} onClick={handleUpdateDailyExpense}>
              Update Daily Expense
            </Button>
          </Stack>
        </Paper>

        {/* Add at Site */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            flex: 1,
            minWidth: 0,
            maxWidth: 400,
            width: '100%',
            mx: 'auto',
            mb: { xs: 2, md: 0 },
            borderRadius: 3,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #e3f0ff 0%, #f3e7ff 100%)',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#333' }}>
            Add at Site
          </Typography>
          <Stack direction="column" spacing={2}>
            <Button fullWidth variant="contained" color="info" startIcon={<AddToPhotosIcon />} onClick={handleAddMachineAtSite}>
              Add New Machine At Site
            </Button>
            <Button fullWidth variant="contained" color="primary" startIcon={<InventoryIcon />} onClick={handleAddMaterialAtSite}>
              Add New Material At Site
            </Button>
            <Button fullWidth variant="contained" color="success" startIcon={<PersonAddIcon />} onClick={handleAddEmployeeAtSite}>
              Add New Employee At Site
            </Button>
          </Stack>
        </Paper>
      </Stack>

     
            {manageManpower && (
                <Manpower
                    open={manageManpower}
                    onClose={() => setManageManpower(false)}
                    onRequest={() => {/* Optionally refresh activities */}}
                />
            )}
            {manageMaterial && (
                <MaterialDialog
                    open={manageMaterial}
                    onClose={() => setManageMaterial(false)}
                />
            )}
            <AddMachineryDialog
  open={addMachineDialogOpen}
  onClose={() => setAddMachineDialogOpen(false)}
  projectId={project._id}
/>
<MaterialDialog
  open={addMaterialDialogOpen}
  onClose={() => setAddMaterialDialogOpen(false)}
  projectId={project._id}
/>
<AddEmployeeDialog
  open={addEmployeeDialogOpen}
  onClose={() => setAddEmployeeDialogOpen(false)}
  projectId={project._id}
/>
<AddMaterialUsageDialog
  open={updateMaterialUsageDialogOpen}
  onClose={() => setUpdateMaterialUsageDialogOpen(false)}
/>
<UpdateMachineUsageDialog
  open={updateMachineUsageDialogOpen}
  onClose={() => setUpdateMachineUsageDialogOpen(false)}
/>
<UpdateEmployeeAttendanceDialog
        open={updateEmployeeAttendanceDialogOpen}
        onClose={() => setUpdateEmployeeAttendanceDialogOpen(false)}
      />
<UpdateDailyExpenseDialog
        open={updateDailyExpenseDialogOpen}
        onClose={() => setUpdateDailyExpenseDialogOpen(false)}
      />
    </Box>
  );
}