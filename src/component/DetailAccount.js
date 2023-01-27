/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Avatar,
  Button,
  Card,
  Label,
  Radio,
  Select,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { FaTrashAlt } from "react-icons/fa";
import AlertCom from "./AlertCom";
import Axios from "../service/axios";
import SegmentErrorCom from "./SegmentErrorCom";
import TimerAlert from "./TimerAlert";
import { useAuth } from "../service/auth";
import Cookies from "universal-cookie";
import FormPasswordCom from "./FormPasswordCom";
import AddressCom from "./AddressCom";
import { useNavigate } from "react-router-dom";
import FormDateCom from "./FormDateCom";
import Swal from "sweetalert2";

const DetailAccount = ({ detail, setDetail, showForm, setShowForm }) => {
  const auth = useAuth();
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [sendImage, setSendImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [changed, setChanged] = useState(false);
  const [gender, setGender] = useState("");
  const [admin, setAdmin] = useState("");

  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();
  const cookies = new Cookies();

  const imageChange = (file) => {
    setImage(URL.createObjectURL(file[0]));
    setSendImage(file[0]);
  };

  const fetchData = () => {
    setId(detail.id_user || "");
    setImage(detail.foto || "");
    setName(detail.nama || "");
    setEmail(detail.email || "");
    setHp(detail.no_hp || "");
    setDate(detail.tgl_lahir || "");
    setGender(detail.jk || "");
    setAdmin(detail.is_admin || "");
  };

  const clearRecordsMenu = () => {
    setId("");
    setImage("");
    setSendImage("");
    setName("");
    setEmail("");
    setHp("");
    setDate("");
    setGender("");
    setAdmin("");
    setPassword("");
  };

  const editAccount = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("number_phone", hp);
    formData.append(
      "date",
      date === ""
        ? ""
        : date === null
        ? ""
        : !changed
        ? date
        : date.toISOString().slice(0, 19).replace("T", " ")
    );
    formData.append("gender", gender);
    formData.append("photo", sendImage);
    formData.append("admin", admin === "Admin" ? 1 : 0);

    if (password !== "") {
      formData.append("password", password);
    }

    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.post(`update-user-admin/${id}`, formData)
      .then(() => {
        TimerAlert().Toast.fire({
          icon: "success",
          title: "Data Updated!",
        });

        if (auth.user.nama === name) {
          auth.login();
        }

        setDetail((detail) => ({
          ...detail,
          nama: name,
          email: email,
          no_hp: hp,
          tgl_lahir: date,
          jk: gender,
          foto: image,
          is_admin: admin,
        }));

        setPassword("");
      })
      .catch((error) => {
        if (error.response.status === 412) {
          SegmentErrorCom(error.response.data.message);
          auth.logout();
        } else {
          TimerAlert().Toast.fire({
            icon: "error",
            title: "Data Not Updated!",
          });
          setValidation(error.response.data.error);
        }
      });
  };

  const deleteAccount = async () => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

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
          await Axios.post(`delete-user-admin/${id}`)
            .then(() => {
              TimerAlert().Toast.fire({
                icon: "success",
                title: "Account has been deleted.",
              });
              setShowForm(false);
              setDetail([]);
            })
            .catch((error) => {
              if (error.response.status === 412) {
                SegmentErrorCom(error.response.data.message);
                auth.logout();
              } else if (error.response.status === 400) {
                SegmentErrorCom(error.response.data.message);
              } else {
                TimerAlert().Toast.fire({
                  icon: "error",
                  title: "Account has not been deleted.",
                });
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalButtons.fire("Cancelled", "Account is safe :)", "error");
        }
      });
  };

  useEffect(() => {
    if (!showForm) {
      setValidation([]);
      clearRecordsMenu();
    }

    fetchData();
  }, [detail, showForm]);

  return (
    <Card>
      <div className="my-5">
        <div className="flex items-center">
          <h1 className="mb-2 text-xl">
            Detail Account{" "}
            <span className="text-blue-400 text-base">#{id}</span>
          </h1>
          <span className="ml-auto">
            <Tooltip content="Delete Account" style={"light"} placement="left">
              <Button onClick={deleteAccount} gradientDuoTone="pinkToOrange">
                <FaTrashAlt />
              </Button>
            </Tooltip>
          </span>
        </div>
        <form onSubmit={editAccount}>
          <div className="mx-6 my-10 flex md:flex-row flex-col items-center">
            <div className="w-38 h-38">
              <picture className="rounded-full block overflow-hidden">
                <Avatar
                  className="mb-2 hover:scale-125 ease-in duration-150 object-cover"
                  style={{ width: "9rem", height: "9rem" }}
                  rounded={true}
                  size="xl"
                  img={
                    image !== "foto"
                      ? image
                      : `https://ui-avatars.com/api/?name=${name}`
                  }
                  alt="Default avatar"
                />
              </picture>
              <div className="flex items-center justify-center w-full my-1">
                <Label
                  htmlFor="dropzone-file"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                >
                  <span className="text-white font-semibold">Upload</span>

                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => imageChange(e.target.files)}
                  />
                </Label>
              </div>
            </div>
            <div className="mx-8 flex flex-col justify-center w-full md:-mt-12 md:h-36">
              <Label
                htmlFor="name"
                color={validation.name ? "failure" : undefined}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </Label>
              <TextInput
                id="name"
                type="text"
                color={validation.name ? "failure" : undefined}
                className="w-full"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  Object.keys(validation).length === 1 && validation.name
                    ? setValidation([])
                    : delete validation.name;
                }}
              />
              <div className="justify-left mt-2">
                {validation.name && AlertCom().Danger(validation.name[0])}
              </div>
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2 w-full">
            <div>
              <div className="mb-6">
                <Label
                  htmlFor="email"
                  color={validation.email ? "failure" : undefined}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </Label>
                <TextInput
                  id="email"
                  type="email"
                  color={validation.email ? "failure" : undefined}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    Object.keys(validation).length === 1 && validation.email
                      ? setValidation([])
                      : delete validation.email;
                  }}
                />
                {validation.email && AlertCom().Danger(validation.email[0])}
              </div>
              <div className="mb-6">
                <Label
                  htmlFor="phone"
                  color={validation.number_phone ? "failure" : undefined}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </Label>
                <TextInput
                  id="hp"
                  type="tel"
                  color={validation.number_phone ? "failure" : undefined}
                  placeholder="0862-1234-5678"
                  min={0}
                  pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                  value={hp}
                  onChange={(e) => {
                    setHp(e.target.value);
                    Object.keys(validation).length === 1 &&
                    validation.number_phone
                      ? setValidation([])
                      : delete validation.number_phone;
                  }}
                />
                {validation.number_phone &&
                  AlertCom().Danger(validation.number_phone[0])}
              </div>
              <div>
                <Label
                  htmlFor="dateOfBirth"
                  color={validation.date ? "failure" : undefined}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </Label>
                <FormDateCom
                  id="dateOfBirth"
                  color={validation.date ? "failure" : undefined}
                  value={date}
                  onChange={(e) => {
                    setDate(e);
                    setChanged(true);
                    Object.keys(validation).length === 1 && validation.date
                      ? setValidation([])
                      : delete validation.date;
                  }}
                />
                {validation.date && AlertCom().Danger(validation.date[0])}
              </div>
            </div>
            <div>
              <div className="mb-6">
                <Label
                  htmlFor="password"
                  color={validation.password ? "failure" : undefined}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </Label>
                <FormPasswordCom
                  id="password"
                  color={validation.password ? "failure" : undefined}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    Object.keys(validation).length === 1 && validation.password
                      ? setValidation([])
                      : delete validation.password;
                  }}
                />
                {validation.password &&
                  AlertCom().Danger(validation.password[0])}
              </div>
              <div className="mb-6">
                <Label
                  htmlFor="admin"
                  color={validation.admin ? "failure" : undefined}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Admin
                </Label>
                <Select
                  id="admin"
                  color={validation.admin ? "failure" : undefined}
                  value={admin}
                  onChange={(e) => {
                    setAdmin(e.target.value);
                    Object.keys(validation).length === 1 && validation.admin
                      ? setValidation([])
                      : delete validation.admin;
                  }}
                >
                  <option value={"Admin"}>Admin</option>
                  <option value={"Customer"}>Customer</option>
                </Select>
              </div>
              <div>
                <fieldset className="flex flex-col gap-4" id="radio">
                  <legend className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Gender
                  </legend>

                  <div className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2 ml-2">
                      <Radio
                        id="male"
                        name="gender"
                        value="L"
                        color={validation.gender ? "failure" : undefined}
                        onChange={(e) => {
                          setGender(e.target.value);
                          Object.keys(validation).length === 1 &&
                          validation.gender
                            ? setValidation([])
                            : delete validation.gender;
                        }}
                        checked={gender === "L"}
                      />
                      <Label
                        color={validation.gender ? "failure" : undefined}
                        htmlFor="male"
                      >
                        Male
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Radio
                        id="female"
                        name="gender"
                        value="P"
                        color={validation.gender ? "failure" : undefined}
                        onChange={(e) => {
                          setGender(e.target.value);
                          Object.keys(validation).length > 1
                            ? delete validation.gender
                            : setValidation([]);
                        }}
                        checked={gender === "P"}
                      />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          {showForm && (
            <Accordion alwaysOpen={true}>
              <Accordion.Panel></Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Address</Accordion.Title>
                <Accordion.Content>
                  <AddressCom
                    stringURL={`alamat-admin/${detail.id_user}`}
                    action={false}
                  />
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          )}
          <div className="flex items-center mt-16 w-full">
            <div
              className="my-3 text-blue-400 cursor-pointer"
              onClick={() =>
                navigate("/dashboard/order", {
                  state: {
                    name: name,
                  },
                })
              }
            >
              Show Order
            </div>
            <Button
              gradientDuoTone="cyanToBlue"
              className="w-36 ml-auto transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default DetailAccount;
