import { useEffect, useState } from "react"
import { RxCrossCircled } from "react-icons/rx";

const TagsInput = ({label, name,placeholder,register,errors,setValue,getValues}) => {


  
  const [tagList,setTagList] = useState([]);


function handleKeyDown(event){
  if(event.key === "Enter"){
     event.preventDefault();

     const input = event.target.value.trim();
     if(input !== ""){
      const updatedTag = [...tagList, input];
      setTagList(updatedTag);
      setValue(name,updatedTag);
     }
     event.target.value = "";
  }
}

 function tagBuilder(event)
  {
    
      const input = event.target.value;

     if(input.includes(",")){
      const newTag = input.replace(",","").trim();
      if(newTag !== ""){
        const updatedTag = [...tagList,newTag]
        setTagList(updatedTag)
        //update form value
        setValue(name,updatedTag);
      }
      event.target.value="";
     }
    }
 

 useEffect(()=>{
  register(name,{required:true})
  console.log(name);
 },[])
  
function removeTag(indexToRemove){

  const updatedTags = tagList.filter((_,index)=>(indexToRemove !== index));
  setTagList(updatedTags);
  setValue(name,updatedTags);
}



  return (
    <div>
        <label> {label} </label>
        <input className=" p-3 outline-none bg-richblack-700 rounded-lg w-full" 
        placeholder={placeholder}
          onChange={tagBuilder} onKeyDown={handleKeyDown}/>
         {
          errors[name] && <span> Add Tag to your course </span>
         }
         
         
         <div>
          {
            tagList.map((value,index)=>(

              <span className="bg-richblack-500 p-2 rounded-full mr-2 inline-flex items-center gap-1" 
              key={index}> {value} <button onClick={(e)=> {e.preventDefault(); removeTag(index)} }> <RxCrossCircled /> </button> </span>
              
            ))
              

            
          }
         </div>
    </div>
  )
}

export default TagsInput