import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const MyProfile = () => {
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate() 
  return (
    <div  className=' mx-auto max-w-4xl flex flex-col gap-y-6 mb-20'>
        <h1 className=' text-3xl text-richblack-5'> My Profile </h1>
        
        {/* Section 1 */}
        <div className=' flex  justify-between items-center p-6 rounded-lg bg-richblack-800 '>
            <div className='flex   gap-x-5'>
                
                <img src={`${user?.image}`} alt={`profile-${user?.firstName}`}
                    className='  aspect-square w-20 rounded-full object-cover'
                />

                <div className='flex flex-col justify-center gap-y-1 text-richblack-5'>
                        <p className=' font-semibold text-lg'> {user?.firstName + " " + user?.lastName} </p>
                        <p className=' text-richblack-300'> {user?.email} </p> 
                        
                        <p className=' text-richblack-300'>Account type: {" "} { user?.accountType } </p>
                        
                </div>
            </div>
                    <div className='  relative '>
                    
                    <IconBtn isstyle={true} text={"Edit"} onclick={()=>navigate("/dashboard/settings")}/>
                    </div>
                
        </div>

        {/* Section 2 */}
        <div className=' p-6 rounded-lg bg-richblack-800 flex flex-col gap-y-2'>
            <div className=' flex justify-between items-center'>
                <p className=' text-lg font-semibold text-richblack-5'> About </p>
                <IconBtn isstyle={true} text={"Edit"} onclick={()=>navigate("/dashboard/settings")}/>
            </div>
            <p className=' max-w-3xl text-sm  font-light text-richblack-200'>
             {user?.additionalDetails?.about ?? "Write Something about Yourself" }
            </p>
        </div>

        {/* Section 3 */}

        <div className=' p-6 rounded-lg bg-richblack-800 flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'> 
            <p className=' text-lg font-semibold text-richblack-5' >Personal Details</p> 
            <IconBtn onclick={()=> navigate("/dashboard/settings")} text={"Edit"} isstyle={true} />
            </div>

            <div className=' flex justify-between max-w-xl'>
                <div className=' flex flex-col gap-y-4'>
                    <div>
                        <p className=' text-sm text-richblack-300'> First Name </p>
                        <p className=' text-sm font-semibold text-richblack-5'> {user?.firstName} </p>
                    </div>
                    
                    <div>
                        <p className=' text-sm text-richblack-300'> Email </p>
                        <p className=' text-sm font-semibold text-richblack-5'> {user?.email} </p>
                    </div>
                    
                    <div >
                        <p className=' text-sm text-richblack-300'> Gender </p>
                        <p className=' text-sm font-semibold text-richblack-5'> {user?.additionalDetails?.gender ?? "Add Gender"} </p>
                    </div>

                </div>

                <div className=' flex flex-col gap-y-4'>
                        <div>
                            <p className=' text-sm text-richblack-300'> Last Name </p>
                            <p className=' text-sm font-semibold text-richblack-5'> {user?.lastName} </p>
                        </div>

                        <div>
                            <p className=' text-sm text-richblack-300'> Phone Number </p>
                            <p className=' text-sm font-semibold text-richblack-5'> {user?.additionalDetails?.contactNumber ?? "Add Contact Number"} </p>
                        </div>
                        
                        <div>
                            <p className=' text-sm text-richblack-300'> Date Of Birth </p>
                            <p className=' text-sm font-semibold text-richblack-5'> {user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"} </p>
                        </div>
                </div>
            </div>
            

            
        </div>

    </div>
  )
}

export default MyProfile