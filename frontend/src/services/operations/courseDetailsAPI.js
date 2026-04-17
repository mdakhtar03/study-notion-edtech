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
        // console.log("CREATE COURSE API RESPONSE.........",response)
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

export const updateSection = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Loding...");
    try {
        const response = await apiConnector("PUT",COURSE_API.UPDATE_SECTION_API, data,{
            Authorization: `Bearer ${token}`,
        })
        // console.log("Edit Section API Response....",response);
        if(!response.data.success){
            throw new Error("Could Not Update Section Details");   
        }
        result = response.data;
        console.log("Result of updated section",result);
    } catch (error) {
        console.log("Failed to Update Section.............",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createSection = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST",COURSE_API.CREATE_SECTION_API,data,{
            Authorization: `Bearer ${token}`,
        })
        // console.log("Create Section API Response........",response);
        if(!response.data.success){
            throw new Error("Could Not Create Section Details........"); 
        }
        result = response.data;
    } catch (error) {
        console.log("Failed to Create Section..............",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    toast.success(result.message);
    return result;
}

export const deleteSection = async (data,token)=>{
    let result;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", COURSE_API.DELETE_SECTION_API,data,
            {Authorization: `Bearer ${token}`},
        )
        console.log("Response from deleteSection",response)
        if(!response.data.success){
            throw new Error("Success false");
        }
        result=response.data;
    } catch (error) {
        console.log("Failed to Delete Section..............",error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    toast.success("Section Deleted");
    return result;
}

export const deleteSubSection = async (data,token)=>{
    let result=null;
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST",COURSE_API.DELETE_SUBSECTION_API,data,
            {Authorization: `Bearer ${token}`})
        console.log("Reponse from Delete SubtionSection",response)
        if(!response.data.success){
            throw new Error("Failed to Delete Sub Section....");    
        }
        result = response.data;
    } catch (error) {
        console.log("Failed to Delete Sub Section..............",error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    toast.success(result.message);
    return result;
}

export const createSubSection = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST",COURSE_API.CREATE_SUBSECTION_API,data,{
            Authorization: `Bearer ${token}`
        })
        console.log("Reponse from Creating SubSection",response)
        if(!response.data.success){
            throw new Error("Failed to Create SubSection");
        }
        result = response.data;
    } catch (error) {
        console.log("Failed to Create SubSection....",error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    toast.success(result.message);
    return result;
}


export const updateSubSection = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST",COURSE_API.UPDATE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`
        })
        if(!response.data.success){
            throw new Error("Failed to updata");
        }
        result = response.data.data;
    } catch (error) {
        console.log("Failed to Update SubSection....",error);
        toast.error(error.message);
    }
    toastId.dismiss();
    toast.success("SubSection Update Successfully")
    return result
}