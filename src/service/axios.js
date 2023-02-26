import axios from "axios";
import baseURL from "./baseURL";

const url = baseURL()
// Set config defaults when creating the instance
const Axios = axios.create({
  baseURL: `${url}/api/`,
});

// Axios.defaults.timeout = 1000;


export default Axios;
