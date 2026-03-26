import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { getPasswordResetToken } from '../services/operations/authAPI';

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
    <div className=' text-white flex justify-center items-center'>
        {
            loading? (<div>Loading...</div>) :(
                <div>
                    <h1>

                        {
                            !emailSent ? "ResetPassword" : "Check email"
                        }
                    
                    </h1>
                    <p>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p>
                                        Email Address <sup className=' text-pink-200'>*</sup>
                                    </p>
                                    <input className=' text-richblack-900'
                                    placeholder='Enter email id' 
                                    required 
                                    type='email' 
                                    name='email' 
                                    value={email} 
                                    onChange={(e)=>{setEmail(e.target.value)} } />
                                </label>)
                        }
                        <button
                        type='submit'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>
                    <div>
                        <Link to={"/login"}>
                               <IoIosArrowRoundBack />  <p>Back to login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword