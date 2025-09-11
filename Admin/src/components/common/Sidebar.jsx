/**
 * @file Sidebar.jsx
 * @description This component displays the sidebar for the admin panel.
 * @component
 */

import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { HomeIcon, FileTextIcon, UsersIcon, LogOutIcon } from '../ui/Icons';

/**
 * @function Sidebar
 * @description This component displays the sidebar for the admin panel.
 * @param {object} props - The component props.
 * @param {function} props.onLogout - The function to call when the logout button is clicked.
 * @returns {React.ReactElement} The sidebar component.
 */
export default function Sidebar({ onLogout }) {
    // Define classes for styling the active and inactive links
    const linkClasses = "flex items-center px-4 py-2 rounded-lg";
    const activeLinkClasses = "bg-gray-900 text-white";
    const inactiveLinkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
                ICNSIET Admin
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavLink 
                    to="/" 
                    end // 'end' prop ensures this only matches the exact "/" path
                    className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <HomeIcon className="h-5 w-5 mr-3" />
                    Dashboard
                </NavLink>
                <NavLink 
                    to="/papers" // We can add this route later
                    className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <FileTextIcon className="h-5 w-5 mr-3" />
                    Papers
                </NavLink>
                <NavLink 
                    to="/users" 
                    className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <UsersIcon className="h-5 w-5 mr-3" />
                    Users
                </NavLink>
            </nav>
            <div className="px-4 py-6 border-t border-gray-700">
                <button onClick={onLogout} className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg">
                    <LogOutIcon className="h-5 w-5 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
}
