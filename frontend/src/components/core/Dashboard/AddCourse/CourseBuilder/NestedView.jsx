import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { CiSquarePlus } from "react-icons/ci";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from "../../../../common/ConfirmationModal"
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourses } from '../../../../../reducer/slices/CourseSlice';


const NestedView = ({handleChangeEditSectionName}) => {
    const {course} = useSelector((state)=> state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [confirmationModal,setConfirmationModal] = useState(false);
    
    const handleDeleteSection= async (sectionId)=>{
        const result = await deleteSection({sectionId, courseId:course._id},token)
        console.log("Result",result)
        if(result){
           
            dispatch(setCourses(result.data))
        }
        setConfirmationModal(null)
    }
   
const handleDeleteSubSection= async (subSectionId,sectionId)=>{
    const result = await deleteSubSection({subSectionId,sectionId},token)
    if(result){
        const updatedCourseContent = course.courseContent.map((section)=>
            section._id === sectionId ? result : section);
        const updatedCourse ={...course, courseContent: updatedCourseContent}
        dispatch(setCourses(updatedCourse))
    }
    setConfirmationModal(null)

}
// console.log(" Course Course Content" ,course?.courseContent)
  return (
    <div>
        <div className=' rounded-lg bg-richblack-700 p-6 px-8 mt-4'> 
        {/* Making details tag for each section */}
            {
                course?.courseContent?.map((section)=>(
                    <details key={section._id} open>   
                        <summary className=' list-none flex items-center justify-between gap-x-3 border-b-2' > 
                            <div className='flex items-center gap-x-3'>
                                    <RxDropdownMenu size={20} />
                                    <p> {section?.sectionName} </p>
                            </div>
                            <div className=' flex items-center'>
                                <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)} >
                                    <TbEdit size={20} />
                                </button>
                                <button onClick={()=>setConfirmationModal(
                                                    {
                                                        text1:"Delete this Section",
                                                        text2: "All the lectures in this section will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text:"Cancel",
                                                        btn1Handler: ()=>handleDeleteSection(section._id),
                                                        btn2Handler: ()=> setConfirmationModal(null)
                                                    })}>
                                    <MdOutlineDeleteForever />
                                </button>
                                <span>|</span>
                                <FaAngleDown className='text-xl text-richblack-300' />
                            </div>
                         </summary>
                        <div>
                             {
                            section?.SubSection.map((data)=>(
                                <div key={data?._id} 
                                onClick={()=>setViewSubSection(data)} className=' flex items-center justify-between border-b-2 gap-x-3' >
                                      <div className='flex items-center gap-x-3'>
                                        <RxDropdownMenu size={20} />
                                        <p> {data.title} </p>
                                      </div> 
                                      <div className=" flex items-center gap-x-3">
                                        <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                                            <TbEdit size={20} />
                                        </button>
                                        <button 
                                        onClick={()=>setConfirmationModal(
                                                    {
                                                        text1:"Delete this Sub Section",
                                                        text2: "Selected Lecture will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text:"Cancel",
                                                        btn1Handler: ()=>handleDeleteSubSection(data._id,section._id),
                                                        btn2Handler: ()=> setConfirmationModal(null)
                                                    })}
                                         
                                          >
                                            <MdOutlineDeleteForever />
                                        </button>
                                      </div>
                                </div>
                            ))
                         }
                         <button onClick={()=>setAddSubSection(section._id)}
                            className='mt-4 flex items-center gap-x-2 text-yellow-50'
                         >
                            <CiSquarePlus/>
                            <p> Add Lecture </p>
                         </button>
                        </div>                            
                    </details>

                ))
            }
        </div>
        {/* SubSection Modal */}
                    {
                         

                    addSubSection ? (<SubSectionModal
                        modalData={addSubSection}
                        setModalData = {setAddSubSection}
                        add={true}
                    />) : (viewSubSection) ? (<SubSectionModal
                                                modalData={viewSubSection}
                                                setModalData={setViewSubSection}
                                                view={true}
                    />) : editSubSection ? (<SubSectionModal
                                                modalData={editSubSection}
                                                setModalData={setEditSubSection}
                                                edit={true}
                    />) : (<div></div>)
                    
                    }
                    {confirmationModal ? <ConfirmationModal modalData={confirmationModal} /> : <></>}
    </div>
  )
}

export default NestedView