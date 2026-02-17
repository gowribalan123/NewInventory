import React, { useState } from "react";
import { 
  Printer, 
  Search,
  RotateCcw,
  FileText
} from "lucide-react";

const TrialBalance = () => {
  const [asOnDate, setAsOnDate] = useState(new Date().toISOString().split('T')[0]);

  // Professional Trial Balance Data Structure
  const reportData = [
    { account: "Capital Account", debit: 0, credit: 450000.0 },
    { account: "Purchase Accounts", debit: 450200.0, credit: 0 },
    { account: "Sales Accounts", debit: 0, credit: 785650.5 },
    { account: "Direct Expenses", debit: 12400.0, credit: 0 },
    { account: "Fixed Assets", debit: 320000.0, credit: 0 },
    { account: "Current Assets", debit: 284500.75, credit: 0 },
    { account: "Current Liabilities", debit: 0, credit: 85400.5 },
    { account: "Cash-in-hand", debit: 43050.0, credit: 0 },
    { account: "Bank Accounts", debit: 210900.25, credit: 0 },
  ];

  const totalDebit = reportData.reduce((acc, curr) => acc + curr.debit, 0);
  const totalCredit = reportData.reduce((acc, curr) => acc + curr.credit, 0);

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

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
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Trial Balance</h1>
              <p className="text-xs text-slate-500">As of {asOnDate}</p>
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
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">As on Date</label>
              <input 
                type="date" 
                value={asOnDate}
                onChange={(e) => setAsOnDate(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white"
              />
            </div>
            
            <div className="md:col-span-8 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-5 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                <RotateCcw size={16} /> Reset
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
                <Search size={16} /> Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="p-6">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-slate-600 font-bold text-xs uppercase">
                  <th className="py-3 px-4">Account</th>
                  <th className="py-3 px-4 w-48 text-right">Debit</th>
                  <th className="py-3 px-4 w-48 text-right">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reportData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3 px-4 font-semibold text-slate-700 group-hover:text-blue-600 transition-colors cursor-pointer">
                      {item.account}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-600">
                      {item.debit > 0 ? formatCurrency(item.debit) : "-"}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-600">
                      {item.credit > 0 ? formatCurrency(item.credit) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 border-t-2 border-slate-300">
                 <tr className="font-bold text-slate-800">
                    <td className="py-3 px-4 text-right uppercase text-xs">Total</td>
                    <td className="py-3 px-4 text-right font-mono text-base">
                       {formatCurrency(totalDebit)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-base">
                       {formatCurrency(totalCredit)}
                    </td>
                 </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="text-center py-4 text-xs text-slate-400 mt-4">
            ** Amount is displayed in your base currency INR
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialBalance;