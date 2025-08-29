import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import all the necessary pages and layouts
import LoginPage from './pages/Auth/Login';
import AdminLayout from './components/layout/AdminLayout';
import DashboardPage from './pages/Dashboard';
import UserManagementPage from './pages/Users/UserManagementPage';
import PapersPage from './pages/Papers';
import PaperDetailsPage from './pages/Papers/Details';
import ReviewerDashboard from './pages/Reviewer/ReviewerDashboard';

// This is a helper component to protect routes that require a login.
const ProtectedRoute = ({ token, children }) => {
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

// This is the main component that controls the entire application.
export default function App() {
    const [token, setToken] = useState(localStorage.getItem('admin_token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('admin_role'));

    const handleLoginSuccess = (newToken, role, name) => {
        localStorage.setItem('admin_token', newToken);
        localStorage.setItem('admin_role', role);
        localStorage.setItem('admin_name', name);
        setToken(newToken);
        setUserRole(role);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_role');
        localStorage.removeItem('admin_name');
        setToken(null);
        setUserRole(null);
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Login Route */}
                <Route 
                    path="/login" 
                    element={token ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} 
                />

                {/* Protected Routes */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute token={token}>
                            {/* --- THIS IS THE CRITICAL FIX --- */}
                            {/* We check the user's role here. */}
                            {userRole === 'admin' ? (
                                // If the user is an admin, render the full admin layout with its own nested routes.
                                <AdminLayout onLogout={handleLogout}>
                                    <Routes>
                                        <Route index element={<DashboardPage token={token} />} />
                                        <Route path="users" element={<UserManagementPage token={token} />} />
                                        <Route path="papers" element={<PapersPage token={token} />} />
                                        <Route path="papers/:id" element={<PaperDetailsPage token={token} />} />
                                        <Route path="*" element={<Navigate to="/" replace />} />
                                    </Routes>
                                </AdminLayout>
                            ) : (
                                // Otherwise, we assume the user is a reviewer and render their simple, dedicated dashboard.
                                <Routes>
                                     <Route path="/" element={<ReviewerDashboard token={token} onLogout={handleLogout} />} />
                                     <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                            )}
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
