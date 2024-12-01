import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard(){
   const [value,setValue] = useState(0);
   const [user,setUser] = useState("");

   
   const fetchBalance = () => {
      axios.get("https://mypay-h662.onrender.com/api/v1/account/balance",{
         headers : {
            'Authorization' : "Bearer " + localStorage.getItem("token")
         }
      })
      .then(response => {
            setValue(response.data.balance);
         })
      .catch(err => {
         alert("error occurred while fetching balance.")
         })
   }

   useEffect(() => {
      axios.get("https://mypay-h662.onrender.com/api/v1/user/",{
         headers : {
            'Authorization' : "Bearer " + localStorage.getItem("token")
         }
      })
      .then(res => {
            setUser(res.data.name);
         })
      .catch(err => {
            setUser("User")
         })
      fetchBalance();
   },[]) 


   return <div>
        <Appbar name={user}/>
        <div className="m-8">
            <Balance value={value} />
            <Users />
        </div>
    </div>
}
