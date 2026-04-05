import { API } from "../api/api";
import axiosInstance from "../helpers/axios";

export const loginGoogleAsync = async (id_token) => {
  const { data } = await axiosInstance.post(API.loginGoogle, { id_token });
  return data;
};