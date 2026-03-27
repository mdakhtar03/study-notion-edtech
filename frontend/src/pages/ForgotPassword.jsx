import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { getPasswordResetToken } from '../services/operations/authAPI';
import Spinner from '../components/common/Spinner';

const ForgotPassword = () => {

    const {loading} = useSelector((state)=>state.auth);
    const [emailSent, setEmailSent] = useState(false)
    const [email,setEmail] = useState("")
    const dispatch = useDispatch()
    

    async function handleOnSubmit(e){
        e.preventDefault()
        dispatch(getPasswordResetToken({email,setEmailSent}))
    }



  return (
    <div className=' text-white flex justify-center items-center  w-[40%] mx-auto'>
        {
            loading? (<div> <Spinner/> </div>) :(
                <div className='flex flex-col gap-5 p-8'>
                    <h1 className=' font-semibold text-3xl text-richblack-5 '>

                        {
                            !emailSent ? "ResetPassword" : "Check email"
                        }
                    
                    </h1>
                    <p className=' font-normal text-lg text-richblack-200 '>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :  <>
                                                                        We have sent the reset email to 
                                                                        <span className='text-blue-100'> {email} </span>
                                                                        </>
                        }
                
                    </p>

                    <form className=' flex flex-col gap-7' onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label className='w-full flex flex-col gap-2'>
                                    <p>
                                        Email Address <sup className=' text-pink-200'>*</sup>
                                    </p>
                                    <input className=' text-richblack-5 w-full bg-richblack-800 font-medium shadow-2xl outline-none h-11 rounded-lg p-3'
                                    placeholder='Enter email id' 
                                    required 
                                    type='email' 
                                    name='email' 
                                    value={email} 
                                    onChange={(e)=>{setEmail(e.target.value)} } />
                                </label>)
                        }
                        <button className=' bg-yellow-50 text-richblack-900 font-medium text-base p-3 rounded-lg'
                        type='submit'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>
                    <div>
                        <Link className='flex flex-row flex-start items-center'  to={"/login"}>
                               <IoIosArrowRoundBack  className=' text-3xl'/>  
                               <p>Back to login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword