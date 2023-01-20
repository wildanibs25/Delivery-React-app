import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

const GuestNoAuth = ({ children }) => {
  const auth = useAuth();

  const location = useLocation();

  if (auth.user) {
    if (auth.user.is_admin) {
      return <Navigate to="/dashboard" state={{ path: location.pathname }} />;
    }
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return children;
};

export default GuestNoAuth;
