import React from 'react'


const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label:"Mentors"},
    {count:"200+",label:"Courses"},
    {count:"50+",label:"Awards"}
]

const StatsComponent = () => {
  return (
    <section >
        <div className='flex bg-richblack-800 justify-evenly py-20 px-32 gap-3'>
            {
                Stats.map((data,index)=>(
                    <div  key={index} className=' w-48 h-16 flex flex-col items-center' >
                    <p className=' text-3xl text-richblack-5 font-bold'> {data.count} </p>
                    <p className=' text-richblack-500 font-semibold text-base' > {data.label} </p>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default StatsComponent