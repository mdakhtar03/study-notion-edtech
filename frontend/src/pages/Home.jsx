

import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import Footer from "../components/common/Footer"

import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
 const Home = () => {
  return (
    <div>
    {/* Section 1 */}
        <div className=' group relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
            text-white justify-between '>
            <Link to={"/signup"}>
                <div className='mx-auto rounded-full bg-richblack-700 
                py-[6px] px-[16px] font-bold text-richblack-200 transition-all duration-200 hover:scale 
                w-fit group-hover:bg-richblack-800  gap-2'>

                    <div className='flex items-center'>
                        <p className=' '>Become an Instructor</p>
                        <MdOutlineKeyboardArrowRight />
                    </div>
                </div>
            </Link>


            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with <HighlightText text={" Coding Skills"}/>
            </div>

            <div className=' w-[80%] text-center text-lg font-bold text-richblack-300'>
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

            <div className=' mx-3 my-12 shadow-[20px_20px_0px_0px_#F5F5F5] rounded-md'>
                <video className=' rounded-md' width="1035px" height="515px" muted loop autoPlay><source src={Banner} type='video/mp4'/></video>
            </div>




     {/*  Code Box 1 */}
            <div className='w-[100%] px-10'>
        <CodeBlocks 
         position={"lg:flex-row"}
         heading={<div className='text-4xl font-semibold'>Unlock your <HighlightText text={" Coding Potential"}/> with our online coding courses</div>}
          
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
           ctabtn1={
            {
            btnText:"Try it yourself",
            linkto:"/signup",
            active:true,
            
           }
           }
           ctabtn2={
            {
            btnText:"learn more",
            linkto:"/login",
            active:false,
           }
           
           }
           codeblock={`<!DOCTYPE html>
                            <html>
        <head><title>Example</title><linkrel="stylesheet"href="styles.css">
        </head>
        <body>
        <h1><ahref="/">Header</a>
        </h1>
        <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
        </nav>`}
            backgroundGradient={"box"}
codeColor={"text-yellow-25"}
          />
     </div>



    {/* Code Box 2 */}
<div className='w-[100%] px-10 '>
        <CodeBlocks 
         position={"lg:flex-row-reverse"}
         heading={<div className='text-4xl font-semibold'>Start <HighlightText text={"coding in seconds"}/></div>}
          
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
           ctabtn1={
            {
            btnText:"Continue Lesson",
            linkto:"/signup",
            active:true,
           }
           }
           ctabtn2={
            {
            btnText:"learn more",
            linkto:"/login",
            active:false,
           }
           }
           codeblock={`<!DOCTYPE html>
                            <html>
        <head><title>Example</title><linkrel="stylesheet"href="styles.css">
        </head>
        <body>
        <h1><ahref="/">Header</a>
        </h1>
        <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
        </nav>`}
            backgroundGradient={"box2"}
            codeColor={"text-yellow-25"}
          />
        </div>
        {/* Filtered course */}
     <div>
            <ExploreMore />
     </div>
    </div>

    

    {/* Section 2 */}
            <div className=' bg-pure-greys-5 text-richblack-700 mt-60'>
            <div className='homepage_bg h-[300px]'>
            <div className='w-11/12 max-w-maxContent flex items-center justify-center gap-5 mx-auto'>
            <div className='h-[250px]'></div>
                <div className='flex gap-7 text-white'>
                    <CTAButton  active={true} linkto={"/signup"}><div className='flex items-center gap-2'> Explore Full Catalog <MdOutlineKeyboardArrowRight/></div></CTAButton>
                    
                    <CTAButton active={false} linkto={"/signup"}>Learn More</CTAButton>
                </div>
            </div>
            </div>

            <div className=' w-11/12 mx-auto max-w-maxContent mt-20 flex flex-col font-inter gap-7'>
                <div className=' w-full flex '>
                    <div className=' w-[50%] leading-10 text-4xl font-semibold'>
                        <p>Get the skills you need for a <HighlightText text={"job that is in demand."}/></p>
                    </div>
                    <div className=' w-[50%] flex flex-col items-start'>
                        <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <div><CTAButton linkto={"/signup"} active={true}>Learn More</CTAButton></div>
                    </div>
                </div>

            <TimelineSection/>
            <LearningLanguageSection/>
            </div>

           

            </div>
    
    {/* Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 
         bg-richblack-900 text-white'>
            <InstructorSection/>
            <h2 className=' text-center text-4xl font-semibold mt-10'>Review from other Learner</h2>
            {/* Review Slider */}
        </div>    

    {/* Footer */}
    <div >
            <Footer/>
    </div>

</div>



  )
}
export default Home;