/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Axios from "../service/axios";
import { BarChartCom, DonutChartCom, FormatRupiah } from ".";

const StaticCom = ({ orderUpdate, setOrderUpdate }) => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const [date, setDate] = useState({
    today: 0,
    yesterday: 0,
    month: 0,
    lastMonth: 0,
    year: 0,
    lastYear: 0,
  });

  const cookies = new Cookies();

  const up = (
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
  );

  const down = (
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
  );

  const persentase = (next, last) => {
    let persen = ((next - last) / last) * 100;
    persen = persen === Infinity ? 100 : isNaN(persen) ? 0 : persen;
    return (
      <span
        className={`${
          persen > 0
            ? "text-green-500"
            : persen < 0
            ? "text-red-500"
            : "text-gray-500"
        } text-sm font-semibold ml-2`}
      >
        {`${persen > 0 ? "+" : ""}` + persen.toFixed(1)}%
      </span>
    );
  };

  const fetchData = async () => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    Axios.get("item-admin").then((response) => {
      setItems(response.data.data);
    });

    Axios.get("pesanan-admin").then((response) => {
      setDate((date) => ({
        ...date,
        today: response.data.static.today,
        yesterday: response.data.static.yesterday,
        month: response.data.static.month,
        lastMonth: response.data.static.lastMonth,
        year: response.data.static.year,
        lastYear: response.data.static.lastYear,
      }));
      setOrders(response.data.data);
    });
  };

  useEffect(() => {
    if (orderUpdate) {
      fetchData();
      setOrderUpdate(!orderUpdate);
    }
    fetchData();
  }, [orderUpdate]);

  return (
    <Fragment>
      <div className="flex flex-grow mb-10">
        <div className="flex flex-grow items-center justify-center mx-auto md:h-full text-gray-800 md:py-10 md:px-6 cursor-default">
          <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6 w-full max-w-6xl items-center justify-center mb-86">
            <div className="flex flex-grow items-center group [perspective:1000px] min-w-72">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="inset-0">
                  <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    {+date.today > +date.yesterday ? up : down}
                    <div className="flex-grow flex flex-col ml-4">
                      <span className="text-xl font-bold">
                        {FormatRupiah(date.today)}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Today</span>
                        {persentase(date.today, date.yesterday)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="inset-0">
                    <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                      {+date.today < +date.yesterday ? up : down}
                      <div className="flex-grow flex flex-col ml-4">
                        <span className="text-xl font-bold">
                          {FormatRupiah(date.yesterday)}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Yesterday</span>
                          {persentase(date.today, date.yesterday)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-grow items-center group [perspective:1000px] min-w-72">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="inset-0">
                  <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    {+date.month > +date.lastMonth ? up : down}
                    <div className="flex-grow flex flex-col ml-4">
                      <span className="text-xl font-bold">
                        {FormatRupiah(date.month)}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">This Month</span>
                        {persentase(date.month, date.lastMonth)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="inset-0">
                    <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                      {+date.month < +date.lastMonth ? up : down}
                      <div className="flex-grow flex flex-col ml-4">
                        <span className="text-xl font-bold">
                          {FormatRupiah(date.lastMonth)}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Last Month</span>
                          {persentase(date.month, date.lastMonth)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-grow items-center group [perspective:1000px] min-w-72">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="inset-0">
                  <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    {+date.year > +date.lastYear ? up : down}
                    <div className="flex-grow flex flex-col ml-4">
                      <span className="text-xl font-bold">
                        {FormatRupiah(date.year)}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">This Year</span>
                        <span className="text-green-500 text-sm font-semibold ml-2">
                          {persentase(date.year, date.lastYear)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="inset-0">
                    <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                      {+date.year < +date.lastYear ? up : down}
                      <div className="flex-grow flex flex-col ml-4">
                        <span className="text-xl font-bold">
                          {FormatRupiah(date.lastYear)}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Last Year</span>
                          <span className="text-green-500 text-sm font-semibold ml-2">
                            {persentase(date.year, date.lastYear)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-grow">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6 w-full max-w-6xl mb-86">
          <span className="mx-auto flex flex-grow">
            <BarChartCom orders={orders} />
          </span>
          <span className="mx-auto flex flex-grow">
            <DonutChartCom items={items} />
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default StaticCom;
