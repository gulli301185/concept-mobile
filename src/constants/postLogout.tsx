import { API } from "../api/api"
import axiosInstance from "../helpers/axios"


export const postLogoutAsync=async()=>{
    const {data}=await axiosInstance.post(API.logout)
    return data
}