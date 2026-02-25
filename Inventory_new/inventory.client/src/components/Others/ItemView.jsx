import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Edit2, Package, Printer, FileDown, Filter, Trash2 } from 'lucide-react';

const ItemView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCondensed, setIsCondensed] = useState(false);

  const itemsData = [
    {
      id: 1,
      partNo: "4104",
      name: '"F" CONNECTOR COMPRESS (COAX.T100/CXT60)',
      category: "CONNECTORS",
      brand: "TELEVES",
      unit: "Nos",
      stock: 437,
      purRate: 0.14,
      costPrice: 0.14,
      customerPrice: 0.40,
      technicianPrice: 0.25,
      wholesalePrice: 0.20,
      projectPrice: 0.30
    },
    {
      id: 2,
      partNo: "00405",
      name: "AV 1 IN 4 OUT SPLITTER AUDIO",
      category: "ACCESSORIES",
      brand: "GENERIC",
      unit: "Nos",
      stock: 50,
      purRate: 4.00,
      costPrice: 4.00,
      customerPrice: 7.00,
      technicianPrice: 6.00,
      wholesalePrice: 5.50,
      projectPrice: 7.00
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
                  Item Master
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Inventory
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Manage product catalog and stock details
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
                <Plus size={16} /> New Item
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className={label}>Search Items</label>
                <div className="relative mt-1.5">
                  <input type="text" placeholder="Search by name, part no..." className={input} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className={label}>Category</label>
                <select className={`${input} mt-1.5 w-full`}>
                  <option>All Categories</option>
                  <option>Connectors</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="flex items-end justify-between">
                <label className="flex items-center gap-2 cursor-pointer group pb-2">
                  <input type="checkbox" checked={isCondensed} onChange={(e) => setIsCondensed(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Condensed</span>
                </label>
                <button className="flex items-center gap-2 text-sm text-blue-600 font-medium pb-2 hover:underline">
                  <Filter size={14} /> Advanced
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b-2 border-blue-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Item Details</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Purchase Rate</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Selling Price</th>
                  <th className="px-6 py-3 w-20 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {itemsData.map((item) => (
                  <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors duration-150">
                    <td className={`px-6 ${isCondensed ? 'py-2' : 'py-4'}`}>
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-600 font-medium">{item.name}</span>
                        <span className="text-xs text-gray-400 font-mono">{item.partNo}</span>
                      </div>
                    </td>
                    <td className="px-6 text-sm text-gray-600">
                      <div className="flex flex-col">
                        <span>{item.category}</span>
                        <span className="text-[10px] text-gray-400 uppercase">{item.brand}</span>
                      </div>
                    </td>
                    <td className="px-6 text-sm text-right">
                      <span className={`font-bold ${item.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {item.stock}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">{item.unit}</span>
                    </td>
                    <td className="px-6 text-sm text-gray-600 text-right font-mono">₹{item.purRate.toFixed(2)}</td>
                    <td className="px-6 text-sm text-gray-800 text-right font-bold font-mono">₹{item.customerPrice.toFixed(2)}</td>
                    <td className="px-6 text-center">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-blue-100 rounded text-blue-600"><Edit2 size={14}/></button>
                        <button className="p-1 hover:bg-red-100 rounded text-red-600"><Trash2 size={14}/></button>
                      </div>
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

export default ItemView;