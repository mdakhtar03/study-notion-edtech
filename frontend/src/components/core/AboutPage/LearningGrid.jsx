import React from 'react'
import HighlightText from '../HomePage/HighlightText'

import Button from '../HomePage/Button'

const LearningGridArray = [
    {
        order: -1,
        heading:"World-Class Learning for",
        HighlighteText: "Anyone, Anywhere",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText:"Learn More",
        BtnLink: "/",
    },
    {
        order:1,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order:2,
        heading:"Our Learning Methods",
        description:"The learning process uses the namely online and offline.",
    },
    {
        order:3,
        heading:"Certification",
        description:"You will get a certificate that can be used as a certification during job hunting.",
    },
    {
        order:4,
        heading:`Rating "Auto-grading"`,
        description:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
        order:5,
        heading:`Ready to Work`,
        description:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    }
]



const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 py-20 px-28'>
        {
            
            LearningGridArray.map((data,index)=>{
                return (
                    <div  key={index} className={`${index === 0 && "lg:col-span-2"} 
                    ${data.order%2 ===1 ? " bg-richblack-700":" bg-richblack-800"}
                    ${data.order === 3 && "lg:col-start-2"} `} >
                        {
                            data.order < 0 ? 
                            (<div className='flex flex-col items-start bg-richblack-900 text-richblack-5 px-4'>
                                <div className=' text-4xl'> {data.heading} 
                                 <HighlightText text={data.HighlighteText} /></div>
                                 <div className='flex flex-col items-start gap-y-7 mt-2'>
                                    <p className=' text-base text-richblack-300 font-medium'> {data.description} </p> 
                                 
                                 <Button active={true} linkto={data.BtnLink}> {data.BtnText} </Button> 
                                 </div> 
                            </div>) : 
                            (<div className=' p-8 flex flex-col gap-y-8'>
                                <div className=' text-richblack-5 font-semibold text-lg'> {data.heading} </div>
                                <p className=' text-richblack-100 text-sm font-normal'> {data.description} </p>
                            </div>)
                        }
                    </div>
                )
            })
        }

    </div>
  )
}

export default LearningGrid