/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth } from "./auth";

const GuestNoAuth = ({ children }) => {
  const auth = useAuth();
  const [admin, setAdmin] = useState("/dashboard");
  const [user, setUser] = useState("/");

  const location = useLocation();
  const cookies = new Cookies();

  useEffect(() => {
    setAdmin(cookies.get("lastPath")?.replace(/\//g, "/") || "/dashboard");
    setUser(cookies.get("lastPath")?.replace(/\//g, "/") || "/");
  }, [admin, user]);

  if (auth.user) {
    if (auth.user.is_admin) {
      return <Navigate to={admin} state={{ path: location.pathname }} />;
    }
    return <Navigate to={user} state={{ path: location.pathname }} />;
  }

  return children;
};

export default GuestNoAuth;
