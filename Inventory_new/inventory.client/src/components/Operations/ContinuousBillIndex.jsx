
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Printer, 
//   Plus, 
//   Trash2, 
//   Save, 
//   RotateCcw, 
//   Search, 
//   Calculator,
//   FileText,
//   X,
//   History
// } from 'lucide-react';

// // --- Mock Data for UI Testing ---
// const lovData = {
//   parties: [
//     { name: 'Cash Customer', type: 'Retail' },
//     { name: 'Walk-in General', type: 'Retail' },
//     { name: 'Adarsh Traders', type: 'Wholesale' },
//     { name: 'Tech Solutions', type: 'Wholesale' },
//   ],
//   items: [
//     { itemCode: '1001', itemName: 'Wireless Mouse', rate: 450, unit: 'PCS' },
//     { itemCode: '1002', itemName: 'Keyboard USB', rate: 600, unit: 'PCS' },
//     { itemCode: '1003', itemName: 'Monitor 24"', rate: 12000, unit: 'PCS' },
//     { itemCode: '1004', itemName: 'USB Hub', rate: 1200, unit: 'PCS' },
//   ]
// };

// const ContinuousBillIndex = () => {
//   const [items, setItems] = useState([
//     { id: Date.now(), itemCode: '', itemName: '', qty: 0, rate: 0, unit: 'PCS', total: 0 }
//   ]);
  
//   const [formData, setFormData] = useState({
//     billNo: 'CB-9901',
//     date: new Date().toISOString().split('T')[0],
//     partyName: '',
//     billType: 'Cash',
//     formType: 'Retail',
//     printType: 'Windows',
//     autoPrint: true
//   });

//   // --- NEW STATE FOR LAST BILL ---
//   const [lastSavedBill, setLastSavedBill] = useState(null);

//   const [showLov, setShowLov] = useState(false);
//   const [lovType, setLovType] = useState('');
//   const [activeRowId, setActiveRowId] = useState(null);
  
//   const [showCalc, setShowCalc] = useState(false);
//   const [calcDisplay, setCalcDisplay] = useState('0');
  
//   const inputRefs = useRef({});

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'F2') {
//         e.preventDefault();
//         addRow();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [items]);

//   const handleItemChange = (id, field, value) => {
//     setItems(prev => prev.map(item => {
//       if (item.id === id) {
//         const updated = { ...item, [field]: value };
//         if (field === 'qty' || field === 'rate') {
//           updated.total = (Number(updated.qty) || 0) * (Number(updated.rate) || 0);
//         }
//         return updated;
//       }
//       return item;
//     }));
//   };

//   const addRow = () => {
//     const newId = Date.now();
//     setItems([...items, { id: newId, itemCode: '', itemName: '', qty: 0, rate: 0, unit: 'PCS', total: 0 }]);
    
//     setTimeout(() => {
//       if (inputRefs.current[newId]) {
//         inputRefs.current[newId].focus();
//       }
//     }, 50);
//   };

//   const removeRow = (id) => {
//     if (items.length > 1) {
//       const indexToDelete = items.findIndex(item => item.id === id);
//       const filteredItems = items.filter(item => item.id !== id);
//       setItems(filteredItems);

//       setTimeout(() => {
//         const focusIndex = indexToDelete > 0 ? indexToDelete - 1 : 0;
//         const focusId = filteredItems[focusIndex]?.id;
//         if (focusId && inputRefs.current[focusId]) {
//           inputRefs.current[focusId].focus();
//         }
//       }, 50);
//     } else {
//       setItems([{ id: Date.now(), itemCode: '', itemName: '', qty: 0, rate: 0, unit: 'PCS', total: 0 }]);
//     }
//   };

//   const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

//   // --- UPDATED SAVE LOGIC ---
//   const handleSave = () => {
//     if (!formData.partyName) {
//       alert("Please select or enter a Party Name.");
//       return;
//     }

//     // Save current bill to memory before doing anything else
//     setLastSavedBill({
//       formData: { ...formData },
//       items: [...items]
//     });

//     if (formData.autoPrint) {
//       window.print();
//     } else {
//       alert("Bill Saved Successfully!");
//     }
//   };

//   // --- NEW LAST BILL FUNCTION ---
//   const handleLastBill = () => {
//     if (!lastSavedBill) {
//       alert("No previous bill found in this session.");
//       return;
//     }
//     setFormData(lastSavedBill.formData);
//     setItems(lastSavedBill.items);
//     // Auto-trigger print for the retrieved bill
//     setTimeout(() => window.print(), 100);
//   };

//   const handleLovClick = (type, rowId = null) => {
//     setLovType(type);
//     setActiveRowId(rowId);
//     setShowLov(true);
//   };

//   const handleLovSelect = (data) => {
//     if (lovType === 'parties') {
//       setFormData(prev => ({ ...prev, partyName: data.name }));
//     } else if (lovType === 'items' && activeRowId) {
//       setItems(prev => prev.map(item => {
//         if (item.id === activeRowId) {
//           return {
//             ...item,
//             itemCode: data.itemCode,
//             itemName: data.itemName,
//             rate: data.rate,
//             unit: data.unit,
//             qty: item.qty === 0 ? 1 : item.qty, 
//             total: (Number(item.qty === 0 ? 1 : item.qty) || 1) * data.rate
//           };
//         }
//         return item;
//       }));
//     }
//     setShowLov(false);
//   };

//   const handleCalcBtn = (val) => {
//     if (val === 'C') {
//       setCalcDisplay('0');
//     } else if (val === '=') {
//       try {
//         const result = eval(calcDisplay.replace('×', '*').replace('÷', '/'));
//         setCalcDisplay(String(Number(result.toFixed(2))));
//       } catch {
//         setCalcDisplay('Error');
//       }
//     } else {
//       setCalcDisplay(prev => (prev === '0' || prev === 'Error' ? val : prev + val));
//     }
//   };

//   return (
//     <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full relative">
//       <style>{`
//         @media print {
//           aside, header, .no-print { display: none !important; }
//           body { background: white !important; }
//           .print-container { border: none !important; box-shadow: none !important; width: 100% !important; }
//           input, select { border: none !important; appearance: none; background: transparent !important; }
//           @page { margin: 0.5cm; }
//         }
//       `}</style>

//       <div className="print-container max-w-[95%] mx-auto bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden min-h-[85vh] flex flex-col">
//         {/* Header Bar */}
//         <div className="bg-white px-6 py-4 border-b border-slate-100 flex justify-between items-center no-print">
//           <div className="flex items-center gap-4">
//             <div className="p-2 bg-blue-50 rounded-lg">
//               <FileText size={20} className="text-blue-600"/>
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-slate-800 tracking-tight">Continuous Bill</h1>
//               <p className="text-xs text-slate-500">Rapid Entry Mode</p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200 text-xs font-medium text-slate-600">
//               <input 
//                 type="checkbox" 
//                 checked={formData.autoPrint} 
//                 onChange={(e) => setFormData({...formData, autoPrint: e.target.checked})}
//                 className="accent-blue-600 cursor-pointer w-4 h-4"
//               />
//               <label className="cursor-pointer select-none">Auto-Print on Save</label>
//             </div>
//             <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">F2: Add Row</span>
//           </div>
//         </div>

//         <div className="p-6 bg-white flex-1 flex flex-col">
//           {/* Top Form Section */}
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            
//             {/* Left Column: Party Details */}
//             <div className="md:col-span-5 space-y-4">
//                <div>
//                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Customer / Party</label>
//                  <div className="flex shadow-sm">
//                     <input 
//                       className="flex-1 border border-r-0 border-slate-300 rounded-l px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
//                       placeholder="Search or Enter Party Name..." 
//                       value={formData.partyName}
//                       onChange={(e) => setFormData({...formData, partyName: e.target.value})}
//                     />
//                     <button 
//                       onClick={() => handleLovClick('parties')}
//                       className="bg-slate-50 border border-slate-300 rounded-r px-3 hover:bg-slate-100 text-slate-500 no-print"
//                     ><Search size={16}/></button>
//                  </div>
//                </div>
               
//                <div className="grid grid-cols-2 gap-4">
//                  <div>
//                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bill Type</label>
//                     <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-500">
//                       <option>Cash</option>
//                       <option>Credit</option>
//                     </select>
//                  </div>
//                  <div>
//                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price Level</label>
//                     <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-500">
//                       <option>Retail</option>
//                       <option>Wholesale</option>
//                     </select>
//                  </div>
//                </div>
//             </div>

//             {/* Right Column: Bill Meta */}
//             <div className="md:col-span-7 grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
//                <div>
//                   <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Bill No</label>
//                   <input className="w-full bg-transparent border-b border-slate-300 py-1 text-sm font-bold text-slate-700 outline-none" value={formData.billNo} readOnly />
//                </div>
//                <div>
//                   <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Date</label>
//                   <input type="date" className="w-full bg-transparent border-b border-slate-300 py-1 text-sm text-slate-700 outline-none" value={formData.date} onChange={(e)=>setFormData({...formData, date: e.target.value})} />
//                </div>
//                <div>
//                   <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Print Format</label>
//                   <select className="w-full bg-transparent border-b border-slate-300 py-1 text-sm text-slate-700 outline-none">
//                     <option>Windows</option>
//                     <option>Thermal</option>
//                   </select>
//                </div>
//             </div>
//           </div>

//           {/* Item Table Section */}
//           <div className="flex-1 border border-slate-200 rounded-lg overflow-hidden flex flex-col mb-4">
//             <table className="w-full border-collapse">
//               <thead className="bg-slate-50 border-b border-slate-200">
//                 <tr className="text-slate-600 font-bold text-xs uppercase text-left">
//                   <th className="py-3 px-2 w-12 text-center">#</th>
//                   <th className="py-3 px-2 w-32">Item Code</th>
//                   <th className="py-3 px-2">Item Name</th>
//                   <th className="py-3 px-2 w-24 text-center">Unit</th>
//                   <th className="py-3 px-2 w-28 text-right">Qty</th>
//                   <th className="py-3 px-2 w-32 text-right">Rate</th>
//                   <th className="py-3 px-2 w-40 text-right">Total</th>
//                   <th className="py-3 px-2 w-12 text-center no-print"></th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 bg-white">
//                 {items.map((item, index) => (
//                   <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
//                     <td className="py-2 px-2 text-center text-xs text-slate-400">{index + 1}</td>
//                     <td className="py-2 px-2">
//                       <div className="flex">
//                         <input 
//                           ref={(el) => (inputRefs.current[item.id] = el)}
//                           className="w-full outline-none text-sm font-medium text-slate-700 bg-transparent" 
//                           placeholder="Code..." 
//                           value={item.itemCode}
//                           onChange={(e) => handleItemChange(item.id, 'itemCode', e.target.value)}
//                         />
//                         <button 
//                            onClick={() => handleLovClick('items', item.id)}
//                            className="text-slate-300 hover:text-blue-500 no-print opacity-0 group-hover:opacity-100 transition-opacity"
//                         ><Search size={12}/></button>
//                       </div>
//                     </td>
//                     <td className="py-2 px-2">
//                       <input 
//                         className="w-full outline-none text-sm text-slate-700 bg-transparent" 
//                         placeholder="Item Name..." 
//                         value={item.itemName}
//                         onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
//                       />
//                     </td>
//                     <td className="py-2 px-2">
//                       <input className="w-full outline-none text-sm text-center text-slate-500 bg-transparent" value={item.unit} readOnly />
//                     </td>
//                     <td className="py-2 px-2">
//                       <input 
//                         type="number" 
//                         className="w-full text-right outline-none text-sm font-bold text-slate-700 bg-transparent" 
//                         value={item.qty || ''} 
//                         onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
//                       />
//                     </td>
//                     <td className="py-2 px-2">
//                       <input 
//                         type="number" 
//                         className="w-full text-right outline-none text-sm text-slate-700 bg-transparent" 
//                         value={item.rate || ''} 
//                         onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
//                       />
//                     </td>
//                     <td className="py-2 px-2 text-right text-sm font-bold text-slate-800">
//                       {item.total.toFixed(2)}
//                     </td>
//                     <td className="py-2 px-2 text-center no-print">
//                       <button 
//                         onClick={() => removeRow(item.id)} 
//                         className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
//                       >
//                         <Trash2 size={16}/>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
            
//             <button 
//               onClick={addRow}
//               className="w-full py-3 bg-slate-50 text-blue-600 font-bold text-xs uppercase border-t border-slate-200 hover:bg-blue-50 flex justify-center items-center gap-2 no-print transition-colors"
//             >
//               <Plus size={16}/> Add New Line (F2)
//             </button>
//           </div>

//           {/* Footer Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-auto">
//              {/* Left: Notes */}
//              <div className="no-print">
//                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Notes / Remarks</label>
//                 <textarea className="w-full border border-slate-200 rounded p-2 text-sm outline-none focus:border-blue-400 resize-none h-24" placeholder="Add notes here..."></textarea>
//              </div>

//              {/* Right: Totals */}
//              <div className="flex flex-col gap-2">
//                 <div className="flex justify-between items-center py-1 text-sm text-slate-600">
//                    <span>Sub Total</span>
//                    <span>{grandTotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center py-1 text-sm text-slate-600">
//                    <span>Tax (0%)</span>
//                    <span>0.00</span>
//                 </div>
//                 <div className="flex justify-between items-center py-3 border-t border-slate-200 mt-2">
//                    <span className="text-base font-bold text-slate-800">Grand Total</span>
//                    <span className="text-2xl font-bold text-blue-600">₹ {grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
//                 </div>
//              </div>
//           </div>

//           {/* Action Footer */}
//           <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center no-print">
//             <div className="flex gap-2">
//               <button 
//                 onClick={() => window.location.reload()} 
//                 className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-semibold text-slate-600 text-xs hover:bg-slate-50 transition-all"
//               >
//                 <RotateCcw size={16}/> Clear Form
//               </button>
              
//               {/* UPDATED LAST BILL BUTTON */}
//               <button 
//                 onClick={handleLastBill}
//                 className="flex items-center gap-2 px-4 py-2 border border-blue-100 bg-blue-50 rounded-lg font-semibold text-blue-700 text-xs hover:bg-blue-100 transition-all"
//               >
//                 <History size={16}/> 
//                 <span>Last Bill</span>
//               </button>

//               <button 
//                 onClick={() => setShowCalc(!showCalc)}
//                 className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-semibold text-xs transition-all ${showCalc ? 'bg-amber-100 text-amber-700 border-amber-200' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
//               >
//                 <Calculator size={16}/> Calculator
//               </button>
//             </div>

//             <div className="flex gap-3">
//                <button 
//                 onClick={handleSave}
//                 className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-blue-600 font-bold text-white text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
//                >
//                 <Save size={18} /> Save & Print
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Calculator (Right Side) */}
//       {showCalc && (
//         <div className="fixed bottom-24 right-10 w-60 bg-slate-800 rounded-lg shadow-2xl border border-slate-600 overflow-hidden no-print z-50">
//           <div className="bg-slate-700 p-2 flex justify-between items-center border-b border-slate-600">
//             <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase">
//               <Calculator size={14} className="text-amber-400"/> Quick Calc
//             </div>
//             <button onClick={() => setShowCalc(false)} className="text-slate-400 hover:text-white"><X size={16}/></button>
//           </div>
//           <div className="p-3">
//             <div className="bg-slate-900 text-emerald-400 p-2 text-right text-xl font-mono mb-2 rounded border border-slate-700 truncate">
//               {calcDisplay}
//             </div>
//             <div className="grid grid-cols-4 gap-1">
//               {['7','8','9','÷','4','5','6','×','1','2','3','-','C','0','=','+'].map((btn) => (
//                 <button 
//                   key={btn} 
//                   onClick={() => handleCalcBtn(btn)}
//                   className={`py-2 rounded text-xs font-bold transition-colors ${
//                     btn === 'C' ? 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white' :
//                     btn === '=' ? 'bg-emerald-500 text-white hover:bg-emerald-600' :
//                     ['÷','×','-','+'].includes(btn) ? 'bg-slate-600 text-amber-400 hover:bg-amber-500 hover:text-white' :
//                     'bg-slate-700 text-white hover:bg-slate-600'
//                   }`}
//                 >
//                   {btn}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* LOV Modal */}
//       {showLov && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm no-print">
//           <div className="bg-white rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
//              <div className="p-3 bg-slate-100 flex justify-between font-bold border-b text-xs uppercase">
//                <span>Select {lovType}</span>
//                <button onClick={() => setShowLov(false)} className="hover:text-red-500">✕</button>
//              </div>
//              <div className="p-1 max-h-64 overflow-y-auto">
//                {lovData[lovType]?.map((item, i) => (
//                  <div key={i} onClick={() => handleLovSelect(item)} className="p-2 border-b last:border-0 hover:bg-blue-50 cursor-pointer flex justify-between items-center group">
//                    <span className="font-medium text-xs group-hover:text-blue-700">{item.name || item.itemName}</span>
//                    <span className="text-slate-400 text-[10px]">{item.type || item.itemCode}</span>
//                  </div>
//                ))}
//              </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContinuousBillIndex;


import React, { useState, useEffect, useRef } from 'react';
import { 
  Printer, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  Search, 
  Calculator,
  FileText,
  X,
  History
} from 'lucide-react';

// --- Mock Data for UI Testing ---
const lovData = {
  parties: [
    { name: 'Cash Customer', type: 'Retail' },
    { name: 'Walk-in General', type: 'Retail' },
    { name: 'Adarsh Traders', type: 'Wholesale' },
    { name: 'Tech Solutions', type: 'Wholesale' },
  ],
  items: [
    { itemCode: '1001', itemName: 'Wireless Mouse', rate: 450, unit: 'PCS' },
    { itemCode: '1002', itemName: 'Keyboard USB', rate: 600, unit: 'PCS' },
    { itemCode: '1003', itemName: 'Monitor 24"', rate: 12000, unit: 'PCS' },
    { itemCode: '1004', itemName: 'USB Hub', rate: 1200, unit: 'PCS' },
  ]
};

const ContinuousBillIndex = () => {
  const [items, setItems] = useState([
    { id: Date.now(), itemCode: '', itemName: '', qty: 0, rate: 0, unit: 'PCS', total: 0 }
  ]);
  
  const [formData, setFormData] = useState({
    billNo: 'CB-9901',
    date: new Date().toISOString().split('T')[0],
    partyName: '',
    billType: 'Cash',
    formType: 'Retail',
    printType: 'Windows',
    autoPrint: true
  });

  // --- NEW STATE FOR LAST BILL ---
  const [lastSavedBill, setLastSavedBill] = useState(null);

  const [showLov, setShowLov] = useState(false);
  const [lovType, setLovType] = useState('');
  const [activeRowId, setActiveRowId] = useState(null);
  
  const [showCalc, setShowCalc] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState('0');
  
  const inputRefs = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F2') {
        e.preventDefault();
        addRow();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items]);

  const handleItemChange = (id, field, value) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'qty' || field === 'rate') {
          updated.total = (Number(updated.qty) || 0) * (Number(updated.rate) || 0);
        }
        return updated;
      }
      return item;
    }));
  };

  const addRow = () => {
    const newId = Date.now();
    setItems([...items, { id: newId, itemCode: '', itemName: '', qty: 0, rate: 0, unit: 'PCS', total: 0 }]);
    
    setTimeout(() => {
      if (inputRefs.current[newId]) {
        inputRefs.current[newId].focus();
      }
    }, 50);
  };

  const removeRow = (id) => {
    if (items.length > 1) {
      const indexToDelete = items.findIndex(item => item.id === id);
      const filteredItems = items.filter(item => item.id !== id);
      setItems(filteredItems);

      setTimeout(() => {
        const focusIndex = indexToDelete > 0 ? indexToDelete - 1 : 0;
        const focusId = filteredItems[focusIndex]?.id;
        if (focusId && inputRefs.current[focusId]) {
          inputRefs.current[focusId].focus();
        }
      }, 50);
    } else {
      setItems([{ id: Date.now(), itemCode: '', itemName: '', qty: 0, rate: 0, unit: 'PCS', total: 0 }]);
    }
  };

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  // --- UPDATED SAVE LOGIC ---
  const handleSave = () => {
    if (!formData.partyName) {
      alert("Please select or enter a Party Name.");
      return;
    }

    // Save current bill to memory before doing anything else
    setLastSavedBill({
      formData: { ...formData },
      items: [...items]
    });

    if (formData.autoPrint) {
      window.print();
    } else {
      alert("Bill Saved Successfully!");
    }
  };

  // --- NEW LAST BILL FUNCTION ---
  const handleLastBill = () => {
    if (!lastSavedBill) {
      alert("No previous bill found in this session.");
      return;
    }
    setFormData(lastSavedBill.formData);
    setItems(lastSavedBill.items);
  };

  const handleLovClick = (type, rowId = null) => {
    setLovType(type);
    setActiveRowId(rowId);
    setShowLov(true);
  };

  const handleLovSelect = (data) => {
    if (lovType === 'parties') {
      setFormData(prev => ({ ...prev, partyName: data.name }));
    } else if (lovType === 'items' && activeRowId) {
      setItems(prev => prev.map(item => {
        if (item.id === activeRowId) {
          return {
            ...item,
            itemCode: data.itemCode,
            itemName: data.itemName,
            rate: data.rate,
            unit: data.unit,
            qty: item.qty === 0 ? 1 : item.qty, 
            total: (Number(item.qty === 0 ? 1 : item.qty) || 1) * data.rate
          };
        }
        return item;
      }));
    }
    setShowLov(false);
  };

  const handleCalcBtn = (val) => {
    if (val === 'C') {
      setCalcDisplay('0');
    } else if (val === '=') {
      try {
        const result = eval(calcDisplay.replace('×', '*').replace('÷', '/'));
        setCalcDisplay(String(Number(result.toFixed(2))));
      } catch {
        setCalcDisplay('Error');
      }
    } else {
      setCalcDisplay(prev => (prev === '0' || prev === 'Error' ? val : prev + val));
    }
  };

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full relative">
      <style>{`
        @media print {
          aside, header, .no-print { display: none !important; }
          body { background: white !important; }
          .print-container { border: none !important; box-shadow: none !important; width: 100% !important; }
          input { border: 1px solid transparent !important; }
          @page { margin: 0.5cm; }
        }
      `}</style>

      <div className="print-container max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white no-print">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <FileText size={14} className="text-yellow-400"/> Continuous Bill Entry
            </h1>
            <div className="flex items-center gap-2 ml-4 px-2 py-0.5 bg-slate-700 rounded text-[10px]">
              <input 
                type="checkbox" 
                checked={formData.autoPrint} 
                onChange={(e) => setFormData({...formData, autoPrint: e.target.checked})}
                className="accent-emerald-500 cursor-pointer"
              />
              <label className="cursor-pointer uppercase">Auto-Print</label>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="bg-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">F2: New Row</span>
          </div>
        </div>

        <div className="p-2 bg-[#e2ebf8]">
          {/* Top Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2 bg-white p-3 border border-blue-200 rounded shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Bill No</span>
                <input className="flex-1 border border-slate-300 p-1 text-xs outline-none bg-slate-50 font-bold" value={formData.billNo} readOnly />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Date</span>
                <input type="date" className="flex-1 border border-slate-300 p-1 text-xs outline-none" value={formData.date} onChange={(e)=>setFormData({...formData, date: e.target.value})} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Party Name</span>
                <div className="flex flex-1">
                  <input 
                    className="w-full border border-slate-300 p-1 text-xs outline-none" 
                    placeholder="Search Party..." 
                    value={formData.partyName}
                    onChange={(e) => setFormData({...formData, partyName: e.target.value})}
                  />
                  <button 
                    onClick={() => handleLovClick('parties')}
                    className="bg-slate-200 px-1.5 border border-l-0 border-slate-300 hover:bg-slate-300 no-print"
                  ><Search size={12}/></button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Form Type</span>
                <select className="flex-1 border border-slate-300 p-1 text-xs outline-none">
                  <option>Retail</option>
                  <option>Wholesale</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Bill Type</span>
                <select className="flex-1 border border-slate-300 p-1 text-xs outline-none bg-blue-50 font-semibold text-blue-800">
                  <option>Cash</option>
                  <option>Credit</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-[11px] font-semibold text-slate-600">Print Type</span>
                <select className="flex-1 border border-slate-300 p-1 text-xs outline-none">
                  <option>Windows</option>
                  <option>Thermal</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-800 text-white rounded p-2 flex flex-col justify-center items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Grand Total</span>
              <div className="text-xl font-black text-yellow-400">
                ₹ {grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Item Table Section */}
          <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-[#f8fafc] border-b border-slate-300">
                <tr className="text-[#1e3a8a] font-bold text-[10px] uppercase text-left">
                  <th className="p-1.5 border-r border-slate-200 w-10 text-center">#</th>
                  <th className="p-1.5 border-r border-slate-200 w-32">Item Code</th>
                  <th className="p-1.5 border-r border-slate-200">Item Name</th>
                  <th className="p-1.5 border-r border-slate-200 w-24">Unit</th>
                  <th className="p-1.5 border-r border-slate-200 w-24 text-right">Qty</th>
                  <th className="p-1.5 border-r border-slate-200 w-28 text-right">Rate</th>
                  <th className="p-1.5 border-r border-slate-200 w-32 text-right">Total</th>
                  <th className="p-1.5 w-10 text-center no-print"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-1 border-r border-slate-100 text-center text-[10px] text-slate-400 font-bold">{index + 1}</td>
                    <td className="p-1 border-r border-slate-100">
                      <div className="flex">
                        <input 
                          ref={(el) => (inputRefs.current[item.id] = el)}
                          className="w-full outline-none px-1 text-xs focus:bg-yellow-50" 
                          placeholder="Code..." 
                          value={item.itemCode}
                          onChange={(e) => handleItemChange(item.id, 'itemCode', e.target.value)}
                        />
                        <button 
                           onClick={() => handleLovClick('items', item.id)}
                           className="text-slate-300 hover:text-blue-500 no-print"
                        ><Search size={12}/></button>
                      </div>
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input 
                        className="w-full outline-none px-1 text-xs" 
                        placeholder="Item Name..." 
                        value={item.itemName}
                        onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
                      />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input className="w-full outline-none px-1 text-xs text-center" value={item.unit} readOnly />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input 
                        type="number" 
                        className="w-full text-right outline-none px-1 text-xs font-bold" 
                        value={item.qty || ''} 
                        onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                      />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input 
                        type="number" 
                        className="w-full text-right outline-none px-1 text-xs" 
                        value={item.rate || ''} 
                        onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                      />
                    </td>
                    <td className="p-1 border-r border-slate-100 text-right text-xs font-bold px-2">
                      {item.total.toFixed(2)}
                    </td>
                    <td className="p-1 text-center no-print">
                      <button 
                        onClick={() => removeRow(item.id)} 
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <button 
              onClick={addRow}
              className="w-full py-1.5 bg-slate-50 text-blue-600 font-bold text-[10px] uppercase border-t hover:bg-blue-100 flex justify-center items-center gap-1 no-print"
            >
              <Plus size={14}/> Add Next Item (F2)
            </button>
          </div>

          {/* Action Footer */}
          <div className="mt-2 flex justify-between items-center bg-white p-2 border border-blue-200 rounded no-print shadow-sm">
            <div className="flex gap-2">
              <button 
                onClick={() => window.location.reload()} 
                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded font-bold text-slate-700 text-[11px] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
              >
                <RotateCcw size={14} strokeWidth={2.5} className="text-red-500"/> CLEAR
              </button>
              
              {/* UPDATED LAST BILL BUTTON */}
              <button 
                onClick={handleLastBill}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-300 rounded font-bold text-blue-700 text-[11px] hover:bg-blue-50 transition-all"
              >
                <History size={15} strokeWidth={2.5} className="text-blue-600"/> 
                <span>LAST BILL</span>
              </button>

              <button 
                onClick={() => setShowCalc(!showCalc)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border rounded font-bold text-[11px] transition-all ${showCalc ? 'bg-amber-500 text-white border-amber-600' : 'border-amber-300 text-amber-700 hover:bg-amber-50'}`}
              >
                <Calculator size={15} strokeWidth={2.5} className={showCalc ? 'text-white' : 'text-amber-600'}/>
              </button>
            </div>

            <div className="flex gap-3">
               <div className="hidden md:flex flex-col items-end justify-center px-4 border-r border-slate-200">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Items Count</span>
                  <span className="text-xs font-bold text-slate-700">{items.length} Lines</span>
               </div>
               <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-10 py-1.5 rounded bg-emerald-600 font-black text-white text-[12px] shadow-md hover:bg-emerald-700 active:scale-95 transition-all uppercase tracking-wide"
               >
                <Save size={18} strokeWidth={2.5} /> SAVE & PRINT BILL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Calculator (Right Side) */}
      {showCalc && (
        <div className="fixed bottom-24 right-10 w-60 bg-slate-800 rounded-lg shadow-2xl border border-slate-600 overflow-hidden no-print z-50">
          <div className="bg-slate-700 p-2 flex justify-between items-center border-b border-slate-600">
            <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase">
              <Calculator size={14} className="text-amber-400"/> Quick Calc
            </div>
            <button onClick={() => setShowCalc(false)} className="text-slate-400 hover:text-white"><X size={16}/></button>
          </div>
          <div className="p-3">
            <div className="bg-slate-900 text-emerald-400 p-2 text-right text-xl font-mono mb-2 rounded border border-slate-700 truncate">
              {calcDisplay}
            </div>
            <div className="grid grid-cols-4 gap-1">
              {['7','8','9','÷','4','5','6','×','1','2','3','-','C','0','=','+'].map((btn) => (
                <button 
                  key={btn} 
                  onClick={() => handleCalcBtn(btn)}
                  className={`py-2 rounded text-xs font-bold transition-colors ${
                    btn === 'C' ? 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white' :
                    btn === '=' ? 'bg-emerald-500 text-white hover:bg-emerald-600' :
                    ['÷','×','-','+'].includes(btn) ? 'bg-slate-600 text-amber-400 hover:bg-amber-500 hover:text-white' :
                    'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LOV Modal */}
      {showLov && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm no-print">
          <div className="bg-white rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
             <div className="p-3 bg-slate-100 flex justify-between font-bold border-b text-xs uppercase">
               <span>Select {lovType}</span>
               <button onClick={() => setShowLov(false)} className="hover:text-red-500">✕</button>
             </div>
             <div className="p-1 max-h-64 overflow-y-auto">
               {lovData[lovType]?.map((item, i) => (
                 <div key={i} onClick={() => handleLovSelect(item)} className="p-2 border-b last:border-0 hover:bg-blue-50 cursor-pointer flex justify-between items-center group">
                   <span className="font-medium text-xs group-hover:text-blue-700">{item.name || item.itemName}</span>
                   <span className="text-slate-400 text-[10px]">{item.type || item.itemCode}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContinuousBillIndex;