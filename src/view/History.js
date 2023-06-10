/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Card, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  BreadcrumbCom,
  FormatDate,
  FormatRupiah,
  SegmentErrorCom,
} from "../component";
import nama from "../storage/nama";
import logoAyam from "../storage/logoAyam.png";
import Axios from "../service/axios";
import Cookies from "universal-cookie";
import { useAuth } from "../service/auth";
import Swal from "sweetalert2";

const History = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        var pesanan = response.data.data.slice(0, 10);
        setData(pesanan);
        setIsLoading(!isLoading);
      })
      .catch((error) => {
        if (error.response.status === 412) {
          SegmentErrorCom(error.response.data.message);
          auth.logout();
        } else {
          Swal.fire({
            title: error.response.data.error,
            text: "Click button below to refresh page",
            icon: "error",
            confirmButtonText: "Refresh",
            customClass: {
              confirmButton:
                "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      });
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
    <div className="md:mx-0 -mx-6">
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
          {isLoading ? (
            data.map((item) => {
              return (
                <div
                  id={`address-${item.nota}`}
                  className="md:flex w-full items-center mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer"
                  key={item.nota}
                  onClick={() => onDetail(item.nota)}
                >
                  <div className="items-center w-full">
                    <div className="items-center space-x-2">
                      <Label
                        htmlFor="Address"
                        className="block font-medium text-gray-900 dark:text-white cursor-pointer"
                      >
                        <strong className="md:text-xl text-base">
                          {item.nota}
                        </strong>
                      </Label>
                      <span className="mr-auto text-sm">
                        {FormatDate(item.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:mt-0 mt-5">
                    <h1 className="mb-2 md:text-xl text-base">
                      {FormatRupiah(item.total_harga)}
                    </h1>
                    <span className="md:mx-auto ml-auto">
                      {onBadge(item.status_pesanan)}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="grid place-items-center h-full w-full my-10">
              <div className="spinner"></div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default History;
