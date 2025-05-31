import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { server } from '../../../config';
import { IoArrowBack } from 'react-icons/io5';

const Checklist = () => {
  const location = useLocation();
  const  navigate  = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("Email not provided. Redirecting to dashboard.");
      // Replace the current entry in the history stack and clear state
      navigate("/dashboard/applicationlist", { replace: true, state: null });
    }
  }, [email, navigate]);

  if (!email) {
    return null; // Or a loading spinner, or some placeholder
  }

  const checklistCategories = [
    {
      name: 'GeneralCompliance',
      items: ['Operating Licenses', 'Required Permits', 'Registration', 'Local Regulations', 'State Regulations', 'National Regulations', 'Municipal Bylaws'],
    },
    {
      name: 'WorkforceAndLabor',
      items: ['Valid Contracts', 'Minimum Wage Compliance', 'Work Hours Documentation', 'Safety Training', 'Protective Equipment', 'Safety Drills Documentation'],
    },
    {
      name: 'SafetyMeasures',
      items: ['Structural Integrity', 'Fire Safety Equipment', 'Emergency Exits', 'Sanitation Practices', 'First Aid Kits', 'Waste Management'],
    },
    {
      name: 'OperationalProcedures',
      items: ['Operational Guidelines', 'Quality Control Measures', 'Regular Maintenance', 'Maintenance Logs'],
    },
    {
      name: 'EnvironmentalCompliance',
      items: ['Waste Disposal Practices', 'Recycling Practices', 'Waste Regulations', 'Air Pollution Control', 'Water Pollution Control', 'Noise Pollution Control', 'Hazardous Materials'],
    },
  ];

  const initialChecklist = checklistCategories.reduce((acc, category) => {
    acc[category.name] = category.items.reduce((itemsAcc, item) => {
      itemsAcc[item] = false;
      return itemsAcc;
    }, {});
    return acc;
  }, {});

  const [checklist, setChecklist] = useState(initialChecklist);
  

  useEffect(() => {
    const token  = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    const fetchIncompleteItems = async () => {
      console.log("Fetching incomplete items for email:", email);
      try {
        const response = await axios.get(`${server}/user/getlist`, { 
          params: { email },
          withCredentials: true ,
          headers,
        });
        if (response.status === 200) {
          console.log("Response:", response.data);
    
          const completedItems = response.data.completedItems || [];
          const updatedChecklist = { ...checklist };
    
          completedItems.forEach((item) => {
            const [category, itemName] = item.split(': ');
            if (updatedChecklist[category] && updatedChecklist[category][itemName] !== undefined) {
              updatedChecklist[category][itemName] = true;
            }
          });
    
          setChecklist(updatedChecklist);
        } else {
          toast.error(response.data.message || 'Something went wrong.');
        }
    
      } catch (error) {
        console.error("Error fetching complete checklist items:", error);
        let errorMessage = "Error fetching complete checklist items.";
        if (error.message) { // Standard JS error message
          errorMessage += ` (${error.message})`;
        }
        // Axios specific error structure
        if (error.isAxiosError && error.response) {
          errorMessage += ` Server responded with status ${error.response.status}.`;
          if(error.response.data && error.response.data.message) {
            errorMessage += ` Message: ${error.response.data.message}`;
          }
        } else if (error.isAxiosError && error.request) {
          errorMessage += " No response received from server.";
        }
        toast.error(errorMessage);
      }
    };
    

    fetchIncompleteItems();
  }, [email]);


  const handleCheckboxChange = (categoryName, itemName) => {
    const updatedChecklist = {
      ...checklist,
      [categoryName]: {
        ...checklist[categoryName],
        [itemName]: !checklist[categoryName][itemName],
      },
    };

    setChecklist(updatedChecklist);
  };

  const filterCheckedItems = (checklist) => {
    const filteredChecklist = {};
    for (const category in checklist) {
      const checkedItems = Object.entries(checklist[category])
        .filter(([item, isChecked]) => isChecked)
        .reduce((acc, [item]) => {
          acc[item] = true;
          return acc;
        }, {});

      if (Object.keys(checkedItems).length > 0) {
        filteredChecklist[category] = checkedItems;
      }
    }
    return filteredChecklist;
  };

  const sendEmailNotification = async () => {
    const token = localStorage.getItem('token');
    const loadingToast = toast.loading('Please wait...');
      try {
        const missingItems = [];
        for (const category in checklist) {
          for (const item in checklist[category]) {
            if (!checklist[category][item]) {
              missingItems.push(item);
            }
          }
        }
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        await axios.get(`${server}/user/send-notification`, {
          params: { email, missingItems },
          withCredentials: true,
          headers,
        });
        toast.success("Notification sent to user.", { id: loadingToast });
      } catch (error) {
        console.error("Error sending email notification:", error);
        toast.error("Failed to send email notification.", { id: loadingToast });
      }
  };

  const handleSubmit = async () => {
    try {
      const filteredChecklist = filterCheckedItems(checklist);

      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }

      const response = await axios.post(`${server}/user/checklist`, {
        email,
        checklist: filteredChecklist, 
      }, {
        withCredentials: true,
        headers,
      });
      toast.success("Checklist submitted successfully!");
    } catch (error) {
      console.error("Error submitting checklist:", error);
      toast.error("Failed to submit checklist.");
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl my-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6 sm:mb-8">
        <button
          onClick={goBack}
          className="flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 mr-3 sm:mr-4 w-10 h-10 rounded-full transition-colors"
          aria-label="Go back"
        >
          <IoArrowBack size={20} />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex-grow text-center sm:text-left">
          Checklist for Inspection
        </h1>
      </div>

      <div className="mb-8 p-4 sm:p-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">Checklist Details & Instructions</h2>
        <div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
          <ul className="list-disc pl-5 space-y-1">
            <li>Inspect all items listed under each category to ensure compliance with fire safety regulations.</li>
            <li>Each item should be checked off only when it has been fully inspected and verified.</li>
          </ul>
          <p>
            <strong>Instructions:</strong> To begin the inspection, review each category and its items carefully. As you inspect each requirement, check the corresponding box to indicate compliance. If any item is not compliant, leave the box unchecked and follow up with the necessary actions. Once the inspection is completed, submit the checklist for review and approval.
          </p>
          <p>
            After completing the inspection, you can submit the checklist and proceed with further steps, such as sending an email notification if necessary. If you need any assistance, feel free to contact the Fire Department.
          </p>
        </div>
      </div>

      {checklistCategories.map((category) => (
        <div key={category.name} className="mb-8 sm:mb-10 last:mb-0">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5 text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2 sm:pb-3">
            {category.name.replace(/([A-Z])/g, ' $1').trim()} {/* Adds spaces before capitals */}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4">
            {category.items.map((item) => (
              <li key={item} className="flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  type="checkbox"
                  id={`${category.name}-${item}`}
                  className="form-checkbox h-5 w-5 text-indigo-600 dark:text-indigo-400 rounded border-gray-300 dark:border-gray-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-600"
                  checked={checklist[category.name]?.[item] || false}
                  onChange={() => handleCheckboxChange(category.name, item)}
                />
                <label htmlFor={`${category.name}-${item}`} className="ml-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row sm:justify-end mt-8 sm:mt-10 pt-6 border-t border-gray-200 dark:border-gray-600 space-y-3 sm:space-y-0 sm:space-x-3">
        <Button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Submit Inspection
        </Button>
        <Button
          onClick={sendEmailNotification}
          disabled={!email}
          className={`w-full sm:w-auto py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all ${
            !email ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Send Email
        </Button>
        <Button
          variant="outlined"
          className="w-full sm:w-auto border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-gray-700 py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          View Worklist
        </Button>
      </div>
    </div>

);
};

export default Checklist;
