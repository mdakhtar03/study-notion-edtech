import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { RiDashboard2Line } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { logout } from '../../../services/operations/authAPI';

const ProfileDropDown = () => {
  
  const { user } = useSelector((state) => state.profile)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <div className="relative" ref={ref}>
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1"
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-7 rounded-full object-cover"
        />
        <IoIosArrowDown className="text-sm text-richblack-100" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[118%] right-0 z-10 divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border border-richblack-700 bg-richblack-800">
          
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
          >
            <div className="flex items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <RiDashboard2Line className="text-lg" />
              Dashboard
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>

        </div>
      )}
    </div>
  )
}

export default ProfileDropDown