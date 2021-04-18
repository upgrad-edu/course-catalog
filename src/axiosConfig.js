import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

axiosInstance.defaults.headers.common["Content-Type"] =
  "application/json;charset=UTF-8";
axiosInstance.defaults.headers.common["cache-control"] = "no-cache";

export default axiosInstance;
