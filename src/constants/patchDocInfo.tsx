import { API } from "../api/api";
import axiosInstance from "../helpers/axios";

export interface PutDocInfoBody {
  citizenship: string;
  documentType: string | number;
  firstName: string;
  lastName: string;
  birthDate: string | null;
  gender: string;
  documentNumber: string;
  expiryDate: string | null;
}

export const patchDocInfoAsync = async (body: PutDocInfoBody) => {
  const { data } = await axiosInstance.patch(API.docInfo, body);
  return data;
};