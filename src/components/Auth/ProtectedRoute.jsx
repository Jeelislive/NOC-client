import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  // Check if the user is logged in and has an allowed role
  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  } else if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to home if the role is not allowed
    return <Navigate to="/" replace />;
  }

  // Render the protected content if user is allowed
  return children;
};

export default ProtectedRoute;
