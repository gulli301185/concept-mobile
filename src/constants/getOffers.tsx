import { API } from "../api/api";
import axiosInstance from "../helpers/axios";

interface OffersPayload {
  request_id: string;
}

export const getOffers = async (body: OffersPayload) => {
  const { data } = await axiosInstance.post(API.getOffers, body);
  return data;
};
