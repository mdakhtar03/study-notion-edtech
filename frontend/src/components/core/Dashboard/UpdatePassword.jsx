import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { updatePassword } from '../../../services/operations/profileAPI'
import { useSelector } from 'react-redux'


const UpdatePassword = () => {
    const {register, reset, handleSubmit, watch, formState:{errors,isSubmitSuccessful}} = useForm()
    const {token} = useSelector((state)=>(state.auth))


    const changePasswordHandler = async (data)=>{
        console.log("Password", data )
        try {
            const response = await updatePassword(token,data)
            console.log("Response",response)
        } catch (error) {
            console.log("error",error.message)
        }

    }




useEffect(() =>{

     reset({
            oldPassword:"",
            newPassword:""
        })
    }, [reset,isSubmitSuccessful])


  return (
    <div>
        <form onSubmit={handleSubmit(changePasswordHandler)} className=' flex flex-col text-white bg-richblack-800 p-8 gap-y-3 rounded-lg'>
                

                <h1 className=''> Password Updation </h1>
                <div className=' flex  gap-x-5'>
                    <div className=' flex flex-col flex-1'>
                        <p> Current Password <sup>*</sup> </p>
                        <input  placeholder='Current Password' type='text' 
                        className=' bg-richblack-700 p-3 rounded-lg outline-none' 
                            {...register("oldPassword",{required:true})}
                        />
                        {errors.oldPassword && <span> Enter your Current Password </span>}
                    </div>
                    <div className=' flex flex-col flex-1'>
                        <p> New Password <sup>*</sup> </p>
                        <input placeholder='New Password ' type='text'
                        className=' bg-richblack-700 p-3 rounded-lg outline-none'
                         {...register("newPassword",{required:true})} 

                         />
                        {errors.newPassword && <span> Enter your new Password </span>}
                    </div>
                </div>
                {watch("oldPassword") && watch("newPassword") && 
                     <div className=' flex justify-end gap-x-2 mt-5 transition-all duration-300'>
                        <button className=' bg-richblack-900 text-richblack-5 py-2 px-5 rounded-lg' onClick={()=>reset()}> Cancel </button>
                        <button type='submit'
                        className=' bg-yellow-50 py-2 px-5 text-richblack-900 rounded-lg' > 
                        
                        Update Password </button>
                    </div>
                }
        </form>
    </div>
  )
}

export default UpdatePassword