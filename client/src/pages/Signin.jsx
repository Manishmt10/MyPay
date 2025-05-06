import { useState } from "react";
import axios from "axios";
import Heading from "./../components/Heading";
import SubHeading from "./../components/SubHeading";
import InputBox from "./../components/InputBox";
import Button from "./../components/Button";
import BottomWarning from "./../components/BottomWarning";


export default function Signin(){
   const [username,setUsername] = useState("");
   const [password,setPassword] = useState("");
   const [errors,setErrors] = useState({username:"",password:""});
   const [loading,setLoading] = useState(false);

   async function onClick(){
      setLoading(true);
      const newErrors = {name:"" , pass:""};

      if(!username){
         newErrors.name = "Username is required";
         setErrors(newErrors);
         return;
      }

      if(!password){
         newErrors.pass = "Password is required";
         setErrors(newErrors);
         return;
      }
   
      try {
         const res = await axios.post("https://mypay-h662.onrender.com/api/v1/user/signin",{
            username,
            password
      })
         localStorage.setItem("token",res.data.token);
         window.location.href = res.data.redirectUrl;
      }catch(err){
         if(err.response.data.msg){
            console.log(err);
               alert(err.response.data.msg);
         }else {
            alert("something went wrong");
         }
      }

   } 

   return <div className="flex justify-center min-h-screen bg-slate-300 pt-20">
     <div className="bg-white items-center h-fit px-6 py-5 rounded-lg">
         <Heading label={"Signin"} />
         <SubHeading label={"Enter your information to login to your account."} />
         <InputBox onChange={(e) => {
            setUsername(e.target.value);
         }} errors={errors.username} placeholder="abc@gmail.com" label={"Username"} />
         <InputBox onChange={(e) => {
            setPassword(e.target.value);
         }} errors={errors.password} placeholder="123456" label={"Password"} />
         <div className="pt-2">
            <Button btnName={"Signin"} onClick={onClick} loading={loading}/>
         </div>
         <BottomWarning label={"Don't have an account?"} buttonText={"Signup"} to={"/signup"}/>
      </div>
   </div>
}
