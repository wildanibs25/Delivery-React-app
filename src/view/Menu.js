/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { resolveRecord, TableCom, useTable } from "../React-Table";
import { Avatar, Button } from "flowbite-react";
import { useAuth } from "../service/auth";
import Axios from "../service/axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import {
  FormatDate,
  FormatRupiah,
  FormMenuCom,
  SegmentErrorCom,
  TimerAlert,
  ToggleSwitchCom,
} from "../component/App";

const Menu = () => {
  const auth = useAuth();
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(0);
  const cookies = new Cookies();

  const onAction = (record) => {
    return (
      <span className="flex space-x-2">
        <button
          onClick={() => onEdit(record)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(record)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Delete
        </button>
      </span>
    );
  };

  const onStatus = (record) => {
    return <ToggleSwitchCom record={record} fetchDataMenu={fetchDataMenu} />;
  };

  const onImage = (record, column) => {
    return <Avatar img={resolveRecord(record, column.field)} />;
  };

  const onFormatRupiah = (record, column) => {
    return FormatRupiah(resolveRecord(record, column.field));
  };

  const onFormatDate = (record, column) => {
    return FormatDate(resolveRecord(record, column.field));
  };

  const modelDataMenu = useTable({
    columns: [
      {
        header: "Image",
        field: "gambar_menu",
        component: onImage,
      },
      {
        header: "Name",
        field: "nama_menu",
        sortable: true,
      },
      {
        header: "Price",
        field: "harga_menu",
        component: onFormatRupiah,
        sortable: true,
      },
      {
        header: "Category",
        field: "kategori_menu",
        sortable: true,
      },
      {
        header: "Status",
        field: "status_menu",
        component: onStatus,
        sortable: true,
      },
      {
        header: "Description",
        field: "deskripsi_menu",
        sortable: true,
      },
      {
        header: "Create",
        field: "created_at",
        component: onFormatDate,
        sortable: true,
      },
      {
        header: "Update",
        field: "updated_at",
        component: onFormatDate,
        sortable: true,
      },
      {
        header: "Action",
        component: onAction,
      },
    ],
  });

  const onEdit = (record) => {
    setShowForm(true);
    setRecords(record);
  };

  const onDelete = async (record) => {
    const swalButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
        cancelButton:
          "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
      },
      buttonsStyling: false,
    });

    swalButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          Axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${cookies.get("ACCESS_TOKEN")}`;
          await Axios.post(`delete-menu/${record.id_menu}`)
            .then(() => {
              TimerAlert().Toast.fire({
                icon: "success",
                title: "Your data has been deleted.",
              });
              fetchDataMenu();
            })
            .catch((error) => {
              if (error.response.status === 412) {
                SegmentErrorCom(error.response.data.message);
                auth.logout();
              } else {
                TimerAlert().Toast.fire({
                  icon: "error",
                  title: "Your data has not been deleted.",
                });
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalButtons.fire("Cancelled", "Your data is safe :)", "error");
        }
      });
  };

  const fetchDataMenu = async () => {
    await Axios.get("menu")
      .then((response) => {
        modelDataMenu.setRecords(response.data.data);
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
              fetchDataMenu();
            }
          });
        }
      });
  };

  useEffect(() => {
    fetchDataMenu();
  }, []);

  return (
    <Fragment>
      <div className="flex">
        <h1 className="text-2xl">Menu</h1>
        <Button
          onClick={() => {
            setShowForm(!showForm);
          }}
          gradientDuoTone="cyanToBlue"
          className="w-28 ml-auto"
        >
          {!showForm ? "Add Menu" : "Cancel"}
        </Button>
      </div>
      <div className="flex snap-x">
        <div
          className={`${
            showForm && "-translate-x-[100vw] absolute -left-96"
          } w-full transform duration-500`}
        >
          <TableCom model={modelDataMenu} isLoading={isLoading} />
        </div>
        <div
          className={`${
            !showForm && "-translate-x-[100vw] absolute -left-96"
          } w-full transform duration-500`}
        >
          <FormMenuCom
            fetchDataMenu={fetchDataMenu}
            setShowForm={setShowForm}
            showForm={showForm}
            setRecords={setRecords}
            records={records}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
