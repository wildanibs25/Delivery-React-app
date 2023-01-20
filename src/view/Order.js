/* eslint-disable react-hooks/exhaustive-deps */

import { Badge } from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import DetailOrder from "../component/DetailOrder";
import SegmentErrorCom from "../component/SegmentErrorCom";
import { resolveRecord, TableCom, useTable } from "../React-Table";
import { useAuth } from "../service/auth";
import Axios from "../service/axios";

const Order = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [detail, setDetail] = useState([]);
  const cookies = new Cookies();

  const location = useLocation();

  const onDetail = (record) => {
    setShowForm(true);
    record.deliveryCost = 5000;
    record.subTotal = record.total_harga - record.deliveryCost;
    record.matches = true;
    setDetail(record);
  };

  const onBadge = (record, column) => {
    if (resolveRecord(record, column.field) === "Processed") {
      return (
        <Badge size="sm" className="mx-auto" color="pink">
          {resolveRecord(record, column.field)}
        </Badge>
      );
    } else if (resolveRecord(record, column.field) === "Delivered") {
      return (
        <Badge size="sm" className="mx-auto" color="warning">
          {resolveRecord(record, column.field)}
        </Badge>
      );
    } else if (resolveRecord(record, column.field) === "Finished") {
      return (
        <Badge size="sm" className="mx-auto" color="success">
          {resolveRecord(record, column.field)}
        </Badge>
      );
    } else {
      return (
        <Badge size="sm" className="mx-auto" color="info">
          {resolveRecord(record, column.field)}
        </Badge>
      );
    }
  };

  const modelDataOrder = useTable({
    columns: [
      {
        header: "Invoice",
        field: "nota",
        sortable: true,
      },
      {
        header: "Name",
        field: "user.nama",
        sortable: true,
      },
      {
        header: "Status",
        field: "status_pesanan",
        component: onBadge,
        sortable: true,
      },
      {
        header: "Price",
        field: "total_harga",
        sortable: true,
      },
    ],

    search: true,
    detail: onDetail,
  });

  const fetchDataOrder = async () => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.get("pesanan-admin")
      .then((response) => {
        modelDataOrder.setRecords(response.data.data);
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
              fetchDataOrder();
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

    fetchDataOrder();
  }, [detail.status_pesanan]);

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
          <TableCom
            model={modelDataOrder}
            isLoading={isLoading}
            keyword={location.state?.name}
          />
        </div>
        <div
          className={`${
            !showForm && "-translate-x-[100vw] absolute -left-96"
          } w-full transform duration-500`}
        >
          <DetailOrder detail={detail} setDetail={setDetail} />
        </div>
      </div>
    </Fragment>
  );
};

export default Order;
