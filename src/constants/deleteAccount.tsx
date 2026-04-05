import { API } from "../api/api"
import axiosInstance from "../helpers/axios"


export const deleteAccountAsync=async()=>{
    const {data}=await axiosInstance.delete(API.deleteAccount)
    return data
}