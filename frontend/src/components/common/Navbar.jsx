import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'

const Navbar = () => {

    const location = useLocation();
    const matchRoute=(route)=>{
            return matchPath({path:route,end: true}, location.pathname)
    }


  return (
    <div className=' flex h-14 items-center justify-center border-b border-richblack-700'>
        <div className=' flex w-11/12 max-w-maxContent items-center justify-between'>

        {/* Image */}

        <Link to={"/"}>
            <img src={Logo} alt='' width={160} height={32}/>
        </Link>


        {/* Nav Links */}
        <nav>
            <ul className='flex gap-6 text-richblack-25'>
                    {NavbarLinks.map((data,index)=>(
                         (<li key={index}>
                            {
                                data.title === "Catalog"? (<div></div>) : (
                                            <Link  className={`${ matchRoute(data.path) ? (" text-yellow-25"):(" text-richblue-25")}`} to={data.path}>{data.title}</Link>
                                            )
                            }
                        </li>
                    )))}
            </ul>
        </nav>
        

        {/* Login signUp DashBoard */}
    
          <div className='flex gap-4 items-center '>

          </div>          

        </div>
    </div>
  )
}

export default Navbar