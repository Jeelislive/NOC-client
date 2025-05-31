import React from 'react';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-10 lg:p-16">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        <div className="lg:w-5/12 w-full">
                            <img
                                className="w-full h-auto rounded-xl shadow-lg object-cover" // Added rounded-xl and shadow
                                src="https://res.cloudinary.com/dupv4u12a/image/upload/v1731230699/pbzbbrkp4eyv6iypkfgs.jpg"
                                alt="Fire Safety Professionals"
                            />
                        </div>
                        <div className="lg:w-7/12 w-full space-y-5 sm:space-y-6 text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                About Our <span className="text-red-600 dark:text-red-500">Fire NOC</span> Service
                            </h1>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Our core mission is to empower organizations and establishments in achieving and maintaining the highest fire safety standards. We offer dedicated and comprehensive assistance throughout the process of obtaining your Fire Safety No Objection Certificate (NOC), ensuring full compliance with all safety regulations and fostering a truly secure environment for everyone.
                            </p>
                            <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">
                                From initial application guidance and document preparation to ensuring you are ready for inspection, our commitment is to make your journey to compliance as smooth and efficient as possible. Securing a Fire Safety NOC is a critical step in safeguarding your premises, protecting your employees and customers, and aligning your operations with both best practices and legal mandates.
                            </p>
                        </div>
                    </div>

                    {/* Added a new section for values or key features */}
                    <div className="mt-12 sm:mt-16 border-t dark:border-gray-700 pt-10 sm:pt-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-10">
                            Our Commitment
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Efficiency</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Streamlined processes for quick and hassle-free NOC acquisition.</p>
                            </div>
                            <div className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Compliance</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Expert guidance to meet all regulatory safety standards.</p>
                            </div>
                            <div className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Support</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Dedicated support to assist you at every step of the way.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

