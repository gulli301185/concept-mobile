import { API } from "../api/api"
import axiosInstance from "../helpers/axios"


export const getPersonalInfoAsync=async()=>{
    const {data}=await axiosInstance.get(API.personalInfo)
    return data
}