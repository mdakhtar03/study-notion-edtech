import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const MyProfile = () => {
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate() 
  return (
    <div>
        <h1> My Profile </h1>
        
        {/* Section 1 */}
        <div>
            <div>
                <img src={`${user?.image}`} alt={`profile-${user?.firstName}`}
                    className=' aspect-square w-20 rounded-full object-cover'
                />

                <div>
                        <p> {user?.firstName + " " + user?.lastName} </p>
                        <p> {user?.email} </p>
                </div>
            </div>

        <IconBtn text={"Edit"} onclick={()=>navigate("/dashboard/settings")}/>
        </div>

        {/* Section 2 */}
        <div>
            <div>
                <p></p>
                <IconBtn/>
            </div>
            <p>

            </p>
        </div>

    </div>
  )
}

export default MyProfile