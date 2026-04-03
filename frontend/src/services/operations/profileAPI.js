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
             console.log("Printing response", response)

             result = response.data
            
    } catch (error) {
        console.log(error.message)
        toast.error("Could not get enrolled courses")
    }
     toast.dismiss(toastId)
    return result
}


