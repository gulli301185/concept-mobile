import { API } from "../api/api"
import axiosInstance from "../helpers/axios"


export const getTicketsCharts=async()=>{
    const {data}=await axiosInstance.get(API.ticketsChart)
    return data
}