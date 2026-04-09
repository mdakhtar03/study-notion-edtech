import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import {COURSE_API} from "../apis"
export const fetchCourseCategories = async ()=>{
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_API.COURSE_CATEGORIES_API)
        // console.log("COURSE_CATEGORIES_API RESPONSE.........", response)
        if(!response?.data?.success){
            throw new Error("Could not fetch COURSE_CATEGORIES");   
        }
        result = response?.data
        // toast.success(response?.data?.message)
    } catch (error) {
        // console.log("COURSE_CATEGORIES_API Error.....",error)
        toast.error(error.message)
    }
    return result
}

export const addCourseDetails = async (data,token)=>{
    let result = null;
     const toastId =  toast.loading("Loading...")
    try {
        const response = await apiConnector("POST",COURSE_API.CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE.........",response)
        if(!response?.data?.success){
            throw new Error("Could Not Add Course Details");
        }
        result=response.data
    } catch (error) {
        console.log("CREATE COURSE API ERROR........",error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}