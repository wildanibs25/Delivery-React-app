/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DonutChartCom = ({ items }) => {
  const [options, setOptions] = useState({});

  const [series, setSeries] = useState([]);

  useEffect(() => {
    const labels = [];
    const data = [];

    items.forEach((item) => {
      labels.push(item.menu.nama_menu);
      data.push(+item.qty);
    });

    setOptions({
      chart: {
        id: "basic-donut",
      },
      labels: labels,
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true,
                fontSize: "18",
                color: "#2787AB",
              },
            },
          },
        },
      },
    });

    setSeries(data);
  }, [items]);

  return <Chart options={options} series={series} type="donut" width="450" />;
};

export default DonutChartCom;
