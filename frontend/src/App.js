import "./App.css";
import {Route,Routes} from "react-router-dom"
import Home  from "./pages/Home"
import Navbar from "./components/common/Navbar"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs"
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Sitting from "./components/core/Dashboard/Sitting";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index"
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";

function App() {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
      
        <Route path="/" element={<Home/>}/>

        <Route path="/login" 
        element= { 
        <OpenRoute>
        <Login/>
        </OpenRoute> } />


        <Route path="/signup"
         element= { <OpenRoute><SignUp/></OpenRoute> } />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/update-password/:id" element={<UpdatePassword/>} />
        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="/about" element={<About/>} />
        <Route path="contact" element={ <ContactUs/> } />
        
        <Route path="/dashboard" element={ <PrivateRoute> <Dashboard/> </PrivateRoute>    }>
          <Route path="my-profile" element={<MyProfile/>} />
          <Route path="settings" element={<Sitting/>} />
          
          { user?.accountType === ACCOUNT_TYPE.STUDENT && 
          <> <Route path="enrolled-courses" element={<EnrolledCourses/>} />
            <Route path="cart" element={<Cart/>} /></>
           }
           {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && <>
              <Route path="add-course" element={<AddCourse/>} />
            </>
           }
        </Route>
        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
