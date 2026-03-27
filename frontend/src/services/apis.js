const BASE_URL = process.env.REACT_APP_BASE_URL;

//AUTH API
export const AUTH_API ={
    SENDOTP_API: `${BASE_URL}/auth/sendotp`,
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/login`,
    RESETPASSTOKEN_API: `${BASE_URL}/auth/reset-password-token`,
    RESETPASSWORD_API: `${BASE_URL}/auth/reset-password`,
}

//PROFILE API

export const PROFILE_API = {
    GET_USER_DETAILS_API: `${BASE_URL}/profile/getUserDetails`,
    GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/profile/getEnrolledCourse`,
}

//PAYMENTS API
export const PAYMENTS_API = {
    COURSE_PAYMENT_API: `${BASE_URL}/payments/capturePayment`,
    COURSE_VERIFY_API: `${BASE_URL}/payments/verifyPayment`
}


//COURSE API
export const COURSE_API = {
    GET_ALL_COURSE_API: `${BASE_URL}/course/getallcourses`,
    COURSE_DETAILS_API: `${BASE_URL}/course/getCourseDetails`,

    // EDIT_COURSE_API: `${BASE_URL}/course/updatesection`,

    COURSE_CATEGORIES_API: `${BASE_URL}/course/showAllCategories`,

    CREATE_COURSE_API: `${BASE_URL}/course/createCourse`,
    CREATE_SECTION_API: `${BASE_URL}/course/addSection`,
    CREATE_SUBSECTION_API: `${BASE_URL}/course/addSubSection`,

    UPDATE_SECTION_API: `${BASE_URL}/course/updatesection`,
    UPDATE_SUBSECTION_API: `${BASE_URL}/course/updatesubsection`,

    DELETE_SECTION_API: `${BASE_URL}/course/deletesection`,
    DELETE_SUBSECTION_API: `${BASE_URL}/course/deletesubsection`,

    DELETE_COURSE_API:
}



export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/showAllCategories`
};

console.log(BASE_URL);