import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { Spinner, UsersIcon, PlusIcon } from '../../components/ui/Icons';

// Mock data to use as a fallback if the API call fails
const mockUsers = [
    { _id: '1', name: 'Manoj Admin (Mock)', email: 'admin@example.com', role: 'admin' },
    { _id: '2', name: 'Jane Reviewer (Mock)', email: 'jane.reviewer@example.com', role: 'reviewer' },
];

export default function UserManagementPage({ token }) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Form state for adding a new user
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState('reviewer');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    // Fetch the list of existing users when the page loads
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data.data.users);
            } catch (err) {
                setError('Failed to fetch users. Displaying mock data as a fallback.');
                setUsers(mockUsers); // Use mock data if the API fails
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [token]);

    // Handle the form submission to create a new user
    const handleAddUser = async (e) => {
        e.preventDefault();
        setFormError('');
        setIsSubmitting(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/users/register`,
                { name: newName, email: newEmail, password: newPassword, role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Add the new user to the list for instant UI feedback
            setUsers(currentUsers => [response.data.data.user, ...currentUsers]);
            // Reset the form fields
            setNewName('');
            setNewEmail('');
            setNewPassword('');
            setNewRole('reviewer');
        } catch (err) {
            setFormError(err.response?.data?.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-gray-100 p-6 space-y-8">
                {/* --- Add User Form Section with Improved Layout --- */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <PlusIcon className="h-6 w-6 mr-2" />
                        Add New User
                    </h2>
                    <form onSubmit={handleAddUser} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                            <div>
                                <label htmlFor="newName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input id="newName" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input id="newEmail" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Password</label>
                                <input id="newPassword" type="password" placeholder="(min. 8 characters)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="newRole" className="block text-sm font-medium text-gray-700">Role</label>
                                <select id="newRole" value={newRole} onChange={(e) => setNewRole(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                    <option value="reviewer">Reviewer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        {formError && <p className="text-sm text-red-600 mt-2">{formError}</p>}
                        <div className="flex justify-end pt-2">
                            <button type="submit" disabled={isSubmitting} className="flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-400">
                                {isSubmitting ? <Spinner className="h-5 w-5 border-white" /> : 'Create User'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- Existing Users Table Section --- */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                            <UsersIcon className="h-6 w-6 mr-2" />
                            Manage Users
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr><td colSpan="3" className="text-center py-8"><Spinner className="h-6 w-6 mx-auto border-gray-400" /></td></tr>
                                ) : (
                                    users.map(user => (
                                        <tr key={user._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}
