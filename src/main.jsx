import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import Inspector from './components/Dashboard/inspector.jsx';
import Applicant from './components/Dashboard/applicant.jsx';
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import axios from 'axios';
import { userExist, userNotExist } from './redux/reducers/auth.js';
import Application from './components/Noc/Application.jsx';
import Renewal from './components/Noc/Renewal.jsx';
import Checklist from './components/Noc/CheckList.jsx';
import ApplicationList from './components/Noc/ApplicationList.jsx';
import { server } from '../config.js';

// Custom hook to check user status
const useCheckUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        dispatch(userNotExist());
        setLoading(false);
        return;
      }

      const toastId = toast.loading('Please Wait...');
      
      try {
        const { data } = await axios.get(`${server}/user/me`, { withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
         });
        dispatch(userExist(data.user));
      } catch (error) {
        dispatch(userNotExist());
      } finally {
        toast.dismiss(toastId);
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  return loading;
}

const App = () => {
  const loading = useCheckUser();
  const { user } = useSelector((state) => state.auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='' element={user ? <Navigate to="/dashboard" /> : <Home/>} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        {/* <Route path='application' element={user ? <Navigate to="dashboard/application" /> : <Dashboard/>} /> */}
         <Route
          path='dashboard/*'
          element={
            <ProtectedRoute user={user} allowedRoles={['inspector', 'applicant']}>
              {user?.role === 'inspector' ? <Inspector /> : <Applicant />}
            </ProtectedRoute>
          }
        />
         <Route 
         path='dashboard/application' 
         element={
          <ProtectedRoute user={user} allowedRoles={['applicant']}>
          <Application />
        </ProtectedRoute>
          }
        /> 
      
      <Route 
         path='dashboard/renewal' 
         element={
          <ProtectedRoute user={user} allowedRoles={['applicant']}>
          <Renewal />
        </ProtectedRoute>
          }
        /> 

      <Route 
         path='dashboard/checklist' 
         element={
          <ProtectedRoute user={user} allowedRoles={['inspector']}>
          <Checklist />
        </ProtectedRoute>
          }
        />  

      <Route 
         path='dashboard/applicationlist' 
         element={
          <ProtectedRoute user={user} allowedRoles={['inspector']}>
          <ApplicationList />
        </ProtectedRoute>
          }
        />  
      </Route>
    )
  );

  if (loading) return null; 

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
      //  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="bottom-center" />
    </Provider>
  //  </React.StrictMode>
);
