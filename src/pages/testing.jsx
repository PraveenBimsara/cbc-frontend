import { useState } from "react";

export default function Testing(){
    const [number, setNumber] = useState(0);
    const [staus, setStatus] = useState("Pending");

    function increment(){
        let newValue = number + 1;
        setNumber(newValue);
    }

    function decrement(){
        let newValue = number - 1;
        setNumber(newValue);
    }

    return(
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{number}</span>
            <div className="w-full flex justify-center">
                <button onClick={increment} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer">+</button>
                <button onClick={decrement} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer">-</button>
            </div>
            <span className="text-3xl font-bold">{staus}</span>
            <div className="w-full flex justify-center">
                <button onClick={()=>setStatus("Pass")} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer">Pass</button>
                <button onClick={()=>setStatus("Fail")} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer">Fail</button>
            </div>
        </div>
    )
}