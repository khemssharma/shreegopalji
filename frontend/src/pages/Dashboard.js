import React from 'react';
import useStore from '../store/useAuthStore';
import { useNavigate } from "react-router-dom";
import MaterialDialog from '../components/Material';

import CreateProjectDialog from '../components/CreateProjectDialog';
import AddEmployeeDialog from '../components/AddEmployeeDialog';
import AddNewMachineryDialog from '../components/AddNewMachineryDialog';
import MonitorMachineryDialog from '../components/MonitorMachineryDialog';
import MonitorMaterialDialog from '../components/MonitorMaterialDialog';
import { Button, Box, Typography, Chip, CircularProgress, Stack, Paper } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import useProjectStore from "../store/useProjectStore";
import MonitorEmployeesDialog from '../components/MonitorEmployeesDialog';

// Default image if project has no images
const DEFAULT_IMAGE = "https://source.unsplash.com/600x400/?construction,site,infra";

export default function Dashboard() {
    const navigate = useNavigate();
    const logout = useStore((state) => state.logout);
    const  [manageMaterial, setManageMaterial] = React.useState(false);
    const [createProjectDialogOpen, setCreateProjectDialogOpen] = React.useState(false);
    const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = React.useState(false);
    const [addMachineryDialogOpen, setAddMachineryDialogOpen] = React.useState(false);
    const [monitorMachineryDialogOpen, setMonitorMachineryDialogOpen] = React.useState(false);
    const [monitorEmployeesDialogOpen, setMonitorEmployeesDialogOpen] = React.useState(false);
    const [monitorMaterialDialogOpen, setMonitorMaterialDialogOpen] = React.useState(false);
    const { projects, fetchProjects, loading, error } = useProjectStore();
    const [recentActivities, setRecentActivities] = React.useState([]);

    React.useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Fetch activities from backend on mount
    React.useEffect(() => {
        async function fetchActivities() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/activities`);
                if (!res.ok) throw new Error("Failed to fetch activities");
                const data = await res.json();
                setRecentActivities(data.slice(0, 10)); // Show latest 10 activities
            } catch (err) {
                setRecentActivities([]);
            }
        }
        fetchActivities();
    }, []);

    const handleLogout = async () => {
        await logout();
        window.location.href = "/login";
    };

    const handleAddEmployee = () => {
        setAddEmployeeDialogOpen(true);
    };

    const handleAddMachinery = () => {
        setAddMachineryDialogOpen(true);
    };

    const handleMonitorMachinery = () => {
        setMonitorMachineryDialogOpen(true);
    };

    const handleMonitorEmployees = () => {
        setMonitorEmployeesDialogOpen(true);
    };

    const handleMonitorMaterial = () => setMonitorMaterialDialogOpen(true);

    return (
        <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f4f6f8', minHeight: '100vh', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <button
                    onClick={handleLogout}
                    style={{
                        background: 'linear-gradient(90deg, #ff512f, #dd2476)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '10px 28px',
                        fontWeight: 700,
                        fontSize: 16,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(221,36,118,0.15)',
                        transition: 'background 0.2s',
                        letterSpacing: 1,
                    }}
                >
                    🚪 Logout
                </button>
            </div>
            <section style={{ marginBottom: 32 }}>
                <h1 style={{ color: '#1a237e', margin: 0 }}>Shree Gopalji Infratech Pvt Ltd</h1>
                <h2 style={{ color: '#3949ab', fontWeight: 400, marginTop: 8 }}>Managerial Staff Dashboard</h2>
            </section>

            {/* Carousel Section */}
            <Box sx={{ width: "100%", mb: 4 }}>
                <Typography variant="h6" mb={2} color="text.secondary">
                    All Projects
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : projects.length === 0 ? (
                    <Typography>No projects found.</Typography>
                ) : (
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={32}
                        slidesPerView={Math.min(3, projects.length)}
                        style={{ paddingBottom: 32 }}
                        breakpoints={{
                          320: { slidesPerView: 1 },
                          600: { slidesPerView: 2 },
                          900: { slidesPerView: 3 },
                        }}
                    >
                        {projects.map((project) => {
                          const imgSrc =
                            project.images && project.images.length > 0
                              ? project.images[0].startsWith("http")
                                ? project.images[0]
                                : `https://shreegopalji.onrender.com/${project.images[0].replace(/^\/+/, "")}`
                              : DEFAULT_IMAGE;
                          return (
                            <SwiperSlide key={project._id}>
                              <Box
                                onClick={() => navigate(`/project/${project._id}`)}
                                sx={{
                                  position: "relative",
                                  cursor: "pointer",
                                  borderRadius: 4,
                                  overflow: "hidden",
                                  boxShadow: 6,
                                  minHeight: 320,
                                  background: "#f5f5f5",
                                  transition: "transform 0.2s",
                                  "&:hover": { transform: "scale(1.03)" },
                                }}
                              >
                                <img
                                  src={imgSrc}
                                  alt={project.name}
                                  style={{
                                    width: "100%",
                                    height: 220,
                                    objectFit: "cover",
                                    display: "block",
                                    filter: "brightness(0.85)",
                                  }}
                                />
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    width: "100%",
                                    bgcolor: "rgba(0,0,0,0.55)",
                                    color: "#fff",
                                    p: 2,
                                    borderBottomLeftRadius: 16,
                                    borderBottomRightRadius: 16,
                                  }}
                                >
                                  <Typography variant="h6" fontWeight={700} gutterBottom>
                                    {project.name}
                                  </Typography>
                                  <Typography variant="body2" gutterBottom>
                                    {project.location}
                                  </Typography>
                                  <Typography variant="body2" sx={{ opacity: 0.85 }}>
                                    {project.description?.slice(0, 60) || "No description"}
                                    {project.description && project.description.length > 60 ? "..." : ""}
                                  </Typography>
                                  <Box mt={1} display="flex" alignItems="center" gap={1}>
                                    <Chip
                                      label={project.status}
                                      color={
                                        project.status === "Ongoing"
                                          ? "primary"
                                          : project.status === "Completed"
                                          ? "success"
                                          : "warning"
                                      }
                                      size="small"
                                      sx={{ fontWeight: 600, bgcolor: "rgba(255,255,255,0.15)" }}
                                    />
                                    <Typography variant="caption" ml={1}>
                                      {project.startDate
                                        ? new Date(project.startDate).toLocaleDateString()
                                        : "No Start"}
                                      {" - "}
                                      {project.endDate
                                        ? new Date(project.endDate).toLocaleDateString()
                                        : "No End"}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                )}
              </Box>
            

                        <section
                            className="dashboard-section-flex"
                            style={{
                                display: 'flex',
                                gap: '24px',
                                flexWrap: 'wrap'
                            }}
                        >
                            <div
                                className="dashboard-activities"
                                style={{
                                    background: '#fff',
                                    borderRadius: 12,
                                    boxShadow: '0 2px 8px rgba(60,72,88,0.08)',
                                    padding: '24px',
                                    flex: 2,
                                    minWidth: 0
                                }}
                            >
                                <h3 style={{ color: '#1a237e', marginBottom: 16 }}>Recent Activities</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {recentActivities.length === 0 ? (
                                        <li>No recent activities.</li>
                                    ) : (
                                        recentActivities.map((item, idx) => (
                                            <li key={idx} style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                                                <span style={{ color: '#3949ab', fontWeight: 500 }}>
                                                    {item.time ? new Date(item.time).toLocaleString() : ""}
                                                </span>
                                                <span style={{ marginLeft: 12 }}>{item.activity}</span>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                            <div
                                className="dashboard-quick-actions"
                                style={{
                                    background: '#fff',
                                    borderRadius: 12,
                                    boxShadow: '0 2px 8px rgba(60,72,88,0.08)',
                                    padding: 24,
                                    flex: 1,
                                    minWidth: 0
                                }}
                            >
                                <h3 style={{ color: '#1a237e', marginBottom: 16 }}>Quick Review</h3>
                                
  
  <Stack
    direction="column"
    spacing={2}
    alignItems="stretch"
  >
    
    <Button
      variant="outlined"
      color="warning"
      startIcon={<BuildCircleIcon />}
      onClick={handleMonitorMachinery}
      sx={{ py: 1.5, fontWeight: 500 }}
      fullWidth
    >
      Monitor Machinery
    </Button>
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<GroupsIcon />}
      onClick={() => setMonitorEmployeesDialogOpen(true)}
      fullWidth
    >
      Monitor Employees
    </Button>
    <Button
      variant="outlined"
      color="primary"
      startIcon={<InventoryIcon />}
      onClick={handleMonitorMaterial}
      sx={{ py: 1.5, fontWeight: 500 }}
      fullWidth
    >
      Monitor Material
    </Button>
    
                                    

  </Stack>
  
                            </div>
                            <Paper
                                        elevation={3}
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#e3f2fd',
                                            borderRadius: 2,
                                            textAlign: 'center'
                                            
                                        }}>
                                        <h3 style={{ color: '#1a237e', marginBottom: 16 }}>Add New</h3>

                                        <Stack
                                            direction="column"
                                            spacing={2}
                                            alignItems="stretch">
                                        <Button
      variant="contained"
      color="success"
      startIcon={<PersonAddIcon />}
      onClick={handleAddEmployee}
      sx={{ py: 1.5, fontWeight: 500 }}
      fullWidth
    >
      Add Employee
                                    </Button>
                                    <Button
                                    variant="contained"
                                    color="info"
                                    startIcon={<AddToPhotosIcon />}
                                    onClick={handleAddMachinery}
                                    sx={{ py: 1.5, fontWeight: 500 }}
                                    fullWidth
                                    >
                                    Add Machinery
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddBusinessIcon />}
                                        onClick={() => setCreateProjectDialogOpen(true)}
                                        sx={{
                                            background: 'linear-gradient(90deg, #1976d2 30%, #21cbf3 90%)',
                                            fontWeight: 700,
                                            borderRadius: 2,
                                            boxShadow: 4,
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1.1rem',
                                            textTransform: 'none',
                                            letterSpacing: 1,
                                            '&:hover': {
                                                background: 'linear-gradient(90deg, #1565c0 30%, #00bcd4 90%)'
                                            }
                                        }}
                                    >
                                        Create Project
                                    </Button>
                                    </Stack>
                                    </Paper>
                        </section>
                        
                        <style>
                        {`
                            @media (max-width: 768px) {
                                .dashboard-section-flex {
                                    flex-direction: column !important;
                                .dashboard-activities,
                                .dashboard-quick-actions {
                                    width: 90% !important;
                                    min-width: 0 !important;
                                }
                            }
                        `}
                        </style>
            
            
            {manageMaterial && (
                <MaterialDialog
                    open={manageMaterial}
                    onClose={() => setManageMaterial(false)}
                />
            )}
            <CreateProjectDialog
                open={createProjectDialogOpen}
                onClose={() => setCreateProjectDialogOpen(false)}
            />
            <AddEmployeeDialog
                open={addEmployeeDialogOpen}
                onClose={() => setAddEmployeeDialogOpen(false)}
            />
            <AddNewMachineryDialog
                open={addMachineryDialogOpen}
                onClose={() => setAddMachineryDialogOpen(false)}
            />
            <MonitorMachineryDialog
                open={monitorMachineryDialogOpen}
                onClose={() => setMonitorMachineryDialogOpen(false)}
            />
            <MonitorEmployeesDialog
                open={monitorEmployeesDialogOpen}
                onClose={() => setMonitorEmployeesDialogOpen(false)}
            />
            <MonitorMaterialDialog
                open={monitorMaterialDialogOpen}
                onClose={() => setMonitorMaterialDialogOpen(false)}
            />
            
            
        </div>
    );
}