import { useSelector } from "react-redux"
import { FaCheckCircle } from "react-icons/fa";
import CourseInformationForm from "./CourseInformationForm"
const RenderSteps = () => {

    const {step} = useSelector((state)=>state.course)

    const steps = [
        {
            id:1,
            title: "Course Information"
        },
        {
            id:2,
            title: "Course Builder"
        },
        {
            id:3,
            title: "Publish"
        }
    ]

  return (
  <>
    <div>
        {steps.map ((items)=>(
            <>
                <div key={items.id}>
                    <div  className={`${items.id === step ? 
                    "bg-yellow-900 border-yellow-50 text-yellow-50 rounded-full" : 
                    " bg-richblack-800 text-richblack-300 border-richblack-700 rounded-full"}  `}>
                    {
                        step > items.id ? (<FaCheckCircle />) : (items.id)
                    }
                    </div>
                </div>
                {/* Add dashes b/w labels */}
            </>
        )) }
    </div>
    <div>
        {steps.map((item)=>(
            <p key={item}> {item.title} </p>
        ))}
    </div>
    {step === 1 && <CourseInformationForm/>}
    {/* {step === 2 && <CourseBuilderForm/>}
    {step === 3 && <PublishCourse/>} */}
  </>
  )
}

export default RenderSteps