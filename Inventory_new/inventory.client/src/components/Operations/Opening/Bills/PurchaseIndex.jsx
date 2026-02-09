import React, { useState } from 'react';
import { Search, Save, ArrowLeft, Plus, Trash2, ShoppingCart, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Mock Data for LOV ---
const lovData = {
  parties: [
    { name: 'Tech Supplies Ltd', type: 'Supplier' },
    { name: 'Office World', type: 'Supplier' },
    { name: 'Gadget Wholesalers', type: 'Supplier' },
    { name: 'Global Electronics', type: 'Supplier' },
  ]
};

const PurchaseIndex = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLov, setShowLov] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    partyName: '',
    invoiceNo: '',
    amount: '',
    narration: '',
    type: 'Purchase',
    invoiceDate: '2026-02-06'
  });

  // Table List State
  const [purchaseList, setPurchaseList] = useState([]);

  // Add item to list logic
  const handleAdd = () => {
    if (!formData.partyName || !formData.amount) {
      alert("Please enter Party Name and Amount");
      return;
    }
    const newItem = {
      id: Date.now(),
      invoiceNo: formData.invoiceNo || 'N/A',
      invoiceDate: formData.invoiceDate,
      partyName: formData.partyName,
      amount: parseFloat(formData.amount),
      narration: formData.narration
    };
    setPurchaseList([...purchaseList, newItem]);
    // Reset partial form fields
    setFormData({ ...formData, partyName: '', invoiceNo: '', amount: '', narration: '' });
  };

  const handleRemove = (id) => {
    setPurchaseList(purchaseList.filter(item => item.id !== id));
  };

  const handleSave = () => {
    console.log("Saving Purchase Opening Bills:", purchaseList);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const grandTotal = purchaseList.reduce((sum, item) => sum + item.amount, 0);

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
              <div className="p-2.5 bg-emerald-50 rounded-xl">
                <ShoppingCart size={20} className="text-emerald-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">Purchase Opening Balance</h1>
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Supplier Name</label>
                  <div className="flex flex-1">
                    <input 
                      type="text" value={formData.partyName}
                      onChange={(e) => setFormData({...formData, partyName: e.target.value})}
                      className="w-full border border-slate-300 rounded-l-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      placeholder="Select Supplier..."
                    />
                    <button 
                      onClick={() => setShowLov(true)}
                      className="bg-slate-100 px-3 border border-l-0 border-slate-300 rounded-r-lg hover:bg-slate-200 text-slate-500"
                    ><Search size={16}/></button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Invoice No</label>
                  <input 
                    type="text" value={formData.invoiceNo}
                    onChange={(e) => setFormData({...formData, invoiceNo: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    placeholder="Enter Invoice No"
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
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 bg-white"
                  >
                    <option value="Purchase">Purchase</option>
                    <option value="Return">Purchase Return</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Invoice Date</label>
                  <input 
                    type="date" value={formData.invoiceDate}
                    onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
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
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-emerald-600 outline-none focus:border-emerald-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Narration</label>
                  <input 
                    value={formData.narration}
                    onChange={(e) => setFormData({...formData, narration: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                    placeholder="Remarks..."
                  />
                </div>
              </div>

              {/* Column 4: Action */}
              <div className="flex items-end justify-end">
                <button 
                  onClick={handleAdd}
                  className="w-full py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-200 active:scale-95"
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
                {purchaseList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-slate-400 italic text-sm">
                      No opening bills added. Use the form above.
                    </td>
                  </tr>
                ) : (
                  purchaseList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-3 px-4 text-sm text-slate-600 font-medium">{item.invoiceNo}</td>
                      <td className="py-3 px-4 text-sm text-slate-500">{item.invoiceDate}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-slate-700">{item.partyName}</td>
                      <td className="py-3 px-4 text-sm text-emerald-600 font-bold text-right">
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
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 font-bold text-white text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
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
               <span className="uppercase">SELECT SUPPLIER</span>
               <button onClick={() => setShowLov(false)} className="hover:text-red-500">✕</button>
             </div>
             <div className="p-1 max-h-64 overflow-y-auto">
               {lovData.parties.map((item, i) => (
                 <div key={i} onClick={() => handleLovSelect(item)} className="p-2 border-b last:border-0 hover:bg-emerald-50 cursor-pointer flex justify-between items-center group">
                   <span className="font-medium text-xs group-hover:text-emerald-700">{item.name}</span>
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

export default PurchaseIndex;





// import React, { useState } from 'react';
// import { Search, Save, ArrowLeft, Plus, Trash2, CheckCircle2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const PurchaseIndex = () => {
//   const navigate = useNavigate();
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Form State
//   const [formData, setFormData] = useState({
//     partyName: '',
//     invoiceNo: '',
//     amount: '',
//     narration: '',
//     type: 'Purchase',
//     invoiceDate: '2026-02-06'
//   });

//   // Table List State
//   const [purchaseList, setPurchaseList] = useState([]);

//   // Add item to list logic
//   const handleAdd = () => {
//     if (!formData.partyName || !formData.amount) {
//       alert("Please enter Party Name and Amount");
//       return;
//     }
//     const newItem = {
//       id: Date.now(),
//       invoiceNo: formData.invoiceNo || 'N/A',
//       invoiceDate: formData.invoiceDate,
//       partyName: formData.partyName,
//       amount: parseFloat(formData.amount),
//       narration: formData.narration
//     };
//     setPurchaseList([...purchaseList, newItem]);
//     // Reset partial form fields
//     setFormData({ ...formData, partyName: '', invoiceNo: '', amount: '', narration: '' });
//   };

//   const handleRemove = (id) => {
//     setPurchaseList(purchaseList.filter(item => item.id !== id));
//   };

//   const handleSave = () => {
//     console.log("Saving Purchase Opening Bills:", purchaseList);
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   const grandTotal = purchaseList.reduce((sum, item) => sum + item.amount, 0);

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4">
//           <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
//             <ArrowLeft size={20} className="text-slate-600" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800">Purchase Opening</h1>
//             <p className="text-sm text-slate-500">Enter pending purchase bills for opening balance</p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-4">
//           {showSuccess && (
//             <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
//               <CheckCircle2 size={18} /> Saved Successfully!
//             </div>
//           )}
//           <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold shadow-md active:scale-95 transition-all">
//             <Save size={18} /> Save All
//           </button>
//         </div>
//       </div>

//       {/* Entry Form Card */}
//       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Party & Invoice Info */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//                <input type="checkbox" className="rounded text-emerald-600 w-4 h-4" defaultChecked />
//                <span className="text-sm font-medium text-slate-700">All Parties</span>
//             </div>
//             <div className="space-y-1">
//               <label className="text-[11px] font-bold text-slate-500 uppercase">Party Name</label>
//               <div className="relative">
//                 <input 
//                   type="text" value={formData.partyName}
//                   onChange={(e) => setFormData({...formData, partyName: e.target.value})}
//                   className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none"
//                   placeholder="Select Supplier..."
//                 />
//                 <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
//               </div>
//             </div>
//             <div className="space-y-1">
//               <label className="text-[11px] font-bold text-slate-500 uppercase">Invoice No</label>
//               <input 
//                 type="text" value={formData.invoiceNo}
//                 onChange={(e) => setFormData({...formData, invoiceNo: e.target.value})}
//                 className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none"
//               />
//             </div>
//           </div>

//           {/* Type, Date & Amount */}
//           <div className="space-y-4">
//             <div className="space-y-1">
//               <label className="text-[11px] font-bold text-slate-500 uppercase">Type</label>
//               <select 
//                 value={formData.type}
//                 onChange={(e) => setFormData({...formData, type: e.target.value})}
//                 className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none focus:border-emerald-500"
//               >
//                 <option value="Purchase">Purchase</option>
//                 <option value="Return">Purchase Return</option>
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className="text-[11px] font-bold text-slate-500 uppercase">Invoice Date</label>
//               <input 
//                 type="date" value={formData.invoiceDate}
//                 onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
//                 className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none"
//               />
//             </div>
//             <div className="space-y-1">
//               <label className="text-[11px] font-bold text-slate-500 uppercase">Amount</label>
//               <input 
//                 type="number" value={formData.amount}
//                 onChange={(e) => setFormData({...formData, amount: e.target.value})}
//                 className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-emerald-600 focus:border-emerald-500 outline-none"
//                 placeholder="0.00"
//               />
//             </div>
//           </div>

//           {/* Narration & Add Button */}
//           <div className="flex flex-col justify-between">
//             <div className="space-y-1">
//               <label className="text-[11px] font-bold text-slate-500 uppercase">Narration</label>
//               <textarea 
//                 rows="3" value={formData.narration}
//                 onChange={(e) => setFormData({...formData, narration: e.target.value})}
//                 className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none resize-none"
//                 placeholder="Supplier balance notes..."
//               ></textarea>
//             </div>
//             <button 
//               onClick={handleAdd}
//               className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors font-medium text-sm"
//             >
//               <Plus size={18} /> Add to List
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-slate-50 border-b border-slate-200">
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Invoice No</th>
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Party Name</th>
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Narration</th>
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {purchaseList.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="px-6 py-10 text-center text-slate-400 italic text-sm">
//                   No purchase entries in current list.
//                 </td>
//               </tr>
//             ) : (
//               purchaseList.map((item) => (
//                 <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
//                   <td className="px-6 py-4 text-sm text-slate-600 font-medium">{item.invoiceNo}</td>
//                   <td className="px-6 py-4 text-sm text-slate-500">{item.invoiceDate}</td>
//                   <td className="px-6 py-4 text-sm font-semibold text-slate-700">{item.partyName}</td>
//                   <td className="px-6 py-4 text-sm text-emerald-600 font-bold text-right">
//                     ₹ {item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-slate-500 italic max-w-xs truncate">
//                     {item.narration || '---'}
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <button onClick={() => handleRemove(item.id)} className="text-red-400 hover:text-red-600 transition-colors p-1">
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//           {/* Grand Total Footer */}
//           {purchaseList.length > 0 && (
//             <tfoot>
//               <tr className="bg-emerald-800 text-white font-bold">
//                 <td colSpan="3" className="px-6 py-4 text-sm text-right uppercase tracking-widest text-emerald-100">Grand Total :</td>
//                 <td className="px-6 py-4 text-base text-right font-mono">
//                   ₹ {grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//                 </td>
//                 <td colSpan="2"></td>
//               </tr>
//             </tfoot>
//           )}
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PurchaseIndex;