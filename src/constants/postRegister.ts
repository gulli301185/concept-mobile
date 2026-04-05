import { API } from "../api/api";
import axiosInstance from "../helpers/axios";

export const postRegisterAsync = async (body) => {
  const { data } = await axiosInstance.post(API.register, body);
  return data;
};
