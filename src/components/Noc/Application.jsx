import React, { useState } from 'react';
import { Button, Typography, Input, Checkbox } from "@material-tailwind/react";
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

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      const file = files[0];
      if (file.size > 10485760) { // 10MB size limit
        toast.error('File size exceeds 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, [name]: file }));
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
        input.value = ''; // Clear the file input
      });

      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
      }, 30000);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", { id: toastId });
    }
  };

  const goBack = () => {
    navigate(-1);
  }

  return (
    <section className="flex items-center justify-center min-h-screen p-1">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <div className="text-center mb-6">
          <Typography variant="h2" className="font-bold mb-4">
            FIRE NOC Application Form
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Please fill out the form and upload the required documents.
          </Typography>
        </div>
       
        <form onSubmit={handleSubmit}>

          <h2 className="text-xl font-bold mt-8">Building Details</h2>

          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
            <div>
              <label htmlFor="approvedPlan" className="block mb-2 text-sm font-medium text-gray-700">
                1. Approved Plan
              </label>
              <Typography variant="small" color="gray" className="mb-2">
                A copy of the approved plan from the competent authority showing layout (Building/Premises), location of main entrance / exit / staircase / lifts / fire lift etc.
              </Typography>
              <Input type="file" name="approvedPlan" onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="occupationCertificate" className="block mb-2 text-sm font-medium text-gray-700">
                2. Occupation Certificate
              </label>
              <Typography variant="small" color="gray" className="mb-2">
                The occupation certificate for the nursing home.
              </Typography>
              <Input type="file" name="occupationCertificate" onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
            <div>
              <label htmlFor="registrationCertificate" className="block mb-2 text-sm font-medium text-gray-700">
                3. Registration Certificate
              </label>
              <Typography variant="small" color="gray" className="mb-2">
                Registration certificate for the nursing home.
              </Typography>
              <Input type="file" name="registrationCertificate" onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="complianceCertificate" className="block mb-2 text-sm font-medium text-gray-700">
                4. Compliance Certificate (if applicable)
              </label>
              <Typography variant="small" color="gray" className="mb-2">
                Compliance certificate if a kitchen facility is available in the nursing home.
              </Typography>
              <Input type="file" name="complianceCertificate" onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
            <div>
              <label htmlFor="architectPlan" className="block mb-2 text-sm font-medium text-gray-700">
                5. Architect Plan
              </label>
              <Typography variant="small" color="gray" className="mb-2">
                A detailed plan from an architect with all required markings such as access roads, staircases, entrances, exits, etc.
                <ul className="list-disc ml-6">
                  <li>a) Location of Access road (name of road & its width) for the premises.</li>
                  <li>b) Location of Staircases with its width on the premises.</li>
                  <li>c) Area of the premises in sq. mtrs. </li>
                  <li>d) Maximum number of people including staff calculated as per occupant load factor mentioned in NBC/DCR.</li>
                  <li>e) Location & width of all entrances, exits & internal passages.</li>
                  <li>f) Location of Loft / Mezzanine floor along with staircase for Loft / mezzanine Floor as certified by competent Authority.</li>
                  <li>g) Location of Operation Theater, Pathology Laboratory, Oxygen Cylinder / Bank / Tank, Opening of Glass façade, Storage area used in said premises.</li>
                  <li>h) Location of main electrical switch board</li>
                  <li>i) Location of Fire Resistant Door.</li>
                  <li>j) Location of L.P.G. / P.N.G. installation and supply pipe line if any.</li>
                  <li>k) Location of fire-fighting equipment / installation including sprinkler / Detector etc.</li>
                </ul>
              </Typography>
              <Input type="file" name="architectPlan" onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="areaCertificate" className="block mb-2 text-sm font-medium text-gray-700">
                6. Area Certificate
              </label>
              <Typography variant="small" color="gray" className="mb-2">
                Area certificate along with the building height in meters from an architect.
              </Typography>
              <Input type="file" name="areaCertificate" onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
            <div>
              <label htmlFor="buildingNOC" className="block mb-2 text-sm font-medium text-gray-700">
                7. Previous Building NOC
              </label>
              <Typography variant="small" color="gray" className="mb-2">
                Previous issued Building NOC from Fire Department - if Issued.
              </Typography>
              <Input type="file" name="buildingNOC" onChange={handleChange} />
            </div>
          </div>

          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                I agree to the 
                <a href="/terms" className="text-gray-700 underline ml-1">terms and conditions</a>.
              </Typography> 
            }
            className="mt-6 mb-2"
            required
          />

          <Button type="submit" color="blue" className="w-full mt-8 bg-[#212121]" disabled={buttonDisabled}>
            Submit Application
          </Button>
        </form>
        <p className="mt-6 text-gray-600 text-sm">
                After submission, you will receive updates via email. Track your application using the online portal.
            </p>
      </div>
    </section>
  );
};

export default Application;
