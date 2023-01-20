/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { FormatRupiah, SegmentErrorCom, StepCom } from "../component/App";
import { resolveRecord, TableCom, useTable } from "../React-Table";
import { useAuth } from "../service/auth";
import Axios from "../service/axios";
import logoAyam from "../storage/logoAyam.png";
import nama from "../storage/nama";

const Invoice = () => {
  const auth = useAuth();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(0);
  const [invoice, setInvoice] = useState([]);
  const navigate = useNavigate();

  const cookies = new Cookies();

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

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
          img={resolveRecord(record, column.image)}
        />
        <span className="ml-2">{resolveRecord(record, column.field)}</span>
      </div>
    );
  };

  const modelDataInvoice = useTable(
    matches
      ? {
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
        }
      : {
          columns: [
            {
              header: "Name",
              image: "menu.gambar_menu",
              field: "menu.nama_menu",
              component: onImage,
              sortable: true,
            },
            {
              header: "Quantity",
              field: "qty",
              sortable: true,
            },
          ],
        }
  );

  const fetchData = async () => {
    await Axios.get(`pesanan/${params.id}`).then((response) => {
      modelDataInvoice.setRecords(response.data.data.item);
      let data = response.data.data;
      data.deliveryCost = 5000;
      data.subTotal = data.total_harga - data.deliveryCost;
      data.matches = matches;
      setInvoice(data);
      setIsLoading(isLoading + 1);
    });
  };

  const onEditStatus = async () => {
    const formData = new FormData();

    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    formData.append("status_pesanan", "Finished");

    await Axios.post(
      `${auth.user.is_admin ? "update-pesanan-admin" : "update-pesanan"}/${
        invoice.nota
      }`,
      formData
    )
      .then(() => {
        setInvoice((invoice) => ({
          ...invoice,
          status_pesanan: "Finished",
        }));
      })
      .catch((error) => {
        if (error.response.status === 412) {
          SegmentErrorCom(error.response.data.message);
          auth.logout();
          navigate("/login");
        } else {
          Swal.fire({
            title: error.response.data.message,
            text: "Your order cannot be processed!",
            icon: "error",
            confirmButtonText: "Oke",
            customClass: {
              confirmButton:
                "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        }
      });
  };

  useEffect(() => {
    fetchData();
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, [matches]);

  return (
    <div
      className={
        matches
          ? "p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          : undefined
      }
    >
      <NavLink
        to="/"
        className="flex items-center mb-16 text-2xl font-semibold text-gray-900 dark:text-white justify-center"
      >
        <img className="w-20 h-20 mr-2" src={logoAyam} alt={"Flowbite"} />
        {nama()}
      </NavLink>
      <Card className="md:mx-36 md:mb-36 -mx-5 text-center">
        <h1 className="font-bold text-4xl -mb-3">INVOICE</h1>
        <h1 className="mb-6">{invoice.nota}</h1>
        <TableCom
          model={modelDataInvoice}
          isLoading={isLoading}
          totalTable={invoice}
        />

        <h1 className="font-bold text-3xl mt-6 -mb-4">Thank You For Order</h1>
        <h1 className="text-xl">
          {invoice.status_pesanan === "Order" && "Please wait for your order"}
          {invoice.status_pesanan === "Precessed" &&
            "Your order is being processed"}
          {invoice.status_pesanan === "Delivered" && (
            <>
              <span>your order is being delivered</span>
              <br />
              <span>
                If the order has arrived,{" "}
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={onEditStatus}
                >
                  click here to confirm!
                </span>
              </span>
            </>
          )}
        </h1>
        <StepCom status={invoice.status_pesanan} />
      </Card>
    </div>
  );
};

export default Invoice;
