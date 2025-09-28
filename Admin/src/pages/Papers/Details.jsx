/**
 * @file Details.jsx
 * @description This page displays the details of a single paper and allows admins to manage reviewers.
 * @component
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { Spinner } from '../../components/ui/Icons';

/**
 * @function PaperDetailsPage
 * @description This page displays the details of a single paper and allows admins to manage reviewers.
 * @param {object} props - The component props.
 * @param {string} props.token - The user's authentication token.
 * @returns {React.ReactElement} The paper details page.
 */
export default function PaperDetailsPage({ token }) {
    // Get the paper's ID from the URL (e.g., /papers/123-abc)
    const { id } = useParams(); 

    // State for the component
    const [paper, setPaper] = useState(null);
    const [reviewers, setReviewers] = useState([]);
    const [selectedReviewer, setSelectedReviewer] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [assignmentMessage, setAssignmentMessage] = useState({ type: '', text: '' });

    // Fetch all necessary data when the page loads
    const fetchData = useCallback(async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            // Use Promise.all to fetch paper details and the list of available reviewers simultaneously
            const paperPromise = axios.get(`${API_BASE_URL}/api/papers/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const reviewersPromise = axios.get(`${API_BASE_URL}/api/users/reviewers`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const [paperResponse, reviewersResponse] = await Promise.all([paperPromise, reviewersPromise]);
            
            setPaper(paperResponse.data.data.paper);
            setReviewers(reviewersResponse.data.data.reviewers);

        } catch (err) {
            setError('Failed to fetch page data. The paper may not exist or an error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [id, token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Function to handle assigning a selected reviewer to the paper
    const handleAssignReviewer = async () => {
        if (!selectedReviewer) {
            setAssignmentMessage({ type: 'error', text: 'Please select a reviewer.' });
            return;
        }
        setAssignmentMessage({ type: '', text: '' });

        try {
            const response = await axios.patch(
                `${API_BASE_URL}/api/papers/${id}/assign`,
                { reviewerId: selectedReviewer },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Update the local state with the new data from the server to instantly refresh the UI
            setPaper(response.data.data.paper);
            setAssignmentMessage({ type: 'success', text: 'Reviewer assigned successfully!' });
            setSelectedReviewer(''); // Reset the dropdown

        } catch (err) {
            setAssignmentMessage({ type: 'error', text: err.response?.data?.message || 'Failed to assign reviewer.' });
        }
    };

    // Helper function to check if a reviewer is already in the assigned list
    const isReviewerAssigned = (reviewerId) => {
        return paper.reviews?.some(review => review.reviewer._id === reviewerId);
    };

    // --- Render Logic ---

    if (isLoading) {
        return <div className="flex justify-center items-center h-full p-6"><Spinner className="h-8 w-8 border-gray-500" /></div>;
    }

    if (error) {
        return <div className="p-6 bg-red-100 text-red-700 rounded-md">{error}</div>;
    }

    if (!paper) {
        return <div className="p-6">Paper not found.</div>;
    }

    return (
        <>
            <header className="bg-white shadow-sm">
                 <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <Link to="/papers" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">&larr; Back to All Papers</Link>
                    <h1 className="text-2xl font-semibold text-gray-900 mt-2">{paper.title}</h1>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Paper Details Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <h3 className="font-semibold text-gray-600">Author</h3>
                                <p>{paper.authorName} ({paper.authorEmail})</p>
                            </div>
                             <div>
                                <h3 className="font-semibold text-gray-600">Affiliation</h3>
                                <p>{paper.affiliation}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-600">Abstract</h3>
                            <p className="mt-2 text-gray-700 leading-relaxed">{paper.abstract}</p>
                        </div>
                         <div className="mt-6 border-t pt-4">
                            <a href={`${API_BASE_URL}/${paper.filePath}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-800">
                                View Full PDF &rarr;
                            </a>
                        </div>
                    </div>
                </div>

                {/* Assignment & Status Column */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Assign Reviewer</h3>
                        <div className="space-y-4">
                            <select 
                                value={selectedReviewer} 
                                onChange={(e) => setSelectedReviewer(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="">Select a reviewer...</option>
                                {reviewers.map(reviewer => (
                                    <option 
                                        key={reviewer._id} 
                                        value={reviewer._id}
                                        disabled={isReviewerAssigned(reviewer._id)}
                                        className={isReviewerAssigned(reviewer._id) ? 'text-gray-400' : ''}
                                    >
                                        {reviewer.name} {isReviewerAssigned(reviewer._id) && '(Assigned)'}
                                    </option>
                                ))}
                            </select>
                            <button 
                                onClick={handleAssignReviewer}
                                className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                            >
                                Assign
                            </button>
                            {assignmentMessage.text && (
                                <p className={`text-sm mt-2 ${assignmentMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {assignmentMessage.text}
                                </p>
                            )}
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Review Status</h3>
                        {paper.reviews && paper.reviews.length > 0 ? (
                            <ul className="space-y-3">
                                {paper.reviews.map(review => (
                                    <li key={review.reviewer._id} className="border-t pt-3">
                                        <p className="font-semibold text-sm text-gray-800">{review.reviewer.name}</p>
                                        <p className={`text-sm font-bold ${review.status === 'Approved' ? 'text-green-600' : review.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{review.status}</p>
                                        {review.remarks && <p className="text-xs text-gray-500 mt-1 italic">"{review.remarks}"</p>}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No reviewers assigned yet.</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
