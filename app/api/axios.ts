import Axios from "axios";

const baseURL = "http://localhost:8000";
const axios = Axios.create({ baseURL });

export default axios;
