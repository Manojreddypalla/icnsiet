import React from 'react';
import Sidebar from '../common/Sidebar';

// This component now accepts 'children' as a prop.
// 'children' will be the actual page content (Dashboard, Papers, etc.).
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
