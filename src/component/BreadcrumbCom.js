import { Breadcrumb, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

const BreadcrumbCom = ({ name }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [from, setFrom] = useState("");

  useEffect(() => {
    setFrom(location.state?.path || "Home");
  }, [location.state?.path]);
  return (
    <Card>
      <Breadcrumb>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(-1)}
          icon={HiHome}
        >
          {from}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{name || "Menu"}</Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};

export default BreadcrumbCom;
