import axios from "axios";

const BASE_URI = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: BASE_URI,
  withCredentials: true
});

export default axiosInstance;
