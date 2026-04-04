import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import NumberCode from './Core/NumberCode'
import IconBtn from '../../common/IconBtn'
import { UpdateProfile } from '../../../services/operations/profileAPI'
import { useSelector } from 'react-redux'

const ProfileUpdation = () => {
    
    const {token} = useSelector((state)=>state.auth)

    const { register,handleSubmit, reset, formState:{errors, isSubmitSuccessful} } = useForm()

 

   const handleProfileUpdation = async (data)=>{
    console.log("Form Data", data )
      try {
        const response = await UpdateProfile(token,data)
        console.log(response)
      } catch (error) {
        console.log("Error", error)
      }
   } 







  return (
    <div>
        <form onSubmit={handleSubmit(handleProfileUpdation)} className=' flex flex-col text-white bg-richblack-800 p-8 gap-y-3 rounded-lg'>
                

                <h1 className=''> Profile Updation </h1>
                <div className=' flex  gap-x-5'>
                    <div className=' flex flex-col flex-1'>
                        <p> First Name </p>
                        <input  placeholder='First Name' type='text' 
                        className=' bg-richblack-700 p-3 rounded-lg outline-none' 
                            {...register("firstName")}
                        />

                    </div>
                    <div className=' flex flex-col flex-1'>
                        <p> Last Name </p>
                        <input placeholder='Last Name' type='text'
                        className=' bg-richblack-700 p-3 rounded-lg outline-none'
                         {...register("lastName")} />

                    </div>
                </div>
                <div className=' flex gap-x-5 '>
                    <div className=' flex flex-col flex-1'>
                        <p>Date of Birth</p>
                        <input placeholder='dd/mm/yyyy' type='date'
                            className=' bg-richblack-700 p-3 rounded-lg outline-none'
                            {...register("dateOfBirth")}
                        />
                    </div>
                    <div className=' flex flex-col flex-1'>
                        <p>Gender <sup>*</sup> </p>
                        <select className=' bg-richblack-700 p-3 rounded-lg outline-none'
                         {...register("gender",{required:true})}> 
                         <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                         </select>
                         {errors.gender && <span>Gender is required</span>}
                    </div>
                </div>
                <div className=' flex gap-x-5  '>
                    <div className=' flex flex-col flex-1 '>
                        <p> Phone Number <sup>*</sup> </p>
                        
                    
                        <input  type='tel' placeholder='1234567890' className=' bg-richblack-700 p-3 rounded-lg outline-none flex-1'
                        {...register("contactNumber", { required: true })}  />
                        {errors.phoneNumber && <span>Phone Number is required</span>}
                    </div>
                    <div className=' flex flex-col flex-1'>
                        <p> About </p>
                        <input placeholder='Enter Bio Details' type='text' 
                            className=' bg-richblack-700 p-3 rounded-lg outline-none'
                            {...register("about")} />
                    </div>
                </div>
                
        <div className=' flex justify-end gap-x-2 mt-5'>
            <button className=' bg-richblack-900 text-richblack-5 py-2 px-5 rounded-lg'> Cancel </button>
            <button type='submit'
            className=' bg-yellow-50 py-2 px-5 text-richblack-900 rounded-lg' > 
            
            Update </button>
        </div>
        </form>

    </div>
  )
}

export default ProfileUpdation