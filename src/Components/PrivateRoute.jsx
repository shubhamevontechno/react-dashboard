// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthProvider';
import UseAuth from '../Hook/UseAuth';

const PrivateRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);
  const { authenticated, loading } = UseAuth();
  
  const navigate = useNavigate(); // Import the useNavigate hook
  if (loading) {
    return <div>Loading...</div>;
  }
  return authenticated ? (
    element
  ) : (
    // Redirect to the login page if not authenticated
    // using the navigate function
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
