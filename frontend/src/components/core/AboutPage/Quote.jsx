import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className=' ring-richblack-100'>
        We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}  />
        <span className=' ' >{" "}expertise</span>
        and community to create an <span className=''> {" "} unparalleled educational experience.</span>
    </div>
  )
}

export default Quote