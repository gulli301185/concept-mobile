import axiosInstance from "../helpers/axios";
import { API } from "../api/api";

export const postForgetPasswordAsync = async (body) => {
  const { data } = await axiosInstance.post(API.forgetPassword, body);
  return data;
};
