import React from "react";

export default function MismatchedAccounts() {
  return (
    <div className="min-h-screen bg-[#cfd9e8] p-4">
      <div className="bg-white border border-gray-400 h-[600px]">
        <div className="grid grid-cols-5 bg-[#dbe5f1] border-b text-sm font-semibold">
          {[
            "BillCode","AccountDate","BillType","AccountName","NetAmount"
          ].map((col,i)=>(
            <div key={i} className="border-r px-2 py-1">{col}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
