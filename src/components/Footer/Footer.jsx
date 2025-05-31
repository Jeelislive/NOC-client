import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaTwitter, FaDiscord } from 'react-icons/fa'; // Using react-icons

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-inner mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-4 lg:col-span-3 mb-6 md:mb-0">
                        <Link to="/" className="flex items-center mb-4 space-x-3 rtl:space-x-reverse">
                            <img
                                src="https://res.cloudinary.com/dupv4u12a/image/upload/v1731228100/wfsnyc02sovvqqmrveee.png"
                                className="h-10 sm:h-12"
                                alt="Fire NOC Portal Logo"
                            />
                            <span className="self-center text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">FireNOC</span>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Simplifying fire safety compliance for a safer tomorrow. Your trusted partner for NOC applications.
                        </p>
                    </div>

                    <div className="md:col-span-8 lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Quick Links</h2>
                            <ul className="text-gray-600 dark:text-gray-400 font-medium space-y-2.5">
                                <li><Link to="/" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Home</Link></li>
                                <li><Link to="/about" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Legal</h2>
                            <ul className="text-gray-600 dark:text-gray-400 font-medium space-y-2.5">
                                <li><Link to="/privacy-policy" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms-conditions" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Follow Us</h2>
                            <ul className="text-gray-600 dark:text-gray-400 font-medium space-y-2.5">
                                <li>
                                    <a href="https://github.com/Jeelislive" className="hover:text-red-600 dark:hover:text-red-500 flex items-center transition-colors" target="_blank" rel="noopener noreferrer">
                                        <FaGithub className="w-5 h-5 mr-2.5" /> Github
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/jeel-rupareliya/" className="hover:text-red-600 dark:hover:text-red-500 flex items-center transition-colors" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedinIn className="w-5 h-5 mr-2.5" /> LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 dark:border-gray-600 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between text-center sm:text-left">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        © {currentYear} <Link to="/" className="hover:text-red-600 dark:hover:text-red-500">FireNOC Portal™</Link>. All Rights Reserved.
                        <br className="sm:hidden"/> Developed by <a href="http://portfolio01-bay.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 dark:hover:text-red-500 font-medium">Jeel Rupareliya</a>.
                    </span>
                    <div className="flex mt-4 space-x-4 sm:justify-center sm:mt-0 justify-center">
                        <a href="#" className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors">
                            <FaFacebookF className="w-5 h-5" />
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors">
                            <FaDiscord className="w-5 h-5" />
                            <span className="sr-only">Discord community</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors">
                            <FaTwitter className="w-5 h-5" />
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="https://github.com/Jeelislive" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors">
                            <FaGithub className="w-5 h-5" />
                            <span className="sr-only">GitHub account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}