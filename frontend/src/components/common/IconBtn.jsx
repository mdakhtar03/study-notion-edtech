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
                    isstyle=false
}) => {
  
  return (
    <button className={`
    ${isstyle ? "bg-yellow-50 flex items-center gap-x-2 h-fit px-5 py-2 rounded-lg text-richblack-900" : ""}
    ${customClasses || ""}`}  disabled={disabled} onClick={onclick}
     type={type} >
      <MdEditDocument  />
        {
            children? (<><span> {text} </span> {children} </>) :(text)
        }
    </button>
  )
}

export default IconBtn