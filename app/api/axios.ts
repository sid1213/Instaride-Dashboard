import Axios from "axios";

const baseURL = "http://localhost:8000";
const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};
const axios = Axios.create({
  baseURL,
  ...config,
});

export default axios;
