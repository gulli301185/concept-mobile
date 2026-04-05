import { API } from "../api/api";
import axiosInstance from "../helpers/axios";

export const postNewPasswordAsync = async (body) => {
  const { data } = await axiosInstance.post(API.newPassword, body);
  return data;
};
