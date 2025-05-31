import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTool, FiArrowLeft } from 'react-icons/fi'; // Example icons

const PaymentPlaceholder = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Or navigate('/dashboard/applicant') or appropriate dashboard path
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 text-center">
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-2xl max-w-lg w-full">
        <FiTool className="text-7xl sm:text-8xl text-red-500 mx-auto mb-6" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Payment Portal - Coming Soon!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base">
          We are working hard to bring you a seamless payment experience.
          This feature is currently under construction. Please check back later!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={goBack}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-300 dark:bg-red-700 dark:hover:bg-red-600 transition-colors duration-150"
          >
            <FiArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
          <Link
            to="/dashboard" // Or specific dashboard path
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-150"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlaceholder;