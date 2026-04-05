import { API } from "../api/api";
import axiosInstance from "../helpers/axios";

export const confirmCodeAsync = async (body) => {
  const { data } = await axiosInstance.post(API.confirmCode, body);
  return data;
};
