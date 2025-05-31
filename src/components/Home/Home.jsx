import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        // The Layout.jsx now handles overall padding and container, so Home.jsx can focus on its content sections.
        // The global body background from index.css will apply here.
        <>
            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden mb-12 sm:mb-16 lg:mb-20">
                {/* Using max-w-screen-xl from Header for consistency, but can be adjusted if needed */}
                <div className="relative max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between p-6 sm:p-10 lg:p-16 gap-8">
                    <div className="text-center lg:text-left lg:max-w-2xl space-y-5 sm:space-y-6">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                            Secure Your <span className="text-red-600 dark:text-red-500">Fire NOC</span> Online
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                            Streamline your Fire Safety No Objection Certificate application. Ensure compliance and protect your premises with our efficient online portal.
                        </p>
                        <Link
                            className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-3.5 text-base sm:text-lg font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            to="/login" // Or "/signup" if preferred for new users
                        >
                            Get Started Now
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2.5 h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                    <div className="flex justify-center lg:justify-end w-full max-w-xs sm:max-w-sm lg:max-w-md mt-8 lg:mt-0">
                        <img
                            className="w-full h-auto rounded-lg shadow-lg object-contain"
                            src="https://res.cloudinary.com/dupv4u12a/image/upload/v1731230112/ctvgywff8zmqbu1xk6fh.png"
                            alt="Fire Safety NOC Illustration"
                        />
                    </div>
                </div>
            </section>

            {/* Informational Image Section */}
            <section className="mb-12 sm:mb-16 lg:mb-20 text-center py-8 sm:py-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-8 sm:mb-10">
                    Easy Steps to Fire Safety Compliance
                </h2>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg inline-block max-w-4xl w-full">
                    <img
                        className="w-full h-auto mx-auto rounded-lg" // Removed max-w-3xl as parent div controls width
                        src="https://www.variex.in/wp-content/uploads/2018/08/Make-Enq.png"
                        alt="Fire Safety Application Steps"
                    />
                </div>
                 <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Our platform guides you through each step of the application process, making it simple to upload documents and track your status.
                </p>
            </section>

            {/* Features/Benefits Section */}
            <section className="text-center py-8 sm:py-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-10 sm:mb-14">
                    Why Choose Our Platform?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {/* Feature Card 1 */}
                    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-center items-center mb-5 w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">Quick & Efficient</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Save time with our streamlined online application process.</p>
                    </div>
                    {/* Feature Card 2 */}
                    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-center items-center mb-5 w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">Secure & Compliant</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Ensure your establishment meets all fire safety regulations.</p>
                    </div>
                    {/* Feature Card 3 */}
                    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-center items-center mb-5 w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">Expert Support</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Access guidance and support throughout your application.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
