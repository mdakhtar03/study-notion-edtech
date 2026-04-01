import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { AiOutlineCloudUpload } from "react-icons/ai";
const Sitting = () => {

    const user =  useSelector((state)=> state.profile)
      const  {register,handleSubmit, formState:{errors,isSubmitSuccessful}} = useForm()
  return (
    <div className=' mx-auto '>
            <h1 className=' text-3xl text-richblack-5'> Edit Profile</h1>
            <div className='flex bg-richblack-800'>
                <img src={user?.image}  alt={`profile-${user?.firstName}}`} />
                <div>
                    <p> Change Profile Picture </p>
                    <div className='flex gap-x-1'>
                       <input className=' bg-richblack-700 ' type='file' name='displayPicture' 
                       {...register("displayPicture", {required:true})} />
                       <button className='flex text-base text-richblack-900 font-medium items-center gap-x-1 rounded-lg bg-yellow-50 py-2 px-4'> Upload <AiOutlineCloudUpload /> </button>
                    </div>
                </div>
            </div>
            {/* Profile Information update */}
            <div className=' bg-richblack-800'>
                <p>Profile Information</p>
                <div>
                    <div>
                        <label htmlFor='firstName'> First Name</label>
                        <input type='text' placeholder={user?.firstName ?? "First Name"} 
                        {...register("firstName", {required:true})}  />
                    </div>
                    <div>
                        <label htmlFor='lastName'> Last Name</label>
                        <input type='text' placeholder={user?.lastName ?? "Last Name"}
                        {...register("lastName", {required:true})}  />
                    </div>
                    
                </div>
            </div>
    </div>
  )
}

export default Sitting