/**
 * @file index.jsx
 * @description This page displays the admin dashboard.
 * @component
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { Spinner, FileTextIcon, UsersIcon, ClockIcon, CheckIcon } from '../../components/ui/Icons';

/**
 * @function StatCard
 * @description A card component to display a statistic.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the statistic.
 * @param {number} props.value - The value of the statistic.
 * @param {React.ReactElement} props.icon - The icon for the statistic.
 * @param {string} props.color - The color of the icon's background.
 * @returns {React.ReactElement} The stat card component.
 */
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

/**
 * @function RecentSubmissionItem
 * @description A component to display a recent submission item.
 * @param {object} props - The component props.
 * @param {object} props.paper - The paper object.
 * @returns {React.ReactElement} The recent submission item component.
 */
const RecentSubmissionItem = ({ paper }) => (
    <li className="flex items-center justify-between py-3">
        <div>
            <p className="text-sm font-medium text-gray-800 truncate">{paper.title}</p>
            <p className="text-sm text-gray-500">{paper.authorName}</p>
        </div>
        <Link to={`/papers/${paper._id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">View</Link>
    </li>
);

/**
 * @function DashboardPage
 * @description This page displays the admin dashboard.
 * @param {object} props - The component props.
 * @param {string} props.token - The user's authentication token.
 * @param {function} props.onLogout - The function to call when the user logs out.
 * @returns {React.ReactElement} The dashboard page.
 */
export default function DashboardPage({ token, onLogout }) {
    const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, users: 0 });
    const [recentPapers, setRecentPapers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        if (!token) return;
        try {
            setError('');
            setIsLoading(true);
            const papersUrl = `${API_BASE_URL}/api/papers?timestamp=${new Date().getTime()}`;
            const papersResponse = await axios.get(papersUrl, { headers: { Authorization: `Bearer ${token}` } });
            const papersData = papersResponse.data.data.papers;
            const usersData = [{_id: '1'}, {_id: '2'}]; // Mock user data

            setStats({
                total: papersData.length,
                pending: papersData.filter(p => p.status === 'Pending').length,
                accepted: papersData.filter(p => p.status === 'Accepted').length,
                users: usersData.length,
            });
            const sortedPapers = [...papersData].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
            setRecentPapers(sortedPapers.slice(0, 5));
        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) onLogout();
            else setError('Failed to fetch dashboard data.');
        } finally {
            setIsLoading(false);
        }
    }, [token, onLogout]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (isLoading) return <div className="flex justify-center items-center h-full p-6"><Spinner className="h-8 w-8 border-gray-500" /></div>;
    if (error) return <div className="p-6 bg-red-100 text-red-700 rounded-md">{error}</div>;

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8"><h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1></div>
            </header>
            <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Submissions" value={stats.total} icon={<FileTextIcon className="h-6 w-6 text-blue-600"/>} color="bg-blue-100" />
                    <StatCard title="Pending Review" value={stats.pending} icon={<ClockIcon className="h-6 w-6 text-yellow-600"/>} color="bg-yellow-100" />
                    <StatCard title="Accepted Papers" value={stats.accepted} icon={<CheckIcon className="h-6 w-6 text-green-600"/>} color="bg-green-100" />
                    <StatCard title="Users & Reviewers" value={stats.users} icon={<UsersIcon className="h-6 w-6 text-purple-600"/>} color="bg-purple-100" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Submissions</h3>
                        {recentPapers.length > 0 ? (
                            <ul className="divide-y divide-gray-200">{recentPapers.map(paper => <RecentSubmissionItem key={paper._id} paper={paper} />)}</ul>
                        ) : (<p className="text-sm text-gray-500">No recent submissions found.</p>)}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                         <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                         <div className="space-y-4">
                            <Link to="/papers" className="w-full flex items-center justify-center px-4 py-3 border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"><FileTextIcon className="h-5 w-5 mr-2"/>Manage All Papers</Link>
                             <Link to="/users" className="w-full flex items-center justify-center px-4 py-3 border text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800"><UsersIcon className="h-5 w-5 mr-2"/>Manage Users</Link>
                         </div>
                    </div>
                </div>
            </main>
        </>
    );
};
