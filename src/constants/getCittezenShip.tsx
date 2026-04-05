import { API } from "../api/api";
import axiosInstance from "../helpers/axios";

export const getCittezenShipAsync = async () => {
  const { data } = await axiosInstance.get(API.citizenShip);
  return data;
};
