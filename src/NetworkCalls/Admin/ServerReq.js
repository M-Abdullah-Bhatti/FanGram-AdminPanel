import { axiosInstance } from "../../axios"


export const LoginUser=async(user)=>{
  try{
    const {data} = await axiosInstance.post(`api/user/login`,user)
    return data
  }
  catch(error)
  {
    return error.response.data.message
  }
}


export const GetAllData=async(endpoint)=>{
  try{
    const {data} = await axiosInstance.get(endpoint)
    return data?.data
  }
  catch(error)
  {
    return error.response.data.message
  }
}


export const GetSingleData=async(endpoint)=>{
  try{
    const {data} = await axiosInstance.get(endpoint)
    return data?.data
  }
  catch(error)
  {
    return error.response.data.message
  }
}


export const DeleteSingleData=async(endpoint)=>{
  try{
    const {data} = await axiosInstance.delete(endpoint)
    return data?.data
  }
  catch(error)
  {
    return error.response.data.message
  }
}




export const PostData = async(endpoint, body)=>{

   try{
    const {data} = await axiosInstance.post(endpoint, body)
    return data
  }
  catch(error)
  {
    return error.response.data.message
  }

}


export const EditData = async(endpoint, body)=>{

   try{
    const {data} = await axiosInstance.put(endpoint, body)
    return data
  }
  catch(error)
  {
    return error.response.data.message
  }

}








