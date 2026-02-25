import React, { useState } from 'react';
import { Search, Printer, Plus, Settings, ChevronDown, FileDown, Package } from 'lucide-react';

const PriceList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCondensed, setIsCondensed] = useState(false);

  // 1. LOGIC: Full dummy data to ensure every column is filled
  const dummyPriceListData = [
    {
      id: 1,
      partNo: "4104",
      itemName: '"F" CONNECTOR COMPRESS (COAX.T100/CXT60)',
      stock: 437,
      customerPrice: 0.40,
      technician: 0.25,
      wholesale: 0.20,
      project: 0.30
    },
    {
      id: 2,
      partNo: "4106",
      itemName: '"F" CONNECTOR COMPRESSION (COAX.TR165)',
      stock: 50,
      customerPrice: 1.00,
      technician: 0.85,
      wholesale: 0.75,
      project: 1.00
    },
    {
      id: 3,
      partNo: "L-TYPE",
      itemName: 'L TYPE CONNECTOR',
      stock: 0,
      customerPrice: 1.50,
      technician: 1.50,
      wholesale: 1.50,
      project: 1.50
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
                <Package className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  Price List
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Master
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Manage item pricing tiers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
                <Printer size={18} />
              </button>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all shadow-sm flex items-center gap-2">
                <Plus size={16} /> New Item
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className={label}>Item / Part No</label>
                <div className="relative mt-1.5">
                  <input type="text" placeholder="Search items..." className={input} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className={label}>Category</label>
                <select className={`${input} mt-1.5 w-full`}>
                  <option>All Categories</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer group pb-2">
                  <input type="checkbox" checked={isCondensed} onChange={(e) => setIsCondensed(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Condensed</span>
                </label>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b-2 border-blue-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Part No</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/3">Item Name</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Customer Price</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Technician</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Wholesale</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Project</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dummyPriceListData.map((item) => (
                  <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors duration-150">
                    <td className={`px-6 text-xs text-gray-500 font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>{item.partNo}</td>
                    <td className="px-6 text-sm text-blue-600 font-medium">{item.itemName}</td>
                    <td className="px-6 text-sm text-gray-700 text-right font-medium">{item.stock}</td>
                    <td className="px-6 text-sm text-gray-700 text-right">₹{item.customerPrice.toFixed(2)}</td>
                    <td className="px-6 text-sm text-gray-700 text-right">₹{item.technician.toFixed(2)}</td>
                    <td className="px-6 text-sm text-gray-700 text-right">₹{item.wholesale.toFixed(2)}</td>
                    <td className="px-6 text-sm text-gray-700 text-right font-semibold">₹{item.project.toFixed(2)}</td>
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

export default PriceList;