import React, { useState } from "react";
import { 
  Search, 
  Printer, 
  Download, 
  RotateCcw, 
  Calendar, 
  ChevronDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Filter
} from "lucide-react";

const StockAnalysis = () => {
  // State
  const [reportType, setReportType] = useState("Fast Moving");
  const [category, setCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const [noOfDays, setNoOfDays] = useState("30");
  const [fromDate, setFromDate] = useState("2025-01-01");
  const [toDate, setToDate] = useState("2026-02-13");
  const [isCondensed, setIsCondensed] = useState(false);

  // Sample data mirroring image_bf2763.jpg
  const data = [
    { code: "QPOWER 20A", name: "12V 20A METAL POWER SUPPLY", qty: "3.00", stock: "32.00" },
    { code: "VIDEO BALUN", name: "1 CH PASSIVE POWER & VIDEO- EXT VIA LAN", qty: "2.00", stock: "8.00" },
    { code: "ADP 12V/3A", name: "ADP 12V/3A", qty: "2.00", stock: "2.00" },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-blue-50/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
        
        .table-row-hover:hover {
          background: linear-gradient(90deg, #EFF6FF 0%, #DBEAFE 100%);
          transform: translateX(2px);
          transition: all 0.2s ease;
        }
        
        .premium-shadow { box-shadow: 0 1px 3px rgba(0, 82, 204, 0.08), 0 1px 2px rgba(0, 82, 204, 0.06); }
        
        .premium-shadow-lg { box-shadow: 0 4px 6px -1px rgba(0, 82, 204, 0.1), 0 2px 4px -1px rgba(0, 82, 204, 0.06); }
      `}</style>

      {/* TOP BAR */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 premium-shadow animate-slide-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              Stock Analysis
              <span className="text-xs font-normal text-gray-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Stock Report
              </span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Solid Solutions • Inventory Reports
            </p>
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
          
          {/* Report Type */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Report Type</label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer min-w-[130px]"
            >
              <option>Fast Moving</option>
              <option>Slow Moving</option>
              <option>Non-Moving</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Category</label>
            <div className="relative">
              <input 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="All Categories"
                className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 bg-white"
              />
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Brand Name */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Brand</label>
            <div className="relative">
              <input 
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Search Brand"
                className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 bg-white"
              />
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* No of Days */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">No. of Days</label>
            <input 
              type="number"
              value={noOfDays}
              onChange={(e) => setNoOfDays(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-20 bg-white text-right"
            />
          </div>

          {/* From Date */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">From</label>
            <div className="relative">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32 bg-white"
              />
              <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* To Date */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">To</label>
            <div className="relative">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32 bg-white"
              />
              <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Condensed */}
          <label className="flex items-center gap-2 cursor-pointer group ml-auto">
            <input
              type="checkbox"
              checked={isCondensed}
              onChange={() => setIsCondensed(!isCondensed)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors uppercase tracking-wide">
              Condensed
            </span>
          </label>
        </div>
      </div>

      {/* NAVIGATION CONTROLS */}
      <div className="bg-gray-50/80 px-6 py-2 border-b border-gray-200 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Page <span className="font-semibold text-gray-700">1</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all">
            <ChevronsLeft size={16} className="text-gray-500" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all">
            <ChevronLeft size={16} className="text-gray-500" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all">
            <ChevronRight size={16} className="text-gray-500" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all">
            <ChevronsRight size={16} className="text-gray-500" />
          </button>
          <div className="w-px h-5 bg-gray-300 mx-2"></div>
          <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all">
            <Search size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-xl premium-shadow-lg overflow-hidden animate-slide-in border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Item Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                  S. Quantity
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Current Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 table-row-hover cursor-pointer">
                  <td className="px-6 py-4 text-sm font-mono text-orange-600 font-medium">
                    {row.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700 font-mono">
                    {row.qty}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-gray-900 font-mono">
                    {row.stock}
                  </td>
                </tr>
              ))}
            </tbody>
            
            {/* TOTALS ROW */}
            <tfoot>
              <tr className="bg-gradient-to-r from-blue-50 to-gray-50 border-t-2 border-blue-200">
                <td colSpan="2" className="px-6 py-4 text-sm font-bold text-gray-900">
                  Total
                </td>
                <td className="px-6 py-4 text-sm text-right font-bold text-gray-900">
                  7.00
                </td>
                <td className="px-6 py-4 text-sm text-right font-bold text-blue-700 text-base">
                  42.00
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center text-xs text-gray-600 premium-shadow">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Report Type:</span>
            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium border border-blue-100">
              {reportType}
            </span>
          </span>
          <span className="text-gray-400">|</span>
          <span className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Records:</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-medium">
              {data.length}
            </span>
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500">
          <span>Powered by Solid Solutions</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">{new Date().toLocaleDateString()}</span>
        </div>
      </footer>
    </div>
  );
};

export default StockAnalysis;