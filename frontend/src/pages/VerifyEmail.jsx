import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { LuCircleFadingArrowUp } from "react-icons/lu";

const VerifyEmail = () => {

    const {loading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const [OTP, setOTP] = useState("")

    const onSubmitHandler = (event)=>{
        event.preventDefault()
        // dispatch(SignUp)
    }

  return (
    <div>
            {
                loading ? (<div>Loading..</div>) 
                :(
                    <div>
                        <h1>Verify Email</h1>
                        <p>A verification code has been sent to you. Enter the code below</p>
                        <form onSubmit={onSubmitHandler}>
                            <OtpInput 
                                value={OTP}
                                onChange={(value)=>setOTP(value)}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                            />
                            <button type='submit'>
                                Verify Email
                            </button>
                        </form>

                        <div>
                            <Link to={"/login"}>
                                            <IoIosArrowRoundBack />  <p>Back to login</p>
                            </Link>

                            <button onClick={()=>dispatch()}>
                            <LuCircleFadingArrowUp />
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