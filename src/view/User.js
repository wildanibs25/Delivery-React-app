import { Card } from "flowbite-react";
import React from "react";
import { Outlet } from "react-router-dom";
import {NavbarCom, FooterCom} from "../component";


const User = () => {
  return (
    <Card className="px-0">
      <NavbarCom />
      <Outlet />
      <FooterCom />
    </ Card>
  );
}

export default User
