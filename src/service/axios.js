import axios from "axios";
import baseURL from "./baseURL";

const url = baseURL()

const Axios = axios.create({
  baseURL: `${url}/api/`,
});

export default Axios;
