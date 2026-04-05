import { API } from "../api/api"
import axiosInstance from "../helpers/axios"


export const postLoginAsync=async(body)=>{
    const {data}=await axiosInstance.post(API.login,body)
    return data
}