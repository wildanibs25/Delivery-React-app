import { Breadcrumb, Card } from "flowbite-react";
import React from "react";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const BreadcrumbCom = ({ name }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <Breadcrumb>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate("/")}
          icon={HiHome}
        >
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>{name || "Menu"}</Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};

export default BreadcrumbCom;
