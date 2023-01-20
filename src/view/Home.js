/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Axios from "../service/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth } from "../service/auth";
import { Card } from "flowbite-react";
import Swal from "sweetalert2";
import {
  BreadcrumbCom,
  ButtonToTop,
  CardCom,
  CarouselCom,
  Cart,
  FooterCom,
  NavbarCom,
  SegmentErrorCom,
} from "../component/App";
import SkeletonCom from "../component/SkeletonCom";

const Home = () => {
  const auth = useAuth();
  const [menuData, setMenuData] = useState([]);
  const [countItem, setCountItem] = useState(0);
  const [countPrice, setCountPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const cookies = new Cookies();

  const navigate = useNavigate();

  const fetchDataMenu = async () => {
    setIsLoading(true);
    await Axios.get("menu")
      .then((response) => {
        setMenuData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(true);
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
      });
  };

  const selectItem = async (menu) => {
    setCountItem(countItem + 1);
    setCountPrice(countPrice + menu.harga_menu);
    const formData = new FormData();
    formData.append("id_menu_item", menu.id_menu);
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;
    await Axios.post("add-item", formData).catch((error) => {
      SegmentErrorCom(error.response.data.message);
      auth.logout();
      navigate("/login");
    });
  };

  const counterItem = async () => {
    if (cookies.get("ACCESS_TOKEN")) {
      Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
        "ACCESS_TOKEN"
      )}`;
      await Axios.get("item").then((response) => {
        const totalQty = response.data.data.reduce(
          (sebelum, sekarang) => sebelum + sekarang.qty,
          0
        );
        const totalPrice = response.data.data.reduce(
          (sebelum, sekarang) =>
            sebelum + sekarang.menu.harga_menu * sekarang.qty,
          0
        );
        setCountItem(totalQty);
        setCountPrice(totalPrice);
      });
    }
  };

  useEffect(() => {
    if (auth.user) {
      cookies.remove("lastPath", { path: "/" });
    }
    fetchDataMenu();
    counterItem();
  }, []);

  return (
    <Card className="px-0">
      <NavbarCom />
      <CarouselCom />
      <BreadcrumbCom />
      {isLoading ? (
        <SkeletonCom />
      ) : (
        <CardCom menu={menuData} selectItem={selectItem} />
      )}
      <Cart
        countItem={countItem}
        setCountItem={setCountItem}
        countPrice={countPrice}
        setCountPrice={setCountPrice}
      />
      <FooterCom />
      <ButtonToTop />
    </Card>
  );
};

export default Home;
