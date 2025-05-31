import React from 'react'

import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi'; // Using react-icons

export default function Contact() {
    // Basic form submission handler (can be expanded)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here (e.g., send data to an API)
        alert("Form submitted! (This is a placeholder)");
        e.target.reset(); // Reset form fields
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
                        Contact Us
                    </h1>
                    <p className="mt-3 sm:mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We're here to help! Whether you have a question about our services, need assistance, or just want to provide feedback, please don't hesitate to reach out.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Contact Information Section */}
                        <div className="p-6 sm:p-8 lg:p-10 bg-gray-100 dark:bg-gray-700">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
                                Get in Touch
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-8">
                                You can reach us through the following channels or use the contact form. We aim to respond to all inquiries within 24 hours.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <FiMapPin className="h-6 w-6 text-red-500 dark:text-red-400 mt-1 flex-shrink-0" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Our Office</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            123 Fire Safety Lane, Compliance City, ST 12345
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FiPhone className="h-6 w-6 text-red-500 dark:text-red-400 mt-1 flex-shrink-0" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Phone</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-300">
                                            <a href="tel:+1234567890">(123) 456-7890</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FiMail className="h-6 w-6 text-red-500 dark:text-red-400 mt-1 flex-shrink-0" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Email</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-300">
                                            <a href="mailto:support@firenocportal.com">support@firenocportal.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Section */}
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="John Doe"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:focus:border-red-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:focus:border-red-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    placeholder="(123) 456-7890"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:focus:border-red-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    placeholder="How can we help you today?"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:focus:border-red-500 outline-none transition-colors"
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                >
                                    Send Message
                                    <FiSend className="ml-2 h-5 w-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}