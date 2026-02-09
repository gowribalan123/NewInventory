import React, { useState } from 'react';
import { Search, Save, ArrowLeft, Package, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StockIndex = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Header State
  const [voucherNo, setVoucherNo] = useState('OS-001');
  const [date, setDate] = useState('2026-02-06');
  const [godown, setGodown] = useState('GODOWN');

  // Table Data State
  const [stockItems, setStockItems] = useState([
    { id: 1, partNo: 'P-001', itemName: 'Sony Bravia 42"', unit: 'PCS', qty: 0, pRate: 0, sRate: 0 },
    { id: 2, partNo: 'P-002', itemName: 'Samsung Galaxy S23', unit: 'NOS', qty: 0, pRate: 0, sRate: 0 },
  ]);

  const handleInputChange = (id, field, value) => {
    const updatedData = stockItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value === '' ? 0 : parseFloat(value) };
      }
      return item;
    });
    setStockItems(updatedData);
  };

  const handleSave = () => {
    console.log("Stock Data Saved:", { voucherNo, date, godown, stockItems });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Opening Stock</h1>
            <p className="text-sm text-slate-500">Initialize inventory levels and rates</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {showSuccess && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium animate-pulse">
              <CheckCircle2 size={18} /> Saved Successfully!
            </div>
          )}
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold shadow-md">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      {/* Top Form Fields (Voucher, Date, Godown) */}
      <div className="bg-white p-6 rounded-t-xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Voucher No</label>
          <input 
            type="text" value={voucherNo} onChange={(e) => setVoucherNo(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date</label>
          <input 
            type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Godown</label>
          <input 
            type="text" value={godown} onChange={(e) => setGodown(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-50 p-4 border-x border-slate-200 flex justify-between items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text" placeholder="Search Item Name or Part No..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600" /> BarCode Typing
          </label>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white border border-slate-200 rounded-b-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-4 py-3 text-xs font-bold uppercase w-32">Part No</th>
              <th className="px-4 py-3 text-xs font-bold uppercase">Item Name</th>
              <th className="px-4 py-3 text-xs font-bold uppercase w-24">Unit</th>
              <th className="px-4 py-3 text-xs font-bold uppercase w-32 text-right">Quantity</th>
              <th className="px-4 py-3 text-xs font-bold uppercase w-40 text-right">Purchase Rate</th>
              <th className="px-4 py-3 text-xs font-bold uppercase w-40 text-right">Sales Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stockItems.filter(i => i.itemName.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
                <td className="px-4 py-3 text-sm text-slate-600 font-mono">{item.partNo}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{item.itemName}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{item.unit}</td>
                <td className="px-4 py-3">
                  <input type="number" min="0" value={item.qty} onChange={(e) => handleInputChange(item.id, 'qty', e.target.value)}
                    className="w-full text-right bg-transparent border-b border-transparent group-hover:border-slate-200 focus:border-blue-500 outline-none p-1 text-sm" />
                </td>
                <td className="px-4 py-3">
                  <input type="number" min="0" value={item.pRate} onChange={(e) => handleInputChange(item.id, 'pRate', e.target.value)}
                    className="w-full text-right bg-transparent border-b border-transparent group-hover:border-slate-200 focus:border-blue-500 outline-none p-1 text-sm" />
                </td>
                <td className="px-4 py-3">
                  <input type="number" min="0" value={item.sRate} onChange={(e) => handleInputChange(item.id, 'sRate', e.target.value)}
                    className="w-full text-right bg-transparent border-b border-transparent group-hover:border-slate-200 focus:border-blue-500 outline-none p-1 text-sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockIndex;