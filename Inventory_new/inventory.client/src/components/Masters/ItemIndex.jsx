import React, { useState } from "react";
import { 
  Package, 
  Save, 
  RotateCcw, 
  Search, 
  Image as ImageIcon,
  List
} from 'lucide-react';

function ItemIndex() {
  const [form, setForm] = useState({
    partNo: "",
    sapNo: "",
    name: "",
    arabicName: "",
    category: "",
    group: "",
    brand: "",
    unit: "",
    alternateUnit: "",
    alternateQty: "",
    purchaseUnit: "",
    purchaseRate: "",
    landingRate: "",
    mrp: "",
    rack: "",
    minimumLevel: "",
    stockType: "Stock Item",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full">
        <div className="max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
            {/* Header Bar */}
            <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white">
                <div className="flex items-center gap-4">
                    <h1 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Package size={14} className="text-yellow-400"/> Item Master
                    </h1>
                </div>
                <div className="flex gap-2">
                    <button className="bg-blue-600 hover:bg-blue-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                        <List size={12} /> Item List
                    </button>
                </div>
            </div>

            <div className="p-2 bg-[#e2ebf8]">
                {/* Main Form Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-2">
                    
                    {/* Left Column - Basic & Classification */}
                    <div className="md:col-span-8 bg-white p-3 border border-blue-200 rounded shadow-sm">
                        <h3 className="text-[10px] font-bold text-blue-800 uppercase mb-2 border-b border-blue-100 pb-1">Basic Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            {/* Row 1 */}
                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">Item Name</span>
                                <input 
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleChange}
                                    className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                    placeholder="Item Name"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">Arabic Name</span>
                                <input 
                                    name="arabicName" 
                                    value={form.arabicName} 
                                    onChange={handleChange}
                                    className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500 text-right" 
                                    placeholder="Arabic Name"
                                />
                            </div>

                            {/* Row 2 */}
                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">Part No</span>
                                <input 
                                    name="partNo" 
                                    value={form.partNo} 
                                    onChange={handleChange}
                                    className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">SAP No</span>
                                <input 
                                    name="sapNo" 
                                    value={form.sapNo} 
                                    onChange={handleChange}
                                    className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                />
                            </div>

                            {/* Row 3 */}
                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">Category</span>
                                <div className="flex flex-1">
                                    <input 
                                        name="category" 
                                        value={form.category} 
                                        onChange={handleChange}
                                        className="w-full border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                    />
                                    <button className="bg-slate-200 px-1.5 border border-l-0 border-slate-300 hover:bg-slate-300"><Search size={12}/></button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">Group</span>
                                <div className="flex flex-1">
                                    <input 
                                        name="group" 
                                        value={form.group} 
                                        onChange={handleChange}
                                        className="w-full border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                    />
                                    <button className="bg-slate-200 px-1.5 border border-l-0 border-slate-300 hover:bg-slate-300"><Search size={12}/></button>
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">Brand</span>
                                <div className="flex flex-1">
                                    <input 
                                        name="brand" 
                                        value={form.brand} 
                                        onChange={handleChange}
                                        className="w-full border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                    />
                                    <button className="bg-slate-200 px-1.5 border border-l-0 border-slate-300 hover:bg-slate-300"><Search size={12}/></button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">Rack / Location</span>
                                <input 
                                    name="rack" 
                                    value={form.rack} 
                                    onChange={handleChange}
                                    className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                />
                            </div>
                        </div>

                        <h3 className="text-[10px] font-bold text-blue-800 uppercase mb-2 mt-4 border-b border-blue-100 pb-1">Units & Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                             <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">Base Unit</span>
                                <input 
                                    name="unit" 
                                    value={form.unit} 
                                    onChange={handleChange}
                                    className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">MRP</span>
                                <input 
                                    name="mrp" 
                                    value={form.mrp} 
                                    onChange={handleChange}
                                    className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500 text-right font-bold" 
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">Purchase Rate</span>
                                <input 
                                    name="purchaseRate" 
                                    value={form.purchaseRate} 
                                    onChange={handleChange}
                                    className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500 text-right" 
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-24 text-[11px] font-semibold text-slate-600">Landing Rate</span>
                                <input 
                                    name="landingRate" 
                                    value={form.landingRate} 
                                    onChange={handleChange}
                                    className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500 text-right" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Settings & Image */}
                    <div className="md:col-span-4 flex flex-col gap-2">
                        <div className="bg-white p-3 border border-blue-200 rounded shadow-sm flex-1">
                             <h3 className="text-[10px] font-bold text-blue-800 uppercase mb-2 border-b border-blue-100 pb-1">Inventory Settings</h3>
                             <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-24 text-[11px] font-semibold text-slate-600">Stock Type</span>
                                    <select 
                                        name="stockType" 
                                        value={form.stockType} 
                                        onChange={handleChange}
                                        className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500"
                                    >
                                        <option>Stock Item</option>
                                        <option>Non Stock Item</option>
                                        <option>Service</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-24 text-[11px] font-semibold text-slate-600">Min Level</span>
                                    <input 
                                        name="minimumLevel" 
                                        value={form.minimumLevel} 
                                        onChange={handleChange}
                                        className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-24 text-[11px] font-semibold text-slate-600">Alt Unit</span>
                                    <input 
                                        name="alternateUnit" 
                                        value={form.alternateUnit} 
                                        onChange={handleChange}
                                        className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-24 text-[11px] font-semibold text-slate-600">Alt Qty</span>
                                    <input 
                                        name="alternateQty" 
                                        value={form.alternateQty} 
                                        onChange={handleChange}
                                        className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" 
                                    />
                                </div>
                             </div>
                        </div>

                        <div className="bg-white p-3 border border-blue-200 rounded shadow-sm h-40 flex flex-col items-center justify-center text-slate-400">
                            <ImageIcon size={32} className="mb-2 opacity-50"/>
                            <span className="text-[10px] font-semibold uppercase">Item Image</span>
                        </div>
                    </div>
                </div>

                {/* Rate Table Section */}
                <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm mb-2">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#f8fafc] border-b border-slate-300">
                            <tr className="text-[#1e3a8a] font-bold text-[10px] uppercase text-left">
                                <th className="p-2 border-r border-slate-200">Rate Name</th>
                                <th className="p-2 border-r border-slate-200 w-32 text-right">Margin %</th>
                                <th className="p-2 w-40 text-right">Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                              "Customer Price",
                              "Technician Price",
                              "Wholesale Price",
                            ].map((rate) => (
                              <tr key={rate} className="hover:bg-blue-50/50 transition-colors">
                                <td className="p-1.5 border-r border-slate-100 text-xs font-medium text-slate-700">{rate}</td>
                                <td className="p-1.5 border-r border-slate-100">
                                  <input className="w-full text-right outline-none px-1 text-xs border border-transparent hover:border-slate-200 focus:border-blue-300 rounded" placeholder="0.00" />
                                </td>
                                <td className="p-1.5">
                                  <input className="w-full text-right outline-none px-1 text-xs border border-transparent hover:border-slate-200 focus:border-blue-300 rounded font-bold" placeholder="0.00" />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Action Footer */}
                <div className="flex justify-between items-center bg-white p-2 border border-blue-200 rounded shadow-sm">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setForm({})} 
                            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded font-bold text-slate-700 text-[11px] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                        >
                            <RotateCcw size={14} strokeWidth={2.5} className="text-red-500"/> CLEAR
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            className="flex items-center gap-2 px-10 py-1.5 rounded bg-emerald-600 font-black text-white text-[12px] shadow-md hover:bg-emerald-700 active:scale-95 transition-all uppercase tracking-wide"
                        >
                            <Save size={18} strokeWidth={2.5} /> SAVE ITEM
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ItemIndex;
