import axios from "axios";

// Set config defaults when creating the instance
const Axios = axios.create({
  baseURL: "http://192.168.43.222:8000/api/",
});

// Axios.defaults.timeout = 1000;


export default Axios;
