import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { IoIosArrowRoundBack } from "react-icons/io";
import { resetPassword } from '../services/operations/authAPI';


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
            loading ? <div> Loading... </div> : 
                        (
                            <div className='flex flex-col gap-6'>
                                <h1>Choose  new password</h1>
                                <p>Almost done. Enter your new password and youre all set.</p>
                               <form onSubmit={handleOnSubmit}>
                                 <label className=' relative'>
                                    <p>New password <sup>*</sup> </p>
                                    <input 
                                    className=''
                                    placeholder='Enter new password'
                                    type={`${showPassword ? "text" : "password"}`}
                                    name='password'
                                    value={password}
                                    onChange={handleOnChange}
                                     />
                                     <div onClick={()=>{setShowPassword(!showPassword)}} className=' absolute right-3 top-10 cursor-pointer'>
                                                         {
                                                             showPassword ? (<LuEyeClosed />):(<LuEye />)
                                                         }
                                                     </div>
                                </label>
                                 <label  className=' relative'>
                                    <p>Confirm new password <sup>*</sup> </p>
                                    <input 
                                    className=''
                                    placeholder='Confirm new password'
                                    type={`${showConfirmPassword ? "text" : "password"}`}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                     />
                                        <div onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}} className=' absolute right-3 top-10 cursor-pointer'>
                                                         {
                                                             showConfirmPassword ? (<LuEyeClosed />):(<LuEye />)
                                                         }
                                                     </div>
                                </label>
                                <button className='submit'>
                                    Reset Password
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

export default UpdatePassword