import React, { useState } from "react";
import { 
  Printer, 
  Search, 
  RotateCcw,
  FileText
} from "lucide-react";

const DailyStatement = () => {
  const [onDate, setOnDate] = useState("2026-02-10");
  const [openingCash, setOpeningCash] = useState("30");

  // Mock data for Daily Transactions
  const transactions = [
    { type: "Receipt", account: "Sales Account", info: "Cash Sale - INV-001", amount: 12500.0, mode: "Cash" },
    { type: "Payment", account: "Electricity Expense", info: "Jan Bill", amount: 1200.0, mode: "Cash" },
    { type: "Receipt", account: "Customer A", info: "Partial Payment", amount: 5000.0, mode: "Bank" },
    { type: "Payment", account: "Rent", info: "Office Rent", amount: 8000.0, mode: "Cash" },
  ];

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
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Daily Statement</h1>
              <p className="text-xs text-slate-500">Solid Solutions | Daily Ledger</p>
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
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">On Date</label>
              <input type="date" value={onDate} onChange={(e) => setOnDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Opening Cash</label>
              <input type="text" value={openingCash} onChange={(e) => setOpeningCash(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white font-bold text-slate-700" />
            </div>
            
            <div className="md:col-span-7 flex justify-end gap-3">
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
                  <th className="text-left py-3 px-4 w-24">Type</th>
                  <th className="text-left py-3 px-4">Account / Particulars</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-center py-3 px-4 w-24">Mode</th>
                  <th className="text-right py-3 px-4 w-32">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className={`py-3 px-4 text-sm font-bold ${item.type === 'Receipt' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.type}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-700">{item.account}</td>
                    <td className="py-3 px-4 text-sm text-slate-500 italic">{item.info}</td>
                    <td className="py-3 px-4 text-sm text-center text-slate-600">{item.mode}</td>
                    <td className="py-3 px-4 text-sm text-right font-mono text-slate-800 font-bold">
                      ₹ {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyStatement;