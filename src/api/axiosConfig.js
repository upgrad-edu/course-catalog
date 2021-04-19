import axios from "axios";

import * as constantsApi from "./utils-api/constantsApi";

const axiosInstance = axios.create({
  baseURL: constantsApi.BASE_URL,
});

// default headers for all Axios requests
axiosInstance.defaults.headers.common[
  constantsApi.REQUEST_HEADER_KEY.CONTENT_TYPE
] = `${constantsApi.REQUEST_HEADER_VALUE.APPLICATION_JSON};${constantsApi.REQUEST_HEADER_VALUE.CHARSET_UTF8}`;
axiosInstance.defaults.headers.common[
  constantsApi.REQUEST_HEADER_KEY.CACHE_CONTROL
] = constantsApi.REQUEST_HEADER_VALUE.NO_CACHE;

export default axiosInstance;
