import { Card } from "flowbite-react";
import React from "react";
import { Outlet } from "react-router-dom";
import { FooterCom, NavbarCom } from "../component";

const Information = () => {
  return (
   <Card>
      <NavbarCom />
      <Outlet />
      <FooterCom />
    </ Card>
  );
};

export default Information;
