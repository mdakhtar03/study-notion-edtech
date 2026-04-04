import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

import { imageUpdate } from '../../../services/operations/authAPI';
import toast from 'react-hot-toast';
import ProfileUpdation from './ProfileUpdation';
import DeleteAccount from './DeleteAccount';
import UpdatePassword from './UpdatePassword';


const Sitting = () => {
    


  const {user} =  useSelector((state)=> state.profile)
    


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

           {/* Profile Updation */}
           <ProfileUpdation/>
           <UpdatePassword/>
            <DeleteAccount  />                           
    </div>
  )
}

export default Sitting