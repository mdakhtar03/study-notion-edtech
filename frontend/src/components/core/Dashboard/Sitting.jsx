import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { imageUpdate } from '../../../services/operations/authAPI';
import toast from 'react-hot-toast';

const Sitting = () => {
    const [showCurrentPassword,setShowCurrentPassword] = useState(false)
    const [showNewPassword,setShowNewPassword] = useState(false)


    const {user} =  useSelector((state)=> state.profile)
    
      const  {register,handleSubmit, formState:{errors,isSubmitSuccessful}} = useForm()


const [file, setFile] = useState(null);

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);
  
};



const imageUploader = async () => {
  console.log("Upload clicked");

  if (!file) {
    toast.error("Please select an image");
  return;
  }

  const formData = new FormData();

  formData.append("displayPicture",file)
  const output = await imageUpdate(formData);
  setFile(null)
  
  console.log("output", output);
};

  return (
    <div className=' mx-auto flex flex-col gap-y-4 max-w-3xl mb-20'>
            <h1 className='  text-3xl text-richblack-5'> Edit Profile</h1>
            <div className=' flex bg-richblack-800 gap-x-3 max-w-3xl p-5 rounded-lg '>
                <img src={user?.image} className='  aspect-square w-16 rounded-full object-cover'  alt={`profile-${user?.firstName}}`} />
                 
                <div>
                    <p className=' text-richblack-5 font-medium text-lg'> Change Profile Picture </p>
                    
                       <div className='flex gap-x-2'>
  <label className='custom-file-upload my-auto text-richblack-5 bg-richblack-700'>
    Select
    <input
      type='file'
      className='hidden'
      onChange={handleFileChange}
    />
    
  </label>
    {file && (
  <div className="text-caribbeangreen-200 mt-2">
    <p className="font-medium">{file.name}</p>
    <p className="text-sm">
      {(file.size / 1024).toFixed(2)} KB
    </p>
  </div>
)}
  <button
    disabled={!file}
    type='button'
    onClick={imageUploader}
    className='flex text-base text-richblack-900 font-medium items-center gap-x-1 rounded-lg bg-yellow-50 py-2 px-4'
  >
    Upload <AiOutlineCloudUpload />
  </button>
</div>
                    
                </div>
            </div>
            {/* Profile Information update */}
            <div className='  bg-richblack-800 p-5 rounded-lg max-w-3xl'>
            <p className=' text-richblack-5 font-semibold text-lg'>Profile Information</p>
                 <div className='  flex justify-between gap-x-4 mx-auto max-w-2xl'>
                    <div className=' flex flex-col gap-y-3  w-[50%]'>
                    <div className=' flex flex-col'>
                        <label className=' text-richblack-5 text-sm font-normal' htmlFor='firstName'> First Name</label>
                        <input className=' text-richblack-5 p-3 bg-richblack-700 rounded-lg outline-none'
                         type='text' placeholder={user?.firstName ?? "First Name"} 
                        {...register("firstName", {required:true})}  />
                    </div>
                    <div>
                        <p className=' text-richblack-5 text-sm font-normal'> Date of Birth </p>
                        <input className=' w-full text-richblack-5 p-3 bg-richblack-700 rounded-lg outline-none' type='date' />
                    </div>
                    <div>
                        <p className=' text-richblack-5 text-sm font-normal'> Contact Number </p>
                        <input className=' w-full text-richblack-5 p-3 bg-richblack-700 rounded-lg outline-none' type='tel' placeholder='Enter Contact Number' 
                            
                        />
                    </div>
                </div>
                <div className=' flex flex-col gap-y-3 w-[50%]'>
                    <div>
                        <p className=' text-richblack-5 text-sm font-normal'> Last Name </p>
                        <input className=' w-full text-richblack-5 p-3 bg-richblack-700 rounded-lg outline-none' placeholder='Last name' type='text' />
                    </div>
                    <div>
                        <p className=' text-richblack-5 text-sm font-normal'>Gender</p>
                        <select className=' w-full text-richblack-5 p-3 bg-richblack-700 rounded-lg outline-none'> 
                            <option>Male</option> 
                            <option>Female</option>
                            <option> other </option> 
                        </select>
                    </div>
                    <div>
                        <p className=' text-richblack-5 text-sm font-normal'> About </p>
                        <textarea className=' w-full text-richblack-5 p-3 bg-richblack-700 rounded-lg outline-none' placeholder='Enter Bio Details'/> 
                    </div>
                </div>
                </div>
            </div>
            <div className=' flex justify-end gap-2'>
                <button className=' bg-richblack-700 rounded-lg py-2 px-4 text-richblack-200 '> Cancel </button>
                <button className=' text-base text-richblack-900 font-medium  rounded-lg bg-yellow-50 py-2 px-4'> Save </button>
            </div>

            {/* Password Field */}
            <div className=' flex flex-col bg-richblack-800 gap-y-5 gap-x-3 max-w-3xl p-5 rounded-lg '>
                <p className=' text-richblack-5 font-semibold text-lg'>Password</p>
                <div className='flex gap-x-6 justify-evenly'>
                    <label className='flex flex-1 gap-y-1 relative flex-col text-richblack-5 text-sm font-normal'> Current Password 
                    <input className='  text-richblack-5 p-3 bg-richblack-700 rounded-lg outline-none' placeholder='Enter Current Password' 
                        type={ showCurrentPassword ? "text" : "password" } />
                    <span onClick={()=> setShowCurrentPassword(!showCurrentPassword)} className=' absolute right-2 top-9 z-10 cursor-pointer'>
                                {
                                    showCurrentPassword ? (<LuEyeClosed className=' text-richblack-5 ' size={20} />):(<LuEye className=' text-richblack-5'  size={20}/>)
                                }
                    </span>
                    </label>
                    <label className='flex flex-1 gap-y-1 flex-col relative text-richblack-5 text-sm font-normal'> New Password  
                    <input className=' text-richblack-5 p-3  bg-richblack-700 rounded-lg outline-none' placeholder='Enter Current Password' 
                        type={ showNewPassword ? "text" : "password" } />
                    <span onClick={()=> showNewPassword(!showNewPassword)} className=' absolute right-2  top-9 z-10 cursor-pointer'>
                                {
                                    showNewPassword ? (<LuEyeClosed className=' text-richblack-5 ' size={20} />):(<LuEye className=' text-richblack-5'  size={20}/>)
                                }
                    </span>
                    </label>

                </div>
            </div>
            <div className=' bg-pink-900 gap-4  flex p-6 rounded-lg'>
                    <div className=' bg-pink-700 p-4 rounded-full  h-fit'><RiDeleteBin6Line className=' text-pink-200 text-2xl'/></div>
                    <div className=' flex flex-col justify-start gap-y-1'>
                        <h3 className=' text-pink-5 text-lg font-bold'>Delete Account</h3>
                        <div className='text-pink-25'>
                            <p>Would you like to delete account?</p>
                            <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                        </div>
                        <button className=' text-pink-300 italic self-start'>I want to delete my account.</button>
                    </div>
            </div>
    </div>
  )
}

export default Sitting