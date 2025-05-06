
export default function Button({btnName,onClick,loading}){
    return (<div className="flex justify-center pt-6 ">
     <button 
       type="button" 
       onClick={onClick}
       disabled={loading}
       className="w-fit text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus-ring-4 focus:ring-gray-300 text-sm font-medium rounded-lg px-5 py-3">{loading ? "Signing in..." : btnName}</button> 
    </div>)
}
