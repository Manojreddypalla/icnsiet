import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { Spinner, EyeIcon, FileTextIcon } from '../../components/ui/Icons';

// --- NEW: Helper function to calculate the review status ---
const getReviewStatus = (paper) => {
    if (!paper.reviews || paper.reviews.length === 0) {
        return { text: 'Not Assigned', color: 'bg-gray-100 text-gray-800' };
    }

    const statuses = paper.reviews.map(r => r.status);
    const totalReviews = statuses.length;
    const completedReviews = statuses.filter(s => s !== 'Pending').length;

    let statusText = '';
    let color = '';

    if (completedReviews < totalReviews) {
        statusText = 'Pending Reviews';
        color = 'bg-yellow-100 text-yellow-800';
    } else if (statuses.every(s => s === 'Approved')) {
        statusText = 'All Approved';
        color = 'bg-green-100 text-green-800';
    } else if (statuses.every(s => s === 'Rejected')) {
        statusText = 'All Rejected';
        color = 'bg-red-100 text-red-800';
    } else {
        statusText = 'Conflict'; // Mix of Approved/Rejected
        color = 'bg-orange-100 text-orange-800';
    }

    return { text: statusText, color, progress: `${completedReviews}/${totalReviews}` };
};


const PaperCard = ({ paper }) => {
    const reviewStatus = getReviewStatus(paper);

    return (
        <Link to={`/papers/${paper._id}`} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    {/* --- UPDATED: Uses the calculated review status --- */}
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${reviewStatus.color}`}>
                        {reviewStatus.text}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(paper.submittedAt).toLocaleDateString()}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 truncate">{paper.title}</h3>
                <p className="text-sm text-gray-600">{paper.authorName}</p>
            </div>
            <div className="border-t p-3 bg-gray-50 flex justify-between items-center">
                {/* --- NEW: Review progress indicator --- */}
                <span className="text-xs font-semibold text-gray-500">
                    Reviews: {reviewStatus.progress || 'N/A'}
                </span>
                <span className="text-sm font-medium text-indigo-600 flex items-center">
                    View & Assign <EyeIcon className="h-4 w-4 ml-1" />
                </span>
            </div>
        </Link>
    );
};

const PapersHeader = ({ paperCount, onFilterChange, activeFilter }) => {
    const filters = ['All', 'Pending', 'Accepted', 'Rejected']; // These now filter by the paper's FINAL status
    return (
        <header className="bg-white shadow-sm rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Paper Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Total Submissions: {paperCount}</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    {filters.map(filter => (
                        <button 
                            key={filter}
                            onClick={() => onFilterChange(filter)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                activeFilter === filter 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default function PapersPage({ token, onLogout }) {
    const [papers, setPapers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const fetchPapers = useCallback(async () => {
        // ... (fetchPapers logic remains the same)
        if (!token) return;
        try {
            setError('');
            setIsLoading(true);
            const url = `${API_BASE_URL}/api/papers?timestamp=${new Date().getTime()}`;
            const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            setPapers(response.data.data.papers);
        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) onLogout();
            else setError('Failed to fetch papers.');
        } finally {
            setIsLoading(false);
        }
    }, [token, onLogout]);

    useEffect(() => { fetchPapers(); }, [fetchPapers]);

    const filteredPapers = useMemo(() => {
        if (activeFilter === 'All') return papers;
        return papers.filter(paper => paper.status === activeFilter);
    }, [papers, activeFilter]);

    return (
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
            <PapersHeader 
                paperCount={papers.length}
                onFilterChange={setActiveFilter}
                activeFilter={activeFilter}
            />
            
            {isLoading ? (
                <div className="flex justify-center items-center h-64"><Spinner className="h-8 w-8 border-gray-500" /></div>
            ) : error ? (
                <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
            ) : filteredPapers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPapers.map(paper => (
                        <PaperCard key={paper._id} paper={paper} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-16 bg-white rounded-lg shadow">
                    <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No Papers Found</h3>
                    <p className="mt-1 text-sm text-gray-500">There are no papers matching the "{activeFilter}" filter.</p>
                </div>
            )}
        </main>
    );
};
