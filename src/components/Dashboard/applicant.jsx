import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Applicant() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const fetchApplicationData = async () => {
            const loadingToast = toast.loading('Loading your application data...');

            try {
                const response = await axios.get('http://localhost:4001/user/myapplication', { withCredentials: true });

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
            const response = await axios.post('http://localhost:4001/user/delete', { public_ids: selectedDocuments }, {
                withCredentials: true
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
            <h1 className="text-3xl font-bold mb-8 text-center">Your Dashboard</h1>

            <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">User Details</h2>
        <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                    <p className="text-gray-700 font-medium">Name:</p>
                    <p className="text-gray-900 font-semibold">{userData.username}</p>
                </div>
                <div>
                    <p className="text-gray-700 font-medium">Email:</p>
                    <p className="text-gray-900 font-semibold">{userData.email}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                    <p className="text-gray-700 font-medium">Application Status:</p>
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
                    <p className="text-gray-700 font-medium">Checklist Status:</p>
                    <p className={`text-lg font-semibold capitalize ${
                        userData.checklist?.isChecklistDone ? 'text-green-500' : 'text-red-500'
                    }`}>
                        {userData.checklist?.isChecklistDone ? 'Done' : 'Pending'}
                    </p>
                </div>
            </div>
        </div>
          </div>

            {/* </div> */}

            {/* <div className="bg-white p-6 rounded-lg shadow-md"> */}
                <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>

                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="selectAll"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                        className="mr-2 w-6 h-6 accent-blue-500"
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
                                    className="absolute top-2 left-2 z-10 w-6 h-6 accent-blue-500"
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
            {/* </div> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
                <div className="bg-yellow-100 hover:bg-yellow-200 rounded-lg shadow-md p-6 transition-colors duration-300 text-center">
                    <h2 className="font-bold text-xl mb-2 text-yellow-700">Application</h2>
                    <p className="text-gray-700 mb-4">Apply for new NOC here</p>
                    <Link to="application">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                            Apply Now
                        </button>
                    </Link>
                </div>

                <div className="bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md p-6 transition-colors duration-300 text-center">
                    <h2 className="font-bold text-xl mb-2 text-blue-700">NOC Renewal</h2>
                    <p className="text-gray-700 mb-4">Apply for Renewal of NOC</p>
                    <Link to="renewal">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                            Renew Now
                        </button>
                    </Link>
                </div>

                <div className="bg-orange-100 hover:bg-orange-200 rounded-lg shadow-md p-6 transition-colors duration-300 text-center">
                    <h2 className="font-bold text-xl mb-2 text-orange-700">Payment</h2>
                    <p className="text-gray-700 mb-4">Pay fees for your applications</p>
                    <Link to="/payment">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                            Pay Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Applicant;
