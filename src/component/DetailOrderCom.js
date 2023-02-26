/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card } from "flowbite-react";
import { FormatDate } from "./FormatDateCom";
import { resolveRecord, TableCom, useTable } from "../React-Table";
import { FormatRupiah } from "./FormatRupiahCom";
import Axios from "../service/axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import SegmentErrorCom from "./SegmentErrorCom";
import TimerAlert from "./TimerAlertCom";
import { useAuth } from "../service/auth";
import baseURL from "../service/baseURL";

const DetailOrder = ({ detail, setDetail }) => {
  const auth = useAuth();
  const url = baseURL();

  const {
    nota,
    status_pesanan,
    total_harga,
    deliveryCost,
    subTotal,
    matches,
    created_at,
    user,
    alamat,
    item,
  } = detail;

  const [status, setStatus] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();

  const onFormatRupiah = (record, column) => {
    if (column.field1) {
      return FormatRupiah(
        resolveRecord(record, column.field1) *
          resolveRecord(record, column.field2)
      );
    }
    return FormatRupiah(resolveRecord(record, column.field));
  };

  const onImage = (record, column) => {
    return (
      <div className="flex items-center">
        <Avatar
          className="object-cover"
          img={url+resolveRecord(record, column.image)}
        />
        <span className="ml-2">{resolveRecord(record, column.field)}</span>
      </div>
    );
  };

  const onEditStatus = () => {
    if (status === "Order") {
      setStatus("Processed");
      onUpdateStatus("Processed");
    } else if (status === "Processed") {
      setStatus("Delivered");
      onUpdateStatus("Delivered");
    } //  else if (status === "Delivered") {
    //   setStatus("Finished");
    //   onUpdateStatus("Finished");
    // }
  };

  const onUpdateStatus = async (status) => {
    setDetail((detail) => ({
      ...detail,
      status_pesanan: status,
    }));

    const formData = new FormData();

    formData.append("status_pesanan", status);

    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.post(`update-pesanan-admin/${nota}`, formData).catch(
      (error) => {
        if (error.response.status === 412) {
          SegmentErrorCom(error.response.data.message);
          auth.logout();
        } else {
          TimerAlert().Toast.fire({
            icon: "error",
            title: error.response.data.error + "!",
          });
        }
      }
    );
  };

  const modelDataItem = useTable({
    columns: [
      {
        header: "Name",
        image: "menu.gambar_menu",
        field: "menu.nama_menu",
        component: onImage,
        sortable: true,
      },
      {
        header: "Price",
        field: "menu.harga_menu",
        component: onFormatRupiah,
        sortable: true,
      },
      {
        header: "Quantity",
        field: "qty",
        sortable: true,
      },
      {
        header: "total",
        field1: "menu.harga_menu",
        field2: "qty",
        component: onFormatRupiah,
        sortable: true,
      },
    ],
  });

  useEffect(() => {
    modelDataItem.setRecords(item || "");
    setStatus(status_pesanan);
  }, [item, status_pesanan]);

  return (
    <Card className="text-slate-500">
      <div className="my-5">
        <h1
          className="mb-2 text-xl cursor-pointer w-2/5"
          onClick={() => navigate(`/invoice/${nota}`)}
        >
          Detail Order <span className="text-blue-400 text-base">#{nota}</span>
        </h1>
      </div>
      <div className="flex">
        <div className="mb-4 text-sm w-2/3">
          <div className="mb-2">
            <h1>Name : </h1>
            <h1>
              {user?.nama} &#10088; {user?.no_hp} &#10089;
            </h1>
          </div>
          <h1>Address : </h1>
          <h1>
            {alamat?.alamat_lengkap}{" "}
            <strong className="text-bold">
              &#10088; {alamat?.sebagai} &#10089;
            </strong>
          </h1>
        </div>
        <div className="ml-auto text-sm space-y-2">
          <h1>Status : {status}</h1>
          <h1>Order By : {FormatDate(created_at)} </h1>
          {status !== "Delivered" && status !== "Finished" && (
            <Button
              gradientDuoTone={
                status === "Processed" ? "cyanToBlue" : "purpleToBlue"
              }
              outline={true}
              onClick={() => onEditStatus()}
            >
              {status === "Order" && "Process"}
              {status === "Processed" && "Delivery"}
            </Button>
          )}
        </div>
      </div>
      <TableCom
        model={modelDataItem}
        totalTable={{
          total_harga: total_harga || "",
          deliveryCost: deliveryCost || "",
          subTotal: subTotal || "",
          matches: matches || "",
        }}
      />
    </Card>
  );
};

export default DetailOrder;
