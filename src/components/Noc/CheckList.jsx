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
  const { email } = location.state;

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
        console.error("Error fetching complete checklist:", error);
        toast.error("Error fetching complete checklist items.");
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
    <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 mt-4 mb-4">
  <div className="flex items-center mb-4">
    <button
      onClick={goBack}
      className="flex items-center text-white bg-[#212121] mr-4 py-2 px-4 text-lg rounded-full"
    >
      <IoArrowBack className="mr-1" />
    </button>
    <h2 className="text-3xl font-extrabold text-gray-900 text-center w-full">Checklist for Inspection</h2>
  </div>

  <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Checklist Details</h3>
    <p className="text-gray-700 mb-4">
      <ul className="list-disc pl-5 text-gray-700">
        <li>Inspect all items listed under each category to ensure compliance with fire safety regulations.</li>
        <li>Each item should be checked off only when it has been fully inspected and verified.</li>
      </ul>
      <strong>Instructions:</strong> To begin the inspection, review each category and its items carefully. As you inspect each requirement, check the corresponding box to indicate compliance. If any item is not compliant, leave the box unchecked and follow up with the necessary actions. Once the inspection is completed, submit the checklist for review and approval.
    </p>

    <p className="text-gray-700">
      After completing the inspection, you can submit the checklist and proceed with further steps, such as sending an email notification if necessary. If you need any assistance, feel free to contact the Fire Department.
    </p>
  </div>

  {checklistCategories.map((category) => (
    <div key={category.name} className="mb-10">
      <h3 className="text-2xl font-bold mb-5 text-gray-800 border-b pb-2">{category.name}</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-2">
        {category.items.map((item) => (
          <li key={item} className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={`${category.name}-${item}`}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              checked={checklist[category.name]?.[item] || false}
              onChange={() => handleCheckboxChange(category.name, item)}
            />
            <label htmlFor={`${category.name}-${item}`} className="text-gray-700">
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  ))}

  <div className="flex flex-col sm:flex-row sm:justify-end mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
    <Button
      onClick={handleSubmit}
      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
    >
      Submit Inspection
    </Button>
    <Button
      onClick={sendEmailNotification}
      disabled={!email}
      className={`py-2 px-4 rounded-lg w-full sm:w-auto ${!email ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
    >
      Send Email
    </Button>
    <Button
      variant="outlined"
      className="border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700 py-2 px-4 rounded-lg w-full sm:w-auto"
    >
      View Worklist
    </Button>
  </div>
</div>

);
};

export default Checklist;
