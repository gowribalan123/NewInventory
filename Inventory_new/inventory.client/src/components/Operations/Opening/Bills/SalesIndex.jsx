import React, { useState } from 'react';
import { Search, Save, RotateCcw, Plus, Trash2, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Mock Data for LOV ---
const lovData = {
  parties: [
    { name: 'Cash Customer', type: 'Retail' },
    { name: 'Walk-in General', type: 'Retail' },
    { name: 'Adarsh Traders', type: 'Wholesale' },
    { name: 'Tech Solutions', type: 'Wholesale' },
  ]
};

const SalesIndex = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLov, setShowLov] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    partyName: '',
    billNo: '',
    amount: '',
    narration: '',
    type: 'Sales',
    invoiceDate: '2026-02-06'
  });

  // Table List State
  const [salesList, setSalesList] = useState([]);

  // Add item to list
  const handleAdd = () => {
    if (!formData.partyName || !formData.amount) {
      alert("Please enter Party Name and Amount");
      return;
    }
    const newItem = {
      id: Date.now(),
      invoiceNo: formData.billNo || 'N/A',
      invoiceDate: formData.invoiceDate,
      partyName: formData.partyName,
      amount: parseFloat(formData.amount),
      narration: formData.narration
    };
    setSalesList([...salesList, newItem]);
    // Reset partial form
    setFormData({ ...formData, partyName: '', billNo: '', amount: '', narration: '' });
  };

  const handleRemove = (id) => {
    setSalesList(salesList.filter(item => item.id !== id));
  };

  const handleSave = () => {
    console.log("Saving Sales Opening Bills:", salesList);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const grandTotal = salesList.reduce((sum, item) => sum + item.amount, 0);

  const handleLovSelect = (item) => {
    setFormData({ ...formData, partyName: item.name });
    setShowLov(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans text-sm">
      <div className="max-w-[98%] mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200">
        
        {/* Header Bar - Modern Zoho Style (Clean White) */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 rounded-xl">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">Sales Opening Balance</h1>
                <p className="text-xs text-slate-500 font-medium">Financial Year Opening Entries</p>
              </div>
            </div>
          </div>
          <div className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100">
            Opening Mode
          </div>
        </div>

        <div className="p-6 bg-slate-50/30">
          {/* Entry Form Section */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Column 1 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Party Name</label>
                  <div className="flex flex-1">
                    <input 
                      type="text" value={formData.partyName}
                      onChange={(e) => setFormData({...formData, partyName: e.target.value})}
                      className="w-full border border-slate-300 rounded-l-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="Select Party..."
                    />
                    <button 
                      onClick={() => setShowLov(true)}
                      className="bg-slate-100 px-3 border border-l-0 border-slate-300 rounded-r-lg hover:bg-slate-200 text-slate-500"
                    ><Search size={16}/></button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Bill No</label>
                  <input 
                    type="text" value={formData.billNo}
                    onChange={(e) => setFormData({...formData, billNo: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Enter Bill No"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Transaction Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Sales">Sales</option>
                    <option value="Return">Sales Return</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Invoice Date</label>
                  <input 
                    type="date" value={formData.invoiceDate}
                    onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Bill Amount</label>
                  <input 
                    type="number" value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-blue-600 outline-none focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Narration</label>
                  <input 
                    value={formData.narration}
                    onChange={(e) => setFormData({...formData, narration: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="Remarks..."
                  />
                </div>
              </div>

              {/* Column 4: Action */}
              <div className="flex items-end justify-end">
                <button 
                  onClick={handleAdd}
                  className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-200 active:scale-95"
                >
                  <Plus size={18} /> Add Entry
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-slate-500 font-bold text-xs uppercase">
                  <th className="py-3 px-4">Invoice No</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Party Name</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4">Narration</th>
                  <th className="py-3 px-4 text-center w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {salesList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-slate-400 italic text-sm">
                      No opening bills added. Use the form above.
                    </td>
                  </tr>
                ) : (
                  salesList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-3 px-4 text-sm text-slate-600 font-medium">{item.invoiceNo}</td>
                      <td className="py-3 px-4 text-sm text-slate-500">{item.invoiceDate}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-slate-700">{item.partyName}</td>
                      <td className="py-3 px-4 text-sm text-blue-600 font-bold text-right">
                        {item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-500 italic truncate max-w-[200px]">
                        {item.narration || '-'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button onClick={() => handleRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Action Bar */}
          <div className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-bold text-slate-600 text-xs hover:bg-slate-50 transition-colors"
            >
              <RotateCcw size={16}/> Reset Form
            </button>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">Total Opening Balance</span>
                <div className="text-xl font-black text-slate-800">
                  ₹ {grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <button 
                onClick={handleSave} 
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 font-bold text-white text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                <Save size={18} /> Save Opening Balance
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LOV Modal */}
      {showLov && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="p-3 bg-slate-100 flex justify-between font-bold border-b text-xs">
               <span className="uppercase">SELECT PARTY</span>
               <button onClick={() => setShowLov(false)} className="hover:text-red-500">✕</button>
             </div>
             <div className="p-1 max-h-64 overflow-y-auto">
               {lovData.parties.map((item, i) => (
                 <div key={i} onClick={() => handleLovSelect(item)} className="p-2 border-b last:border-0 hover:bg-blue-50 cursor-pointer flex justify-between items-center group">
                   <span className="font-medium text-xs group-hover:text-blue-700">{item.name}</span>
                   <span className="text-slate-400 text-[10px]">{item.type}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesIndex;