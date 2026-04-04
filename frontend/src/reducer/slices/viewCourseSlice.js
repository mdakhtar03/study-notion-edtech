
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    courseSectionData:[],
    courseEntireData:[],
    completedLecture:[],
    totalNoOfLecture:0
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData: (state,action)=>{
            state.courseSectionData = action.payload
        },
        setEntireCourseData: (state,action)=>{
            state.courseEntireData = action.payload;
        },
        setCompletedLecture: (state,action)=>{
            state.completedLecture = action.payload
        },
        setTotalNoOfLecture: (state,action)=>{
            state.totalNoOfLecture = action.payload
        },
        updatedCompletedLecture:(state,action)=>{
            state.completedLecture = [...state.completedLecture, action.payload]
        },
    },
})
export const {setCourseSectionData, setCompletedLecture, setEntireCourseData, setTotalNoOfLecture,
                updatedCompletedLecture} = viewCourseSlice.actions
export default viewCourseSlice.reducer