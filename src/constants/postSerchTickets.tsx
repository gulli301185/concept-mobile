import { API } from "../api/api"
import axiosInstance from "../helpers/axios"

export const postSearchTickets=async(body)=>{
    const {data}=await axiosInstance.post(API.serchTickets,body)
    return data
}