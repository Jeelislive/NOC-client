import React from 'react';

export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:w-6/12 lg:w-5/12">
                        <img
                            className="w-full h-auto"
                            src="https://res.cloudinary.com/dupv4u12a/image/upload/v1731230699/pbzbbrkp4eyv6iypkfgs.jpg"
                            alt="Fire Safety"
                        />
                    </div>
                    <div className="md:w-6/12 lg:w-7/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            Ensuring Fire Safety Compliance and NOC Issuance
                        </h2>
                        <p className="mt-6 text-gray-600">
                            Our mission is to help organizations and establishments meet fire safety
                            standards efficiently. We provide comprehensive assistance in obtaining
                            the Fire Safety No Objection Certificate (NOC) to ensure compliance with
                            safety regulations and create a secure environment.
                        </p>
                        <p className="mt-4 text-gray-600">
                            From application guidance to inspection readiness, we are committed to
                            making the process seamless. By achieving a Fire Safety NOC, organizations
                            safeguard their premises, employees, and customers, aligning with best
                            practices and legal requirements.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
