import { useNavigate } from "react-router-dom" ;

export default function Appbar ({name}) {

   const navigate = useNavigate();

   return <div className="shadow h-18 flex justify-between">
        <div className="flex flex-col justify-center h-full mt-2 ml-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 drop-shadow-md">
            MyPay 
        </div>
        <div className="flex">
            <div className="py-2">
               <button onClick={() => {
               localStorage.removeItem("token");
               navigate("/signup");
            }} className="px-4 py-2 mr-2 font-medium font-sans text-white bg-gray-800 border rounded-xl">
                  Logout
               </button>
            </div>
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                   {name.toUpperCase()[0]} 
                </div>
            </div>
        </div>
    </div>
}
