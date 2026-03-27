import { setLoading } from "../../reducer/slices/authSlice"
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast"

export const getPasswordResetToken = ({email,setEmailSent})=>{
                return async (dispatch)=>{
                    dispatch(setLoading(true));
                    try{
                        const url = "http://localhost:4000/api/v1/auth/reset-password-token"
                          
                        const response = await apiConnector("POST", url, {email})
                        console.log("Reset Password Token Response....",response);
                        
                        if(!response.data.success)
                        {
                            throw new Error(response.data.message);
                        }
                        setEmailSent(true)
                        toast.success("Reset Email Sent")
                    } catch(error){
                        console.log("Reset Password Token Error", error)
                    }
                    dispatch(setLoading(false))
                }
}

export const resetPassword=({password,confirmPassword,token})=>{
                return async (dispatch)=>{
                    dispatch(setLoading(true))
                    const url= ""
                    try {
                        const response = await apiConnector("POST", url, {password,confirmPassword,token})
                        if(!response.data.success){
                            throw new Error(response.data.message); 
                        }
                        toast.success("Password has been reset successfully")
                    } catch (error) {
                        console.log("Reset Password Token Error",error)
                        toast.error("Unable to reset password")
                    }
                    dispatch(setLoading(false))
                }
}