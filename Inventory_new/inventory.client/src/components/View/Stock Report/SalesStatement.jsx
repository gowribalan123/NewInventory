import React, { useState } from "react";
import {
  Printer,
  Calendar,
  ChevronDown,
  RotateCcw,
  Search,
  Download,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

const SalesStatement = () => {
  const [formType, setFormType] = useState("Invoice");
  const [date, setDate] = useState("Feb/2026");
  const [isCondensed, setIsCondensed] = useState(false);

  // Mock Data
  const statementData = [
    { date: "01/Feb/2026", vchNo: "INV-001", particular: "Cash Sales", debit: "15,000.00", credit: "0.00", balance: "15,000.00 Dr" },
    { date: "05/Feb/2026", vchNo: "INV-002", particular: "Credit Sales - ABC Corp", debit: "25,000.00", credit: "0.00", balance: "40,000.00 Dr" },
    { date: "10/Feb/2026", vchNo: "REC-001", particular: "Cash Received", debit: "0.00", credit: "10,000.00", balance: "30,000.00 Dr" },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-blue-50/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
        .table-row-hover:hover { background: linear-gradient(90deg, #EFF6FF 0%, #DBEAFE 100%); transform: translateX(2px); transition: all 0.2s ease; }
        .premium-shadow { box-shadow: 0 1px 3px rgba(0, 82, 204, 0.08), 0 1px 2px rgba(0, 82, 204, 0.06); }
        .premium-shadow-lg { box-shadow: 0 4px 6px -1px rgba(0, 82, 204, 0.1), 0 2px 4px -1px rgba(0, 82, 204, 0.06); }
      `}</style>

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 premium-shadow animate-slide-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              Sales Statement
              <span className="text-xs font-normal text-gray-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Stock Report</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Solid Solutions • Inventory Reports</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group">
              <RotateCcw size={16} className="text-gray-600 group-hover:text-blue-600" />
            </button>
            <button className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group">
              <Printer size={16} className="text-gray-600 group-hover:text-blue-600" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg">
              <Download size={16} />
              <span className="text-sm font-medium">Export</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* FILTERS */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 premium-shadow animate-slide-in">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Form Type</label>
            <select value={formType} onChange={(e) => setFormType(e.target.value)} className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer min-w-[120px]">
              <option>Invoice</option>
              <option>Credit Note</option>
              <option>Debit Note</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Date</label>
            <select value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer min-w-[120px]">
              <option>Jan/2026</option>
              <option>Feb/2026</option>
              <option>Mar/2026</option>
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer group ml-auto">
            <input type="checkbox" checked={isCondensed} onChange={() => setIsCondensed(!isCondensed)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
            <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors uppercase tracking-wide">Condensed</span>
          </label>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="bg-gray-50/80 px-6 py-2 border-b border-gray-200 flex justify-between items-center">
        <div className="text-xs text-gray-500">Page <span className="font-semibold text-gray-700">1</span></div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all"><ChevronsLeft size={16} className="text-gray-500" /></button>
          <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all"><ChevronLeft size={16} className="text-gray-500" /></button>
          <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all"><ChevronRight size={16} className="text-gray-500" /></button>
          <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all"><ChevronsRight size={16} className="text-gray-500" /></button>
          <div className="w-px h-5 bg-gray-300 mx-2"></div>
          <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all"><Search size={16} className="text-gray-500" /></button>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-xl premium-shadow-lg overflow-hidden animate-slide-in border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Vch No</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Particulars</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Debit</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Credit</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Balance</th>
              </tr>
            </thead>
            <tbody>
              {statementData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 table-row-hover cursor-pointer">
                  <td className="px-6 py-3 text-sm text-gray-600">{row.date}</td>
                  <td className="px-6 py-3 text-sm font-mono text-blue-600 font-medium">{row.vchNo}</td>
                  <td className="px-6 py-3 text-sm text-gray-900 font-medium">{row.particular}</td>
                  <td className="px-6 py-3 text-sm text-right text-gray-700">{row.debit}</td>
                  <td className="px-6 py-3 text-sm text-right text-gray-700">{row.credit}</td>
                  <td className="px-6 py-3 text-sm text-right font-bold text-blue-600">{row.balance}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gradient-to-r from-blue-50 to-gray-50 border-t-2 border-blue-200">
                <td colSpan="3" className="px-6 py-3 text-sm font-bold text-gray-900">Total</td>
                <td className="px-6 py-3 text-sm text-right font-bold text-gray-900">40,000.00</td>
                <td className="px-6 py-3 text-sm text-right font-bold text-gray-900">10,000.00</td>
                <td className="px-6 py-3 text-sm text-right font-bold text-blue-700">30,000.00 Dr</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center text-xs text-gray-600 premium-shadow">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2"><span className="font-medium text-gray-700">Type:</span><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium border border-blue-100">{formType}</span></span>
          <span className="text-gray-400">|</span>
          <span className="flex items-center gap-2"><span className="font-medium text-gray-700">Records:</span><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-medium">{statementData.length}</span></span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <span>Powered by Solid Solutions</span><span className="text-gray-400">•</span><span>{new Date().toLocaleDateString()}</span>
        </div>
      </footer>
    </div>
  );
};

export default SalesStatement;
