import React, { useEffect, useRef, useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";

const CourseThumbnail = ({label, name, register, errors, setValue, getValues }) => {

     const [thumbnail, setThumbnail] = useState(null);
     const [preview,setPreview] = useState("");

     function changeHandler(e){
            const file = e.target.files[0];
            if(file){
                setThumbnail(file);
                setPreview(URL.createObjectURL(file));
                setValue(name,file,{ shouldValidate: true })
            }

     }

const ref=useRef(null)
       useEffect(() => {
        register(name, { required: true });
  }, [register, name]);




useEffect(()=>{
    return ()=>{if (preview) {
        URL.revokeObjectURL(preview);
    }}
    
},[preview])
  return (
    <div>
        <label htmlFor='thumbnail'> {label} <sup className=' text-pink-200'> * </sup> </label>

                                          {errors[name] && <span className=' text-pink-200'> Select Thumbnail </span>}  
        {thumbnail ? (<div className='flex flex-col w-full h-auto bg-richblack-700'> <img src={preview} alt=''  className=' aspect-video w-full'  /></div>):
                                        (<div className=' bg-richblack-700 w-full h-52 rounded-lg flex justify-center items-center border-[2px]
                                        border-dashed border-richblack-600 '>
                                         <input ref={ref} id='thumbnail' type='file' onChange={changeHandler} 
                                          accept='image/*' className='hidden'/> 
                                            

                                          <div className=' flex flex-col items-center gap-6 c'>
                                            <div onClick={()=>ref.current.click()} className=' bg-pure-greys-800 text-yellow-50 p-3 rounded-full w-[max-content]'>  
                                            <IoCloudUploadOutline  className=' text-4xl' />
                                            </div>


                                                <div className=' flex flex-col gap-3 text-richblack-200'>
                                                    <p className=' max-w-[55%] mx-auto'> Drag and drop an image, or <span> Browse </span> Max 6MB each (12MB for videos) </p>
                                                        <div className=' flex justify-evenly'>
                                                            <ul className=' list-disc'> <li>Aspect ratio 16:9</li> </ul>
                                                            <ul className=' list-disc'> <li>Recommended size 1024x576</li> </ul>
                                                        </div>
                                                </div>

                                          </div>
                                         </div>)}
        
    </div>
  )
}

export default CourseThumbnail