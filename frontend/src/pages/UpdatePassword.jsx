import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { IoIosArrowRoundBack } from "react-icons/io";
import { resetPassword } from '../services/operations/authAPI';
import Spinner from '../components/common/Spinner';


const UpdatePassword = () => {
  const {loading} = useSelector((state)=>state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData,setFormData] = useState({
    password:"", confirmPassword:""
  })

  const dispatch = useDispatch()

function handleOnChange(e){
    setFormData((prev)=>({
        ...prev, [e.target.name]:e.target.value
    }))
}

const {password,confirmPassword} = formData

const location = useLocation()
const token = location.pathname.split("/").at(-1)

function handleOnSubmit(e){
    e.preventDefault()
    dispatch(resetPassword({password,confirmPassword,token}))
}


  return (
    <div>
        {
            loading ? <div> <Spinner/> </div> : 
                        (
                            <div className='flex flex-col justify-center  gap-6 w-[35%] mx-auto p-8'>
                                <h1 className=' font-semibold text-3xl text-richblack-5'>Choose  new password</h1>
                                <p className=' font-normal text-lg text-richblack-100 '>Almost done. Enter your new password and youre all set.</p>
                               <form className=' flex flex-col gap-5' onSubmit={handleOnSubmit}>
                                 <label className=' relative flex flex-col gap-1'>
                                    <p className=' font-normal text-sm text-richblack-5 '>New password <sup className=' text-pink-100'>*</sup> </p>
                                    <input 
                                    className=' bg-richblack-800 p-3 w-full rounded-lg text-richblack-5 outline-none'
                                    placeholder='Enter new password'
                                    type={`${showPassword ? "text" : "password"}`}
                                    name='password'
                                    value={password}
                                    onChange={handleOnChange}
                                     />
                                     <div onClick={()=>{setShowPassword(!showPassword)}} className=' absolute right-3 top-10 cursor-pointer'>
                                                         {
                                                             showPassword ? (<LuEyeClosed className=' text-richblack-5' />):(<LuEye className=' text-richblack-5' />)
                                                         }
                                                     </div>
                                </label>
                                 <label  className=' relative flex flex-col gap-1'>
                                    <p className='font-normal text-sm text-richblack-5'>Confirm new password <sup className=' text-pink-100'>*</sup> </p>
                                    <input 
                                    className=' bg-richblack-800 p-3 w-full rounded-lg text-richblack-5 outline-none'
                                    placeholder='Confirm new password'
                                    type={`${showConfirmPassword ? "text" : "password"}`}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                     />
                                        <div onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}} className=' absolute right-3 top-10 cursor-pointer'>
                                                         {
                                                             showConfirmPassword ? (<LuEyeClosed className=' text-richblack-5' />):(<LuEye  className=' text-richblack-5'/>)
                                                         }
                                                     </div>
                                </label>
                                <button className=' bg-yellow-50 rounded-lg p-3 text-base font-medium text-richblack-900'>
                                    Reset Password
                                </button>
                               </form>
                               <div>
                                        <Link className=' flex items-center text-richblack-5 font-medium'  to={"/login"}>
                                            <IoIosArrowRoundBack size={24} />  <p>Back to login</p>
                                        </Link>
                                </div>
                            </div>
                        )
        }
    </div>
  )
}

export default UpdatePassword