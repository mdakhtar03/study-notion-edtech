import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { RxCrossCircled } from "react-icons/rx";
import { setCourses } from '../../../../../reducer/slices/CourseSlice';
import IconBtn from '../../../../common/IconBtn';
import Upload from './Upload';

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
        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id);
        
        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title",currentValues.lectureTitle)
        }
        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description",currentValues.lectureDesc)
        }
        if(currentValues.lectureVideo !== modalData.video){
            formData.append("video",currentValues.lectureVideo)
        }
        setLoading(true);
        //API call
        const result = await updateSubSection(formData,token)
        if(result){
            const updatedCourseContent = course.courseContent.map((section)=>
            section._id === modalData.sectionId ? result: section);
            const updatedCourse = {...course,updatedCourseContent}
            dispatch(setCourses(updatedCourse))
        }
        setModalData(null);
        setLoading(false);
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

            const updatedCourseContent = course.courseContent.map((section)=>
            section._id === modalData ? result : section)
            const updatedCourse = {...course,updatedCourseContent}
            dispatch(setCourses(updatedCourse))
        }
        setModalData(null);
        setLoading(false); 
    }


  return (
    <div>
            <div>
                <div> 
                <p> {view && "Viewing"} { add && "Adding"} {edit && "Editing"} Lecture </p> 
                <button onClick={() => (!loading ? setModalData(null): {})}> <RxCrossCircled /> </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Upload 
                        name="LectureVideo" 
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                <div>
                    <label> Lecture Title </label>
                    <input 
                        id='lectureTitle'
                        placeholder='Enter Lecture'
                        {...register("lectureTitle",{required:true})}
                    />
                    {errors.lectureTitle && <span> Lecture Title is required </span>}
                </div>
                <div>
                    <label> Lecture Description </label>
                    <textarea 
                        id='lectureDesc'
                        placeholder='Enter Lecture Description'
                        {...register("lectureDesc",{required:true})}
                        
                    />
                    {errors.lectureDesc && <span> Lecture Description is required </span>}
                </div>
                 { 
                    !view && (
                        <div>
                            <IconBtn showIcon={false} isstyle={true}
                                text={ edit ? "Save Changes" : "Add Lecture"}
                            />
                            
                        </div>
                    )
                 }
                </form>
            </div>

    </div>
  )
}

export default SubSectionModal