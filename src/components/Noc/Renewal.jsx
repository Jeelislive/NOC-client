import { Button } from "@material-tailwind/react"; // Keep Button for now, can be replaced if needed
import React, { useState, useRef } from "react"; // Added useRef
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../../config";
import { useNavigate } from "react-router-dom";

const Renewal = () => {
  const [formData, setFormData] = useState({
    applicationForm: null,
    selfDeclaration: null,
    fireExtinguisherRegister: null,
    fireFightingPhotos: null,
    maintenanceCertificateOwner: null,
    maintenanceCertificateContractor: null,
    fireNoc: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // For cooldown
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) { // 10MB size limit
        toast.error(`File ${file.name} exceeds 10MB limit.`);
        e.target.value = null; // Clear the input
        setFormData(prev => ({ ...prev, [name]: null }));
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Submitting your renewal application...");
    const data = new FormData();

    for (const [key, file] of Object.entries(formData)) {
      if (file) {
        data.append(key, file);
      }
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${server}/user/renewal`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message, { id: toastId });

      // Reset the form data
      setFormData({
        applicationForm: null,
        selfDeclaration: null,
        fireExtinguisherRegister: null,
        fireFightingPhotos: null,
        maintenanceCertificateOwner: null,
        maintenanceCertificateContractor: null,
        fireNoc: null,
      });
      // Clear file inputs - resetting formData state is the primary way
      // document.querySelectorAll('input[type="file"]').forEach((input) => {
      //   input.value = "";
      // });

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 30000); // 30 seconds cooldown

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  // Helper component for styled file input
  const StyledFileInput = ({ label, name, description, required, value, onChange, multiple = false }) => {
    const fileInputRef = useRef(null);
    const handleFileButtonClick = () => {
      fileInputRef.current.click();
    };

    let displayValue = "";
    let totalSizeMB = 0;
    if (value) {
      if (multiple && value.length > 0) {
        displayValue = `${value.length} file(s) selected`;
        totalSizeMB = Array.from(value).reduce((sum, file) => sum + file.size, 0) / 1024 / 1024;
      } else if (!multiple && value.name) {
        displayValue = value.name;
        totalSizeMB = value.size / 1024 / 1024;
      }
    }
    
    const hasError = value && (multiple ? Array.from(value).some(f => f.size > 10 * 1024 * 1024) : value.size > 10 * 1024 * 1024);

    return (
      <div className="space-y-2 flex flex-col">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 mr-2 align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {displayValue ? (multiple ? "Change Files" : "Change File") : (multiple ? "Select Files" : "Select File")}
          </button>
          <input
            type="file"
            name={name}
            id={name}
            onChange={onChange}
            ref={fileInputRef}
            className="hidden"
            required={required}
            multiple={multiple}
            accept=".pdf,.jpg,.jpeg,.png" // Specify acceptable file types
          />
          {displayValue && (
            <div className="mt-2 sm:mt-0 flex items-center text-sm text-gray-600 dark:text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="truncate" title={displayValue}>{displayValue} {totalSizeMB > 0 && `(${totalSizeMB.toFixed(2)} MB)`}</span>
            </div>
          )}
        </div>
        {!value && required && <p className="text-xs text-red-500 mt-1">This field is required.</p>}
        {hasError && <p className="text-xs text-red-500 mt-1">One or more files exceed the 10MB limit.</p>}
      </div>
    );
  };

  const renewalFormFields = [
    { name: "applicationForm", label: "Application Form", description: "Completed and signed application form (PDF).", required: true },
    { name: "selfDeclaration", label: "Self Declaration & Photo ID", description: "Self-declaration and government-issued photo ID.", required: true },
    { name: "fireExtinguisherRegister", label: "Fire Extinguisher Register (Annexure - F)", description: "Register of fire extinguishers and their status.", required: true },
    { name: "fireFightingPhotos", label: "Photos of Fire Fighting System & Open Spaces", description: "Multiple photos of equipment, systems, and safety access spaces.", required: true, multiple: true },
    { name: "maintenanceCertificateOwner", label: "Annual Maintenance Certificate by Owner (Annexure - I)", description: "Owner/occupier issued annual maintenance certificate.", required: true },
    { name: "maintenanceCertificateContractor", label: "Annual Maintenance Certificate by Contractor (Annexure - I & Annexure)", description: "Licensed fire contractor/agency issued annual maintenance certificate.", required: true },
    { name: "fireNoc", label: "Previous Fire NOC / Renewal", description: "Original or most recent Fire NOC or renewal certificate.", required: true },
  ];

  return (
    // Removed min-h-screen and bg-gray-50/dark:bg-gray-900 from here, Layout.jsx handles it.
    <>
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-6 sm:p-8 md:p-10 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-6 sm:mb-8">
            <button
              onClick={handleBack}
              className="flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 mr-3 sm:mr-4 w-10 h-10 rounded-full transition-colors"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-grow text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Renewal of Fire NOC
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                    Please fill out the form and upload the required documents (max 10MB per file, PDF/JPG/PNG).
                </p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-300 dark:border-gray-600 pb-3">
                Required Documents for Renewal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
              {renewalFormFields.map(field => (
                <StyledFileInput
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  description={field.description}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={handleChange}
                  multiple={field.multiple}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-6 pt-6 border-t border-gray-300 dark:border-gray-600">
            <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Site Inspection and Payment Process
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
                You will be prompted to make a payment for the site inspection. Upon payment completion:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <li>The Fire Officer will conduct the site inspection.</li>
                <li>If any queries are raised, you will be notified. Please respond promptly.</li>
                <li>Once approved, applicable charges will be updated on the portal.</li>
                <li>The ‘Proceed to Payment’ option will become available for the final NOC.</li>
                <li>After successful payment, the Final Certificate will be generated.</li>
              </ol>
            </div>

            <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Fee Details & Timeline
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
                <li>Site Inspection Fees: Rs. 2500/- per block</li>
                <li>Fire NOC Issuance Fees: Rs. 1000/-</li>
              </ul>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <strong>Timeline:</strong> Approx. 7 working days (excluding applicant response time).
              </p>
              <p className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                For assistance, please contact the Fire Department.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-base font-medium shadow-md hover:shadow-lg transition-all text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              isSubmitting ||
              renewalFormFields.some(field => field.required && !formData[field.name]) ||
              Object.values(formData).some(val => {
                if (!val) return false;
                if (Array.isArray(val)) {
                  return val.some(f => f.size > 10 * 1024 * 1024);
                }
                return val.size > 10 * 1024 * 1024;
              })
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Renewal Application"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          After submission, you will receive updates via email. Track your application on your dashboard.
        </p>
      </div>
    </>
  );
};

export default Renewal;
