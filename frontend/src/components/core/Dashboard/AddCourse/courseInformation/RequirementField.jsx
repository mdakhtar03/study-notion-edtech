import React, { useEffect, useState } from 'react'

const RequirementField = ({name,label,register, setValue, getValues,errors}) => {
    const [requirement, setRequirement] = useState("")
    const [requirementList, setRequirementList] = useState([])

    const handleAddRequirement = ()=> {
        if(requirement){
            setRequirementList([ ...requirementList,requirement])
            setRequirement("")
        }
    } 
    const handleRemoveRequirement = (index)=> {
        const updatedRequirementList = [...requirementList]
        updatedRequirementList.splice(index,1)
        setRequirementList(updatedRequirementList)
    }

    useEffect(()=>{
        register(name,{required:true
        })
    },[])

    // useEffect(()=>{
    //     setValue(name,requirementList)
    // },[requirementList])

  return (
    <div>
        <label htmlFor={name}> {label} <sup>*</sup> </label>
        <div>
            <input type='text' id={name} 
            placeholder="Enter Benefits of the course"
            value={requirement}
            className="p-3 outline-none bg-richblack-700 rounded-lg w-full"
            onChange={(e)=> setRequirement(e.target.value)} />

            <button type='button' onClick={handleAddRequirement}>
                Add
            </button>
        </div>
        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement,index)=>(
                            <li key={index}>
                                <span> {requirement} </span>
                                <button type='button'
                                onClick={()=>handleRemoveRequirement(index)}>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {errors[name] && (<span> {label} is Required </span>)}
    </div>
  )
}

export default RequirementField