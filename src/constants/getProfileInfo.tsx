import { API } from "../api/api"
import axiosInstance from "../helpers/axios"


export const getProfileInfoAsync=async()=>{
    const {data}=await axiosInstance.get(API.profileInfo)
    return data
}