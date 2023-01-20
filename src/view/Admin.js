/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ConfirmLogout, FooterCom } from "../component/App";
import logoAyam from "../storage/logoAyam.png";
import {
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiClipboardList,
} from "react-icons/hi";
import { BsFillGearFill, BsBoxArrowLeft } from "react-icons/bs";
import {
  FaChevronCircleDown,
  FaChevronCircleUp,
  FaPowerOff,
} from "react-icons/fa";
import control from "../storage/control.png";
import { Avatar, Card } from "flowbite-react";
import { useAuth } from "../service/auth";
import Nama from "../storage/nama";

const Admin = () => {
  const auth = useAuth();
  const nama = Nama();
  const [open, setOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");
  const isMobile = window.matchMedia("only screen and (max-width: 830px)");

  const location = useLocation();

  let activeClassName =
    "flex rounded-l-lg p-2 cursor-pointer dark:text-white bg-sky-50 text-sky-500 dark:bg-sky-500 text-white text-base items-center gap-x-4 mt-2";
  let noActiveClassName =
    "flex rounded-l-lg p-2 cursor-pointer dark:text-white hover:bg-sky-50 hover:text-sky-500 dark:hover:bg-sky-500 text-white text-base items-center gap-x-4 mt-2";

  useEffect(() => {
    if (isMobile.matches) {
      setOpen(false);
    }
    setIsActive(
      location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
    );
  }, [isMobile.matches, location.pathname]);

  return (
    <div className="flex">
      <div
        className={` ${
          open
            ? "w-72 bg-gradient-to-r from-cyan-500 to-blue-500"
            : "w-20 bg-gradient-to-r from-blue-500 to-cyan-500"
        } z-40 h-screen sticky top-0 left-0 p-4 pt-8 duration-100 md:duration-300 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 justify-between`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-sky-500
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => {
            setOpen(!open);
            setOpenSubMenu(false);
          }}
        />
        <NavLink onClick={() => setIsActive("dashboard")} to={"/dashboard"}>
          <div className="flex gap-x-4 items-center">
            <img
              src={logoAyam}
              className={`cursor-pointer duration-500 h-10 w-10 sm:h-10 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`origin-left font-medium text-xl duration-100 md:duration-200 ${
                !open && "scale-0"
              }`}
            >
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white dark:text-white">
                {nama}
              </span>
            </h1>
          </div>
        </NavLink>
        <ul className="pt-6">
          <li>
            <NavLink
              to="/dashboard"
              className={
                isActive === "dashboard" ? activeClassName : noActiveClassName
              }
            >
              <HiChartPie className="w-7 h-7 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-500" />
              <span className={`${!open && "hidden"} origin-left`}>
                Dashboard
              </span>
            </NavLink>
          </li>
        </ul>
        <ul className="pt-6 mt-4 border-t border-sky-50 dark:border-sky-500">
          <li>
            <NavLink
              to="menu"
              className={
                isActive === "menu" ? activeClassName : noActiveClassName
              }
            >
              <HiShoppingBag className="w-7 h-7 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-500" />
              <span className={`${!open && "hidden"} origin-left`}>Menu</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="order"
              className={
                isActive === "order" ? activeClassName : noActiveClassName
              }
            >
              <HiClipboardList className="w-7 h-7 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-500" />
              <span className={`${!open && "hidden"} origin-left`}>Order</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="accounts"
              className={
                isActive === "accounts" ? activeClassName : noActiveClassName
              }
            >
              <HiUser className="w-7 h-7 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-500" />
              <span className={`${!open && "hidden"} origin-left`}>
                Accounts
              </span>
            </NavLink>
          </li>
        </ul>
        <div>
          <ul className="mt-6 pt-4 space-y-2 border-t border-sky-50 dark:border-sky-500">
            <li>
              <div
                onClick={() => {
                  setOpenSubMenu(!openSubMenu);
                  setOpen(true);
                }}
                className={`${
                  open ? "p-2 bg-sky-50" : ""
                } flex rounded-l-lg cursor-pointer dark:text-sky-500 text-sky-500 text-base items-center gap-x-4 mt-2`}
              >
                <Avatar
                  className="h-10 w-10 sm:h-10"
                  img={
                    auth.user.foto !== "foto"
                      ? auth.user.foto
                      : `https://ui-avatars.com/api/?name=${auth.user.nama}`
                  }
                  rounded={true}
                />
                <span className={`${!open && "hidden"} origin-left flex`}>
                  {auth.user.nama}
                  <span className="my-1 ml-7">
                    {openSubMenu ? (
                      <FaChevronCircleDown />
                    ) : (
                      <FaChevronCircleUp />
                    )}
                  </span>
                </span>
              </div>
            </li>
            {open && openSubMenu && (
              <ul>
                <li>
                  <NavLink
                    to={"/settings"}
                    state={{ path: "Dashboard" }}
                    className={`flex hover:rounded-l-lg p-2 cursor-pointer dark:text-white hover:bg-sky-50 hover:text-sky-500 dark:hover:bg-sky-500 text-white text-base items-center gap-x-4 mt-2`}
                  >
                    <BsFillGearFill />
                    Settings
                  </NavLink>
                </li>
                <li
                  className={`flex hover:rounded-l-lg p-2 cursor-pointer dark:text-white hover:bg-sky-50 hover:text-sky-500 dark:hover:bg-sky-500 text-white text-base items-center gap-x-4`}
                  onClick={() => ConfirmLogout(auth)}
                >
                  <FaPowerOff />
                  Sign Out
                </li>
              </ul>
            )}

            <li>
              <NavLink
                to="/"
                className={`flex rounded-l-lg p-2 cursor-pointer dark:text-white hover:bg-sky-50 hover:text-sky-500 dark:hover:bg-sky-500 text-white text-base items-center gap-x-4 mt-2`}
              >
                <BsBoxArrowLeft className="w-6 h-6 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-500" />
                <span className={`${!open && "hidden"} origin-left`}>
                  View Website
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`flex-1 p-7 justify-between md:overflow-hidden duration-1000
         ${isMobile.matches && open && "hidden"}`}
      >
        <Card>
          <Outlet />
          <FooterCom />
        </Card>
      </div>
    </div>
  );
};

export default Admin;
