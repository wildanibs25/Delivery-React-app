/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "universal-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "../service/axios";
import SegmentErrorCom from "../component/SegmentErrorCom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const cookies = new Cookies();

  const login = async () => {
    const token = cookies.get("ACCESS_TOKEN");
    if (token) {
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await Axios.get("detail-user")
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          SegmentErrorCom(error.response.data.message);
          logout();
        });
    }
  };

  const logout = () => {
    cookies.remove("ACCESS_TOKEN", { path: "/" });
    cookies.remove("lastPath", { path: "/" });
    setUser(null);
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
