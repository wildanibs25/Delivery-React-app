/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Axios from "../service/axios";
import { BarChartCom, DonutChartCom } from "./App";

const StaticCom = () => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const cookies = new Cookies();

  const fetchData = async () => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    Axios.get("item-admin").then((response) => {
      // console.log(response.data.data);
      setItems(response.data.data);
    });

    Axios.get("pesanan-admin").then((response) => {
      // console.log(response.data.data);
      setOrders(response.data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="flex flex-grow mb-10">
        <div className="flex items-center justify-center md:h-full text-gray-800 md:py-10 md:px-6 cursor-default">
          <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6 w-full max-w-6xl mb-86">
            <div className="flex items-center group [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="inset-0">
                  <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                      <svg
                        className="w-6 h-6 fill-current text-green-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-grow flex flex-col ml-4">
                      <span className="text-xl font-bold">$8,430</span>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                          Revenue last 30 days
                        </span>
                        <span className="text-green-500 text-sm font-semibold ml-2">
                          +12.6%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]"></div>
              </div>
            </div>

            <div className="flex items-center group [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="inset-0">
                  <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-shrink-0 items-center justify-center bg-red-200 h-16 w-16 rounded">
                      <svg
                        className="w-6 h-6 fill-current text-red-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-grow flex flex-col ml-4">
                      <span className="text-xl font-bold">211</span>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                          Sales last 30 days
                        </span>
                        <span className="text-red-500 text-sm font-semibold ml-2">
                          -8.1%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]"></div>
              </div>
            </div>

            <div className="flex items-center group [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="inset-0">
                  <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                      <svg
                        className="w-6 h-6 fill-current text-green-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-grow flex flex-col ml-4">
                      <span className="text-xl font-bold">140</span>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                          Customers last 30 days
                        </span>
                        <span className="text-green-500 text-sm font-semibold ml-2">
                          +28.4%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-grow">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full max-w-6xl mb-86">
          <span className="mx-auto">
            <BarChartCom orders={orders} />
          </span>
          <span className="mx-auto">
            <DonutChartCom items={items} />
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default StaticCom;
