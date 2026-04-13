import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { set } from 'mongoose';
import { setCourses } from '../../../../../reducer/slices/CourseSlice';


const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false
}) => {
    const {register,handleSubmit,setValue, getValues, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const {course} = useSelector((state)=>state.course)
    const {token} = useSelector((state)=>state.auth)

    const [loading,setLoading] = useState(false); 

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);
        }
    },[]);

    const isFormUpdated = ()=>{
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title || 
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
         ){
            return false
        }
        
        else{
            return true
        }
    }

    const handleEditSubSection = async ()=>{
        const currentValues = getValues();
        const formData = new FormData();
        
    }    

    const onSubmit= async (data)=>{
        if(view){
            return
        }
        if(edit){
            if(!isFormUpdated){
                toast.error("No Changes made to the form")
            }
            else{
                handleEditSubSection();
            }
            return
        }
        const formData = new FormData();
        formData.append("sectionId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDesc);
        formData.append("video",data.lectureVideo)
        setLoading(true);

        //API call 
        const result = await createSubSection(formData,token)
        if(result){
            dispatch(setCourses(result.data))
        }
        setModalData(null);
        setLoading(false);
       
    }


  return (
    <div>

    </div>
  )
}

export default SubSectionModal