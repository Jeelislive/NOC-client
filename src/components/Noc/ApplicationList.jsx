import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { server } from "../../../config";
import { IoArrowBack } from "react-icons/io5";

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
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        let url = `${server}/user/applicationlist`;
        if (filterType === "fresh") {
          url = `${server}/user/freshlist`;
        } else if (filterType === "renewal") {
          url = `${server}/user/renewallist`;
        }
        const { data } = await axios.get(url, {
          params: { page: currentPage, limit, search: searchQuery },
          headers,
          withCredentials: true,
        });

        setUsers(data);
        setTotalPages(data.totalPages || 1);

        if (
          data.length === 0 &&
          (filterType === "renewal" || filterType === "fresh")
        ) {
          toast.error("No applications found for this filter.");
        }
      } catch (error) {
        // Handle error
        toast.error("Error fetching data: " + error.message);
        console.error("Error fetching user data", error);
      }
    };

    fetchData();
  }, [currentPage, searchQuery, filterType]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
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

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      await axios.put(
        `${server}/user/updateStatus`,
        { email, applicationStatus: newStatus },
        { headers, withCredentials: true }
      );

      toast.success("Status updated successfully");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email
            ? { ...user, applicationStatus: newStatus }
            : user
        )
      );
    } catch (error) {
      toast.error("Failed to update status: " + error.message);
      console.error("Error updating status:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.username?.toLowerCase() ?? '').includes(searchQuery) ||
      (user.email?.toLowerCase() ?? '').includes(searchQuery)
  );

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <button
          onClick={goBack}
          className="flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800 mr-4 w-10 h-10 rounded-full transition-colors"
          aria-label="Go back"
        >
          <IoArrowBack size={20} />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Application List</h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">
        <div className="flex-grow sm:max-w-md">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
          />
        </div>

        <div className="flex-grow sm:max-w-xs">
          <select
            value={filterType}
            onChange={handleFilterChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
          >
            <option value="all">All Applications</option>
            <option value="fresh">Fresh Applications</option>
            <option value="renewal">Renewal Applications</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Documents</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((user) => (
              <tr key={user.email} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.applicationStatus === "Approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                          : user.applicationStatus === "Rejected"
                          ? "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
                      }`}
                    >
                      {user.applicationStatus}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user?.isCheckListDone
                          ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                      }`}
                    >
                      {user?.isCheckListDone ? "Checklist Done" : "Checklist Pending"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user?.documents?.length > 0 ? (
                    <button
                      onClick={() => openModal(user.documents)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      View ({user.documents.length})
                    </button>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">None</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <select
                      value={user.applicationStatus}
                      onChange={(e) => updateStatus(user.email, e.target.value, user?.documents)}
                      className="px-2 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      disabled={user?.documents?.length === 0 && user.applicationStatus === "Pending"}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    {!user?.isCheckListDone && (
                      <button
                        onClick={() => navigateToChecklist(user.email)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md shadow-sm transition-colors"
                      >
                        Checklist
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                No applications found.
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <nav aria-label="Page navigation">
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 leading-tight border border-gray-300 ${
                      currentPage === page
                        ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white"
                        : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Modal for Document Viewing */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">View Documents</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            {selectedUserDocuments.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {selectedUserDocuments.map((doc) => (
                  <a
                    key={doc.public_id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <img
                      src={doc.url}
                      alt={doc.public_id || 'Document thumbnail'}
                      className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                    />
                    <p className="text-xs text-center p-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 truncate" title={doc.public_id}>
                      {doc.public_id.split('/').pop()}
                    </p>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No documents to display.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
