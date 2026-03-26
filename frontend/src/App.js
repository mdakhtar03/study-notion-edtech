import "./App.css";
import {Route,Routes} from "react-router-dom"
import Home  from "./pages/Home"
import Navbar from "./components/common/Navbar"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element= {<Login/>} ></Route>
        <Route path="/signup" element= {<SignUp/>} ></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
