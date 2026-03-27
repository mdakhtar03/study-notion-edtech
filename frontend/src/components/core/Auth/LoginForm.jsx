import React, { useState } from 'react'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';


const LoginForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData,setFormData] = useState({
        email:"",password:""
    })

    const [showPassword, setShowPassword] = useState(false)
    const {email, password} = formData
    const handleOnChange=(e)=>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault()
        dispatch(login(email,password,navigate))
    }
  return (
    <form onSubmit={handleOnSubmit} className=' mt-6 flex w-full flex-col gap-y-4 '>
        <label className='w-full'>
            <p className='mb-1 text-sm text-richblack-5'>Email Address <sup className='text-pink-200'>*</sup> </p>
            <input 
              required
              type='email'
              name='email'
              value={email}
              onChange={handleOnChange}
              placeholder='Enter email address'
              className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 outline-none'
             />
        </label>
        <label className='relative'>
            <p className='mb-1 text-sm text-richblack-5'>Password <sup className=' text-pink-200'>*</sup> </p>
            <input
                required
                type={showPassword ? "text" : "password"} 
                name='password'
                value={password}
                onChange={handleOnChange}
                placeholder='Enter Password'
                className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 outline-none'
                />
        <span onClick={()=> setShowPassword(!showPassword)} className=' absolute right-3 top-10 z-10 cursor-pointer'>
            {
                showPassword ? (<LuEyeClosed className=' text-richblack-5 ' size={20} />):(<LuEye className=' text-richblack-5'  size={20}/>)
            }
        </span>
        </label>
        
        <Link to={"/forgot-password"} className=' self-end text-blue-100 font-normal text-xs font-inter' >Forgot Password</Link>
     <button className=' bg-yellow-50 rounded-lg font-medium text-richblack-900 px-3 py-2 mt-6'>Sign In</button>
    </form>
    
  )
}

export default LoginForm