import { Link } from "react-router-dom";

export default function BottomWarning({label,buttonText,to}){
   return <div className="pt-3 pb-2 flex justify-center">
      <div className="font-sm text-md">
         {label}
      </div> 
      <Link className="pointer cursor-pointer underline pl-1 color-blue"  to={to}>
         {buttonText}
      </Link>
   </div>
}
