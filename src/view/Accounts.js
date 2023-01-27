/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Badge } from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { DetailAccount, SegmentErrorCom } from "../component/App";
import { resolveRecord, TableCom, useTable } from "../React-Table";
import { useAuth } from "../service/auth";
import Axios from "../service/axios";

const Accounts = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [detail, setDetail] = useState([]);

  const cookies = new Cookies();

  const location = useLocation();

  const onImage = (record, column) => {
    return (
      <div className="flex items-center">
        <Avatar
          className="object-cover"
          rounded={true}
          img={
            resolveRecord(record, column.image) !== "foto"
              ? resolveRecord(record, column.image)
              : `https://ui-avatars.com/api/?name=${resolveRecord(
                  record,
                  column.field
                )}`
          }
        />
        <div className="ml-4">
          <h1 className="text-base text-slate-800">
            {resolveRecord(record, column.field)}
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            {resolveRecord(record, column.field2)}
          </p>
        </div>
      </div>
    );
  };

  const onBadge = (record, column) => {
    if (resolveRecord(record, column.field) === "Admin") {
      return (
        <Badge size="sm" className="mx-auto" color="info">
          {resolveRecord(record, column.field)}
        </Badge>
      );
    } else {
      return (
        <Badge size="sm" className="mx-auto" color="warning">
          {resolveRecord(record, column.field)}
        </Badge>
      );
    }
  };

  const onCount = (record, column) => {
    const count = resolveRecord(record, column.field);
    return (
      <span
        className={`text-xl mx-3 ${
          count.length > 0 ? "text-blue-600" : "text-red-500"
        } `}
      >
        {count.length}
      </span>
    );
  };

  const onDetail = (record) => {
    setShowForm(true);
    setDetail(record);
  };

  const modelDataAccounts = useTable({
    columns: [
      {
        header: "Name",
        field: "nama",
        field2: "email",
        image: "foto",
        component: onImage,
        sortable: true,
      },
      {
        header: "Level",
        field: "is_admin",
        component: onBadge,
        sortable: true,
      },
      {
        header: "Order",
        field: "pesanan",
        component: onCount,
        sortable: true,
      },
      {
        header: "Phone",
        field: "no_hp",
        sortable: true,
      },
    ],
    search: true,
    detail: onDetail,
  });

  const fetchDataAccounts = async () => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.get("user")
      .then((response) => {
        const data = response.data.data;
        data.forEach((item) => {
          item.is_admin = item.is_admin === 1 ? "Admin" : "Customer";
        });
        modelDataAccounts.setRecords(data);
        setIsLoading(isLoading + 1);
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
  useEffect(() => {
    if (auth.user) {
      cookies.set("lastPath", location.pathname, {
        path: "/",
      });
    }
    fetchDataAccounts();
  }, [detail]);

  return (
    <Fragment>
      <div className="flex items-center">
        <h1 className="text-2xl">Order</h1>
        <span
          className={`${
            showForm ? "ml-auto cursor-pointer text-blue-400" : "hidden"
          }`}
          onClick={() => setShowForm(false)}
        >
          &lt; Cancel
        </span>
      </div>
      <div className="flex snap-x">
        <div
          className={`${
            showForm && "-translate-x-[100vw] absolute -left-96"
          } w-full transform duration-500`}
        >
          <TableCom model={modelDataAccounts} isLoading={isLoading} />
        </div>
        <div
          className={`${
            !showForm && "-translate-x-[100vw] absolute -left-96"
          } w-full transform duration-500`}
        >
          <DetailAccount
            detail={detail}
            setDetail={setDetail}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Accounts;
