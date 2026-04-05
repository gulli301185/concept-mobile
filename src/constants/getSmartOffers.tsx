import { API } from "../api/api";
import axiosInstance from "../helpers/axios";

export const getSmartOffers = async (buy_uid) => {
  const { data } = await axiosInstance.get(API.getSmartOffers, {
    params: { buy_uid },
  });
  return data;
};
