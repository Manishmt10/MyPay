export default function InputBox({label, onChange, placeholder, errors}){
   return <div className="">
      <div className="py-1 pl-1 text-lg font-bold text-left">{label}</div>
      <input type="text" onChange={onChange} placeholder={placeholder} className="text-left pl-3 py-1 rounded-md border border-gray-500 w-full" />
       {errors ? <div className="font-light text-red-600 text-sm">{errors}</div> : null }
   </div>
}
