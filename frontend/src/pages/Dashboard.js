import React from 'react';
import useStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import AddProgress from "../components/AddProgress";
import RequestMaterial from "../components/RequestMaterial";


const stats = [
    { label: 'Total Projects', value: 12 },
    { label: 'Active Sites', value: 5 },
    { label: 'Pending Tasks', value: 23 },
    { label: 'Completed Milestones', value: 48 },
];

const recentActivities = [
    { time: '10:30 AM', activity: 'Material received at Site A' },
    { time: '09:15 AM', activity: 'Safety audit completed at Site B' },
    { time: 'Yesterday', activity: 'Progress report submitted for Site C' },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const logout = useStore((state) => state.logout);
    const  [showAdd, setShowAdd] = React.useState(false);
    const  [showRequest, setShowRequest] = React.useState(false);

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
                <h2 style={{ color: '#3949ab', fontWeight: 400, marginTop: 8 }}>Site Incharge Dashboard</h2>
            </section>

            {/* Slidable stats */}
            <section style={{ overflowX: 'auto', marginBottom: '32px' }}>
                <div style={{
                    display: 'flex',
                    gap: '24px',
                    minWidth: 600,
                    width: 'max-content',
                    paddingBottom: 8
                }}>
                    {stats.map((stat) => (
                        <div key={stat.label} style={{
                            background: '#fff',
                            borderRadius: 12,
                            boxShadow: '0 2px 8px rgba(60,72,88,0.08)',
                            padding: '24px 32px',
                            minWidth: 220,
                            textAlign: 'center',
                            flex: '0 0 auto'
                        }}>
                            <div style={{ fontSize: 32, color: '#3949ab', fontWeight: 700 }}>{stat.value}</div>
                            <div style={{ color: '#616161', fontSize: 16, marginTop: 8 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ display: 'flex', gap: '24px' }}>
                <div style={{
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(60,72,88,0.08)',
                    padding: '24px',
                    flex: 2
                }}>
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
                <div style={{
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(60,72,88,0.08)',
                    padding: 24,
                    flex: 1
                }}>
                    <h3 style={{ color: '#1a237e', marginBottom: 16 }}>Quick Actions</h3>
                    <button onClick={()=> setShowAdd(true)} style={{
                        width: '100%',
                        padding: '12px 0',
                        background: '#3949ab',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 16,
                        marginBottom: 12,
                        cursor: 'pointer'
                    }}>Add Progress Update</button>
                    <button onClick={()=> setShowRequest(true)} style={{
                        width: '100%',
                        padding: '12px 0',
                        background: '#1a237e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 16,
                        cursor: 'pointer'
                    }}>Request Material</button>
                </div>
            </section>
            {showAdd && (
                <AddProgress
                    open={showAdd}
                    onClose={() => setShowAdd(false)}
                    onAdd={(data) => {
                        // Optionally handle the new progress data here
                        setShowAdd(false);
                    }}
                />
            )}
            {showRequest && (
                <RequestMaterial
                    open={showRequest}
                    onClose={() => setShowRequest(false)}
                    onRequest={(data) => {
                        // Optionally handle the material request data here
                        setShowRequest(false);
                    }}
                />
            )}
        </div>
    );
}