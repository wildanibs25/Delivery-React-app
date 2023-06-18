/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Cookies from "universal-cookie";
import StaticCom from "../component/StaticCom";
import { useAuth } from "../service/auth";


const Dashboard = () => {
  const auth = useAuth();
  const [orderUpdate, setOrderUpdate] = useOutletContext();
  const location = useLocation();
  const cookies = new Cookies();

  useEffect(() => {
    if (auth.user) {
      cookies.set("lastPath", location.pathname, {
        path: "/",
      });
    }
  }, []);
  return (
    <StaticCom orderUpdate={orderUpdate} setOrderUpdate={setOrderUpdate} />
  );
};

export default Dashboard;
