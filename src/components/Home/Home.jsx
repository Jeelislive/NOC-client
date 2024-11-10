import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl">
                            Obtain Your <span className="text-orange-700">Fire NOC</span>
                            <span className="hidden sm:block text-4xl">Ensuring Safety for All</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-700">
                            Get your Fire Safety NOC for a safer environment and compliance with regulations. 
                            Protect your establishment with ease and professionalism.
                        </p>

                        <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                            to="/login"
                        >
                            
                            &nbsp; Apply for Fire NOC
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
                    <img className="w-96" src="https://res.cloudinary.com/dupv4u12a/image/upload/v1731230112/ctvgywff8zmqbu1xk6fh.png" alt="image1" />
                </div>
            </aside>

            <div className="mb-2 grid place-items-center sm:mt-20">
                <img className="sm:w-full sm:max-w-4xl w-3/4" src="https://res.cloudinary.com/dupv4u12a/image/upload/v1731229877/yvqwnenaxmnf8kwk17fq.png" />
            </div>

            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Comprehensive Fire Safety and Compliance</h1>
        </div>
    );
}
