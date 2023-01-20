/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import {
  AlertCom,
  FormatRupiah,
  SegmentErrorCom,
  TimerAlert,
  AddressCom,
  BreadcrumbCom,
} from "../component/App";
import { useAuth } from "../service/auth";
import Axios from "../service/axios";
import logoAyam from "../storage/logoAyam.png";
import Nama from "../storage/nama";

const Checkout = () => {
  const auth = useAuth();
  const { nama, no_hp } = auth.user;
  const [address, setAddress] = useState([]);
  const [selectPlace, setSelectPlace] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [id, setId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [validation, setValidation] = useState([]);
  const [showForm, setSetShowForm] = useState(false);
  const deliveryFee = 5000;

  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();


  const fetchDataAddress = async () => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;
    await Axios.get("alamat").then((response) => {
      setAddress(response.data.data);
    });
  };

  const onSelectAddress = (valAddress) => {
    if (valAddress === "+ Add Address") {
      setSetShowForm(true);
    } else {
      setSetShowForm(false);
      const data = address.find((x) => x.id_alamat === +valAddress);
      if (data) {
        setSelectAddress(data.alamat_lengkap);
        setId(data.id_alamat);
      } else {
        setSelectAddress("");
        setId("");
      }
    }
  };

  const onCheckout = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id_alamat_pesanan", id);
    formData.append("total_harga", totalPrice + deliveryFee);

    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    await Axios.post("add-pesanan", formData)
      .then((response) => {
        Swal.fire({
          title: "Thank You!",
          text: "Thank you so much for your order :)",
          icon: "success",
          customClass: {
            confirmButton:
              "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
          },
          buttonsStyling: false,
        });
        setTotalPrice(0);
        navigate("/invoice=" + response.data.data.nota, { replace: true });
      })
      .catch((error) => {
        if (error.response.status === 412) {
          SegmentErrorCom(error.response.data.message);
          auth.logout();
        } else {
          const message = error.response.status === 421 ? error.response.data.error : "Order Unsuccessfully!" ;
          TimerAlert().Toast.fire({
            icon: "error",
            title: message,
          });
          setValidation(error.response.data.error);
        }
      });
  };

  useEffect(() => {
    if (auth.user) {
      cookies.set("lastPath", location.pathname, {
        path: "/",
      });
    }
    
    fetchDataAddress();
    setTotalPrice(location.state?.totalPrice);
    window.scrollTo({
      top: 100,
    });
  }, []);

  return (
    <Fragment>
      <BreadcrumbCom name={"Checkout"}/>
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <NavLink
          to="/"
          className="flex items-center mb-16 text-2xl font-semibold text-gray-900 dark:text-white justify-center"
        >
          <img className="w-20 h-20 mr-2" src={logoAyam} alt={"Flowbite"} />
          {Nama()}
        </NavLink>
        <Card className="md:mx-36 md:mb-36">
          <h1 className="text-2xl mb-5">Checkout Your Order</h1>
          <form onSubmit={onCheckout} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Your Name"
                value={nama}
                readOnly
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="number_phone" value="Your Number Phone" />
              </div>
              <TextInput
                id="number_phone"
                type="tel"
                placeholder="0862-1234-5678"
                min={0}
                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                value={no_hp}
                readOnly
              />
            </div>
            <div id="place">
              <div className="mb-2 block">
                <Label
                  htmlFor="countries"
                  color={validation.id_alamat_pesanan ? "failure" : undefined}
                  value="Select Place"
                />
              </div>
              <Select
                id="countries"
                color={validation.id_alamat_pesanan ? "failure" : undefined}
                value={selectPlace}
                onChange={(e) => {
                  setSelectPlace(e.target.value);
                  onSelectAddress(e.target.value);
                  setValidation([]);
                }}
              >
                <option value={""}>Select your Place</option>
                {address.map((adrs) => {
                  return (
                    <option
                      value={adrs.id_alamat}
                      key={adrs.id_alamat + adrs.sebagai}
                    >
                      {adrs.sebagai}
                    </option>
                  );
                })}
                <option value={"+ Add Address"}> + Add Address</option>
              </Select>
              {validation.id_alamat_pesanan &&
                AlertCom().Danger(validation.id_alamat_pesanan[0])}
            </div>

            <div>
              {showForm ? (
                <div>
                  <AddressCom
                    fetchDataAddress={fetchDataAddress}
                  />
                </div>
              ) : (
                <div id="address">
                  <div className="mb-2 block">
                    <Label htmlFor="address" value="Your Address" />
                  </div>
                  <Textarea
                    id="address"
                    placeholder="Your Address..."
                    value={selectAddress}
                    rows={4}
                    readOnly
                  />
                  <Label
                    htmlFor="address"
                    value="NB : Hanya melayani jarak hingga 7 km"
                  />
                </div>
              )}
            </div>

            <Card className="mt-5">
              <div className="flex">
                <h1>Sub Total</h1>
                <h1 className="ml-auto">{FormatRupiah(totalPrice)}</h1>
              </div>
              <div className="flex">
                <h1>Delivery Cost</h1>
                <h1 className="ml-auto">{FormatRupiah(deliveryFee)}</h1>
              </div>
              <div className="flex pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <h1>Total</h1>
                <h1 className="ml-auto">
                  {FormatRupiah(totalPrice + deliveryFee)}
                </h1>
              </div>
            </Card>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mr-auto ml-2 -mt-2 mb-10 text-blue-400"
            >
              <div className="relative inline-flex items-center justify-start py-2 pl-5 pr-16 overflow-hidden font-semibold text-sky-500 transition-all duration-150 ease-in-out rounded hover:pl-12 hover:pr-10 bg-white group">
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-sky-500 group-hover:h-full"></span>

                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                  <svg
                    className="w-5 h-5 text-sky-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>

                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>

                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                  Add
                </span>
              </div>
            </button>
            <Button type="submit" gradientDuoTone="cyanToBlue">
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};

export default Checkout;
