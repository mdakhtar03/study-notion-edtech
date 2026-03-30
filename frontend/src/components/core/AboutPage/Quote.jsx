import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

const Quote = () => {
  return (
    <div className=' ring-richblack-100 text-4xl font-semibold text-center flex'>
    <RiDoubleQuotesL />
      <div>  We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}  />
        ,<span className=' expertise' > {" "} expertise</span>,
        and community to create an <span className='unparalleled'> {" "} unparalleled educational experience.</span> </div> 
        <RiDoubleQuotesR />
    </div>
  )
}

export default Quote