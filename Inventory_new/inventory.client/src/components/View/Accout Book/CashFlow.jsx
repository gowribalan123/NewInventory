import React, { useState } from "react";
import { 
  Printer, 
  Search,
  RotateCcw, 
  FileText,
  ArrowRight,
  CheckSquare
} from "lucide-react";

const CashFlow = () => {
  const [fromDate, setFromDate] = useState("2025-01-01");
  const [toDate, setToDate] = useState("2025-12-31");
  const [isCondensed, setIsCondensed] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  // Mock data representing Cash Flow Movements
  const flowData = [
    { date: "01/01/2025", particulars: "Opening Cash Balance", debit: 25000.0, credit: 0, balance: 25000.0 },
    { date: "15/01/2025", particulars: "Cash Sales (Receipt)", debit: 12450.0, credit: 0, balance: 37450.0 },
    { date: "20/01/2025", particulars: "Paid to Suppliers", debit: 0, credit: 8500.0, balance: 28950.0 },
    { date: "22/01/2025", particulars: "Office Electricity Bill", debit: 0, credit: 1200.0, balance: 27750.0 },
    { date: "28/01/2025", particulars: "Withdrawal for Personal Use", debit: 0, credit: 5000.0, balance: 22750.0 },
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
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Cash Flow</h1>
              <p className="text-xs text-slate-500">Solid Solutions | Desktop Structure</p>
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
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">From Date</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">To Date</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Page No</label>
              <input type="number" value={pageNo} onChange={(e) => setPageNo(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-center" />
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

            <div className="md:col-span-5 flex justify-end gap-3">
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
                {flowData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3 px-4 text-sm text-slate-500">{item.date}</td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-700 group-hover:text-blue-600 cursor-pointer">
                      {item.particulars}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-mono text-slate-600">
                      {item.debit > 0 ? item.debit.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-mono text-slate-600">
                      {item.credit > 0 ? item.credit.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 border-t-2 border-slate-300">
              <tr className="font-bold text-slate-800">
                <td colSpan="2" className="py-3 px-4 text-sm uppercase text-right">Period Closing Cash</td>
                <td className="py-3 px-4 text-base text-right font-mono text-blue-600">₹ 37,450.00</td>
                <td className="py-3 px-4 text-base text-right font-mono text-blue-600">₹ 14,700.00</td>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlow;