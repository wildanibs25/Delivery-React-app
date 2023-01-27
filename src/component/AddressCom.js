/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Label, Textarea, TextInput } from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";
import Axios from "../service/axios";
import { IoChevronForwardOutline, IoChevronDownOutline } from "react-icons/io5";
import Cookies from "universal-cookie";
import { useAuth } from "../service/auth";
import TimerAlert from "./TimerAlert";
import Swal from "sweetalert2";
import SegmentErrorCom from "./SegmentErrorCom";
import AlertCom from "./AlertCom";

const AddressCom = ({ stringURL, fetchDataAddress, action = true }) => {
  const auth = useAuth();
  const [showForm, setShowForm] = useState(!stringURL ? true : false);
  const [id, setId] = useState("");
  const [sebagai, setSebagai] = useState("");
  const [alamatLengkap, setAlamatLengkap] = useState("");

  const [dataAlamat, setDataAlamat] = useState([]);
  const [validation, setValidation] = useState([]);

  const cookies = new Cookies();

  const fetchDataAlamat = async () => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.get(stringURL).then((response) => {
      setDataAlamat(response.data.data);
    });
  };

  const onAddress = async () => {
    const formData = new FormData();
    formData.append("sebagai", sebagai);
    formData.append("alamat_lengkap", alamatLengkap);

    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.post(
      `${id === "" ? "add-alamat" : "update-alamat/" + id}`,
      formData
    )
      .then(() => {
        TimerAlert().Toast.fire({
          icon: "success",
          title: `Address ${id === "" ? "Added!" : "Updated!"} `,
        });
        stringURL ? fetchDataAlamat() : fetchDataAddress();
        setId("");
        setSebagai("");
        setAlamatLengkap("");
        setShowForm(stringURL ? false : true);
      })
      .catch((error) => {
        if (error.response.status === 412) {
          SegmentErrorCom(error.response.data.message);
          auth.logout();
        } else {
          TimerAlert().Toast.fire({
            icon: "error",
            title: `Address Not ${id === "" ? "Added!" : "Updated!"} `,
          });
          setValidation(error.response.data.error);
        }
      });
  };

  const editAlamat = (alamat) => {
    setShowForm(true);
    if (showForm) {
      window.scrollTo({
        top: document.documentElement.scrollHeight - 1000,
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
      });
    }
    setId(alamat.id_alamat);
    setSebagai(alamat.sebagai);
    setAlamatLengkap(alamat.alamat_lengkap);
  };

  const deleteAlamat = (id) => {
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
        Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
          "ACCESS_TOKEN"
        )}`;

        if (result.isConfirmed) {
          const fadeTarget = document.getElementById(`address-${id}`);
          var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
              fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
              fadeTarget.style.opacity -= 0.1;
            } else {
              clearInterval(fadeEffect);
            }
          }, 100);
          
          await Axios.post("delete-alamat/" + id)
            .then(() => {
              TimerAlert().Toast.fire({
                icon: "success",
                title: "Your data has been deleted.",
              });
              fetchDataAlamat();
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

  useEffect(() => {
    if (stringURL) {
      fetchDataAlamat();
    }
  }, []);

  return (
    <Fragment>
      {stringURL &&
        dataAlamat.map((item) => {
          return (
            <div
              id={`address-${item.id_alamat}`}
              className="flex w-full items-center mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md"
              key={item.id_alamat}
            >
              <div className="items-center w-full">
                <Label
                  htmlFor="Address"
                  className="block font-medium text-gray-900 dark:text-white"
                >
                  <strong className="text-2xl">{item.sebagai}</strong>
                </Label>
                <span className="mr-auto text-sm">{item.alamat_lengkap}</span>
              </div>
              {action && (
                <div className="flex flex-wrap items-center justify-center">
                  <Button
                    gradientDuoTone="cyanToBlue"
                    className="w-20 mb-1"
                    onClick={() => editAlamat(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    gradientDuoTone="pinkToOrange"
                    className="w-20 mb-1"
                    onClick={() => deleteAlamat(item.id_alamat)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      {stringURL && action && (
        <button
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setValidation([]);
          }}
          className="text-blue-700"
        >
          {showForm ? (
            <span className="flex items-center">
              <IoChevronDownOutline className="animate-bounce mr-3" /> Cancel
            </span>
          ) : (
            <span className="flex items-center animate-pulse">
              <IoChevronForwardOutline className="mr-3" /> Add Address
            </span>
          )}
        </button>
      )}

      <Card
        className={`${
          !showForm
            ? "translate-x-[10vw] scale-0 -z-10 invisible duration-700 h-1"
            : "my-6 transform duration-500"
        } `}
      >
        <TextInput
          id="id"
          className="hidden"
          value={id}
          disabled={true}
          onChange={(e) => setId(e.target.value)}
        />
        <div className="mb-6">
          <Label
            htmlFor="place"
            color={validation.sebagai ? "failure" : undefined}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Place
          </Label>
          <TextInput
            id="place"
            type="text"
            color={validation.sebagai ? "failure" : undefined}
            placeholder="Place..."
            value={sebagai}
            onChange={(e) => {
              setSebagai(e.target.value);
              Object.keys(validation).length === 1 && validation.sebagai
                ? setValidation([])
                : delete validation.sebagai;
            }}
          />
          {validation.sebagai && AlertCom().Danger(validation.sebagai[0])}
        </div>
        <div className="mb-6">
          <Label
            htmlFor="address"
            color={validation.alamat_lengkap ? "failure" : undefined}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Address
          </Label>
          <Textarea
            id="address"
            placeholder="Address"
            color={validation.alamat_lengkap ? "failure" : undefined}
            value={alamatLengkap}
            onChange={(e) => {
              setAlamatLengkap(e.target.value);
              Object.keys(validation).length === 1 && validation.alamat_lengkap
                ? setValidation([])
                : delete validation.alamat_lengkap;
            }}
          />
          {validation.alamat_lengkap &&
            AlertCom().Danger(validation.alamat_lengkap[0])}
        </div>
        <div>
          <Button gradientDuoTone="cyanToBlue" onClick={onAddress}>
            {id === "" ? "Add Address" : "Edit Address"}{" "}
          </Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default AddressCom;
