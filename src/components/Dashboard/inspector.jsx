import React from 'react'
import { Link } from 'react-router-dom'

const Inspector = () => {
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    
         <Link to="applicationlist" className="bg-yellow-100 hover:bg-yellow-200 rounded-lg shadow-md p-6 text-center">
          <svg className="w-12 h-12 mx-auto text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H9a2 2 0 01-2-2V10.34a4 4 0 01.672-2.777L13.5 2.672A4 4 0 0118 7.34l-5 4.672A4 4 0 0112 10.34V21z" />
          </svg>
          <h2 className="font-bold text-xl mb-2">Application List</h2>
          <p className="text-gray-600">All applications of noc</p>
        </Link>
        </div>
        </div>
    </>
  )
}

export default Inspector;