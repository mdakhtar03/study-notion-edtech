import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { GoPlusCircle } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { setEditCourse, setStep,setCourses } from '../../../../../reducer/slices/CourseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';





const CourseBuilderForm = () => {

const {register, handleSubmit, setValue, formState:{errors}} =useForm();
const [editSectionName,setEditSectionName] = useState(null);
const {course}=useSelector((state)=>state.course)
const [loading,setLoading]= useState(false);
const dispatch = useDispatch();
const {token} = useSelector((state)=>state.auth)

const cancelEdit=()=>{
  setEditSectionName(null);
  setValue("sectionName","");
}

const goBack=()=>{
  dispatch(setStep(1))
  dispatch(setEditCourse(true))
}
 
const gotToNext = ()=>{
  if(course.courseContent.length === 0){
    toast.error("Please Add List One Section")
    return
  }
  if(course.courseContent.some((section)=>section.subSection.length === 0)){
    toast.error("Please add atleast one lecture in each section");
    return;
  }
  //If everything is good
  dispatch(setStep(3));
}

const onSubmit = async (data)=>{
  console.log("DATA of Course BUILDER ",data);
  setLoading(true);
  let result;
  if(editSectionName){
    //we are editing the section name
    result = await updateSection(
              {
                sectionName: data.sectionName,
                sectionId: editSectionName
              },token)
  }

  else {
     result = await createSection(
      {
        sectionName: data.sectionName,
        courseId: course?._id,
      },token)

      //update values 
      console.log("REsult of CourseBuilder ",result)
      // console.log("Course ID ####",course._id)
    }
    
    if(result){
      dispatch((setCourses(result?.updatedCourseDetails)))
      setEditSectionName(null);
      setValue("sectionName","");
    }

  setLoading(false);
}

const handleChangeEditSectionName = (sectionId, sectionName)=>{
  if(editSectionName === sectionId){
    cancelEdit();
    return
  }

  setEditSectionName(sectionId);
  setValue("sectionName",sectionName);
}



// console.log("course?.courseContent._id" ,course?.courseContent._id)
  return (
    <div className=' bg-richblack-800 rounded-lg p-3'>
        <p > Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor='sectionName'> Section name <sup className='text-pink-300'>*</sup> </label>
              <input id='sectionName' placeholder='Add a section to your course' 
                {...register("sectionName",{required:true})} 
                className='w-full p-3 bg-richblack-700 outline-none rounded-lg' />
                {
                  errors.sectionName && <span className='text-pink-300'> Section field required**</span>
                }
            </div>
            <div className=' flex items-center' > 
            <IconBtn 
              showIcon={false} 
              text={editSectionName? "Edit Section Name" : "Create Section"}
              type={"Submit"}
              customClasses={"p-2 text-yellow-50 border border-yellow-50 hover:scale-95 transition-all duration-200"}
            > <GoPlusCircle size={20} /> </IconBtn>
            {editSectionName && (<button type='button' onClick={cancelEdit} 
                                  className=' text-sm text-richblack-300'> Cancel Edit </button>) }
            </div>
        </form>
        
        
        {/* Nested view: Section -> SubSection */}
            {course?.courseContent.length>0 && 
            (<NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>) }

            
        <div className='flex justify-end gap-x-3 mt-10'> 
            <button type='button' onClick={goBack} className=' rounded-md cursor-pointer '> 
                  Back 
            </button> 
            <IconBtn isstyle={true} showIcon={false} text={"Next"} onclick={gotToNext}>
                  <MdOutlineKeyboardArrowRight />
            </IconBtn>
        </div>
              
    </div>
  )
}

export default CourseBuilderForm