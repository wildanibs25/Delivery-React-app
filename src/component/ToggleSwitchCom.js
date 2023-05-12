import { ToggleSwitch } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useAuth } from "../service/auth";
import Axios from "../service/axios";
import SegmentErrorCom from "./SegmentErrorCom";

const ToggleSwitchCom = ({ record, fetchDataMenu }) => {
  const auth = useAuth();
  const [checked, setChecked] = useState(true);
  const cookies = new Cookies();

  const onUpdateStatus = async (record) => {
    const status =
      record.status_menu === "Available" ? "Not Available" : "Available";

    Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "ACCESS_TOKEN"
    )}`;

    const formData = new FormData();

    formData.append("status_menu", status);
    formData.append("name", record.nama_menu);
    formData.append("price", record.harga_menu);
    formData.append("category", record.kategori_menu);
    formData.append("description", record.deskripsi_menu);

    await Axios.post(`update-menu/${record.id_menu}`, formData)
      .then(() => {
        fetchDataMenu();
      })
      .catch((error) => {
        SegmentErrorCom(error.response.data.message);
        auth.logout();
      });
  };

  useEffect(() => {
    setChecked(record.status_menu === "Available" ? true : false);
  }, [record.status_menu]);

  return (
    <ToggleSwitch
      color={!checked ? "failure" : undefined}
      checked={checked}
      onClick={(e) => {
        onUpdateStatus(record);
        setChecked(!checked);
        e.target.blur();
      }}
    />
  );
};

export default ToggleSwitchCom;
