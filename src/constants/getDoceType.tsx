import { API } from "../api/api";
import axiosInstance from "../helpers/axios";

export const getDocTypeAsync = async (pid) => {
  const { data } = await axiosInstance.get(API.docType, {
    params: { pid },
  });
  return data;
};
