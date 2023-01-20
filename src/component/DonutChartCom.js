import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DonutChartCom = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-donut",
    },
    labels: [],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: "24",
              color: "#2787AB",
            },
          },
        },
      },
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    setOptions({
      chart: {
        id: "basic-donut",
      },
      labels: ["A", "B", "C", "D", "E"],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true,
                fontSize: "24",
                color: "#2787AB",
              },
            },
          },
        },
      },
    });

    setSeries([44, 55, 41, 17, 15]);
  }, []);
  return <Chart options={options} series={series} type="donut" width="450" />;
};

export default DonutChartCom;
