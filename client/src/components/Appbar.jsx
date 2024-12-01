export default function Appbar ({name}) {
    return <div className="shadow h-18 flex justify-between">
        <div className="flex flex-col justify-center h-full mt-2 ml-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 drop-shadow-md">
            MyPay 
        </div>
        <div className="flex">
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
