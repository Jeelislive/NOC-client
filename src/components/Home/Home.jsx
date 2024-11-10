import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl px-4">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 py-10 sm:py-16">
                <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between space-y-10 sm:space-y-0 sm:space-x-8">
                    <div className="text-center mt-12 sm:text-left sm:max-w-xl space-y-4 sm:space-y-6">
                        <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
                            Obtain Your <span className="text-orange-700">Fire NOC</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-700">
                            Get your Fire Safety NOC for a safer environment and compliance with regulations. 
                            Protect your establishment with ease and professionalism.
                        </p>
                        <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                            to="/login"
                        >
                            Apply for Fire NOC
                        </Link>
                    </div>
                    <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                        <img 
                            className="w-52 sm:w-80 md:w-96 h-auto" 
                            src="https://res.cloudinary.com/dupv4u12a/image/upload/v1731230112/ctvgywff8zmqbu1xk6fh.png" 
                            alt="Fire NOC illustration" 
                        />
                    </div>
                </div>
            </aside>

            <div className="grid place-items-center sm:mt-20 mt-10 w-full">
                <img 
                    className="w-11/12 sm:w-full sm:max-w-4xl" 
                    src="https://res.cloudinary.com/dupv4u12a/image/upload/v1731229877/yvqwnenaxmnf8kwk17fq.png" 
                    alt="Fire Safety Steps" 
                />
            </div>

            <h1 className="text-center text-xl sm:text-5xl py-8 font-medium">
                Comprehensive Fire Safety and Compliance
            </h1>
        </div>
    );
}
