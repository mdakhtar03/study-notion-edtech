import React, { useState } from 'react'
import StyleText from './core/StyleText'
import { CgAsterisk } from "react-icons/cg";

const SignUp = () => {

    const [formData,setFormData]=useState({
        firstName:"", lastName:"", email:"", phoneNumber:"", accountType:"", password:"",confirmPassword:""
    })

    const [accountType, setAccountType] = useState("Student")


    function changeHandler(event){
        setFormData((prev)=>({
            ...prev,[event.target.name]:event.target.value,
            accountType
        }))
    }
















  return (
    <div className=' w-11/12 max-w-maxContent mx-auto '>

           <div className=' flex flex-row '>

                    <div className='flex flex-col w-[50%] justify-start items-start gap-6'>
                        <h1 className=' text-3xl text-richblack-5 font-inter font-semibold'> Join the millions learning to code with StudyNotion for free</h1>
                         <p className=' text-richblack-200 font-normal text-lg '>Build skills for today, tomorrow, and beyond. <StyleText text={"Education to future-proof your career."}/> </p>
                        
                        <div className=' bg-richblack-800  rounded-full p-1 flex flex-row '> 

                                <button onClick={()=>{setAccountType("Student")}} className={` px-5 py-2 ${accountType === "Student" ? 
                                (" bg-richblack-900   text-richblack-5 rounded-full") : (" text-richblack-200")}`}>
                                    Student
                                </button>

                                <button onClick={()=>{setAccountType("Instructor")}} className={` px-5 py-2 ${accountType === "Instructor" ? 
                                (" bg-richblack-900  text-richblack-5 rounded-full") : (" text-richblack-200")}`} >
                                    Instructor
                                </button>

                        </div>

                        <div className=' flex flex-col w-full   gap-5'>
                             <div    className=' flex gap-3 '>
                                <label>
                                <p className=' flex text-richblack-5'>First Name <CgAsterisk className=' text-pink-200' /></p>
                                <input type='text' placeholder='First Name' name='firstName' value={formData.firstName} onChange={changeHandler} className=' bg-richblack-800 p-3 rounded-lg lg:w-[212px] lg:h-[48px] outline-none text-richblack-5'  />
                             </label>
                             <label>
                                <p className=' flex text-richblack-5'>Last Name <CgAsterisk className=' text-pink-200' /></p>
                                <input type='text' placeholder='Last Name' value={formData.lastName} onChange={changeHandler} className=' bg-richblack-800 p-3 rounded-lg lg:w-[212px] lg:h-[48px] outline-none text-richblack-5'  />
                             </label>
                             </div>

                             <label className=' w-full'>
                                <p className=' flex text-richblack-5'>Email <CgAsterisk className=' text-pink-200' /></p>
                                <input  type='email' placeholder='Email' value={formData.email} onChange={changeHandler} className=' bg-richblack-800 p-3 rounded-lg w-full  lg:h-[48px] outline-none text-richblack-5'  />
                             </label>
                        </div>


                    </div>

                    <div className=''>


                    </div>


           </div>

    </div>
  )
}

export default SignUp