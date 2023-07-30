/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../service/auth";
import Axios from "../service/axios";
import { SegmentErrorCom, TimerAlert } from "../component";

const Verification = () => {
  const auth = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const verified = async () => {
    const formData = new FormData();
    formData.append("code", params.code);
    Axios.defaults.headers.common["Authorization"] = `Bearer ${params.token}`;

    await Axios.post("verification", formData)
      .then((response) => {
        TimerAlert().Modal.fire({
          icon: "success",
          title: response.data.message,
          html: "<br />",
        });
        auth.getMe();
        navigate("/");
      })
      .catch((error) => {
        SegmentErrorCom(error.response.data.message);
        auth.logout();
      });
  };

  useEffect(() => {
    verified();
  }, [auth.user]);
};

export default Verification;
