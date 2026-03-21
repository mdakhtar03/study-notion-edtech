import React from 'react'
import { Link } from 'react-router-dom'

const FooterDataCard = ({data,link}) => {
    
  return (
    <div className=' text-sm font-normal text-richblack-400  hover:font-medium hover:text-richblack-200'>
    <Link to={link}><p>{data}</p></Link>
    </div>
  )
}

export default FooterDataCard