import { useSelector } from "react-redux"
import { FaCheckCircle } from "react-icons/fa";
import CourseInformationForm from "./courseInformation/CourseInformationForm"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
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
  <div className=" flex flex-col mx-auto">
    <div className="flex items-center">
  {steps.map((items, index) => (
    <div key={items.id} className="flex flex-col items-center flex-1">

      {/* Step Circle */}
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full border ${
          items.id === step
            ? "bg-yellow-900 border-yellow-50 text-yellow-50"
            : "bg-richblack-800 border-richblack-700 text-richblack-300"
        }`}
      >
       
        {step > items.id ? <FaCheckCircle /> : items.id}
      </div>
        <p className=" " key={index}> {items.title} </p>

      {/* Line */}
      

    </div>
  ))}
</div>
    
  </div>
    {step === 1 && <CourseInformationForm/>}
    {step === 2 && <CourseBuilderForm/>}
    {/* {step === 3 && <PublishCourse/>} */}
  </>)
}

export default RenderSteps