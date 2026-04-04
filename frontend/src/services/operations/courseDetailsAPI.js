import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import {COURSE_API} from "../apis"
export const fetchCourseCategories = async ()=>{
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_API.COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API RESPONSE.........", response)
        if(!response?.data?.success){
            throw new Error("Could not fetch COURSE_CATEGORIES");   
        }
        result = response?.data?.data
        // toast.success(response?.data?.message)
    } catch (error) {
        console.log("COURSE_CATEGORIES_API Error.....",error)
        toast.error(error.message)
    }
    return result
}