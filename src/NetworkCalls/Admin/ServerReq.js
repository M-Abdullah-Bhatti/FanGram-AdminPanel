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


export const PostData = async(endpoint, body)=>{

   try{
    const {data} = await axiosInstance.post(endpoint, body)
    return data?.data
  }
  catch(error)
  {
    return error.response.data.message
  }

}







