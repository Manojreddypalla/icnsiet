import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { Spinner, FileTextIcon, LogOutIcon, CheckCircleIcon, XCircleIcon } from '../../components/ui/Icons';

// This is the main dashboard component for users with the "reviewer" role.
export default function ReviewerDashboard({ token, onLogout }) {
    const [assignedPapers, setAssignedPapers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [remarks, setRemarks] = useState({}); // Store remarks for each paper ID
    const [editingReviewId, setEditingReviewId] = useState(null); // State to track which review is being edited

    const getMyId = useCallback(() => {
        if (!token) return null;
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            return decodedToken.id;
        } catch (e) { return null; }
    }, [token]);

    const fetchAssignedPapers = useCallback(async () => {
        if (!token) return;
        try {
            setError('');
            setIsLoading(true);
            const url = `${API_BASE_URL}/api/papers?timestamp=${new Date().getTime()}`;
            const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            setAssignedPapers(response.data.data.papers);
        } catch (err) {
            setError('Failed to fetch assigned papers.');
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchAssignedPapers();
    }, [fetchAssignedPapers]);

    const handleSubmitReview = async (paperId, status) => {
        try {
            await axios.post(`${API_BASE_URL}/api/papers/${paperId}/review`, 
                { status, remarks: remarks[paperId] || '' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEditingReviewId(null); // Hide the form after successful submission
            fetchAssignedPapers();
            alert('Review submitted successfully!');
        } catch (error) {
            alert('Failed to submit review. Please try again.');
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Reviewer Panel</h1>
                        <p className="text-sm text-gray-500 mt-1">Welcome, {localStorage.getItem('admin_name')}! 👋</p>
                    </div>
                    <button onClick={onLogout} className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <LogOutIcon className="h-5 w-5 mr-2" />
                        Logout
                    </button>
                </div>
            </header>
            <main className="max-w-7xl mx-auto p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-5">📑 Papers Assigned for Your Review</h2>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64"><Spinner className="h-10 w-10 border-gray-500" /></div>
                ) : error ? (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">{error}</div>
                ) : assignedPapers.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {assignedPapers.map(paper => {
                            const myId = getMyId();
                            const myReview = paper.reviews.find(r => r.reviewer._id === myId);
                            const isReviewed = myReview && myReview.status !== 'Pending';
                            const isEditing = editingReviewId === paper._id;

                            return (
                                <div key={paper._id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border">
                                    <div className="p-6">
                                        <h3 className="font-semibold text-lg text-gray-900 truncate">{paper.title}</h3>
                                        <p className="text-sm text-gray-600 mt-3 line-clamp-3">{paper.abstract}</p>
                                        <a href={`${API_BASE_URL}/${paper.filePath}`} target="_blank" rel="noopener noreferrer" className="block text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-3">
                                            View Full PDF →
                                        </a>
                                    </div>
                                    <div className="bg-gray-50 px-6 py-4 border-t">
                                        <h4 className="font-medium text-gray-800">Your Review</h4>
                                        {isReviewed && !isEditing ? (
                                            <div className="flex justify-between items-center mt-3">
                                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${myReview.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {myReview.status}
                                                </span>
                                                <button onClick={() => setEditingReviewId(paper._id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                                                    Edit
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="mt-3 space-y-3">
                                                <textarea 
                                                    placeholder="Add remarks (optional)..."
                                                    className="block w-full rounded-md border-gray-300 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={remarks[paper._id] || myReview?.remarks || ''}
                                                    onChange={(e) => setRemarks({...remarks, [paper._id]: e.target.value})}
                                                />
                                                <div className="flex items-center space-x-3">
                                                    <button onClick={() => handleSubmitReview(paper._id, 'Approved')} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg">
                                                        <CheckCircleIcon className="h-5 w-5 mr-2" /> Approve
                                                    </button>
                                                    <button onClick={() => handleSubmitReview(paper._id, 'Rejected')} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg">
                                                        <XCircleIcon className="h-5 w-5 mr-2" /> Reject
                                                    </button>
                                                    {isEditing && (
                                                        <button onClick={() => setEditingReviewId(null)} className="text-sm text-gray-600 hover:text-gray-800">
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow">
                        <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No Papers Assigned</h3>
                        <p className="mt-1 text-sm text-gray-500">You currently don’t have any assigned papers.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
