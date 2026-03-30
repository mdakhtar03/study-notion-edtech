import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {apiConnector} from "../../services/apiconnector"
import {CONTACT_US_ENDPOINT} from "../../services/apis"
import CountryCode from  "../../data/countrycode.json"
import Spinner from '../common/Spinner';
import toast from 'react-hot-toast';
import { FaChevronDown } from "react-icons/fa";
const ContactUsForm = () => {

    const [loading, setLoading] =useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm  = async(data)=>{
        console.log("Form data",data) 
        console.log("API.....",CONTACT_US_ENDPOINT)
        try {
            setLoading(true)
            const response = await apiConnector("POST",CONTACT_US_ENDPOINT.CONTACT_US_API,data)
            console.log("Response ",response)
            setLoading(false)
            toast.success("Message Sent")
            
        } catch (error) {
            console.log("Error",error.message)
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:""
            })
        }
    },[reset,isSubmitSuccessful])





  return (
    loading ? ( <Spinner/> ) : (<form  onSubmit={handleSubmit(submitContactForm)}>
            <div className=' text-richblack-5 flex flex-col gap-5' >
                
                <div className='flex gap-x-5'>
                    {/* First Name */}
                <div className=' flex flex-col  '>
                    <label className=' self-start'  htmlFor='firstName'>First Name</label>
                    <input  type='text' name='firstName' id='firstName' 
                    placeholder='Enter first name' 
                    {...register("firstName",{required:true})}
                    
                    className=' main-shadow p-3 bg-richblack-800 rounded-lg outline-none'

                    />
                    {
                        errors.firstName && (<span className="text-pink-200">
                            Please enter Your name
                        </span>)
                    }
                </div>



                {/* Last Name */}
                <div className=' flex flex-col '>
                    <label className=' self-start'  htmlFor='lastName'>Last Name</label>
                    <input type='text' name='lastName' id='lastName' 
                    placeholder='Enter last name' 
                    
                    className=' p-3 main-shadow bg-richblack-800 rounded-lg outline-none'
                    {...register("lastName",{required:true})}
                    />
                    {
                        errors.lastName && (<span className=' text-pink-200'>Enter your last name</span>)
                    }
                </div>
                </div>


                {/* Email */}
                <div className='flex flex-col'>
                    <label className=' self-start' htmlFor='email'>Email Address</label>
                    <input 
                            type='email' 
                            name='email' 
                            id='email' 
                            placeholder='Enter Email'
                            {...register("email",{required:true})}
                            className=' p-3 main-shadow bg-richblack-800 rounded-lg outline-none'
                     />
                     {
                        errors.email && (<span className=" text-pink-200">Please enter your email address</span>)
                     }
                </div>
                
                {/* Phone No */}
                     <div className='flex flex-col gap-2'>
                        <label className=' self-start'>Phone Number</label>
                        <div className='flex flex-row gap-3'>
                            {/* Dropdown */}
                            <div className='relative w-20'>

                            <select name='dropdown' id='dropdown'
                             className=' bg-richblack-800 main-shadow w-14 rounded-lg outline-none p-3 '
                             {...register("countrycode",{required:true})} > 
                            {
                                CountryCode.map((code,index)=>(
                                    <option value={code.code} key={index}> {code.code} - {code.country} </option>
                                ))
                            }
                            
                             </select>
                                <div className="pointer-events-none absolute right-2 top-4">
                                    <FaChevronDown className="text-richblack-25 text-sm" />
                                </div>
                            </div>
                            <input type='number' placeholder='1234567890' id='phonenumber' 
                            name='phonenumber' className=' no-spinner main-shadow bg-richblack-800 w-[90%] rounded-lg outline-none p-3'
                                {...register("phoneNo", {required:true, maxLength:{value:10, message:"Invalid Phone Number"},
                                minLength:{value:8,message: "Invalid Phone Number"}} )}
                            />
                            {errors.phoneNo && (<span className=' text-pink-200'>{errors.phoneNo.message || "Enter your phone number"} </span>) }
                        </div>
                     </div>


                {/* Message */}
                <div className='flex flex-col'>
                    <label className=' self-start' htmlFor='message'>Message</label>
                    <textarea name='message' id='message' rows='7' 
                    placeholder='Enter your message'
                    className=' p-3 bg-richblack-800 rounded-lg outline-none'
                    {...register("message",{required:true})}
                    />
                    {

                     errors.message && (<span className=' text-pink-200' >Please enter your message</span>)
                    }
                </div>
                <button type='submit' className=' bg-yellow-50 font-medium text-richblack-900 
                 p-3 rounded-lg text-base  hover:scale-95 transition-all duration-200'>Send Message</button>
            </div>
    </form>)
    
  )
}

export default ContactUsForm