import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

const Cart = () => {
   const {cart,total, totalItem} = useSelector((state)=>state.cart)
   
  return (
    <div>
        <h1> Your Cart </h1>
        <p> {totalItem} {" "} Courses in cart</p>
        {
            totalItem>0 ? (<div>
                <RenderCartCourses  />
                <RenderTotalAmount/>
            </div>) : (<p>Your Cart is Empty</p>)
        }
    </div>
  )
}

export default Cart