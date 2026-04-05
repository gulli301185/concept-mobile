import { API } from "../api/api"
import axiosInstance from "../helpers/axios"



export const getDocInfoUserAsync=async()=>{
    const {data}=await axiosInstance.get(API.docInfoUser)
    return data
}