import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline  } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeCart } from '../../../../reducer/slices/cartSlice';


const RenderCartCourses = () => {
    const {cart} = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
    
  return (
    <div>
            {
                cart.map((course,index)=>(
                    <div key={index}>
                        <div>
                            <img src={course?.thumbnail} alt='' />
                            <div>
                                <p> {course?.courseName} </p>
                                <p> {course?.category?.name} </p>
                                <div> 
                                    <span> 4.8 </span>
                                    <ReactStars 
                                        count={5} 
                                        size={20} 
                                        activeColor="#E7C009"
                                        isHalf={true} 
                                        value={4.8} 
                                        halfIcon={<IoIosStarHalf />}
                                        fullIcon={<IoIosStar />}
                                        emptyIcon={<IoIosStarOutline />}
                                    />

                                   <span> {course?.ratingAndReviews.length} Ratings </span>     

                                 </div>

                            </div>
                        </div>
                        <div>
                            <button onClick={()=>dispatch(removeCart(course._id))}>
                                <RiDeleteBin6Line /> <span> Remove </span> 
                            </button>
                            <p> {course?.price} </p>
                        </div>
                    </div>
                ))
            }
    </div>
  )
}

export default RenderCartCourses