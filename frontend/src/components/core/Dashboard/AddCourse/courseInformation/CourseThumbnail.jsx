import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosCloudUpload } from "react-icons/io";

const CourseThumbnail = () => {

   const {register,handleSubmit,setValue,formState:{errors}} =   useForm()
   const [thumbnail,setThumnail] = useState(null)
    
   const handleFileChange= (event)=>{
    const file = event.target.files[0]
    setThumnail(URL.createObjectURL(file))
    setValue("thumbnail",file)
   }

  return (
    <div>
        <div>
            <label> Course Thumbnail <sup>*</sup> </label>
            <div className=' bg-richblack-700 py-8 px-3'>
            
                {
                    thumbnail ? (<img src={thumbnail} alt='thumbnail' className=' aspect-video object-cover' />) 
                                        : 
                    (
                        <> <input  type='file' className=''  
                    {...register("thumnail",{required:true})}  onChange={handleFileChange} />
                     <IoIosCloudUpload />       
                    </>)
                }
            </div>
            <div>
                <button>Cancel</button>
                
            </div>
        </div>
    </div>
  )
}

export default CourseThumbnail