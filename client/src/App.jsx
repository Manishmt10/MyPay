import {BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function RedirectToSignup() {
   const navigate = useNavigate();
   useEffect(() => {
      navigate("/signup");
   },[navigate])

   return null;
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToSignup/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/send" element={<SendMoney/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
