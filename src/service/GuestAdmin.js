import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

const GuestAdmin = ({ children }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (!auth.user.is_admin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default GuestAdmin;
