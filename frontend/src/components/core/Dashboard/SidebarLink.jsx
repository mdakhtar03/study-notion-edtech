import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
const SidebarLink = ({iconName,link}) => {
    const  Icon = Icons[iconName]
    const location = useLocation()
    const dispatch = useDispatch()
    
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname)
    }
  return (
    <NavLink to={link.path} className={` relative text-richblack-300 text-lg px-8 py-2 font-medium ${matchRoute(link.path) ? 
    " bg-yellow-800 text-yellow-50 " : " bg-opacity-0" }`}>
     <span className={`absolute  ${matchRoute(link.path) ? " opacity-100" : " opacity-0"} `}></span> 
    
     <div className=' flex items-center gap-2'>
           <Icon />
            <span> {link.name} </span>
     </div>
   
   
    </NavLink>
  )
}

export default SidebarLink