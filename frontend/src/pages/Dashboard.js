import React from 'react';
import useStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import MaterialDialog from '../components/Material';
import Manpower from '../components/Manpower';
import ManageMachinery from '../components/Machinery';


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
    const  [manageManpower, setManageManpower] = React.useState(false);
    const  [manageMaterial, setManageMaterial] = React.useState(false);
    const [manageMachinery, setManageMachinery] = React.useState(false);

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
                                </div>
                            </div>
                        </section>
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
        </div>
    );
}