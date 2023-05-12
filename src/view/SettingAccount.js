/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  Avatar,
  Button,
  Card,
  Label,
  Radio,
  TextInput,
} from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import {
  AddressCom,
  AlertCom,
  BreadcrumbCom,
  FormDateCom,
  FormPasswordCom,
  SegmentErrorCom,
  TimerAlert,
} from "../component";
import { useAuth } from "../service/auth";
import Axios from "../service/axios";
import baseURL from "../service/baseURL";

const SettingAccount = () => {
  const auth = useAuth();
  const url = baseURL();
  const [image, setImage] = useState("");
  const [sendImage, setSendImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [date, setDate] = useState("");
  const [changed, setChanged] = useState(false);
  const [gender, setGender] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [validation, setValidation] = useState([]);

  const cookies = new Cookies();
  const location = useLocation();

  const fetchDataUser = () => {
    setImage(url+auth.user.foto);
    setName(auth.user.nama);
    setEmail(auth.user.email);
    setHp(auth.user.no_hp);
    setDate(auth.user.tgl_lahir);
    setGender(auth.user.jk);
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

    if (newPassword !== "") {
      formData.append("new_password", newPassword);
      formData.append("new_password_confirmation", newPasswordConfirm);
      formData.append("old_password", oldPassword);
    }

    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.post("update-user", formData)
      .then(() => {
        TimerAlert().Modal.fire({
          icon: "success",
          title: "Data Updated!",
          html: "<br />",
        });
        auth.getMe();
        setNewPassword("");
        setNewPasswordConfirm("");
        setOldPassword("");
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

  const imageChange = (file) => {
    setImage(URL.createObjectURL(file[0]));
    setSendImage(file[0]);
  };

  const onDelete = async () => {
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
          await Axios.post(`delete-user`)
            .then(() => {
              TimerAlert().Toast.fire({
                icon: "success",
                title: "Your Account has been deleted.",
              });
              auth.logout();
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
                  title: "Your Account has not been deleted.",
                });
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalButtons.fire("Cancelled", "Account is safe :)", "error");
        }
      });
  };

  useEffect(() => {
    if (auth.user) {
      cookies.set("lastPath", location.pathname, {
        path: "/",
      });
    }
    fetchDataUser();
  }, []);

  return (
    <Fragment>
      <BreadcrumbCom name={"Settings Account"} />
      <form onSubmit={editAccount}>
        <Card className="mb-6">
          <div className="mx-6 mb-2 flex md:flex-row flex-col items-center">
            <div className="w-38 h-38">
              <picture className="rounded-lg block overflow-hidden">
                <Avatar
                  className="mb-2 hover:scale-125 ease-in duration-150 object-cover"
                  style={{ width: "9rem", height: "9rem" }}
                  size="xl"
                  img={
                    image !== url + "foto"
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
                placeholder="Your Name"
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
        </Card>
        <Card>
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
                  htmlFor="newPassword"
                  color={validation.new_password ? "failure" : undefined}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </Label>
                <FormPasswordCom
                  id="newPassword"
                  color={validation.new_password ? "failure" : undefined}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    Object.keys(validation).length === 1 &&
                    validation.new_password
                      ? setValidation([])
                      : delete validation.new_password;
                    (newPassword.length < 6 || newPasswordConfirm.length < 6) &&
                      delete validation.old_password;
                  }}
                />
                {validation.new_password &&
                  AlertCom().Danger(validation.new_password[0])}
              </div>
              <div className="mb-6">
                <Label
                  htmlFor="newPasswordConfirmation"
                  color={validation.new_password ? "failure" : undefined}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password Confirmation
                </Label>
                <FormPasswordCom
                  id="newPasswordConfirmation"
                  color={validation.new_password ? "failure" : undefined}
                  value={newPasswordConfirm}
                  onChange={(e) => {
                    setNewPasswordConfirm(e.target.value);
                    Object.keys(validation).length === 1 &&
                    validation.new_password
                      ? setValidation([])
                      : delete validation.new_password;
                    (newPassword.length < 6 || newPasswordConfirm.length < 6) &&
                      delete validation.old_password;
                  }}
                  disabled={newPassword.length < 6}
                />
              </div>
              <div>
                <Label
                  htmlFor="oldPassword"
                  color={validation.old_password ? "failure" : undefined}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Old Password
                </Label>
                <FormPasswordCom
                  id="oldPassword"
                  color={validation.old_password ? "failure" : undefined}
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                    Object.keys(validation).length === 1 &&
                    validation.old_password
                      ? setValidation([])
                      : delete validation.old_password;
                  }}
                  disabled={
                    newPassword.length < 6 || newPasswordConfirm.length < 6
                  }
                />
                {validation.old_password &&
                  AlertCom().Danger(validation.old_password[0])}
              </div>
            </div>
            <div>
              <fieldset className="flex flex-col gap-4" id="radio">
                <legend className="block text-sm font-medium text-gray-900 dark:text-white">
                  Choose your Gender
                </legend>

                <div className="flex gap-4 pt-2">
                  <div className="flex items-center gap-2 ml-2">
                    <Radio
                      id="male"
                      name="gender"
                      color={validation.gender ? "failure" : undefined}
                      value="L"
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
                      color={validation.gender ? "failure" : undefined}
                      value="P"
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
          <Accordion alwaysOpen={true}>
            <Accordion.Panel></Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>Address</Accordion.Title>
              <Accordion.Content>
                <AddressCom stringURL={"alamat"} />
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>

          <div className="md:order-2 my-6">
            <Button
              gradientDuoTone="cyanToBlue"
              className="w-36 mr-auto float-right transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300"
              type="submit"
            >
              Submit
            </Button>
            <Button
              gradientDuoTone="pinkToOrange"
              className="w-36 mr-4 float-right transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300"
              type="button"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </Card>
      </form>
    </Fragment>
  );
};

export default SettingAccount;
