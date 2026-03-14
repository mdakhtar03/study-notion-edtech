

import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
 const Home = () => {
  return (
    <div>
    {/* Section 1 */}
        <div className=' group relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
            text-white justify-between '>
            <Link to={"/signup"}>
                <div className='mx-auto rounded-full bg-richblack-700 
                py-[6px] px-[16px] font-bold text-richblack-200 transition-all duration-200 hover:scale 
                w-fit group-hover:bg-richblack-800 gap-2'>

                    <div className='flex items-center'>
                        <p>Become an Instructor</p>
                        <MdOutlineKeyboardArrowRight />
                    </div>
                </div>
            </Link>


            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className=' w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, 
                and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
            </div>

            <div className=' mx-3 my-12 shadow-blue-200'>
                <video muted loop autoPlay><source src={Banner} type='video/mp4'/></video>
            </div>

        </div>
    

    {/* Section 2 */}

    
    {/* Section 3 */}

    {/* Footer */}

    </div>
  )
}
export default Home;