import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
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

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 10485760) {
        // 10MB size limit
        toast.error("File size exceeds 10MB");
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: file }));
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
      // Clear file inputs
      document.querySelectorAll('input[type="file"]').forEach((input) => {
        input.value = ""; // Clear the file input
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300">
      <h1 className="text-3xl text-center font-bold mb-2 text-gray-900">
        Renewal of Fire-No Objection Certificate
      </h1>
      
      <p className="mb-6 text-center text-gray-700">
        Please follow the instructions carefully and ensure all required
        documents are uploaded.
      </p>

      <form onSubmit={handleSubmit} method="POST">
        {/* Application Form Field */}
        <div className="mb-6">
          <label
            htmlFor="application-form"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Application Form
          </label>
          <p className="text-xs text-gray-600 mb-2">
            Upload the completed application form, signed by the applicant, in
            PDF format.
          </p>
          <input
            type="file"
            id="application-form"
            name="applicationForm"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Self Declaration and Photo ID */}
        <div className="mb-6">
          <label
            htmlFor="self-declaration"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Self Declaration and Photo ID Proof
          </label>
          <p className="text-xs text-gray-600 mb-2">
            Upload a self-declaration statement and a government-issued photo ID
            (such as a passport or driver's license).
          </p>
          <input
            type="file"
            id="self-declaration"
            name="selfDeclaration"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Register of Fire Extinguisher */}
        <div className="mb-6">
          <label
            htmlFor="fire-extinguisher-register"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Register of Fire Extinguisher (Annexure - F)
          </label>
          <p className="text-xs text-gray-600 mb-2">
            Provide the register listing all fire extinguishers present on the
            premises, including their maintenance status.
          </p>
          <input
            type="file"
            id="fire-extinguisher-register"
            name="fireExtinguisherRegister"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Photographs of Fire Fighting System */}
        <div className="mb-6">
          <label
            htmlFor="fire-fighting-photos"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Photographs of Fire Fighting System and Marginal Open Spaces/Set
            Back
          </label>
          <p className="text-xs text-gray-600 mb-2">
            Upload multiple photographs showing the fire-fighting equipment,
            systems, and open spaces required for safety access.
          </p>
          <input
            type="file"
            id="fire-fighting-photos"
            name="fireFightingPhotos"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            multiple
            required
          />
          <p className="mt-2 text-xs text-gray-600">
            You can upload multiple files here.
          </p>
        </div>

        {/* Annual Maintenance Certificate by Owner */}
        <div className="mb-6">
          <label
            htmlFor="maintenance-certificate-owner"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Annual Maintenance Certificate by Owner/Occupier (Annexure - I)
          </label>
          <p className="text-xs text-gray-600 mb-2">
            Upload the annual maintenance certificate issued by the owner or
            occupier, certifying fire system maintenance.
          </p>
          <input
            type="file"
            id="maintenance-certificate-owner"
            name="maintenanceCertificateOwner"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Annual Maintenance Certificate by Fire Contractor */}
        <div className="mb-6">
          <label
            htmlFor="maintenance-certificate-contractor"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Annual Maintenance Certificate by Fire Contractor/Agency (Annexure -
            I & Annexure)
          </label>
          <p className="text-xs text-gray-600 mb-2">
            Upload the annual maintenance certificate from a licensed fire
            contractor or agency, certifying compliance.
          </p>
          <input
            type="file"
            id="maintenance-certificate-contractor"
            name="maintenanceCertificateContractor"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Final No Objection Certificate */}
        <div className="mb-6">
          <label
            htmlFor="fire-noc"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Final No Objection Certificate/Renewal of Fire NOC
          </label>
          <p className="text-xs text-gray-600 mb-2">
            Upload the original or most recent Fire NOC or renewal certificate
            issued by the fire department.
          </p>
          <input
            type="file"
            id="fire-noc"
            name="fireNoc"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Additional Instructions */}
        <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Site Inspection and Payment
          </h3>
          <p className="text-gray-700 mb-4">
            You will be prompted to make a payment for the site inspection. Upon
            payment completion:
          </p>
          <ol className="list-decimal pl-5 text-gray-700 mb-6">
            <li>The Fire Officer will conduct the site inspection.</li>
            <li>
              If any queries are raised, you will be notified via your
              registered mobile number. Respond to any queries as needed.
            </li>
            <li>
              Once the application is approved, applicable charges will be
              updated on the portal.
            </li>
            <li>
              The ‘Proceed to Payment’ option will become available for the
              final NOC.
            </li>
            <li>
              Upon successful payment, the application status will change to
              ‘Payment Successful’, and the Final Certificate (Fire NOC Renewal
              External) will be generated.
            </li>
          </ol>
        </div>

        {/* Fee & Payment Instructions */}
        <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Fee Details
          </h3>
          <p className="text-gray-700 mb-4">
            <ul className="list-disc pl-5 text-gray-700">
              <li>Site Inspection Fees: Rs. 2500/- per block</li>
              <li>Fire NOC Issuance Fees: Rs. 1000/-</li>
            </ul>
            <strong>Timeline:</strong> The complete process for issuance of the
            license takes approximately 7 working days, excluding the time taken
            by the applicant to provide necessary inputs.
          </p>

          <p className="text-gray-700">
            Thank you for using the online service. If you have any questions,
            please contact the Fire Department for assistance.
          </p>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <Button
            type="submit"
            color="blue"
            className="w-full mt-8 bg-[#212121]"
          >
            Submit Application
          </Button>
        </div>
      </form>

      <p className="mt-6 text-gray-600 text-sm">
        After submission, you will receive updates via email. Track your
        application using the online portal.
      </p>
    </div>
  );
};

export default Renewal;
