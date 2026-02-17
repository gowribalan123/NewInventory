import React, { useState } from "react";
import { 
  Printer, 
  Search,
  RotateCcw,
  FileText
} from "lucide-react";

const PLAccount = () => {
  const [fromDate, setFromDate] = useState('2025-04-01');
  const [toDate, setToDate] = useState('2026-03-31');
  
  // Mock data following accounting standards
  // In a real app, you might fetch this or calculate totals dynamically
  const reportData = {
    expenses: [
      { label: "Opening Stock", amount: 125000.0 },
      { label: "Purchase Accounts", amount: 450200.0 },
      { label: "Direct Expenses", amount: 12400.0 },
      { label: "Gross Profit c/o", amount: 215450.5, isTotal: true },
      { label: "Indirect Expenses", amount: 45200.0 },
      { label: "Staff Salaries", amount: 85000.0 },
      { label: "Rent & Rates", amount: 12000.0 },
    ],
    incomes: [
      { label: "Sales Accounts", amount: 785650.5 },
      { label: "Direct Incomes", amount: 15000.0 },
      { label: "Closing Stock", amount: 145000.0 },
      { label: "Gross Profit b/f", amount: 215450.5, isTotal: true },
      { label: "Indirect Incomes", amount: 5200.0 },
      { label: "Interest Received", amount: 1250.0 },
    ],
  };

  // Calculate totals for display
  const totalExpenses = reportData.expenses.reduce((sum, item) => sum + (item.isTotal ? 0 : item.amount), 0);
  const totalIncomes = reportData.incomes.reduce((sum, item) => sum + (item.isTotal ? 0 : item.amount), 0);
  const netProfit = totalIncomes - totalExpenses;

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
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Profit & Loss Account</h1>
              <p className="text-xs text-slate-500">From {fromDate} to {toDate}</p>
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
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">To Date</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-6 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-5 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 shadow-sm">
                <RotateCcw size={16} /> Reset
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-200">
                <Search size={16} /> Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* REPORT CONTENT */}
        <div className="p-6">
          
          {/* Horizontal Layout Container */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex gap-0">
              
              {/* LEFT: EXPENSES */}
              <div className="flex-1 border-r border-slate-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold text-xs uppercase">
                      <th className="text-left py-3 px-4 border-b border-slate-200">Particulars</th>
                      <th className="text-right py-3 px-4 border-b border-slate-200">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.expenses.map((item, idx) => (
                      <tr key={idx} className={`group hover:bg-gray-50 ${item.isTotal ? 'font-bold bg-gray-50' : ''}`}>
                        <td className="py-2 px-4 border-b border-gray-100 text-sm">
                          {item.isTotal ? item.label : (
                            <a href="#" className="text-[#408dfb] hover:underline font-medium decoration-blue-300 underline-offset-2">
                              {item.label}
                            </a>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-100 text-sm text-right font-mono text-slate-700">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                    {/* Net Profit Row */}
                    <tr className="bg-blue-50/50">
                      <td className="py-3 px-4 border-b border-gray-100 text-sm font-bold text-gray-800">Net Profit</td>
                      <td className="py-3 px-4 border-b border-gray-100 text-sm text-right font-bold text-green-600 font-mono">
                        {formatCurrency(netProfit)}
                      </td>
                    </tr>
                    {/* Spacer rows */}
                    {[...Array(Math.max(0, reportData.incomes.length - reportData.expenses.length - 1))].map((_, i) => (
                       <tr key={`spacer-${i}`}><td className="py-2 px-4">&nbsp;</td><td className="py-2 px-4"></td></tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-100 border-t-2 border-slate-300">
                     <tr className="font-bold text-slate-800">
                        <td className="py-3 px-4 text-sm uppercase">Total</td>
                        <td className="py-3 px-4 text-base text-right font-mono">
                           {formatCurrency(totalIncomes)} {/* Total matches Income side */}
                        </td>
                     </tr>
                  </tfoot>
                </table>
              </div>

              {/* RIGHT: INCOMES */}
              <div className="flex-1">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold text-xs uppercase">
                      <th className="text-left py-3 px-4 border-b border-slate-200">Particulars</th>
                      <th className="text-right py-3 px-4 border-b border-slate-200">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.incomes.map((item, idx) => (
                      <tr key={idx} className={`group hover:bg-gray-50 ${item.isTotal ? 'font-bold bg-gray-50' : ''}`}>
                        <td className="py-2 px-4 border-b border-gray-100 text-sm">
                          {item.isTotal ? item.label : (
                            <a href="#" className="text-[#408dfb] hover:underline font-medium decoration-blue-300 underline-offset-2">
                              {item.label}
                            </a>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-100 text-sm text-right font-mono text-slate-700">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                     {/* Spacer rows (Expenses + Net Profit row count vs Incomes) */}
                     {[...Array(Math.max(0, (reportData.expenses.length + 1) - reportData.incomes.length))].map((_, i) => (
                       <tr key={`spacer-${i}`}><td className="py-2 px-4">&nbsp;</td><td className="py-2 px-4"></td></tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-100 border-t-2 border-slate-300">
                     <tr className="font-bold text-slate-800">
                        <td className="py-3 px-4 text-sm uppercase">Total</td>
                        <td className="py-3 px-4 text-base text-right font-mono">
                           {formatCurrency(totalIncomes)}
                        </td>
                     </tr>
                  </tfoot>
                </table>
              </div>

            </div>
          </div>

          <div className="text-center py-4 text-xs text-slate-400 mt-4">
            ** Amount is displayed in your base currency INR
          </div>
        </div>
      </div>
    </div>
  );
};

export default PLAccount;