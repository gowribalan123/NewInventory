import React from "react";

export default function EventViewer() {
  return (
    <div className="min-h-screen bg-[#cfd9e8] p-4">
      <div className="bg-white border border-gray-400 h-[600px]">
        <div className="grid grid-cols-8 bg-[#dbe5f1] border-b text-sm font-semibold">
          {[
            "BillType","BillCode/Account","Bill Date","Event","Date","Time","PreGrand Total","Grand Total"
          ].map((col,i)=>(
            <div key={i} className="border-r px-2 py-1">{col}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
