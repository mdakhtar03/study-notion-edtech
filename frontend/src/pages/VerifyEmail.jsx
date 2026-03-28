import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { LuCircleFadingArrowUp } from "react-icons/lu";
import Spinner from '../components/common/Spinner';
import { sendOtp, signUp } from '../services/operations/authAPI';


const VerifyEmail = () => {
    const navigate = useNavigate();
    const {loading} = useSelector((state)=>state.auth)
    const { signupData } = useSelector((state) => state.auth)
    
    const dispatch = useDispatch()
    const [OTP, setOTP] = useState("")
    
    const {accountType,firstName,lastName,email,password,confirmPassword,} = signupData

    //if data is not present in signupData
    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[])
    const onSubmitHandler = (event)=>{
        event.preventDefault()
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,OTP,navigate))
    }

  return (
    <div>
            {
                loading ? (<div> <Spinner/> </div>) 
                :(
                    <div className=' w-[35%] mx-auto flex flex-col gap-y-6 p-8 '>
                        <h1 className=' text-3xl text-richblack-5  font-semibold '>Verify Email</h1>
                        <p className=' font-normal text-lg text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
                        <form className=' flex flex-col gap-3 w-full ' onSubmit={onSubmitHandler}>



                            <OtpInput 
                                value={OTP}
                                onChange={setOTP}
                                inputStyle={{
                                                width: "48px",
                                                height: "48px",
                                                borderRadius: "8px",
                                                font: "16px"
                                            }}
                                numInputs={6}
                                renderSeparator={<span className=' flex text-richblack-5'>-</span>}
                                containerStyle="flex justify-center gap-2 "
                                renderInput={(props) => <input {...props} 
                                className="   bg-richblack-800 text-white border border-richblack-600
                                        focus:outline-none focus:border-yellow-400"   />}
                                className=" w-full"
                            />







                            <button className=' w-full bg-yellow-50 p-3 rounded-lg font-medium text-base text-richblack-900' type='submit'>
                                Verify Email
                            </button>
                        </form>

                        <div className='flex justify-between'>
                            <Link className='flex items-center text-base font-medium text-richblack-5' to={"/login"}>
                                            <IoIosArrowRoundBack size={24} />  <p>Back to login</p>
                            </Link>

                            <button type='submit' className='flex items-center text-base font-medium text-richblack-5 gap-x-2' 
                            onClick={() => dispatch(sendOtp(email,navigate))}>
                            <LuCircleFadingArrowUp  />
                                Resend OTP
                            </button>
                            
                        </div>

                    </div>
                 )
            }
    </div>
  )
}

export default VerifyEmail