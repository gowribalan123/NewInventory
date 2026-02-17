import React, { useState } from "react";
import { 
  Printer, 
  Search, 
  RotateCcw,
  FileText,
  Binoculars
} from "lucide-react";

const DebitorsCreditors = () => {
  // Fix: Initializing state for every mandatory desktop field
  const [reportType, setReportType] = useState("Debtors");
  const [asOnDate, setAsOnDate] = useState("10/Feb/2026");
  const [routeName, setRouteName] = useState("");
  const [salesMan, setSalesMan] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

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
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Sundry {reportType}</h1>
              <p className="text-xs text-slate-500">Solid Solutions | Receivables & Payables</p>
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
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Report Type</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="Debtors">Debtors</option>
                <option value="Creditors">Creditors</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Active">Active</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Route Name</label>
              <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                 <input type="text" value={routeName} onChange={(e) => setRouteName(e.target.value)} className="w-full px-3 py-2 text-sm outline-none" />
                 <button className="p-2 hover:bg-slate-100 border-l border-slate-200"><Binoculars size={14} className="text-slate-500"/></button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">SalesMan</label>
              <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                 <input type="text" value={salesMan} onChange={(e) => setSalesMan(e.target.value)} className="w-full px-3 py-2 text-sm outline-none" />
                 <button className="p-2 hover:bg-slate-100 border-l border-slate-200"><Binoculars size={14} className="text-slate-500"/></button>
              </div>
            </div>
            
            <div className="md:col-span-2 flex justify-end gap-3">
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
                  <th className="text-left py-3 px-4 w-16">Sl No</th>
                  <th className="text-left py-3 px-4">Account Name</th>
                  <th className="text-left py-3 px-4">Route</th>
                  <th className="text-right py-3 px-4 w-40">Pending Amount</th>
                  <th className="text-center py-3 px-4 w-24">Dr/Cr</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="py-3 px-4 text-sm text-slate-500">1</td>
                  <td className="py-3 px-4 text-sm font-bold text-slate-700 group-hover:text-blue-600">SMBG TRADING PRIVATE LIMITED</td>
                  <td className="py-3 px-4 text-sm text-slate-500 italic">ERANAKULAM NORTH</td>
                  <td className="py-3 px-4 text-sm text-right text-slate-900 font-bold">₹ 85,400.50</td>
                  <td className="py-3 px-4 text-sm text-center text-slate-500 uppercase">Dr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebitorsCreditors;