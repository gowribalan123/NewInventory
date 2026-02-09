import React, { useState, useEffect } from 'react';
import { Trash2, Search, Plus, Save, RotateCcw } from 'lucide-react';

// --- Initializers ---
const getInitialFormData = () => ({
  transNo: `TR-${Math.floor(1000 + Math.random() * 9000)}`,
  transType: 'Receipt',
  date: new Date().toISOString().split('T')[0],
  stockType: 'Normal',
  partyName: '',
  narration: '',
  billType: 'Cash',
  account: 'Inventory',
  godown: '',
  netTotal: 0
});

const getInitialItems = () => ([
  { id: Date.now(), partNo: '', itemName: '', pack: '', quantity: '', pRate: '', total: 0 }
]);

// --- Mock Data ---
const lovData = {
  trans: [
    { transNo: 'TR-1001', date: '2026-02-01', partyName: 'Tech Supplies Ltd', netTotal: 5000, items: [{ id: 1, partNo: 'P1', itemName: 'Monitor', pack: 'Box', quantity: 10, pRate: 500, total: 5000 }] },
    { transNo: 'TR-1002', date: '2026-02-02', partyName: 'Office World', netTotal: 2400, items: [{ id: 2, partNo: 'P2', itemName: 'Keyboard', pack: 'Pcs', quantity: 20, pRate: 120, total: 2400 }] },
  ],
  party: [
    { name: 'Tech Supplies Ltd', type: 'Creditor' },
    { name: 'Office World', type: 'Creditor' },
    { name: 'General Motors', type: 'Debtor' },
  ],
  godown: [
    { name: 'Main Warehouse' },
    { name: 'Cold Storage' },
    { name: 'Shop Floor' },
  ]
};

const StockReceiptIndex = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(getInitialFormData());
  const [items, setItems] = useState(getInitialItems());
  const [showLov, setShowLov] = useState(false);
  const [lovType, setLovType] = useState('');

  // Auto-calculate Totals
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
    setFormData(prev => ({ ...prev, netTotal: total }));
  }, [items]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newItem = { ...item, [field]: value };
        // Auto-calc line total
        if (field === 'quantity' || field === 'pRate') {
          const qty = field === 'quantity' ? Number(value) : Number(item.quantity);
          const rate = field === 'pRate' ? Number(value) : Number(item.pRate);
          newItem.total = (qty || 0) * (rate || 0);
        }
        return newItem;
      }
      return item;
    }));
  };

  const addRow = () => {
    setItems([...items, { id: Date.now(), partNo: '', itemName: '', pack: '', quantity: '', pRate: '', total: 0 }]);
  };

  const deleteRow = (id) => {
    if (items.length > 1) setItems(items.filter(item => item.id !== id));
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setItems(getInitialItems());
    setIsEditMode(false);
  };

  const handleLovClick = (type) => {
    setLovType(type);
    setShowLov(true);
  };

  const handleLovSelect = (item) => {
    if (lovType === 'trans') {
      setFormData({ ...getInitialFormData(), ...item });
      if (item.items) {
        setItems(item.items.map(i => ({ ...i, id: Date.now() + Math.random() })));
      }
      setIsEditMode(true);
    } else if (lovType === 'party') {
      setFormData(prev => ({ ...prev, partyName: item.name }));
    } else if (lovType === 'godown') {
      setFormData(prev => ({ ...prev, godown: item.name }));
    }
    setShowLov(false);
  };

  const handleSave = () => {
    console.log(isEditMode ? 'Updating:' : 'Saving:', { ...formData, items });
    alert(isEditMode ? 'Transaction Updated!' : 'Transaction Saved!');
    if (!isEditMode) resetForm();
  };

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full">
      
      <div className="max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
        
        <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-bold uppercase tracking-wider">Stock Adjustment</h1>
            <div className="flex text-[10px] border-l border-slate-600 ml-2">
               <button className="px-3 py-0.5 bg-blue-600">Entry</button>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isEditMode ? 'bg-orange-500' : 'bg-emerald-500'}`}>
            {isEditMode ? 'EDIT MODE' : 'NEW ENTRY'}
          </span>
        </div>

        {/* Form Content - High density padding */}
        <div className="p-3 bg-[#e2ebf8]">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2 mb-3 bg-white p-3 border border-blue-200 rounded shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Trans. No</span>
                <div className="flex flex-1">
                  <input name="transNo" value={formData.transNo} onChange={handleInputChange} className="w-full border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" />
                  <button onClick={() => handleLovClick('trans')} className="bg-slate-200 px-1.5 border border-l-0 border-slate-300 hover:bg-slate-300"><Search size={12}/></button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Trans Type</span>
                <select name="transType" value={formData.transType} onChange={handleInputChange} className="flex-1 border border-slate-300 p-1 text-xs outline-none">
                  <option>Issue</option>
                  <option>Receipt</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Date</span>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="flex-1 border border-slate-300 p-1 text-xs outline-none" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Stock Type</span>
                <select name="stockType" value={formData.stockType} onChange={handleInputChange} className="flex-1 border border-slate-300 p-1 text-xs outline-none">
                  <option>Normal</option>
                  <option>Damaged</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Party Name</span>
                <div className="flex flex-1">
                  <input name="partyName" value={formData.partyName} onChange={handleInputChange} className="w-full border border-slate-300 p-1 text-xs outline-none" />
                  <button onClick={() => handleLovClick('party')} className="bg-slate-200 px-1.5 border border-l-0 border-slate-300 hover:bg-slate-300"><Search size={12}/></button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Narration</span>
                <input name="narration" value={formData.narration} onChange={handleInputChange} className="flex-1 border border-slate-300 p-1 text-xs outline-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Bill Type</span>
                <select name="billType" value={formData.billType} onChange={handleInputChange} className="flex-1 border border-slate-300 p-1 text-xs outline-none bg-slate-50">
                  <option>Cash</option>
                  <option>Credit</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Account</span>
                <select name="account" value={formData.account} onChange={handleInputChange} className="flex-1 border border-slate-300 p-1 text-xs outline-none">
                  <option>Inventory</option>
                </select>
              </div>
            </div>
            
            <div className="md:col-span-4 flex items-center gap-2 border-t pt-2 mt-1">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Godown</span>
                <div className="flex w-64">
                  <input name="godown" value={formData.godown} readOnly className="w-full border border-slate-300 p-1 text-xs outline-none bg-slate-50" placeholder="Select Godown..." />
                  <button onClick={() => handleLovClick('godown')} className="bg-slate-800 text-white px-2 border border-slate-800 font-bold text-xs hover:bg-slate-700">L</button>
                </div>
            </div>
          </div>

          <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-[#f8fafc] border-b border-slate-300">
                <tr className="text-[#991b1b] font-bold text-[11px] uppercase text-left">
                  <th className="p-1.5 border-r border-slate-200 w-10 text-center">#</th>
                  <th className="p-1.5 border-r border-slate-200 w-24">Part No</th>
                  <th className="p-1.5 border-r border-slate-200">Item Name</th>
                  <th className="p-1.5 border-r border-slate-200 w-20 text-center">Pack</th>
                  <th className="p-1.5 border-r border-slate-200 w-24 text-right">Quantity</th>
                  <th className="p-1.5 border-r border-slate-200 w-24 text-right">PRate</th>
                  <th className="p-1.5 border-r border-slate-200 w-28 text-right">Total</th>
                  <th className="p-1.5 w-10 text-center">Del</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 min-h-[300px]">
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-50/50">
                    <td className="p-1 border-r border-slate-100 text-center text-slate-400 text-[10px]">{index + 1}</td>
                    <td className="p-1 border-r border-slate-100"><input className="w-full outline-none px-1 text-xs bg-transparent" value={item.partNo} onChange={(e) => handleItemChange(item.id, 'partNo', e.target.value)} /></td>
                    <td className="p-1 border-r border-slate-100"><input className="w-full outline-none px-1 text-xs bg-transparent" value={item.itemName} onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)} /></td>
                    <td className="p-1 border-r border-slate-100 text-center"><input className="w-full text-center outline-none px-1 text-xs bg-transparent" value={item.pack} onChange={(e) => handleItemChange(item.id, 'pack', e.target.value)} /></td>
                    <td className="p-1 border-r border-slate-100"><input type="number" className="w-full text-right outline-none px-1 text-xs bg-transparent" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} /></td>
                    <td className="p-1 border-r border-slate-100"><input type="number" className="w-full text-right outline-none px-1 text-xs bg-transparent" value={item.pRate} onChange={(e) => handleItemChange(item.id, 'pRate', e.target.value)} /></td>
                    <td className="p-1 border-r border-slate-100"><input readOnly className="w-full text-right bg-transparent text-xs font-medium" value={Number(item.total).toFixed(2)} /></td>
                    <td className="p-1 text-center"><button onClick={() => deleteRow(item.id)} className="text-red-400 hover:text-red-600 disabled:opacity-30" disabled={items.length <= 1}><Trash2 size={13}/></button></td>
                  </tr>
                ))}
                {/* Blank rows */}
                {[...Array(Math.max(0, 6 - items.length))].map((_, i) => (
                  <tr key={`blank-${i}`} className="h-6"><td colSpan="8" className="border-b border-slate-50"></td></tr>
                ))}
              </tbody>
            </table>
            <button onClick={addRow} className="w-full py-1 bg-slate-50 text-blue-600 font-bold text-[10px] uppercase hover:bg-blue-100 border-t flex items-center justify-center gap-1">
              <Plus size={12}/> Add New Line
            </button>
          </div>

          <div className="mt-3 flex flex-col md:flex-row justify-between items-center bg-white p-2 border border-blue-200 rounded">
            <div className="flex gap-2">
              <button onClick={resetForm} className="flex items-center gap-1 px-4 py-1 border border-slate-300 rounded bg-white font-bold text-slate-600 hover:bg-slate-50 text-[11px] shadow-sm"><RotateCcw size={14}/> NEW</button>
              <button onClick={handleSave} className="flex items-center gap-1 px-6 py-1 rounded bg-[#059669] font-bold text-white hover:bg-[#047857] text-[11px] shadow-md transition-all"><Save size={14}/> {isEditMode ? 'UPDATE' : 'SAVE'} TRANSACTION</button>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Net Total:</span>
              <div className="border border-slate-400 px-4 py-1 bg-slate-50 text-lg font-black text-slate-800 min-w-[150px] text-right">
                ₹ {formData.netTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOV Modal */}
      {showLov && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="p-3 bg-slate-100 flex justify-between font-bold border-b text-xs">
               <span className="uppercase">SELECT {lovType}</span>
               <button onClick={() => setShowLov(false)} className="hover:text-red-500">✕</button>
             </div>
             <div className="p-1 max-h-64 overflow-y-auto">
               {lovData[lovType]?.map((item, i) => (
                 <div key={i} onClick={() => handleLovSelect(item)} className="p-2 border-b last:border-0 hover:bg-blue-50 cursor-pointer flex justify-between items-center group">
                   <span className="font-medium text-xs group-hover:text-blue-700">{item.transNo || item.name}</span>
                   <span className="text-slate-400 text-[10px]">{item.partyName || item.type || ''}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockReceiptIndex;