/**
 * @file AdminLayout.jsx
 * @description This component provides the layout for the admin panel.
 * @component
 */

import React from 'react';
import Sidebar from '../common/Sidebar';

/**
 * @function AdminLayout
 * @description This component provides the layout for the admin panel.
 * @param {object} props - The component props.
 * @param {function} props.onLogout - The function to call when the logout button is clicked.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {React.ReactElement} The admin layout component.
 */
export default function AdminLayout({ onLogout, children }) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* The Sidebar is always present */}
            <Sidebar onLogout={onLogout} />

            {/* The main content area where the page will be rendered */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
}
