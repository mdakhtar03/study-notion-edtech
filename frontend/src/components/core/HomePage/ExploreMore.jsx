import React, { useState } from 'react'
import HomePageExplore from "../../../data/homepage-explore"
import HighlightText from './HighlightText';

import CourseCard from './CourseCard';


const tabName =["Free","New to coding", 
    "Most popular", "Skills paths" , "Career paths"];


const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabName[0])

    const [courses,setCourses] = useState(HomePageExplore[0].courses)

    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMycards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag === value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }



  return (
    <div>
            <div className=' text-richblack-5 text-4xl font-semibold text-center '>
            Unlock the <HighlightText text={"Power of Code"}/> 
            </div>

            <p className=' text-center text-richblack-300 font-medium text-base'>
                Learn to Build Anything You Can Imagine
            </p>
            {/* Tab */}
            <div className=' flex  mt-5 mb-5  bg-richblack-800 rounded-full p-1 gap-2'>
               { tabName.map((tab,index)=>{
                    return (
                        <div key={index} onClick={()=>setMycards(tab)} className={` text-base  
                        ${tab === currentTab ?` bg-richblack-900 text-richblack-5 font-medium`: ` text-richblack-200`} 
                         rounded-full cursor-pointer transition-all duration-200   hover:bg-richblack-900 hover:text-richblack-5 px-6 py-2 `}>
                         {tab}
                         </div>
                    )
               }
                )}
            </div>


                {/* Course Card */}


                <div className='  flex gap-9   justify-center w-full absolute left-0 '>
                            {
                                courses.map((data,index)=>{
                                    return (
                                        <CourseCard
                                            key={index} cardData = {data} 
                                            currentCard = {currentCard}
                                            setCurrentCard = {setCurrentCard}
                                        />
                                    )
                                    }
                                )
                            }
                </div>
    </div>
  )
}

export default ExploreMore