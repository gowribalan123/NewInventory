import React, { useState } from 'react';
import { Search, Printer, MoreHorizontal, ChevronDown, Plus, Settings, FileText, CreditCard, FileDown, RotateCcw, Calendar } from 'lucide-react';

const CreditLimit = () => {
  const [selectedDate, setSelectedDate] = useState('2026-02-20');
  const [isCondensed, setIsCondensed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    { id: 1, name: "Global Solutions", limit: 50000, balance: 45000, status: "Near Limit" },
    { id: 2, name: "Vertex Industries", limit: 100000, balance: 20000, status: "Good" },
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
                <CreditCard className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  Credit Limit Report
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Control
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Monitor customer credit balances and limits
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
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all shadow-sm flex items-center gap-2">
                <Plus size={16} /> New Limit
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <label className={label}>As of Date</label>
                <div className="relative mt-1.5">
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={input}
                  />
                  <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="lg:col-span-3">
                <label className={label}>Search Customers</label>
                <div className="relative mt-1.5">
                  <input 
                    type="text" 
                    placeholder="Search by name..."
                    className={input}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer group pb-2">
                  <input 
                    type="checkbox" 
                    checked={isCondensed}
                    onChange={(e) => setIsCondensed(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    Condensed
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b-2 border-blue-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Credit Limit</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((c) => (
                  <tr key={c.id} className="group hover:bg-blue-50/30 transition-colors duration-150">
                    <td className={`px-6 text-sm text-blue-600 font-semibold ${isCondensed ? 'py-2' : 'py-4'}`}>{c.name}</td>
                    <td className="px-6 text-sm text-gray-700 text-right font-mono font-medium">₹{c.limit.toLocaleString()}</td>
                    <td className="px-6 text-sm text-gray-700 text-right font-mono font-medium">₹{c.balance.toLocaleString()}</td>
                    <td className="px-6 text-center">
                      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${c.status === 'Good' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 text-right">
                      <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-600 transition-all">
                        <MoreHorizontal size={16} />
                      </button>
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

export default CreditLimit;