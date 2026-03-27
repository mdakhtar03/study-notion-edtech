import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
    totalItems :  localStorage.getItem("totalItems") ? (JSON.parse(localStorage.getItem("totalItems"))):(0),

    total :  localStorage.getItem("total") ? (JSON.parse(localStorage.getItem("total"))):(0),

    cart :  localStorage.getItem("cart") ? (JSON.parse(localStorage.getItem("cart"))):[]
    
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        //add to Cart
        addTOcart: (state,action)=>{
           const course = action.payload
           const index = state.cart.findIndex((item)=> item._id === course._id)
           if(index>=0)
           {
            toast.error("Course already in cart")
            return
           }
           //if the course is not in the cart, add it to the cart
           state.cart.push(course)
           //Update the total quantity and price
           state.totalItems++
           state.total += course.price
           //Update to localStorage
           localStorage.setItem("cart",JSON.stringify(state.cart))
           localStorage.setItem("total",JSON.stringify(state.total))
           localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
           //show toast
           toast.success("Course added to cart")
        },
        //removefromCart
        removeCart(state,action){
            const course = action.payload
            state.cart = state.cart.filter((item)=> course._id !== item._id )
            
            state.totalItems = state.cart.length
            state.total -= course.price

            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

            toast.success("Course Removed")
           
        },

        //resetCart
        resetCart(state){
            state.cart = []
            state.total = 0
            state.totalItems = 0
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }

        
    }
})

export const {addTOcart,removeCart,resetCart} = cartSlice.actions;

export default cartSlice.reducer