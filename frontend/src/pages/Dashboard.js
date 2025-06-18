import React from 'react';
import useStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import MaterialDialog from '../components/Material';
import Manpower from '../components/Manpower';
import ManageMachinery from '../components/Machinery';
import CreateProjectDialog from '../components/CreateProjectDialog';
import { Button, Box, Typography, Chip, CircularProgress } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import useProjectStore from "../store/useProjectStore";

// Default image if project has no images
const DEFAULT_IMAGE = "https://source.unsplash.com/600x400/?construction,site,infra";

const recentActivities = [
    { time: '10:30 AM', activity: 'Material received at Site A' },
    { time: '09:15 AM', activity: 'Safety audit completed at Site B' },
    { time: 'Yesterday', activity: 'Progress report submitted for Site C' },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const logout = useStore((state) => state.logout);
    const  [manageManpower, setManageManpower] = React.useState(false);
    const  [manageMaterial, setManageMaterial] = React.useState(false);
    const [manageMachinery, setManageMachinery] = React.useState(false);
    const [createProjectDialogOpen, setCreateProjectDialogOpen] = React.useState(false);
    const { projects, fetchProjects, loading, error } = useProjectStore();

    React.useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleLogout = async () => {
        await logout();
        window.location.href = "/login";
    };

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
                                sx={{
                                  position: "relative",
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
                                    {recentActivities.map((item, idx) => (
                                        <li key={idx} style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                                            <span style={{ color: '#3949ab', fontWeight: 500 }}>{item.time}</span>
                                            <span style={{ marginLeft: 12 }}>{item.activity}</span>
                                        </li>
                                    ))}
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
                                <h3 style={{ color: '#1a237e', marginBottom: 16 }}>Quick Actions</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <button
                                        onClick={() => setManageMachinery(true)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '12px',
                                            background: '#e3f2fd',
                                            color: '#1a237e',
                                            border: 'none',
                                            borderRadius: 8,
                                            fontSize: 16,
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            gap: 12
                                        }}
                                    >
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 36,
                                            height: 36,
                                            background: '#bbdefb',
                                            borderRadius: '50%',
                                            marginRight: 8
                                        }}>
                                            {/* Machinery SVG */}
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <rect x="3" y="13" width="18" height="6" rx="2" fill="#3949ab"/>
                                                <rect x="7" y="7" width="10" height="6" rx="2" fill="#90caf9"/>
                                                <circle cx="7" cy="19" r="2" fill="#3949ab"/>
                                                <circle cx="17" cy="19" r="2" fill="#3949ab"/>
                                            </svg>
                                        </span>
                                        Machinery
                                    </button>

                                    <button
                                        onClick={() => setManageManpower(true)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '12px',
                                            background: '#e8f5e9',
                                            color: '#1b5e20',
                                            border: 'none',
                                            borderRadius: 8,
                                            fontSize: 16,
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            gap: 12
                                        }}
                                    >
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 36,
                                            height: 36,
                                            background: '#c8e6c9',
                                            borderRadius: '50%',
                                            marginRight: 8
                                        }}>
                                            {/* Manpower SVG */}
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <circle cx="12" cy="8" r="4" fill="#388e3c"/>
                                                <rect x="6" y="14" width="12" height="6" rx="3" fill="#81c784"/>
                                            </svg>
                                        </span>
                                        Manpower
                                    </button>

                                    <button
                                        onClick={() => setManageMaterial(true)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '12px',
                                            background: '#fff3e0',
                                            color: '#e65100',
                                            border: 'none',
                                            borderRadius: 8,
                                            fontSize: 16,
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            gap: 12
                                        }}
                                    >
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 36,
                                            height: 36,
                                            background: '#ffe0b2',
                                            borderRadius: '50%',
                                            marginRight: 8
                                        }}>
                                            {/* Material SVG */}
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <rect x="4" y="15" width="16" height="5" rx="2" fill="#ff9800"/>
                                                <rect x="7" y="4" width="10" height="9" rx="2" fill="#ffcc80"/>
                                            </svg>
                                        </span>
                                        Material
                                    </button>

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
                                </div>
                            </div>
                        </section>
                        <style>
                        {`
                            @media (max-width: 768px) {
                                .dashboard-section-flex {
                                    flex-direction: column !important;
                                }
                                .dashboard-activities,
                                .dashboard-quick-actions {
                                    width: 100% !important;
                                    min-width: 0 !important;
                                }
                            }
                        `}
                        </style>
            {manageMachinery && (
                <ManageMachinery
                    open={manageMachinery}
                    onClose={() => setManageMachinery(false)}
                    onAdd={() => {/* Optionally refresh activities */}}
                />
            )}
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
            <CreateProjectDialog
                open={createProjectDialogOpen}
                onClose={() => setCreateProjectDialogOpen(false)}
            />
            
        </div>
    );
}