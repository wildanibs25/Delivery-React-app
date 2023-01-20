import { Card } from "flowbite-react";
import React from "react";
import { Outlet } from "react-router-dom";
import * as Component from "../component/App";


const User = () => {
  return (
    <Card className="px-0">
      <Component.NavbarCom />
      <Outlet />
      <Component.FooterCom />
    </ Card>
  );
}

export default User
