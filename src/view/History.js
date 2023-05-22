/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Card, Label } from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BreadcrumbCom, FormatDate, FormatRupiah } from "../component";
import nama from "../storage/nama";
import logoAyam from "../storage/logoAyam.png";
import Axios from "../service/axios";
import Cookies from "universal-cookie";
import { useAuth } from "../service/auth";

const History = () => {
  const [data, setData] = useState([]);
  const auth = useAuth();
  const cookies = new Cookies();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchDataHistory = async () => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;
    await Axios.get("pesanan")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {});
  };

  const onBadge = (status) => {
    if (status === "Processed") {
      return (
        <Badge size="sm" className="mx-auto" color="pink">
          {status}
        </Badge>
      );
    } else if (status === "Delivered") {
      return (
        <Badge size="sm" className="mx-auto" color="warning">
          {status}
        </Badge>
      );
    } else if (status === "Finished") {
      return (
        <Badge size="sm" className="mx-auto" color="success">
          {status}
        </Badge>
      );
    } else {
      return (
        <Badge size="sm" className="mx-auto" color="info">
          {status}
        </Badge>
      );
    }
  };

  const onDetail = (nota) => {
    navigate(`/invoice/${nota}`);
  };

  useEffect(() => {
    if (auth.user) {
      cookies.set("lastPath", location.pathname, {
        path: "/",
      });
    }
    fetchDataHistory();
    // console.log("test", auth.user);
  }, []);

  return (
    <Fragment>
      <BreadcrumbCom name={"History"} />
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <NavLink
          to="/"
          className="flex items-center mb-16 text-2xl font-semibold text-gray-900 dark:text-white justify-center"
        >
          <img className="w-20 h-20 mr-2" src={logoAyam} alt={"Flowbite"} />
          {nama()}
        </NavLink>
        <Card className="md:mx-36 -mx-6 md:mb-36">
          <h1 className="text-2xl mb-5">History Your Order</h1>
          {data.map((item) => {
            return (
              <div
                id={`address-${item.nota}`}
                className="md:flex w-full items-center mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer"
                key={item.nota}
                onClick={() => onDetail(item.nota)}
              >
                <div className="items-center w-full">
                  <div className="items-center space-x-2">
                    <Label
                      htmlFor="Address"
                      className="block font-medium text-gray-900 dark:text-white cursor-pointer"
                    >
                      <strong className="md:text-xl text-lg">
                        {item.nota}
                      </strong>
                    </Label>
                    <span className="mr-auto text-sm">
                      {FormatDate(item.created_at)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center md:mt-0 mt-5">
                  <h1 className="mb-2 text-xl">
                    {FormatRupiah(item.total_harga)}
                  </h1>
                  <span className="md:mx-auto ml-auto">{onBadge(item.status_pesanan)}</span>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </Fragment>
  );
};

export default History;
