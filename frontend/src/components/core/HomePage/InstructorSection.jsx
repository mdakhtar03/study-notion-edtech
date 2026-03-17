import React from 'react'
import InstructorImage from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "./Button"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const InstructorSection = () => {
  return (
    <div className=' w-full mt-20'>
        <div className=' ml-14 flex items-center justify-center gap-20'>


            <div className=' w-[50%] shadow-[-20px_-20px_0px_0px_#F5F5F5] rounded-md'> 
            <img src={InstructorImage} alt='InstructorImage' className='rounded-md'/> 
            </div>

            <div className=' w-[50%] flex flex-col gap-10 font-inter  '>
                <h1 className=' font-semibold text-4xl text-richblack-5 w-[50%]'>Become an  <HighlightText text={"instructor"}/> </h1>
                <p className=' font-medium text-richblack-300 text-base w-[80%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                <div className=' max-w-fit'><CTAButton linkto={"/signup"}  active={true}> <div className=' flex justify-start items-center '>Start Teaching Today <MdOutlineKeyboardArrowRight /></div> </CTAButton></div>
            </div>

           
        </div>


    </div>
  )
}

export default InstructorSection