import React, { useState } from "react";
import { 
  Printer, 
  Search, 
  RotateCcw,
  FileText,
  Binoculars,
  CheckSquare
} from "lucide-react";

const GroupSummary = () => {
  // State for mandatory desktop fields
  const [asOnDate, setAsOnDate] = useState("31/Dec/2025");
  const [groupName, setGroupName] = useState("");
  const [pageNo, setPageNo] = useState("1");
  const [isCondensed, setIsCondensed] = useState(false);

  return (
    <div className="p-2 bg-slate-50 min-h-screen font-sans text-sm w-full">
      <div className="max-w-[98%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-slate-200">
        
        {/* HEADER */}
        <div className="bg-white px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText size={20} className="text-blue-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Group Summary</h1>
              <p className="text-xs text-slate-500">Solid Solutions | Account Books</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
              <Printer size={16} /> Print Report
            </button>
          </div>
        </div>

        {/* FILTER AREA */}
        <div className="p-6 bg-slate-50/50 border-b border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">As on Date</label>
              <input type="text" value={asOnDate} onChange={(e) => setAsOnDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Group Name</label>
              <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                 <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} className="w-full px-3 py-2 text-sm outline-none" />
                 <button className="p-2 hover:bg-slate-100 border-l border-slate-200"><Binoculars size={14} className="text-slate-500"/></button>
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Page No</label>
              <input type="text" value={pageNo} onChange={(e) => setPageNo(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-center" />
            </div>
            <div className="md:col-span-2 flex items-center pb-2">
               <label className="flex items-center gap-2 cursor-pointer select-none">
                 <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isCondensed ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'}`}>
                    {isCondensed && <CheckSquare size={14} />}
                 </div>
                 <input type="checkbox" checked={isCondensed} onChange={() => setIsCondensed(!isCondensed)} className="hidden" />
                 <span className="text-sm font-medium text-slate-600">Condensed</span>
               </label>
            </div>
            
            <div className="md:col-span-4 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-5 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 shadow-sm">
                <RotateCcw size={16} /> Reset
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-200">
                <Search size={16} /> Generate
              </button>
            </div>
          </div>
        </div>

        {/* REPORT CONTENT */}
        <div className="p-6">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-slate-600 font-bold text-xs uppercase">
                  <th className="text-left py-3 px-4">Particulars</th>
                  <th className="text-right py-3 px-4 w-48">Debit</th>
                  <th className="text-right py-3 px-4 w-48">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-slate-50 transition-colors group cursor-pointer">
                <td className="py-3 px-4 text-sm font-medium text-slate-700">Opening Balance</td>
                <td className="py-3 px-4 text-sm text-right font-mono text-slate-600">1,25,000.00</td>
                <td className="py-3 px-4 text-sm text-right font-mono text-slate-600">0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GroupSummary;