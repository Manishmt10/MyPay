import { useState } from "react";
import axios from "axios";
import Heading from  "./../components/Heading";
import SubHeading from  "./../components/SubHeading";
import InputBox from "./../components/InputBox";
import Button from "./../components/Button";
import BottomWarning from "./../components/BottomWarning";

export default function Signup(){
   const [firstName,setFirstName] = useState("");
   const [lastName,setLastName] = useState("");
   const [username,setUsername] = useState("");
   const [password,setPassword] = useState("");
   const [errors,setErrors] = useState({
      firstName : "",
      lastName  : "",
      username : "",
      password : ""
   });

   async function onClick(){
      const newErrors = {
         firstName : "",
         lastName : "",
         username : "",
         password : ""
      }

      if(!firstName){
         newErrors.firstName = "FirstName is required";
         setErrors(newErrors);
         return;
      }

      if(!lastName){
         newErrors.lastName = "LastName is required";
         setErrors(newErrors);
         return;
      }
      
      if(!username){
         newErrors.username= "username is required";
         setErrors(newErrors);
         return;
      }

      if(!password){
         newErrors.password = "Password is required";
         setErrors(newErrors);
         return;
      }
      
      try{
         const response = await axios.post("https://mypay-h662.onrender.com/api/v1/user/signup",{
            firstName,
            lastName,
            username,
            password
         });
         localStorage.setItem("token",response.data.token);
         window.location.href = response.data.redirectUrl;     
      }catch(err){
         alert(err.response.data.msg);
      }

   } 

    return <div className="flex justify-center h-screen bg-slate-300 pt-20" >
      <div className="bg-white items-center h-fit px-6 py-5 rounded-lg">
         <Heading label={"Signup"} />
         <SubHeading label={"Enter your information to create an account."} />
         <InputBox onChange={(e) => {
            setFirstName(e.target.value);
         }} errors={errors.firstName} placeholder="John" label={"First Name"} />
         <InputBox  onChange={(e) => {
            setLastName(e.target.value);
         }} errors={errors.lastName} placeholder="Doe" label={"Last Name"} />
         <InputBox  onChange={(e) => {
            setUsername(e.target.value);
         }} errors={errors.username} placeholder="abc@gmail.com" label={"Username"} />
         <InputBox  onChange={(e) => {
            setPassword(e.target.value);
         }} errors={errors.password} placeholder="123456" label={"Password"} />
         <Button btnName={"Signup"} onClick={onClick}/>
         <BottomWarning label={"Already have an account?"} buttonText={"Signin"} to={"/signin"}/>
      </div>
    </div>
}
