
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    courseSectionData:[],
    courseEntireData:[],
    completedLectures:[],
    totalNoOfLectures:0
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
            state.completedLectures = action.payload
        },
        setTotalNoOfLecture: (state,action)=>{
            state.totalNoOfLectures = action.payload
        },
        updatedCompletedLecture:(state,action)=>{
            state.completedLectures = [...state.completedLectures, action.payload]
        },
    },
})
export const {setCourseSectionData, setCompletedLecture, setEntireCourseData, setTotalNoOfLecture,
                updatedCompletedLecture} = viewCourseSlice.actions
export default viewCourseSlice.reducer