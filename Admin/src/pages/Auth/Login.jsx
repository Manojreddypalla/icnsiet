/**
 * @file Login.jsx
 * @description This page handles the user login.
 * @component
 */

import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { MailIcon, LockIcon, Spinner } from '../../components/ui/Icons';

/**
 * @function LoginPage
 * @description This page handles the user login.
 * @param {object} props - The component props.
 * @param {function} props.onLoginSuccess - The function to call when the login is successful.
 * @returns {React.ReactElement} The login page.
 */
export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
        password,
      });
      
      // --- UPDATED: Handle the new response format ---
      const { token, data } = response.data;
      if (token && data && data.role) {
        // Pass the token, role, and name up to the App component
        onLoginSuccess(token, data.role, data.name);
      } else {
        setError('Login failed. Invalid response from server.');
      }

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
            <h1 className="text-3xl font-bold text-gray-900">Administration Login</h1>
            <p className="mt-2 text-sm text-gray-600">Please sign in to continue.</p>
          </div>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* ... form inputs remain the same ... */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><MailIcon /></div>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-gray-300 pl-10 py-3" placeholder="Email address" />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon /></div>
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border-gray-300 pl-10 py-3" placeholder="Password" />
            </div>
            <div>
              <button type="submit" disabled={isLoading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-400">
                {isLoading ? <Spinner className="h-5 w-5 border-white" /> : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
