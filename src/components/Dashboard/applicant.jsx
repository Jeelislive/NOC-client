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
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-bold mb-8 text-center" style={{color: '#212121'}}>Your Dashboard</h1>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 " style={{ borderColor: '#DC2626' }}>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">User Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-600 font-medium">Name:</p>
                            <p className="text-gray-900 font-semibold">{userData.username}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-medium">Email:</p>
                            <p className="text-gray-900 font-semibold">{userData.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-medium">Application Status:</p>
                            <p className={`text-lg font-semibold capitalize ${
                                userData.applicationStatus === 'Approved' ? 'text-green-500' :
                                userData.applicationStatus === 'Rejected' ? 'text-red-500' :
                                userData.applicationStatus === 'Pending' ? 'text-yellow-500' :
                                'text-gray-900'
                            }`}>
                                {userData.applicationStatus}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-medium">Checklist Status:</p>
                            <p className={`text-lg font-semibold capitalize ${
                                userData.checklist?.isChecklistDone ? 'text-green-500' : 'text-red-500'
                            }`}>
                                {userData.checklist?.isChecklistDone ? 'Done' : 'Pending'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Uploaded Documents</h2>
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="selectAll"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                            className="mr-2 w-5 h-5 accent-blue-500"
                        />
                        <label htmlFor="selectAll" className="text-lg">Select All</label>
                        {selectedDocuments.length > 0 && (
                            <button
                                onClick={handleDeleteSelectedDocuments}
                                className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete Selected ({selectedDocuments.length})
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {userData.documents && userData.documents.length > 0 ? (
                            userData.documents.map((doc) => (
                                <div key={doc.public_id} className="relative">
                                    <input
                                        type="checkbox"
                                        checked={selectedDocuments.includes(doc.public_id)}
                                        onChange={() => handleDocumentSelect(doc.public_id)}
                                        className="absolute top-2 left-2 z-10 w-5 h-5 accent-blue-500"
                                    />
                                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="block">
                                        <img src={doc.url} alt={doc.public_id} className="w-full h-40 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105" />
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>No documents uploaded yet.</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <DashboardCard
                        title="Application"
                        description="Apply for new NOC here"
                        link="application"
                        color="yellow"
                    />
                    <DashboardCard
                        title="NOC Renewal"
                        description="Apply for Renewal of NOC"
                        link="renewal"
                        color="blue"
                    />
                    <DashboardCard
                        title="Payment"
                        description="Pay fees for your applications"
                        link="/payment"
                        color="orange"
                    />
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ title, description, link }) {
    return (
        <div className="bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md p-6 text-center transition-colors duration-300">
            <h2 className="font-bold text-xl mb-2 text-[#212121]">{title}</h2>
            <p className="text-gray-700 mb-4">{description}</p>
            <Link to={link}>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    {title === 'Payment' ? 'Pay Now' : title.includes('Renewal') ? 'Renew Now' : 'Apply Now'}
                </button>
            </Link>
        </div>
    );
}

export default Applicant;
