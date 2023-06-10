import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../service/auth";
import baseURL from "../service/baseURL";
import logoAyam from "../storage/logoAyam.png";
import Nama from "../storage/nama";
import ConfirmLogout from "./ConfirmLogoutCom";

const NavbarCom = () => {
  const auth = useAuth();
  const nama = Nama();
  const url = baseURL();

  const logout = () => {
    ConfirmLogout(auth);
  };

  return (
    <Navbar className="z-10 bg-transparent" fluid={true} rounded={true}>
      <NavLink to={"/"}>
        <Navbar className="container flex flex-wrap items-center justify-between mx-auto bg-transparent">
          <img src={logoAyam} className="mr-3 h-6 sm:h-9" alt={nama} />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {nama}
          </span>
        </Navbar>
      </NavLink>
      {auth.user ? (
        <div className="flex md:order-2">
          <Dropdown
            className="mr-2 w-1/6"
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                img={
                  auth.user.foto !== "foto"
                    ? url + auth.user.foto
                    : `https://ui-avatars.com/api/?name=${auth.user.nama}`
                }
                alt="User settings"
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{auth.user.nama}</span>
              <span className="block truncate text-sm font-medium">
                {auth.user.email}
              </span>
            </Dropdown.Header>
            {auth.user.is_admin ? (
              <Link to={"/dashboard"}>
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
            ) : undefined}
            <Link to={"/history"}>
              <Dropdown.Item>History</Dropdown.Item>
            </Link>
            <Link to={"/settings"}>
              <Dropdown.Item>Settings</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      ) : (
        <Fragment>
          {/* <Navbar.Toggle /> */}
          <div className="md:hidden">
            <Dropdown
              label={
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              arrowIcon={false}
              inline={true}
            >
              <NavLink to="/login">
                <Dropdown.Item>Login </Dropdown.Item>
              </NavLink>
              <NavLink to="/register">
                <Dropdown.Item>Register</Dropdown.Item>
              </NavLink>
            </Dropdown>
          </div>

          <Navbar.Collapse className="md:order-2 mr-4">
            <NavLink to="/login">
              <Navbar
                className={
                  "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                }
              >
                Login
              </Navbar>
            </NavLink>
            <NavLink to="/register">
              <Navbar
                className={
                  "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                }
              >
                Register
              </Navbar>
            </NavLink>
          </Navbar.Collapse>
        </Fragment>
      )}
    </Navbar>
  );
};

export default NavbarCom;
