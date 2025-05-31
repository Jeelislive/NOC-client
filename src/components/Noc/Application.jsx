import React, { useState, useRef } from 'react';
import { Button } from "@material-tailwind/react"; // Removed Checkbox
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../../config';
import { useAuth } from '../../redux/auth';
import { useNavigate } from 'react-router-dom';

const Application = () => {
  const  navigate  = useNavigate();
  const [formData, setFormData] = useState({
    approvedPlan: null,
    occupationCertificate: null,
    registrationCertificate: null,
    complianceCertificate: null,
    architectPlan: null, 
    areaCertificate: null,
    buildingNOC: null,
  });

  const [termsAgreed, setTermsAgreed] = useState(false); // State for checkbox
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
      setFormData(prev => ({ ...prev, [name]: file }));
    } else {
      // Handle case where file is deselected
      setFormData(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Submitting your application...');
    const data = new FormData();

    for (const [key, file] of Object.entries(formData)) {
      if (file) {
        data.append(key, file);
      }
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${server}/user/application`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message, { id: toastId });

      // Reset formData after successful submission
      setFormData({
        approvedPlan: null,
        occupationCertificate: null,
        registrationCertificate: null,
        complianceCertificate: null,
        architectPlan: null,
        areaCertificate: null,
        buildingNOC: null,
      });
      
      // Reset file inputs
      document.querySelectorAll('input[type="file"]').forEach(input => {
        input.value = ''; // This might not be fully effective with controlled components / refs
      });
      setTermsAgreed(false); // Reset terms agreement

      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
      }, 30000); // 30 seconds cooldown

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", { id: toastId });
    }
  };

  const goBack = () => {
    navigate(-1);
  }

  // Helper component for styled file input
  const StyledFileInput = ({ label, name, description, listItems, required, value, onChange }) => {
    const fileInputRef = useRef(null);
    const handleFileButtonClick = () => {
      fileInputRef.current.click();
    };

    return (
      <div className="space-y-2 flex flex-col"> {/* Ensure full height for border if needed */}
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
        {listItems && (
          <ul className="list-disc list-inside text-xs text-gray-500 dark:text-gray-400 pl-4 space-y-1 mt-1">
            {listItems.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        )}
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 mr-2 align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {value ? "Change File" : "Select File"}
          </button>
          <input
            type="file"
            name={name}
            id={name}
            onChange={onChange}
            ref={fileInputRef}
            className="hidden" // Keep hidden, button triggers it
            required={required}
            accept=".pdf,.jpg,.jpeg,.png" // Specify acceptable file types
          />
          {value && (
            <div className="mt-2 sm:mt-0 flex items-center text-sm text-gray-600 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="truncate" title={value.name}>{value.name} ({(value.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
          )}
        </div>
        {!value && required && <p className="text-xs text-red-600 mt-1">This field is required.</p>}
        {value && value.size > 10 * 1024 * 1024 && <p className="text-xs text-red-500 mt-1">File exceeds 10MB limit.</p>}
      </div>
    );
  };

  const formFields = [
    { name: "approvedPlan", label: "1. Approved Plan", description: "Copy of approved plan from competent authority (layout, entrance/exit, stairs, lifts).", required: true },
    { name: "occupationCertificate", label: "2. Occupation Certificate", description: "Occupation certificate for the nursing home.", required: true },
    { name: "registrationCertificate", label: "3. Registration Certificate", description: "Registration certificate for the nursing home.", required: true },
    { name: "complianceCertificate", label: "4. Compliance Certificate (Kitchen)", description: "Compliance certificate if kitchen facility is available (if applicable).", required: false },
    { name: "architectPlan", label: "5. Architect Plan (Detailed)", description: "Detailed architect plan with markings for access roads, staircases, exits, etc.",
      listItems: [
        "Access road (name & width)", "Staircase locations & widths", "Premises area (sq. mtrs)",
        "Max occupant load (NBC/DCR)", "Entrance/exit/passage locations & widths", "Loft/Mezzanine details (if any)",
        "Operation Theater, Lab, Oxygen, Glass façade, Storage areas", "Main electrical switchboard location",
        "Fire Resistant Door locations", "LPG/PNG installation & pipeline", "Fire-fighting equipment locations (sprinklers, detectors)"
      ],
      required: true },
    { name: "areaCertificate", label: "6. Area & Height Certificate", description: "Area certificate and building height (in meters) from an architect.", required: true },
    { name: "buildingNOC", label: "7. Previous Building NOC", description: "Previously issued Building NOC from Fire Dept. (if applicable).", required: false },
  ];

  return (
    // Removed min-h-screen and bg-gray-50/dark:bg-gray-900 from here, Layout.jsx handles it.
    // py-8 sm:py-12 px-4 also handled by Layout.jsx's main tag.
    <>
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-6 sm:p-8 md:p-10 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-6 sm:mb-8">
            <button
              onClick={goBack}
              className="flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 mr-3 sm:mr-4 w-10 h-10 rounded-full transition-colors"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-grow text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Fire NOC Application Form
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                    Please fill out the form and upload the required documents (max 10MB per file, PDF/JPG/PNG).
                </p>
            </div>
        </div>
       
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-300 dark:border-gray-600 pb-3">
                Building & Document Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
              {formFields.map(field => (
                <StyledFileInput
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  description={field.description}
                  listItems={field.listItems}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-300 dark:border-gray-600">
            <label htmlFor="termsAgreed" className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                id="termsAgreed"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 dark:border-gray-500 text-red-600 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 bg-gray-50 dark:bg-gray-700 group-hover:border-red-500 transition-colors"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                I agree to the&nbsp;
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-red-600 dark:text-red-500 hover:underline">
                  terms and conditions
                </a>.
              </span>
            </label>
            {!termsAgreed && <p className="text-xs text-red-500 mt-1.5 pl-8">You must agree to the terms and conditions to proceed.</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-base font-medium shadow-md hover:shadow-lg transition-all text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              buttonDisabled ||
              !termsAgreed ||
              Object.values(formData).some(val => val && val.size > 10 * 1024 * 1024) ||
              formFields.some(field => field.required && !formData[field.name])
            }
          >
            {buttonDisabled ? "Submitting..." : "Submit Application"}
          </button>
        </form>
        <p className="mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          After submission, you will receive updates via email. You can also track your application status on your dashboard.
        </p>
      </div>
    </>
  );
};

export default Application;
