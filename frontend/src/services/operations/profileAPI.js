import React from 'react'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { PROFILE_API } from '../apis'

export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...")
    let result = []
    try {
            console.log("BEFORE CALLING API................")
            const response = await apiConnector("GET", PROFILE_API.GET_USER_ENROLLED_COURSES_API,
                null, {Authorization: `Bearer ${token}`}
             )
              console.log("AFTER CALLING API................")
             if(!response.data.success){
                throw new Error(response.data.message);
                
             }
            
             result = response.data
            
    } catch (error) {
        console.log(error.message)
        toast.error("Could not get enrolled courses")
    }
     toast.dismiss(toastId)
    return result
}

export async function UpdateProfile (token,data){
    const toastId = toast.loading("Loading")
    try {
        const response = await apiConnector("PUT", PROFILE_API.UPDATE_PROFILE_DETAILS_API,
            data, {Authorization: `Bearer ${token}`}
         )
         if(!response.data.success)
         {
            throw new Error(response.data.message);
            
         }
          

    } catch (error) {
      
        toast.error("Could not update Profile details")
        return
    } finally {
    toast.dismiss(toastId);  
  }
    toast.success("Profile Updated")
}

export async function updatePassword (token,data){
    const toastId = toast.loading("Loading")
    try {
        const response = await apiConnector("POST", PROFILE_API.CHANGE_PASSWORD_API, data,
            {Authorization: `Bearer ${token}`}
        )
        if(!response.data.success)
         {
            throw new Error(response.data.message);
            
         }
    } catch (error) {
        toast.error("Could not update password")
        return
    }finally {
    toast.dismiss(toastId);  
  }
   toast.success("Password Updated")
}

