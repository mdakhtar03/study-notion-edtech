import React from 'react'
import { UsersIcon } from '@heroicons/react/24/solid'
import { PresentationChartLineIcon } from '@heroicons/react/24/solid'






const CourseCard  = ({cardData,currentCard,setCurrentCard}) => {

  return (
    <div onClick={()=>setCurrentCard(cardData.heading)} className={`${currentCard === cardData.heading ? " bg-white shadow-[12px_12px_0px_0px_#FFD60A] text-richblack-800" : 
    " bg-richblack-800 font-normal text-richblack-400"} w-80 h-72  font-inter 
       flex flex-col justify-evenly  transition-all duration-300` }>

        <div className=' flex flex-col py-8 px-6 gap-5'><h2 className='font-semibold'>{cardData.heading}</h2>
        <p className=' text-base font-medium text-richblack-00'> {cardData.description} </p></div>
        <hr className=' border-dashed ring-richblack-600'/>
        <div className=' flex justify-between py-4 px-6'>
            <div className=' flex justify-center gap-2 items-center'> <UsersIcon className={`${currentCard === cardData.heading ? " text-blue-500" : ""} w-5`}/> <p>Beginner</p></div>
            <div className=' flex justify-center gap-2 items-center'>  <PresentationChartLineIcon className={`${currentCard === cardData.heading ? " text-blue-500" : ""} w-5`}/> <p>Lesson</p></div>
        </div>
    </div>
  )
}

export default CourseCard   