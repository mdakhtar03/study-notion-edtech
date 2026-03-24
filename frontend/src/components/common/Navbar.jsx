import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from "../core/Auth/ProfileDropDown"
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'

const Navbar = () => {

    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const {totalItems} = useSelector((state)=>state.cart)

    const [subLinks, setSubLinks] = useState([])
    
    const fetchSublinks = async () => {
            try{
                const result = await apiConnector("GET",categories.CATEGORIES_API)
                console.log("BASE_URL:", process.env.REACT_APP_BASE_URL);
                console.log("Result", result)
                setSubLinks(result?.data?.allCategorys)
                console.log("subLinks", subLinks)
                
            }
            catch(error){
                console.log("Could not fetch the category list")
            }
        }

    useEffect(()=>{
        fetchSublinks();
    },[])
    const location = useLocation();
    const matchRoute=(route)=>{
            return matchPath({path:route,end: true}, location.pathname) 
    }

    
  return ( 
    <div className=' flex h-14 items-center justify-center border-b border-richblack-700 mb-12'>
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
                                data.title === "Catalog"? (
                                <div>
                                    <p>{data.title}</p>
                                </div>) : (
                                            <Link  className={`${ matchRoute(data.path) ? (" text-yellow-25"):(" text-richblue-25")}`} to={data.path}>{data.title}</Link>
                                            )
                            }
                        </li>
                    )))}
            </ul>
        </nav>
        

        {/* Login signUp DashBoard */}
    
          <div className='flex gap-4 items-center '>
                    {
                        user && user?.accountType !== "Instructor" && 
                            (<Link to={"/dashboard/cart"} className=' relative'>
                             <FaCartShopping className=' text-richblack-25' />
                             {
                                totalItems > 0 && (<span className=' absolute animate-bounce top-0 '>{totalItems}</span>)
                             }
                            </Link>
                            )   
                    }

                    {
                        token === null && (<Link to={"/login"}> <button className=' rounded font-medium text-richblack-100 border border-richblack-700 py-2 px-3'>Login</button> </Link>)
                    }
                    {
                        token === null && (<Link to={"/signup"}> <button className=' rounded font-medium text-richblack-100 border border-richblack-700 py-2 px-3'>SignUp</button> </Link>)
                    }
                    {
                        token !== null && (<ProfileDropDown/>)
                    }
          </div>          

        </div>
    </div>
  )
}

export default Navbar