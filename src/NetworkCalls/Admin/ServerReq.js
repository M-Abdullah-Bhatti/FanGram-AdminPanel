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








export const getAdmins=async()=>{
 try{
   const response=await axiosInstance.get("admin/getAdmin")
   return response.data
 }
 catch(error)
 {
    return error.response.data.message
 }
}
export const updateAdmin=async(id,data)=>{
  try{
    const response=await axiosInstance.put(`admin/editAdmin?adminId=${id}`,data)
    return response
  }
  catch(error)
  {
    return error.response.data.message
  }
}
export const deleteAdmin=async(id)=>{
  try{
    const response=await axiosInstance.delete(`admin/deleteAdmin?adminId=${id}`)
    return response
  }
  catch(error)
  {
    return error.response.data.message
  }
}
export const createAdmin=async(data)=>{
  try{
    const response=await axiosInstance.post(`admin/addAdmin`,data)
    return response
  }
  catch(error)
  {
    return error.response.data.message
  }
}