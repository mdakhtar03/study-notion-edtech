import React, { useState } from 'react'
import { MdEditDocument } from "react-icons/md";
const IconBtn = ({
                    text,
                    onclick,
                    children,
                    disabled,
                    outline=false,
                    customClasses,
                    type,
                    isstyle=false,
                    showIcon= true
}) => {
  
  return (
    <button className={`
    ${isstyle ? "bg-yellow-50 flex items-center gap-x-2 h-fit px-5 py-2 rounded-lg text-richblack-900" : ""} ${outline ? "outline":""}
    ${customClasses || ""} outline-yellow-50 rounded-lg flex items-center gap-x-2 justify-center`}  disabled={disabled} onClick={onclick}
     type={type} >
      { showIcon ? (<MdEditDocument  />) : ""}
        {
            children? (<><span> {text} </span> {children} </>) :(text)
        }
    </button>
  )
}

export default IconBtn