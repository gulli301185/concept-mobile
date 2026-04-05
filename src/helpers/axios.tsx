import axios from "axios";
import { API } from "../api/api";

const axiosInstance = axios.create({
  baseURL: "https://beta.concept.kg/",
});

export const AUTH_REQUIRED_PATHS = [
  API.login,
  API.newPassword,
  API.docInfo,
  API.ticketsChart,
];

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("first_name");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
