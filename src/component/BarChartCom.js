/* eslint-disable react-hooks/exhaustive-deps */
import { getMonth, getYear } from "date-fns";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { FormatRupiah } from "./FormatRupiahCom";

const BarChartCom = ({ orders }) => {
  const [options, setOptions] = useState({});

  const [series, setSeries] = useState([]);

  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const formatDigit = (val) => {
    if (val !== 0) {
      val = parseInt(val.toString().slice(0, -3));
    }
    return FormatRupiah(val);
  };

  useEffect(() => {
    const dataSeries = [];

    months.forEach((month) => {
      let perMonth = 0;
      orders.forEach((order) => {
        if (
          order.status_pesanan === "Finished" &&
          month === getMonth(new Date(order.created_at)) &&
          getYear(new Date(order.created_at)) === getYear(new Date())
        ) {
          perMonth = +perMonth + +order.total_harga;
        }
      });

      dataSeries.push(perMonth);
    });

    setOptions({
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return formatDigit(val) + "k";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: function (val) {
              return FormatRupiah(val);
            },
          },
        },
      },
      yaxis: {
        title: {
          text: "Rp. (thousand)",
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return FormatRupiah(val);
          },
        },
      },
    });

    setSeries([
      {
        name: ["Income"],
        data: dataSeries,
      },
    ]);
  }, [orders]);

  return <Chart options={options} series={series} type="bar" width="170%" />;
};

export default BarChartCom;
