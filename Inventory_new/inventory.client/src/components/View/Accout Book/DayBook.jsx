import React, { useState } from "react";
import { 
  Printer, 
  Search, 
  RotateCcw,
  FileText
} from "lucide-react";

const DayBook = () => {
  const [fromDate, setFromDate] = useState("2025-01-01");
  const [toDate, setToDate] = useState("2025-12-31");

  // Chronological transaction data
  const transactions = [
    { date: "01/01/2025", particulars: "Opening Balance", debit: 50000.0, credit: 0 },
    { date: "02/01/2025", particulars: "Cash Sale - INV-001", debit: 0, credit: 12500.0 },
    { date: "05/01/2025", particulars: "Purchase - PUR-052", debit: 8400.0, credit: 0 },
    { date: "10/01/2025", particulars: "Office Rent", debit: 12000.0, credit: 0 },
    { date: "15/01/2025", particulars: "Customer Payment - SMBG Trading", debit: 0, credit: 50000.0 },
  ];

  const totalDebit = transactions.reduce((acc, curr) => acc + curr.debit, 0);
  const totalCredit = transactions.reduce((acc, curr) => acc + curr.credit, 0);

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
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Day Book</h1>
              <p className="text-xs text-slate-500">Solid Solutions | Daily Transaction Log</p>
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
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">From Date</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">To Date</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            
            <div className="md:col-span-6 flex justify-end gap-3">
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
                  <th className="text-left py-3 px-4 w-32">Date</th>
                  <th className="text-left py-3 px-4">Particulars</th>
                  <th className="text-right py-3 px-4 w-40">Debit</th>
                  <th className="text-right py-3 px-4 w-40">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3 px-4 text-sm text-slate-500">{item.date}</td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-700 group-hover:text-blue-600 cursor-pointer">
                      {item.particulars}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-mono text-slate-600">
                      {item.debit > 0 ? `₹ ${item.debit.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : ""}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-mono text-slate-600">
                      {item.credit > 0 ? `₹ ${item.credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 border-t-2 border-slate-300">
              <tr className="font-bold text-slate-800">
                <td colSpan="2" className="py-3 px-4 text-sm uppercase text-right">Grand Total</td>
                <td className="py-3 px-4 text-base text-right font-mono text-blue-600">
                  ₹ {totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-4 text-base text-right font-mono text-blue-600">
                  ₹ {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayBook;