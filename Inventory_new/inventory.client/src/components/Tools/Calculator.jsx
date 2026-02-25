import React, { useState } from "react";

export default function Calculator() {
  const [value, setValue] = useState("0");

  const handleClick = (val) => {
    if (value === "0") setValue(val);
    else setValue(value + val);
  };

  const handleClear = () => setValue("0");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-[350px] bg-[#1e1e1e] text-white rounded-xl shadow-2xl p-4">
        <div className="text-right text-5xl mb-6">{value}</div>
        <div className="grid grid-cols-4 gap-3">
          {[
            "%","CE","C","⌫",
            "1/x","x²","√x","÷",
            "7","8","9","×",
            "4","5","6","−",
            "1","2","3","+",
            "+/−","0",".","="
          ].map((btn,i)=> (
            <button
              key={i}
              onClick={()=>btn==="C"?handleClear():handleClick(btn)}
              className={`p-4 rounded-lg text-lg ${btn==="="?"bg-purple-500":"bg-[#2d2d2d]"}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
