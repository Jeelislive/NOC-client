import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { server } from "../../../config";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserDocuments, setSelectedUserDocuments] = useState([]);
  const limit = 10;
  const [filterType, setFilterType] = useState("all");


  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (filterType === "all") {
          response = await axios.get(`${server}/user/applicationlist`, {
            params: { page: currentPage, limit },
            withCredentials: true,
          });
        } else if (filterType === "fresh") {
          response = await axios.get(`${server}/user/freshlist`, {
            params: { page: currentPage, limit },
            withCredentials: true,
          });
          console.log(response?.data);
          if (response?.data?.length === 0) {
            toast.error("No user has applied for a fresh application");
          }
        } else if (filterType === "renewal") {
          response = await axios.get(`${server}/user/renewallist`, {
            params: { page: currentPage, limit },
            withCredentials: true,
          });
          if (response?.data?.length === 0) {
            toast.error("No user has applied for renewal");
          }
        }

        if (response) {
          console.log(response);
          setUsers(response?.data);
          //  console.log(response?.data);
          setTotalPages(response?.data?.totalPages || 1);
        }
      } catch (error) {
        toast.error("Error fetching data: " + error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, filterType]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };


  const openModal = (documents) => {
    setSelectedUserDocuments(documents);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUserDocuments([]);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const navigateToChecklist = (email) => {
    
    navigate("/dashboard/checklist", { state: { email } });
    
  };

  const updateStatus = async (email, newStatus, documents) => {
    try {
      if (documents.length === 0) {
        toast.error("User hasn't applied for an application yet");
        return;
      }

      await axios.put(
        `${server}/user/updateStatus`,
        { email, applicationStatus: newStatus },
        { withCredentials: true }
      );

      toast.success("Status updated successfully");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, applicationStatus: newStatus } : user
        )
      );
    } catch (error) {
      toast.error("Failed to update status: " + error.message);
      console.error("Error updating status:", error);
    }
  };




  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">User List</h1>

      <div className="flex flex-col md:flex-row md:justify-between mb-4 md:items-center">
        <div className="mb-4 md:mb-0 w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="w-full md:max-w-xs">
          <select
            value={filterType}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Applications</option>
            <option value="fresh">Fresh Applications</option>
            <option value="renewal">Renewal Applications</option>
          </select>
        </div>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Application Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Documents
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {users?.map((user) => (
  <tr key={user.email} className="hover:bg-gray-100 dark:hover:bg-gray-600">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
      {user.username}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
      {user.email}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={`inline-flex px-2 m-1 text-xs font-semibold leading-5 rounded-full ${
          user.applicationStatus === "Approved"
            ? "bg-green-100 text-green-800"
            : user.applicationStatus === "Rejected"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {user.applicationStatus}
      </span>
      <span
        className={`inline-flex px-2 m-1 text-xs font-semibold leading-5 rounded-full ${
          user?.isCheckListDone ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {user?.isCheckListDone ? "Checklist Done" : "Checklist Pending"}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
      {user?.documents?.length > 0 ? (
        <button onClick={() => openModal(user.documents)} className="text-blue-500 underline">
          View Documents
        </button>
      ) : (
        <span>No documents</span>
      )}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
      <select
        value={user.applicationStatus}
        onChange={(e) => updateStatus(user.email, e.target.value, user?.documents)}
        className="px-2 py-1 border rounded-md"
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
      <button
        onClick={() => navigateToChecklist(user.email)}
        className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Checklist
      </button>
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex space-x-1">
            {/* ... (pagination code remains the same) ... */}
          </ul>
        </nav>
      </div>

        {/* Modal for Document Viewing */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOverlayClick}
          >
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Documents</h2>
              <div className="flex flex-wrap gap-2">
                {selectedUserDocuments.map((doc) => (
                  <a key={doc.public_id} href={doc.url} target="_blank" rel="noopener noreferrer" className="block">
                    <img src={doc.url} alt={doc.public_id} className="w-16 h-16 object-cover rounded" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}


export default UserList;