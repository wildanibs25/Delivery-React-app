import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth';

const GuestAdmin = ({children}) => {
  const auth = useAuth();

  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  if (!auth.user.is_admin) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return children;
}

export default GuestAdmin
