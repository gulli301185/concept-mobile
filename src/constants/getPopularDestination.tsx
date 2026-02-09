import { API } from "../api/api";
import axiosInstance from "../helpers/axios";




export const getPopularDestination = async () => {
  const { data } = await axiosInstance.get(API.popularDestination);
  return data;
};
