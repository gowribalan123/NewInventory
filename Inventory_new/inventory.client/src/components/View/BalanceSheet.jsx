import React, { useState } from "react";
import { 
  Printer, 
  Search,
  RotateCcw,
  FileText
} from "lucide-react";

const BalanceSheet = () => {
  const [asOnDate, setAsOnDate] = useState(new Date().toISOString().split('T')[0]);
  
  const liabilities = [
    { name: "Capital Account", amount: 450000.00, hasChildren: true },
    { name: "Loans (Liability)", amount: 120000.00, hasChildren: true },
    { name: "Current Liabilities", amount: 85400.50, hasChildren: true },
    { name: "Profit & Loss A/c", amount: 42150.25, hasChildren: false },
    { name: "Opening Balance Adjustments", amount: 0.00, hasChildren: false },
  ];

  const assets = [
    { name: "Fixed Assets", amount: 320000.00, hasChildren: true },
    { name: "Investments", amount: 50000.00, hasChildren: true },
    { name: "Current Assets", amount: 284500.75, hasChildren: true },
    { name: "Cash-in-hand", amount: 43050.00, hasChildren: true },
  ];

  const totalLiabilities = liabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = assets.reduce((sum, item) => sum + item.amount, 0);

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
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Balance Sheet</h1>
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

        {/* REPORT CONTENT */}
        <div className="p-6">
          
          {/* Horizontal Layout Container */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex gap-0">
              
              {/* LEFT: LIABILITIES */}
              <div className="flex-1 border-r border-slate-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold text-xs uppercase">
                      <th className="text-left py-3 px-4 border-b border-slate-200">Liabilities</th>
                      <th className="text-right py-3 px-4 border-b border-slate-200">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liabilities.map((item, idx) => (
                      <tr key={idx} className="group hover:bg-gray-50">
                        <td className="py-2 px-4 border-b border-gray-100 text-sm">
                          <a href="#" className="text-[#408dfb] hover:underline font-medium decoration-blue-300 underline-offset-2">
                            {item.name}
                          </a>
                        </td>
                        <td className="py-2 px-4 border-b border-gray-100 text-sm text-right font-mono text-slate-700">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                    {/* Spacer rows to balance height if needed, or just let flex handle it */}
                    {[...Array(Math.max(0, assets.length - liabilities.length))].map((_, i) => (
                       <tr key={`spacer-${i}`}><td className="py-2 px-4">&nbsp;</td><td className="py-2 px-4"></td></tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-100 border-t-2 border-slate-300">
                     <tr className="font-bold text-slate-800">
                        <td className="py-3 px-4 text-sm uppercase">Total Liabilities</td>
                        <td className="py-3 px-4 text-base text-right font-mono">
                           {formatCurrency(totalLiabilities)}
                        </td>
                     </tr>
                  </tfoot>
                </table>
              </div>

              {/* RIGHT: ASSETS */}
              <div className="flex-1">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold text-xs uppercase">
                      <th className="text-left py-3 px-4 border-b border-slate-200">Assets</th>
                      <th className="text-right py-3 px-4 border-b border-slate-200">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((item, idx) => (
                      <tr key={idx} className="group hover:bg-gray-50">
                        <td className="py-2 px-4 border-b border-gray-100 text-sm">
                          <a href="#" className="text-[#408dfb] hover:underline font-medium decoration-blue-300 underline-offset-2">
                            {item.name}
                          </a>
                        </td>
                        <td className="py-2 px-4 border-b border-gray-100 text-sm text-right font-mono text-slate-700">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                     {/* Spacer rows */}
                     {[...Array(Math.max(0, liabilities.length - assets.length))].map((_, i) => (
                       <tr key={`spacer-${i}`}><td className="py-2 px-4">&nbsp;</td><td className="py-2 px-4"></td></tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-100 border-t-2 border-slate-300">
                     <tr className="font-bold text-slate-800">
                        <td className="py-3 px-4 text-sm uppercase">Total Assets</td>
                        <td className="py-3 px-4 text-base text-right font-mono">
                           {formatCurrency(totalAssets)}
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

export default BalanceSheet;