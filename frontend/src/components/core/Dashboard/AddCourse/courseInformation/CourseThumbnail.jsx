import React, { useEffect, useState } from 'react'

const CourseThumbnail = ({label, name, register, errors, setValue, getValues }) => {

     const [thumbnail, setThumbnail] = useState(null);
     const [preview,setPreview] = useState("");

     function changeHandler(e){
            const file = e.target.files[0];
            if(file){
                setThumbnail(file);
                setPreview(URL.createObjectURL(file));
                setValue(name,file)
            }

     }


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
        <label htmlFor='thumbnail'> {label} <sup> * </sup> </label>

        {thumbnail ? (<div className='flex flex-col w-full h-auto bg-richblack-700'> <img src={preview} alt=''   /></div>):
                                        (<div className=' bg-richblack-700 w-full h-52 '>
                                         <input id='thumbnail' type='file' onChange={changeHandler} 
                                          accept='image/*'/> 
                                            
                                        
                                         </div>)}
        
    </div>
  )
}

export default CourseThumbnail