import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step:2,
    course:null,
    editCourse:false,
    paymentLoading:false
}

const CourseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{
        setStep:(state,action)=>{
            state.step = action.payload
        },
        setCourses: (state,action)=>{
            state.course = action.payload
        },
        setEditCourse: (state,action) =>{
            state.editCourse = action.payload
        },
        setPaymentLoading: (state,action)=>{
            state.paymentLoading = action.payload
        },
        resetCourseState: (state,action)=>{
            state.step = 1
            state.course = null
            state.editCourse = false
        }

    }
})

export const {setStep,setCourses,setEditCourse,setPaymentLoading,resetCourseState } = CourseSlice.actions

export default CourseSlice.reducer