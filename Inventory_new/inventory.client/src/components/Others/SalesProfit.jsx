import React, { useState } from 'react';
import { Search, Printer, FileDown, ChevronDown, TrendingUp, BarChart3, PieChart, Filter, Calendar } from 'lucide-react';

const SalesProfit = () => {
  const [dateRange, setDateRange] = useState('This Month');
  const [isCondensed, setIsCondensed] = useState(false);

  // Logic: Real dummy data derived from desktop Profit in Sales
  const profitData = [
    {
      id: 1,
      itemCode: "4104",
      itemName: '"F" CONNECTOR COMPRESS (COAX.T100/CXT60)',
      quantity: 120,
      pRate: 0.14,
      sRate: 0.40,
      profit: 31.20,
      margin: 65.0
    },
    {
      id: 2,
      itemCode: "00405",
      itemName: "AV 1 IN 4 OUT SPLITTER AUDIO",
      quantity: 15,
      pRate: 4.00,
      sRate: 7.00,
      profit: 45.00,
      margin: 42.8
    }
  ];

  const input = "px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 transition-all";
  const label = "text-xs font-semibold text-gray-700 uppercase tracking-wide";

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  Sales & Profit Report
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Analytics
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Analyze margins and profitability
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
                <Printer size={18} />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
                <FileDown size={18} />
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Sales</p>
                <p className="text-xl font-bold text-gray-800">₹153.00</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Cost</p>
                <p className="text-xl font-bold text-gray-800">₹76.80</p>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Gross Profit</p>
                <p className="text-xl font-bold text-blue-600">₹76.20</p>
              </div>
              <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 shadow-sm">
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Net Margin</p>
                <p className="text-xl font-bold text-green-600">49.8%</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <select className={input}>
                  <option>All Items</option>
                  <option>By Category</option>
                  <option>By Brand</option>
                </select>
                <div className="relative w-64">
                  <input type="text" placeholder="Search items..." className={input} />
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={isCondensed} onChange={(e) => setIsCondensed(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Condensed</span>
              </label>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b-2 border-blue-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Item Details</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">P. Rate</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">S. Rate</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Profit</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Margin %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {profitData.map((item) => (
                  <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors duration-150">
                    <td className={`px-6 ${isCondensed ? 'py-2' : 'py-4'}`}>
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-600 font-medium">{item.itemName}</span>
                        <span className="text-xs text-gray-400 font-mono">{item.itemCode}</span>
                      </div>
                    </td>
                    <td className="px-6 text-sm text-gray-700 text-right font-medium">{item.quantity}</td>
                    <td className="px-6 text-sm text-gray-500 text-right font-mono">₹{item.pRate.toFixed(2)}</td>
                    <td className="px-6 text-sm text-gray-700 text-right font-mono font-medium">₹{item.sRate.toFixed(2)}</td>
                    <td className="px-6 text-sm text-blue-600 text-right font-bold font-mono">₹{item.profit.toFixed(2)}</td>
                    <td className="px-6 text-right">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.margin > 50 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {item.margin}%
                      </span>
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

export default SalesProfit;