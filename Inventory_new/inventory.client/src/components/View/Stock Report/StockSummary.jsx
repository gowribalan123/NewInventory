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
  Filter,
} from "lucide-react";

const StockSummary = () => {
  // State
  const [fromDate, setFromDate] = useState("01/Feb/2026");
  const [toDate, setToDate] = useState("28/Feb/2026");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [item, setItem] = useState("");
  const [godown, setGodown] = useState("");
  const [partNo, setPartNo] = useState("");
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("English");
  const [isCondensed, setIsCondensed] = useState(false);

  // Mock Data
  const stockData = [
    {
      id: 1,
      partNo: "IP15-256",
      sapNo: "SAP001",
      itemName: "iPhone 15 Pro 256GB",
      category: "Electronics",
      brand: "Apple",
      openingQty: 10,
      purchaseQty: 50,
      salesQty: 45,
      salesReturn: 2,
      purchaseReturn: 0,
      issueQty: 0,
      balanceQty: 17,
      orderQty: 0,
      unitCost: "1,15,000.00",
      stockValue: "19,55,000.00"
    },
    {
      id: 2,
      partNo: "SAM-S24",
      sapNo: "SAP002",
      itemName: "Samsung S24 Ultra",
      category: "Electronics",
      brand: "Samsung",
      openingQty: 5,
      purchaseQty: 30,
      salesQty: 20,
      salesReturn: 0,
      purchaseReturn: 1,
      issueQty: 0,
      balanceQty: 14,
      orderQty: 10,
      unitCost: "1,05,000.00",
      stockValue: "14,70,000.00"
    },
     {
      id: 3,
      partNo: "DELL-XPS",
      sapNo: "SAP003",
      itemName: "Dell XPS 15",
      category: "Computers",
      brand: "Dell",
      openingQty: 2,
      purchaseQty: 10,
      salesQty: 5,
      salesReturn: 0,
      purchaseReturn: 0,
      issueQty: 0,
      balanceQty: 7,
      orderQty: 5,
      unitCost: "1,85,000.00",
      stockValue: "12,95,000.00"
    }
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
              Stock Summary
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

      {/* FILTERS - ROW 1 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 premium-shadow animate-slide-in">
        <div className="flex flex-wrap items-center gap-4">
          {/* From Date */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">From</label>
            <div className="relative">
              <input
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
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32 bg-white"
              />
              <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Category</label>
            <div className="relative">
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Select category..."
                className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 bg-white"
              />
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Brand */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Brand</label>
            <div className="relative">
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Select brand..."
                className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 bg-white"
              />
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Item */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Item</label>
            <div className="relative">
              <input
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Select item..."
                className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 bg-white"
              />
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS - ROW 2 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 premium-shadow">
        <div className="flex flex-wrap items-center gap-4">
          {/* Godown */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Godown</label>
            <div className="relative">
              <input
                value={godown}
                onChange={(e) => setGodown(e.target.value)}
                placeholder="Select godown..."
                className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32 bg-white"
              />
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Part No */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Part No</label>
            <input
              value={partNo}
              onChange={(e) => setPartNo(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32 bg-white"
            />
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 bg-white"
            />
          </div>

          {/* Language */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer min-w-[100px]"
            >
              <option>English</option>
              <option>Arabic</option>
            </select>
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
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">SINO</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Part No</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">SAP No</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Item Name</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Brand</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Opening Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Purchase Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Sales Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Sales Return</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Purchase Return</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Issue Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Balance Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Order Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Unit Cost</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Stock Value</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 table-row-hover cursor-pointer">
                    <td className="px-4 py-3 text-sm text-gray-600">{row.id}</td>
                    <td className="px-4 py-3 text-sm font-mono text-blue-600 font-medium">{row.partNo}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">{row.sapNo}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.itemName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.brand}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">{row.openingQty}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">{row.purchaseQty}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">{row.salesQty}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">{row.salesReturn}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">{row.purchaseReturn}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">{row.issueQty}</td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">{row.balanceQty}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">{row.orderQty}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">{row.unitCost}</td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-blue-600">{row.stockValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center text-xs text-gray-600 premium-shadow">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Language:</span>
            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium border border-blue-100">
              {language}
            </span>
          </span>
          <span className="text-gray-400">|</span>
          <span className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Records:</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-medium">
              {stockData.length}
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

export default StockSummary;
    
