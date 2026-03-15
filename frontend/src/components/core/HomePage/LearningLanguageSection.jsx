import React from 'react'
import HighlightText from './HighlightText'
import knowYourProgress from "../../../assets/Images/Know_your_progress.png"
import compareWithOthers from "../../../assets/Images/Compare_with_others.png"
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

const LearningLanguageSection = () => {
  return (
    <div className=' mt-32'>
    <div className='flex flex-col gap-5 items-center'>
        <div className=' text-4xl font-semibold text-center'>
            Your Swiss Knife For <HighlightText text={"learning any language"}/>
        </div>
        <p className=' text-center text-richblack-600 mx-auto text-base mt-3 w-3/5'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>

        <div className='flex items-center justify-center '>
            <img src={knowYourProgress} alt='knowYourProgress' className=' object-contain -mr-32'/>
            <img src={compareWithOthers} alt='compareWithOthers' className=' object-contain ml-4'/>
            <img src={planYourLesson} alt='planYourLesson' className=' object-contain -ml-32'/>
        </div>
        <div className=' w-fit '>
        <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
        </div>
    </div>
     </div>
  )
}

export default LearningLanguageSection