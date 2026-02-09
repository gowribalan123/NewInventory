import React, { useState, useEffect } from 'react';
import { Trash2, Search, Plus, Save, RotateCcw, ArrowRightLeft } from 'lucide-react';

// --- Initializers ---
const getInitialFormData = () => ({
  billNo: `ST-${Math.floor(1000 + Math.random() * 9000)}`,
  date: new Date().toISOString().split('T')[0],
  stockFrom: '',
  stockTo: '',
  narration: '',
  grandTotal: 0
});

const getInitialItems = () => ([
  { id: Date.now(), partNo: '', itemName: '', quantity: '', rate: '', total: 0 }
]);

// --- Mock Data ---
const godownList = [
  { name: 'Main Warehouse' },
  { name: 'Cold Storage' },
  { name: 'Shop Floor' },
];

const lovData = {
  trans: [
    { billNo: 'ST-1001', date: '2026-02-10', stockFrom: 'Main Warehouse', stockTo: 'Shop Floor', grandTotal: 5000, items: [{ id: 1, partNo: 'P1', itemName: 'Monitor', quantity: 10, rate: 500, total: 5000 }] },
    { billNo: 'ST-1002', date: '2026-02-12', stockFrom: 'Cold Storage', stockTo: 'Main Warehouse', grandTotal: 2400, items: [{ id: 2, partNo: 'P2', itemName: 'Keyboard', quantity: 20, rate: 120, total: 2400 }] },
  ],
  stockFrom: godownList,
  stockTo: godownList
};

const StockTransferIndex = () => { // Fixed Name
  const [isEditMode, setIsEditMode] = useState(false);
  const [items, setItems] = useState(getInitialItems());
  const [formData, setFormData] = useState(getInitialFormData());
  const [showLov, setShowLov] = useState(false);
  const [lovType, setLovType] = useState('');

  // Handler for Header Fields
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
    setFormData(prev => ({ ...prev, grandTotal: total }));
  }, [items]);

  const addRow = () => {
    setItems([...items, { id: Date.now(), partNo: '', itemName: '', quantity: '', rate: '', total: 0 }]);
  };

  const deleteRow = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.total = (Number(updatedItem.quantity) || 0) * (Number(updatedItem.rate) || 0);
        }
        return updatedItem;
      }
      return item;
    }));
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
    } else if (lovType === 'stockFrom' || lovType === 'stockTo') {
      setFormData(prev => ({ ...prev, [lovType]: item.name }));
    }
    setShowLov(false);
  };

  const handleSave = () => {
    console.log(isEditMode ? 'Updating:' : 'Saving:', { ...formData, items });
    alert(isEditMode ? 'Transfer Updated!' : 'Transfer Saved!');
    if (!isEditMode) resetForm();
  };

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full">
      <div className="max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <ArrowRightLeft size={14} className="text-blue-400"/> Stock Transfer
            </h1>
            <div className="flex text-[10px] border-l border-slate-600 ml-2">
               <button className="px-3 py-0.5 bg-blue-600 font-bold">Entry</button>
               <button className="px-3 py-0.5 hover:bg-slate-700">Report</button>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isEditMode ? 'bg-orange-500' : 'bg-emerald-500'}`}>
            {isEditMode ? 'EDIT MODE' : 'NEW ENTRY'}
          </span>
        </div>

        {/* Form Content */}
        <div className="p-2 bg-[#e2ebf8]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 mb-2 bg-white p-3 border border-blue-200 rounded shadow-sm">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Bill No</span>
                <div className="flex flex-1">
                  <input className="w-full border border-slate-300 p-1 text-xs outline-none bg-slate-50 font-bold" value={formData.billNo} readOnly />
                  <button onClick={() => handleLovClick('trans')} className="bg-slate-200 px-1.5 border border-l-0 border-slate-300 hover:bg-slate-300"><Search size={12}/></button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Date</span>
                {/* Fixed: changed defaultValue to value and added onChange */}
                <input type="date" name="date" className="flex-1 border border-slate-300 p-1 text-xs outline-none" value={formData.date} onChange={handleHeaderChange} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600 text-blue-700">Stock From</span>
                <div className="flex flex-1">
                  {/* Added value and onChange */}
                  <input name="stockFrom" value={formData.stockFrom} readOnly className="w-full border border-blue-300 p-1 text-xs outline-none bg-slate-50" placeholder="Select Source..." />
                  <button onClick={() => handleLovClick('stockFrom')} className="bg-blue-600 text-white px-2 border border-blue-600 font-bold text-xs hover:bg-blue-700">L</button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600 text-green-700">Stock To</span>
                <div className="flex flex-1">
                   {/* Added value and onChange */}
                  <input name="stockTo" value={formData.stockTo} readOnly className="w-full border border-green-300 p-1 text-xs outline-none bg-slate-50" placeholder="Select Destination..." />
                  <button onClick={() => handleLovClick('stockTo')} className="bg-green-600 text-white px-2 border border-green-600 font-bold text-xs hover:bg-green-700">L</button>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Narration</span>
                 {/* Added value and onChange */}
                <textarea name="narration" value={formData.narration} onChange={handleHeaderChange} rows="1" className="flex-1 border border-slate-300 p-1 text-xs outline-none resize-none" placeholder="Remarks..."></textarea>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Print Type</span>
                <select className="flex-1 border border-slate-300 p-1 text-xs outline-none">
                  <option>Windows</option>
                  <option>Thermal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-[#f8fafc] border-b border-slate-300">
                <tr className="text-[#1e3a8a] font-bold text-[11px] uppercase text-left">
                  <th className="p-1.5 border-r border-slate-200 w-12 text-center">Sl No</th>
                  <th className="p-1.5 border-r border-slate-200 w-32">Part No</th>
                  <th className="p-1.5 border-r border-slate-200">Item Name</th>
                  <th className="p-1.5 border-r border-slate-200 w-28 text-right">Quantity</th>
                  <th className="p-1.5 border-r border-slate-200 w-28 text-right">Rate</th>
                  <th className="p-1.5 border-r border-slate-200 w-32 text-right">Total</th>
                  <th className="p-1.5 w-10 text-center text-red-600">Del</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, index) => ( // Using index for correct Sl No
                  <tr key={item.id} className="hover:bg-blue-50/50">
                    <td className="p-1 border-r border-slate-100 text-center text-xs text-slate-400 font-bold">{index + 1}</td>
                    <td className="p-1 border-r border-slate-100">
                      <input className="w-full outline-none px-1 text-xs" value={item.partNo} onChange={(e) => handleItemChange(item.id, 'partNo', e.target.value)} />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input className="w-full outline-none px-1 text-xs" value={item.itemName} onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)} />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input type="number" className="w-full text-right outline-none px-1 text-xs" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input type="number" className="w-full text-right outline-none px-1 text-xs" value={item.rate} onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)} />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input readOnly className="w-full text-right bg-transparent text-xs font-bold" value={Number(item.total).toFixed(2)} />
                    </td>
                    <td className="p-1 text-center">
                      <button onClick={() => deleteRow(item.id)} className="text-red-400 hover:text-red-600 disabled:opacity-30" disabled={items.length <= 1}>
                        <Trash2 size={13}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={addRow} className="w-full py-1.5 bg-slate-50 text-blue-600 font-bold text-[10px] uppercase border-t hover:bg-blue-100 transition-colors">
              <Plus size={12} className="inline mr-1"/> Add Line Item
            </button>
          </div>

          {/* Totals Section */}
          <div className="mt-2 flex justify-between items-center bg-white p-2 border border-blue-200 rounded">
            <div className="flex gap-2">
              <button onClick={resetForm} className="flex items-center gap-1 px-4 py-1 border border-slate-300 rounded font-bold text-slate-600 text-[11px] shadow-sm hover:bg-slate-50"><RotateCcw size={14}/> RESET</button>
              <button onClick={handleSave} className="flex items-center gap-1 px-8 py-1 rounded bg-[#0369a1] font-bold text-white text-[11px] shadow-md hover:bg-[#075985]"><Save size={14}/> {isEditMode ? 'UPDATE' : 'SAVE'} TRANSFER</button>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Grand Total</span>
              <div className="border border-slate-400 px-4 py-1 bg-slate-50 text-xl font-black text-slate-800 rounded min-w-[160px]">
                ₹ {formData.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
               <span className="uppercase">SELECT {lovType === 'trans' ? 'TRANSACTION' : lovType.replace(/([A-Z])/g, ' $1').trim()}</span>
               <button onClick={() => setShowLov(false)} className="hover:text-red-500">✕</button>
             </div>
             <div className="p-1 max-h-64 overflow-y-auto">
               {lovData[lovType]?.map((item, i) => (
                 <div key={i} onClick={() => handleLovSelect(item)} className="p-2 border-b last:border-0 hover:bg-blue-50 cursor-pointer flex justify-between items-center group">
                   <span className="font-medium text-xs group-hover:text-blue-700">{item.billNo || item.name}</span>
                   <span className="text-slate-400 text-[10px]">{item.stockFrom ? `${item.stockFrom} -> ${item.stockTo}` : ''}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockTransferIndex;