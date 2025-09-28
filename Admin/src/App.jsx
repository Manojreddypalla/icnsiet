/**
 * @file App.jsx
 * @description This is the main component that sets up the routing for the application.
 * @module App
 */

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

/**
 * @function ProtectedRoute
 * @description A helper component to protect routes that require a login.
 * @param {object} props - The component props.
 * @param {string} props.token - The user's authentication token.
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {React.ReactElement} The protected route.
 */
const ProtectedRoute = ({ token, children }) => {
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

/**
 * @function App
 * @description The main component that controls the entire application.
 * @returns {React.ReactElement} The application's UI.
 */
export default function App() {
    const [token, setToken] = useState(localStorage.getItem('admin_token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('admin_role'));

    /**
     * @function handleLoginSuccess
     * @description Handles a successful login by storing the token and user role in local storage and state.
     * @param {string} newToken - The new authentication token.
     * @param {string} role - The user's role.
     * @param {string} name - The user's name.
     */
    const handleLoginSuccess = (newToken, role, name) => {
        localStorage.setItem('admin_token', newToken);
        localStorage.setItem('admin_role', role);
        localStorage.setItem('admin_name', name);
        setToken(newToken);
        setUserRole(role);
    };

    /**
     * @function handleLogout
     * @description Handles a logout by removing the token and user role from local storage and state.
     */
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
