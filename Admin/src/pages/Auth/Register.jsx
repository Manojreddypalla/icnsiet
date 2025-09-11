/**
 * @file Register.jsx
 * @description This page handles user registration.
 * @component
 */

import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { MailIcon, LockIcon, Spinner } from '../../components/ui/Icons';

/**
 * @function RegisterPage
 * @description This page handles user registration.
 * @param {object} props - The component props.
 * @param {string} props.token - The user's authentication token.
 * @returns {React.ReactElement} The registration page.
 */
export default function RegisterPage({ token }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('reviewer');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await axios.post(
        `${API_BASE_URL}/api/users/register`,
        { name, email, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('User registered successfully!');
      setName('');
      setEmail('');
      setPassword('');
      setRole('reviewer');
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Register New User</h1>
            <p className="mt-2 text-sm text-gray-600">Create a new admin or reviewer account.</p>
          </div>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
              <p className="font-bold">Success</p>
              <p>{success}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="block w-full rounded-md border-gray-300 pl-4 py-3" placeholder="Full Name" />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><MailIcon /></div>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-gray-300 pl-10 py-3" placeholder="Email address" />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon /></div>
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border-gray-300 pl-10 py-3" placeholder="Password" />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="block w-full rounded-md border-gray-300 py-3">
                <option value="reviewer">Reviewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <button type="submit" disabled={isLoading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-400">
                {isLoading ? <Spinner className="h-5 w-5 border-white" /> : 'Register User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
