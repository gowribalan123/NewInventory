import React, { useState, useEffect } from 'react';
import { Trash2, Search, Plus, Save, RotateCcw, Split } from 'lucide-react';

// --- Initializers ---
const getInitialFormData = () => ({
  slipNo: `SP-${Math.floor(1000 + Math.random() * 9000)}`,
  date: new Date().toISOString().split('T')[0],
});

const getInitialFromItems = () => ([
  { id: Date.now(), itemCode: '', itemName: '', unit: '', qty: '', purchaseRate: '', salesRate: '' }
]);

const getInitialToItems = () => ([
  { id: Date.now() + 1, itemCode: '', itemName: '', unit: '', qty: '', purchaseRate: '', salesRate: '' }
]);

// --- Mock Data ---
const lovData = {
  split: [
    { slipNo: 'SP-1001', date: '2026-02-15' },
    { slipNo: 'SP-1002', date: '2026-02-16' },
  ],
  item: [
    { itemCode: 'ITM001', itemName: 'Bulk Wheat', unit: 'KG', purchaseRate: 20, salesRate: 25 },
    { itemCode: 'ITM002', itemName: 'Wheat Packet 1KG', unit: 'PKT', purchaseRate: 22, salesRate: 30 },
    { itemCode: 'ITM003', itemName: 'Wheat Packet 5KG', unit: 'BAG', purchaseRate: 100, salesRate: 140 },
  ]
};

const ItemSplitupIndex = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showLov, setShowLov] = useState(false);
  const [lovType, setLovType] = useState('');
  const [activeRowId, setActiveRowId] = useState(null);
  const [activeSection, setActiveSection] = useState(''); // 'from' or 'to'
  
  // State for the "From" section (Usually a single primary item)
  const [fromItems, setFromItems] = useState(getInitialFromItems());

  // State for the "To" section (Multiple resulting items)
  const [toItems, setToItems] = useState(getInitialToItems());

  const [formData, setFormData] = useState(getInitialFormData());

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addRowTo = () => {
    setToItems([...toItems, { id: Date.now(), itemCode: '', itemName: '', unit: '', qty: '', purchaseRate: '', salesRate: '' }]);
  };

  const handleTableChange = (setter, items, id, field, value) => {
    setter(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const deleteRowTo = (id) => {
    if (toItems.length > 1) {
      setToItems(toItems.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setFromItems(getInitialFromItems());
    setToItems(getInitialToItems());
    setIsEditMode(false);
  };

  const handleSave = () => {
    console.log(isEditMode ? 'Updating:' : 'Saving:', { ...formData, fromItems, toItems });
    alert(isEditMode ? 'Split Up Updated!' : 'Split Up Saved!');
    if (!isEditMode) resetForm();
  };

  const handleLovClick = (type, section = null, rowId = null) => {
    setLovType(type);
    setActiveSection(section);
    setActiveRowId(rowId);
    setShowLov(true);
  };

  const handleLovSelect = (item) => {
    if (lovType === 'split') {
      setFormData({ ...getInitialFormData(), ...item });
      setIsEditMode(true);
    } else if (lovType === 'item') {
      const targetSetter = activeSection === 'from' ? setFromItems : setToItems;
      const targetItems = activeSection === 'from' ? fromItems : toItems;
      
      targetSetter(targetItems.map(row => {
        if (row.id === activeRowId) {
          return { ...row, itemCode: item.itemCode, itemName: item.itemName, unit: item.unit, purchaseRate: item.purchaseRate, salesRate: item.salesRate };
        }
        return row;
      }));
    }
    setShowLov(false);
  };

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full">
      {/* Container widened to 99% for maximum screen utility */}
      <div className="max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
        
        {/* Compact Header Bar */}
        <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Split size={14} className="text-blue-400"/> Item Split Up
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

        {/* Top Input Section */}
        <div className="p-2 bg-[#e2ebf8]">
          <div className="flex flex-wrap gap-6 mb-2 bg-white p-3 border border-blue-200 rounded shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-16 text-[11px] font-semibold text-slate-600">Slip No</span>
              <div className="flex w-32">
                <input name="slipNo" className="w-full border border-slate-300 p-1 text-xs outline-none bg-slate-50 font-bold" value={formData.slipNo} readOnly />
                <button onClick={() => handleLovClick('split')} className="bg-slate-200 px-1.5 border border-l-0 border-slate-300 hover:bg-slate-300"><Search size={12}/></button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-[11px] font-semibold text-slate-600">Date</span>
              <input type="date" name="date" className="w-40 border border-slate-300 p-1 text-xs outline-none" value={formData.date} onChange={handleHeaderChange} />
            </div>
          </div>

          {/* Section: FROM (Source Item) */}
          <div className="mb-3">
            <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 w-fit rounded-t ml-1 uppercase">From</div>
            <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
              <table className="w-full border-collapse">
                <thead className="bg-[#f8fafc] border-b border-slate-300">
                  <tr className="text-[#1e3a8a] font-bold text-[10px] uppercase text-left">
                    <th className="p-1.5 border-r border-slate-200 w-32">Item Code</th>
                    <th className="p-1.5 border-r border-slate-200">Item Name</th>
                    <th className="p-1.5 border-r border-slate-200 w-24">Unit</th>
                    <th className="p-1.5 border-r border-slate-200 w-24 text-right">Qty</th>
                    <th className="p-1.5 border-r border-slate-200 w-28 text-right">Purchase Rate</th>
                    <th className="p-1.5 w-28 text-right">Sales Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {fromItems.map((item) => (
                    <tr key={item.id} className="bg-blue-50/30">
                      <td className="p-1 border-r border-slate-100">
                        <div className="flex">
                          <input className="w-full outline-none px-1 text-xs" value={item.itemCode} onChange={(e) => handleTableChange(setFromItems, fromItems, item.id, 'itemCode', e.target.value)} />
                          <button onClick={() => handleLovClick('item', 'from', item.id)}><Search size={12} className="text-slate-400 mt-1 cursor-pointer hover:text-blue-600"/></button>
                        </div>
                      </td>
                      <td className="p-1 border-r border-slate-100"><input className="w-full outline-none px-1 text-xs" value={item.itemName} onChange={(e) => handleTableChange(setFromItems, fromItems, item.id, 'itemName', e.target.value)} /></td>
                      <td className="p-1 border-r border-slate-100"><input className="w-full outline-none px-1 text-xs text-center" value={item.unit} onChange={(e) => handleTableChange(setFromItems, fromItems, item.id, 'unit', e.target.value)} /></td>
                      <td className="p-1 border-r border-slate-100"><input type="number" className="w-full text-right outline-none px-1 text-xs font-bold" value={item.qty} onChange={(e) => handleTableChange(setFromItems, fromItems, item.id, 'qty', e.target.value)} /></td>
                      <td className="p-1 border-r border-slate-100"><input type="number" className="w-full text-right outline-none px-1 text-xs" value={item.purchaseRate} onChange={(e) => handleTableChange(setFromItems, fromItems, item.id, 'purchaseRate', e.target.value)} /></td>
                      <td className="p-1"><input type="number" className="w-full text-right outline-none px-1 text-xs" value={item.salesRate} onChange={(e) => handleTableChange(setFromItems, fromItems, item.id, 'salesRate', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: TO (Target Items) */}
          <div className="mb-3">
            <div className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 w-fit rounded-t ml-1 uppercase">To</div>
            <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
              <table className="w-full border-collapse">
                <thead className="bg-[#f8fafc] border-b border-slate-300">
                  <tr className="text-[#065f46] font-bold text-[10px] uppercase text-left">
                    <th className="p-1.5 border-r border-slate-200 w-32">Item Code</th>
                    <th className="p-1.5 border-r border-slate-200">Item Name</th>
                    <th className="p-1.5 border-r border-slate-200 w-24">Unit</th>
                    <th className="p-1.5 border-r border-slate-200 w-24 text-right">Qty</th>
                    <th className="p-1.5 border-r border-slate-200 w-28 text-right">Purchase Rate</th>
                    <th className="p-1.5 border-r border-slate-200 w-28 text-right">Sales Rate</th>
                    <th className="p-1.5 w-10 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {toItems.map((item) => (
                    <tr key={item.id} className="hover:bg-green-50/30 transition-colors">
                      <td className="p-1 border-r border-slate-100">
                        <div className="flex">
                          <input className="w-full outline-none px-1 text-xs" value={item.itemCode} onChange={(e) => handleTableChange(setToItems, toItems, item.id, 'itemCode', e.target.value)} />
                          <button onClick={() => handleLovClick('item', 'to', item.id)}><Search size={12} className="text-slate-400 mt-1 cursor-pointer hover:text-blue-600"/></button>
                        </div>
                      </td>
                      <td className="p-1 border-r border-slate-100"><input className="w-full outline-none px-1 text-xs" value={item.itemName} onChange={(e) => handleTableChange(setToItems, toItems, item.id, 'itemName', e.target.value)} /></td>
                      <td className="p-1 border-r border-slate-100"><input className="w-full outline-none px-1 text-xs text-center" value={item.unit} onChange={(e) => handleTableChange(setToItems, toItems, item.id, 'unit', e.target.value)} /></td>
                      <td className="p-1 border-r border-slate-100"><input type="number" className="w-full text-right outline-none px-1 text-xs font-bold" value={item.qty} onChange={(e) => handleTableChange(setToItems, toItems, item.id, 'qty', e.target.value)} /></td>
                      <td className="p-1 border-r border-slate-100"><input type="number" className="w-full text-right outline-none px-1 text-xs" value={item.purchaseRate} onChange={(e) => handleTableChange(setToItems, toItems, item.id, 'purchaseRate', e.target.value)} /></td>
                      <td className="p-1 border-r border-slate-100"><input type="number" className="w-full text-right outline-none px-1 text-xs" value={item.salesRate} onChange={(e) => handleTableChange(setToItems, toItems, item.id, 'salesRate', e.target.value)} /></td>
                      <td className="p-1 text-center">
                        <button onClick={() => deleteRowTo(item.id)} className="text-red-400 hover:text-red-600 disabled:opacity-30" disabled={toItems.length <= 1}>
                          <Trash2 size={13}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={addRowTo} className="w-full py-1 bg-slate-50 text-blue-600 font-bold text-[10px] uppercase border-t hover:bg-blue-100 transition-colors">
                <Plus size={12} className="inline mr-1"/> Add Split Item
              </button>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-2 flex justify-between items-center bg-white p-2 border border-blue-200 rounded">
            <div className="flex gap-2">
              <button onClick={resetForm} className="flex items-center gap-1 px-4 py-1 border border-slate-300 rounded font-bold text-slate-600 text-[11px] shadow-sm hover:bg-slate-50"><RotateCcw size={14}/> RESET</button>
              <button onClick={handleSave} className="flex items-center gap-1 px-8 py-1 rounded bg-[#0369a1] font-bold text-white text-[11px] shadow-md hover:bg-[#075985] transition-all"><Save size={14}/> {isEditMode ? 'UPDATE' : 'SAVE'} SPLIT UP</button>
            </div>
            <div className="text-[10px] text-slate-400 italic">
              * Ensure total 'To' quantities match 'From' quantity logic.
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
                   <span className="font-medium text-xs group-hover:text-blue-700">{item.slipNo || item.itemName}</span>
                   <span className="text-slate-400 text-[10px]">{item.itemCode || ''}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemSplitupIndex;