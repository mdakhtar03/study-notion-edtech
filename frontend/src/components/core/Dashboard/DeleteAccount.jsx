import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
const DeleteAccount = () => {
  return (
    <div>
           <div className=' bg-pink-900 gap-4  flex p-6 rounded-lg'>
                    <div className=' bg-pink-700 p-4 rounded-full  h-fit'><RiDeleteBin6Line className=' text-pink-200 text-2xl'/></div>
                    <div className=' flex flex-col justify-start gap-y-1'>
                        <h3 className=' text-pink-5 text-lg font-bold'>Delete Account</h3>
                        <div className='text-pink-25'>
                            <p>Would you like to delete account?</p>
                            <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                        </div>
                        <button className=' text-pink-300 italic self-start'>I want to delete my account.</button>
                    </div>
            </div>
    </div>
  )
}

export default DeleteAccount