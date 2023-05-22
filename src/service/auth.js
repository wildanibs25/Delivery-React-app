/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Axios from "../service/axios";
import SegmentErrorCom from "../component/SegmentErrorCom";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const cookies = new Cookies();

  const navigate = useNavigate();


  const getMe = async () => {
    const token = cookies.get("ACCESS_TOKEN");
    if (token) {
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await Axios.get("detail-user")
        .then((response) => {
          response.data.user.is_admin = +response.data.user.is_admin;
          setUser(response.data.user);
        })
        .catch((error) => {
          SegmentErrorCom(error.response.data.message);
          logout();
        });
    }
  };

  const logout = async () => {
    const token = cookies.get("ACCESS_TOKEN");
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await Axios.post("logout")
      .then(() => {
        cookies.remove("ACCESS_TOKEN", { path: "/" });
        cookies.remove("lastPath", { path: "/" });
        setUser(null);
        navigate("/login");
      })
      .catch(() => {
        cookies.remove("ACCESS_TOKEN", { path: "/" });
        cookies.remove("lastPath", { path: "/" });
        setUser(null);
        navigate("/login");
      });
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, getMe, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
