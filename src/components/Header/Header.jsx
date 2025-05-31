import React from 'react'
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {userExist, userNotExist} from '../../redux/reducers/auth'
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../../../config';

import { Menu, X } from 'lucide-react'; // Using lucide-react for icons

export default function Header() {
  const {user}  = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    }
      axios.get(`${server}/user/logout`, {
        withCredentials: true,
        headers: headers
      })
        .then(response => {
          dispatch(userNotExist());
            localStorage.removeItem('token');
          navigate('/login');
          toast.success(response.data.message);
        })
        .catch(error => {
          toast.error(error?.response?.data?.message || "Something went wrong");
        });
  };

  return (
      <header className="shadow-md sticky z-50 top-0 bg-white dark:bg-gray-800 transition-colors duration-300">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex flex-wrap justify-between items-center">
                  <Link to="/" className="flex items-center space-x-2">
                      <img
                          src="https://res.cloudinary.com/dupv4u12a/image/upload/v1731228100/wfsnyc02sovvqqmrveee.png"
                          className="h-10 sm:h-12"
                          alt="Fire NOC Portal Logo"
                      />
                      <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white hidden sm:inline">FireNOC</span>
                  </Link>
                  
                  <div className="flex items-center lg:order-2 space-x-2">
                      {user ? (
                          <button
                              onClick={handleLogout}
                              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 focus:outline-none transition-all duration-150 ease-in-out"
                          >
                              Logout
                          </button>
                      ) : (
                          <>
                              <Link
                                  to="/login"
                                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 focus:outline-none transition-all duration-150 ease-in-out"
                              >
                                  Log In
                              </Link>
                              <Link
                                  to="/signup"
                                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 focus:outline-none transition-all duration-150 ease-in-out"
                              >
                                  Sign Up
                              </Link>
                          </>
                      )}
                      <button
                          onClick={toggleMobileMenu}
                          type="button"
                          className="inline-flex items-center justify-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          aria-controls="mobile-menu"
                          aria-expanded={isMobileMenuOpen}
                      >
                          <span className="sr-only">Open main menu</span>
                          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                      </button>
                  </div>

                  <div
                      className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:order-1 lg:items-center`}
                      id="mobile-menu" // Changed ID to be more generic
                  >
                      <ul className="flex flex-col mt-4 lg:mt-0 font-medium lg:flex-row lg:space-x-8 rtl:space-x-reverse">
                          <li>
                              <NavLink
                                  to="/"
                                  onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
                                  className={({ isActive }) =>
                                      `block py-2 px-3 lg:p-0 rounded lg:bg-transparent transition-colors duration-150 ease-in-out ${
                                          isActive ? "text-red-600 dark:text-red-500 font-semibold" : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 lg:hover:bg-transparent"
                                      }`
                                  }
                              >
                                  Home
                              </NavLink>
                          </li>
                          <li>
                              <NavLink
                                  to="/about"
                                  onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
                                  className={({ isActive }) =>
                                      `block py-2 px-3 lg:p-0 rounded lg:bg-transparent transition-colors duration-150 ease-in-out ${
                                          isActive ? "text-red-600 dark:text-red-500 font-semibold" : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 lg:hover:bg-transparent"
                                      }`
                                  }
                              >
                                  About
                              </NavLink>
                          </li>
                          <li>
                              <NavLink
                                  to="/contact"
                                  onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
                                  className={({ isActive }) =>
                                      `block py-2 px-3 lg:p-0 rounded lg:bg-transparent transition-colors duration-150 ease-in-out ${
                                          isActive ? "text-red-600 dark:text-red-500 font-semibold" : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 lg:hover:bg-transparent"
                                      }`
                                  }
                              >
                                  Contact
                              </NavLink>
                          </li>
                          {user && (
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block py-2 px-3 lg:p-0 rounded lg:bg-transparent transition-colors duration-150 ease-in-out ${
                                            isActive ? "text-red-600 dark:text-red-500 font-semibold" : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 lg:hover:bg-transparent"
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                          )}
                           {/* Mobile-only Auth Buttons if needed, or rely on the ones in lg:order-2 */}
                           {!user && isMobileMenuOpen && (
                            <>
                              <li className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                  to="/login"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block w-full text-left py-2 px-3 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  Log In
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/signup"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block w-full text-left py-2 px-3 rounded text-white bg-red-600 hover:bg-red-700 transition-colors"
                                >
                                  Sign Up
                                </Link>
                              </li>
                            </>
                          )}
                          {user && isMobileMenuOpen && (
                             <li className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => {handleLogout(); setIsMobileMenuOpen(false);}}
                                    className="block w-full text-left py-2 px-3 rounded text-white bg-red-600 hover:bg-red-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </li>
                          )}
                      </ul>
                  </div>
              </div>
          </nav>
      </header>
  );
}
