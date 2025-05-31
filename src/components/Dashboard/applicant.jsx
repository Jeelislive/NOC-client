import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { server } from '../../../config';

function Applicant() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const fetchApplicationData = async () => {
            const loadingToast = toast.loading('Loading your application data...');
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`${server}/user/myapplication`, { withCredentials: true, headers });

                if (response.data) {
                    setUserData(response.data);
                    toast.success('Application data loaded successfully!');
                } else {
                    setError('No data found for the user');
                    toast.error('No data found for the user');
                }
            } catch (err) {
                setError('Error fetching application data');
                toast.error('Error fetching application data: ' + err.message);
            } finally {
                toast.dismiss(loadingToast);
            }
        };

        fetchApplicationData();
    }, []);

    useEffect(() => {
        setSelectedDocuments(selectAll ? (userData?.documents || []).map(doc => doc.public_id) : []);
    }, [selectAll, userData]);

    if (error) {
        return <div className="container mx-auto p-4 md:p-8 text-center text-red-500 font-medium text-lg">{error}</div>;
    }

    const handleDeleteSelectedDocuments = async () => {
        if (selectedDocuments.length === 0) {
            toast.error('Please select documents to delete.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.post(`${server}/user/delete`, { public_ids: selectedDocuments }, {
                withCredentials: true,
                headers
            });

            toast.success(response.data.message);
            setUserData(prevData => ({
                ...prevData,
                documents: prevData.documents.filter(doc => !selectedDocuments.includes(doc.public_id))
            }));
            setSelectedDocuments([]);
            setSelectAll(false);
        } catch (error) {
            toast.error('Failed to delete documents');
            console.error("Error deleting documents:", error);
        }
    };

    const handleDocumentSelect = (public_id) => {
        if (selectedDocuments.includes(public_id)) {
            setSelectedDocuments(selectedDocuments.filter(id => id !== public_id));
        } else {
            setSelectedDocuments([...selectedDocuments, public_id]);
        }
        setSelectAll(selectedDocuments.length + 1 === userData.documents.length);
    };

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
    };

    if (!userData) {
        return (
            <div className="container mx-auto p-4 md:p-8 text-center">
                <div className="flex justify-center items-center h-screen">
                    <p>Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        // The Layout.jsx now handles overall padding and container.
        // The global body background from index.css will apply here.
        <>
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-gray-800 dark:text-white">Your Dashboard</h1>

            <div className="space-y-8 lg:space-y-10">
                {/* User Details Card */}
                <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl border-t-4 border-red-600 dark:border-red-500">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">User Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                        <div>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-0.5">Name:</p>
                            <p className="text-md sm:text-lg text-gray-900 dark:text-white font-medium">{userData.username}</p>
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-0.5">Email:</p>
                            <p className="text-md sm:text-lg text-gray-900 dark:text-white font-medium">{userData.email}</p>
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Application Status:</p>
                            <span className={`text-xs sm:text-sm font-semibold capitalize px-3 py-1.5 inline-block rounded-full ${
                                userData.applicationStatus === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' :
                                userData.applicationStatus === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' :
                                userData.applicationStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100' :
                                'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200'
                            }`}>
                                {userData.applicationStatus}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Checklist Status:</p>
                            <span className={`text-xs sm:text-sm font-semibold capitalize px-3 py-1.5 inline-block rounded-full ${
                                userData?.isCheckListDone ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'
                            }`}>
                                {userData?.isCheckListDone ? 'Completed' : 'Pending'}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-6 bg-gray-100 dark:bg-gray-700/50 p-4 rounded-md">
                        Your Application NOC will be sent to your email after approval by the inspector. For any queries regarding your application, please use the contact section.
                    </p>
                </div>

                {/* Uploaded Documents Card */}
                <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Uploaded Documents</h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="selectAllDocs"
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                                className="mr-3 h-5 w-5 text-red-600 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 dark:bg-gray-700"
                            />
                            <label htmlFor="selectAllDocs" className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">Select All Documents</label>
                        </div>
                        {selectedDocuments.length > 0 && (
                            <button
                                onClick={handleDeleteSelectedDocuments}
                                className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors duration-150 flex items-center gap-2 self-end sm:self-center shadow-sm hover:shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Delete Selected ({selectedDocuments.length})
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {userData.documents && userData.documents.length > 0 ? (
                            userData.documents.map((doc) => (
                                <div key={doc.public_id} className="relative group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <label htmlFor={`doc-${doc.public_id}`} className="absolute top-2 left-2 z-20 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id={`doc-${doc.public_id}`}
                                            checked={selectedDocuments.includes(doc.public_id)}
                                            onChange={() => handleDocumentSelect(doc.public_id)}
                                            className="h-5 w-5 text-red-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2"
                                        />
                                    </label>
                                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="block w-full aspect-[4/3]">
                                        <img src={doc.url} alt={`Document ${doc.public_id.substring(0,8)}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </a>
                                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {doc.public_id.split('/').pop().substring(0,20) || 'Document'}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">No documents uploaded yet.</p>
                        )}
                    </div>
                </div>

                {/* Action Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <DashboardCard
                        title="New Application"
                        description="Apply for a new No Objection Certificate."
                        link="application"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    />
                    <DashboardCard
                        title="NOC Renewal"
                        description="Renew your existing No Objection Certificate."
                        link="renewal"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2a8.001 8.001 0 0015.357 2m0 0H15" /></svg>}
                    />
                    <DashboardCard
                        title="Payment Portal"
                        description="Complete payments for your applications."
                        link="/payment"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
                    />
                </div>
            </div>
        </>
    );
}

function DashboardCard({ title, description, link, icon }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
            {icon}
            <h3 className="font-semibold text-lg sm:text-xl mb-2 text-gray-800 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{description}</p>
            <Link to={link} className="w-full mt-auto">
                <button className="w-full bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-150 text-sm">
                    {title.includes('Payment') ? 'Go to Payment' : title.includes('Renewal') ? 'Renew Now' : 'Apply Now'}
                </button>
            </Link>
        </div>
    );
}

export default Applicant;
