import React, { useState } from 'react'
import StyleText from "./core/StyleText"
import { CgAsterisk } from "react-icons/cg";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { apiConnector } from '../services/apiconnector';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { setToken } from '../reducer/slices/authSlice';
import { setUser } from '../reducer/slices/profileSlice';
import LoginImage from "../assets/Images/login.webp"
import FrameImage from "../assets/Images/frame.png"
import { Link } from 'react-router-dom';

const Login = () => {

    const [state,setState] = useState("Student");
    const [passwordShow , setPasswordShow] = useState(false)
    const [formData, setFormData] = useState({
        email:"",password:""
    })

    const dispatch = useDispatch();
    // const navigate = useNavigate();

function changeHandler(event){
    setFormData((prevData)=>({
        ...prevData, [event.target.name]:event.target.value
    }))
}

async function submitHandler(event)
{
    event.preventDefault();
    console.log(formData);

    try {
        const response = await apiConnector("POST","http://localhost:4000/api/v1/auth/login",formData);
        console.log(response.data);
        //  store token
    localStorage.setItem("token", JSON.stringify(response.data.token));


    // store user
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // redux 
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user))



    } catch (error) {
        console.log("Error while login ", error)
    }
}


  return (


    <div className=' w-11/12 flex justify-between items-center relative mx-auto max-w-maxContent'>
        <div className=' w-[50%] flex flex-col items-start gap-8'>
            <h1 className=' text-3xl text-richblack-5'>Welcome Back</h1>
           <div ><p className=' font-normal text-base text-richblack-5'>Bulid skills for today, tomorrow, and beyond. </p> <StyleText text={"Education to future-proof your career"}/> </div> 
        
        
        <div className='flex bg-richblack-800 justify-start gap-2 rounded-full p-1'>
            <button onClick={()=>{setState("Student")}} className={` px-5 py-2 ${state === "Student" ? 
            (" font-medium text-richblack-5 text-base bg-richblack-900 rounded-full ") : (" text-richblack-200") }`}>Student</button>
            
            <button onClick={()=>{setState("Instructor")}} className={`  px-5 py-2  ${state === "Instructor" ? 
            (" font-medium text-richblack-5 text-base bg-richblack-900 rounded-full ") : (" text-richblack-200") }`}>Instructor</button>

        </div>
        
            <form onSubmit={submitHandler} className=' flex flex-col text-richblack-5 gap-5'>
               <div>
                 <label className=' flex '>Email Address <CgAsterisk className=' text-pink-200' /> </label>
                <input type='email' name='email' placeholder='Enter email id' onChange={changeHandler} value={formData.email}  required={true} className=' bg-richblack-800 p-3 rounded-lg lg:w-[444px] lg:h-[48px] outline-none'/>
               </div>

                <div className=' flex flex-col relative'>
                    <label className=' flex '>Password <CgAsterisk className=' text-pink-200' /> </label>
                <input onChange={changeHandler} name='password' value={formData.password} type={passwordShow ? "password" : "text" }   placeholder='Enter Password' className=' bg-richblack-800 p-3 rounded-lg lg:w-[444px] lg:h-[48px] outline-none'/> 
                <div onClick={()=>{setPasswordShow(!passwordShow)}} className=' absolute right-3 top-10 cursor-pointer'>
                    {
                        passwordShow ? (<LuEyeClosed />):(<LuEye />)
                    }
                </div>
                <Link to={"/forgot-password"} className=' self-end text-blue-100 font-normal text-xs font-inter' >Forgot Password</Link>
                </div>

                
                <button className=' bg-yellow-50 rounded-lg font-medium text-richblack-900 px-3 py-2 mt-6'>Sign In</button>
            </form>
        
        </div>

        <div className=' relative'>
            <img src={LoginImage} alt='LoginImage' className=' -top-2.5 -left-2.5 absolute'/>
            <img src={FrameImage} alt='' className=''/>
        </div>
        

        
    </div>
  )
}

export default Login