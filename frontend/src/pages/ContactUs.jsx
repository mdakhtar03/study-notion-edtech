import React, { useEffect, useState } from 'react'
import { IoIosChatbubbles } from "react-icons/io";
import { FaEarthAfrica } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import CountryCode from "../data/countrycode.json"
import Footer from '../components/common/Footer';
import { apiConnector } from '../services/apiconnector';
import {CONTACT_US_ENDPOINT} from "../services/apis"
import toast from 'react-hot-toast';
import Spinner from '../components/common/Spinner';


const ContactUs = () => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful  },} = useForm();

    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset(
                {
                    firstName:"",
                    lastName:"",
                    email:"",
                    number:"",
                }

            )
        }
    },[reset,isSubmitSuccessful])

    //Api call
    const onSubmit = async (data)=>{
            try {
                setLoading(true)
                const response = await apiConnector("POST", CONTACT_US_ENDPOINT.CONTACT_US_API,data)
                console.log("Response from from", response)
                setLoading(false)
                toast.success("Message Sent")

            } catch (error) {
                toast.error(error.message)
            }
    } 


  return (
    <div className=' mt-10'>
        <div className=' w-11/12 mx-auto max-w-maxContent  flex justify-center gap-x-10 '>
                {/* Call Us Section */}
                <div className=' sm:w-full lg:w-[30%] bg-richblack-800 p-6 h-fit flex flex-col gap-y-6 text-richblack-100 rounded-xl'>
                    <div className=' flex items-start gap-2 '>
                        <IoIosChatbubbles className=' text-xl'/>
                        <div>
                            <h5 className=' text-lg font-semibold text-richblack-5'>Chat on us</h5>
                            <p className=' text-richblack-200 text-sm font-medium'> Our friendly team is here to help. <br/> @mail address  </p>
                        </div>
                    </div>

                    <div className=' flex items-start gap-2 '>
                        <FaEarthAfrica  className=' text-xl text-richblack-300' />
                        <div>
                            <h5 className=' text-lg font-semibold text-richblack-5'>Visit us</h5>
                            <p className=' text-richblack-200 text-sm font-medium'> Come and say hello at our office HQ. <br/> Here is the location/ address </p>
                        </div>
                    </div>
                    <div className=' flex items-start gap-2 '>
                        <IoCall className=' text-xl'/>
                        <div>
                            <h5 className=' text-lg font-semibold text-richblack-5'>Call us</h5>
                            <p className=' text-richblack-200 text-sm font-medium'> Mon - Fri From 8am to 5pm <br/> +123 456 7890 </p>
                        </div>
                    </div>
                </div>


                    {/* Form */}
                 {
                    loading ? ( <Spinner/> ) : (
                             <div className=' text-richblack-5 w-[50%] flex flex-col gap-5 border border-richblack-600 rounded-xl p-8'>
                        <h1 className=' text-4xl text-richblack-5 font-semibold'> Got a Idea? We've got the skills Let's team up </h1>
                        <p className=' text-richblack-300 font-medium text-base'> Tell us more about yourself and what you're got in mind </p>
                        
                        
                        <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-3'>

                            <div className='flex gap-6'>
                                <div className='flex-1 flex flex-col'>
                                    <label htmlFor='firstName' > First Name </label>
                                    <input placeholder='First name' className=' w-full h-12 bg-richblack-800 p-3 outline-none main-shadow rounded-lg' {...register("firstName", { required: true })} type='text' name='firstName'   id='firstName' />
                                    {errors.firstName && <p>Name is required</p>}
                                </div>

                                <div className=' flex-1 flex flex-col'>
                                            <label htmlFor='laststName' > Last Name </label>
                                            <input placeholder='Last name' className=' w-full h-12 bg-richblack-800 p-3 outline-none main-shadow rounded-lg' {...register("lastName", { required: true })} type='text'   id='lastName' />
                                            {errors.lastName && <p>Name is required</p>}
                                </div>
                                
                            </div>
                            <div className=' flex flex-col'>
                                    <label htmlFor='email'>Email Address</label>
                                    <input placeholder='Enter email address' className='h-12 bg-richblack-800 p-3 outline-none main-shadow rounded-lg' type='email' id='email' {...register("email",{required:true})} />
                                    {errors.email && <span>Email required</span>}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <div className=' flex gap-6'>
                                    <select className=' w-14 h-12 bg-richblack-800 p-3 outline-none main-shadow rounded-lg'
                                    {...register("code")}>
                                    {
                                        CountryCode.map((data,index)=>{
                                            return (<option key={index}> {data.code} - {data.country} </option>)
                                        })
                                    }
                                </select>
                                <input placeholder='1234567890' type='tel' id='phoneNumber'  {...register("number")} className=' no-spinner h-12 w-full bg-richblack-800 p-3 outline-none main-shadow rounded-lg' />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor='message'> Message </label>
                                <textarea placeholder='Enter message' id='message' className=' w-full h-28 rounded-lg p-3 bg-richblack-800 outline-none' />
                            </div>

                            <button type="submit" className=' bg-yellow-50 p-3 rounded-lg main-shadow text-richblack-900
                             font-medium text-base'>Send Message</button>
                        </form>
                </div>
                    )
                 }
        </div>
        <div className=' my-40'>
            Review from Other learners
        </div>
        <Footer/>
    </div>
  )
}

export default ContactUs