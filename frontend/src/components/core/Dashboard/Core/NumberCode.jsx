import React from 'react'
import Code from "../../../../data/countrycode.json"
const NumberCode = () => {
  return (
    <div>
        <select className=' bg-richblack-700 p-3 rounded-lg outline-none w-20'> { Code.map((code,index)=>(
            <option key={index} > {code.code} - {code.country}   </option>
        )) 
                 }   
        </select>
    </div>
  )
}

export default NumberCode