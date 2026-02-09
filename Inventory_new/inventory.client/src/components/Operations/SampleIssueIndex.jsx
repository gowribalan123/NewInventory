// import React, { useState, useEffect } from 'react';
// import { Trash2 } from 'lucide-react';

// // --- Initializers & Data (Moved outside component) ---
// const getInitialFormData = () => ({
//   issueNo: `SI${Math.floor(1000 + Math.random() * 9000)}`,
//   company: '',
//   address: '',
//   issueDate: new Date().toISOString().split('T')[0],
//   expectedReturnDate: new Date().toISOString().split('T')[0],
//   materialRequestedBy: '',
//   position: '',
//   godown: '',
//   managerName: '',
//   mobNo: '',
//   totalAmount: 0,
// });

// const getInitialItems = () => ([
//   { id: Date.now(), partNo: '', itemName: '', quantity: '', mrp: '', remarks: '' }
// ]);

// // --- Mock Database & Config (Moved outside component) ---
// const lovData = {
//   issue: [
//     { issueNo: 'SI001', issueDate: '2026-01-10', expectedReturnDate: '2026-01-20', company: 'Acme Corp', address: '123 Industrial Way', godown: 'Main Warehouse', materialRequestedBy: 'John Doe', position: 'Engineer', managerName: 'Jane Smith', mobNo: '1234567890', totalAmount: 15000, items: [{ id: 101, partNo: 'P001', itemName: 'Widget A', quantity: 10, mrp: 1500, remarks: 'Test' }] },
//     { issueNo: 'SI002', issueDate: '2026-01-12', expectedReturnDate: '2026-01-22', company: 'Globex Inc', address: '456 Business Park', godown: 'East Wing', materialRequestedBy: 'Peter Jones', position: 'Technician', managerName: 'Jane Smith', mobNo: '0987654321', totalAmount: 8500, items: [{ id: 102, partNo: 'P002', itemName: 'Widget B', quantity: 5, mrp: 1700, remarks: '' }] },
//   ], 
//   company: [
//     { name: 'Acme Corp', address: '123 Industrial Way, Springfield' },
//     { name: 'Globex Inc', address: '456 Business Park, Shelbyville' },
//     { name: 'Soylent Corp', address: '789 People Place, New York' },
//   ],
//   godown: [
//     { name: 'Main Warehouse' },
//     { name: 'East Wing Storage' },
//     { name: 'Cold Storage' },
//   ]
// };

// const getLovConfig = (type) => {
//   switch(type) {
//     case 'issue': return { 
//       title: 'Select Issue', 
//       columns: [{ header: 'Issue No', key: 'issueNo' }, { header: 'Date', key: 'issueDate' }, { header: 'Company', key: 'company' }, { header: 'Amount', key: 'totalAmount' }] 
//     };
//     case 'company': return { 
//       title: 'Select Company', 
//       columns: [{ header: 'Company Name', key: 'name' }, { header: 'Address', key: 'address' }] 
//     };
//     case 'godown': return { 
//       title: 'Select Godown', 
//       columns: [{ header: 'Godown Name', key: 'name' }] 
//     };
//     default: return { title: 'Select', columns: [] };
//   }
// };

// const SampleIssueIndex = () => {
//   const [showLov, setShowLov] = useState(false);
//   const [lovType, setLovType] = useState(''); 
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [formData, setFormData] = useState(getInitialFormData());
//   const [items, setItems] = useState(getInitialItems());

//   useEffect(() => {
//     const total = items.reduce((sum, item) => {
//       const lineTotal = (Number(item.quantity) || 0) * (Number(item.mrp) || 0);
//       return sum + lineTotal;
//     }, 0);
//     setFormData(prev => ({ ...prev, totalAmount: total }));
//   }, [items]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleItemChange = (id, field, value) => {
//     setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
//   };

//   const addRow = () => {
//     setItems([...items, { id: Date.now(), partNo: '', itemName: '', quantity: '', mrp: '', remarks: '' }]);
//   };

//   const deleteRow = (id) => {
//     if (items.length > 1) setItems(items.filter(item => item.id !== id));
//   };

//   const resetForm = () => {
//     setFormData(getInitialFormData());
//     setItems(getInitialItems());
//     setIsEditMode(false);
//   };

//   const handleLovClick = (type) => {
//     setLovType(type);
//     setShowLov(true);
//   };

//   const handleLovSelect = (item) => {
//     if (lovType === 'issue') {
//       setFormData({ ...getInitialFormData(), ...item });
//       if (item.items) 
//         setItems(item.items.map(i => ({ ...i, id: Date.now() + Math.random() })));
//       setIsEditMode(true);
//     } else if (lovType === 'company') {
//       setFormData(prev => ({ ...prev, company: item.name, address: item.address }));
//     } else if (lovType === 'godown') {
//       setFormData(prev => ({ ...prev, godown: item.name }));
//     }
//     setShowLov(false);
//   };

//   const handleDeleteIssue = () => {
//     if (window.confirm('Are you sure you want to delete this Issue?')) {
//       console.log('Deleting issue:', formData.issueNo);
//       resetForm();
//     }
//   };

//   const handleSave = () => {
//     const payload = { ...formData, items };
//     console.log(isEditMode ? 'Updating Issue:' : 'Saving New Issue:', payload);
//     alert(isEditMode ? 'Issue Updated! (Check console)' : 'Issue Saved! (Check console)');
//     if (!isEditMode) {
//       resetForm();
//     }
//   };

//   return (
//     <div className="bg-[#f0f5ff] min-h-screen p-4 font-sans text-[12px]">
//       <div className="flex border-b border-gray-300 mb-2">
//         <button className="px-6 py-1 bg-[#e2ebf8] border-t border-l border-r border-blue-300 rounded-t font-semibold">Entry</button>
//       </div>

//       <div className="bg-[#e2ebf8] p-4 border border-blue-300 shadow-sm">
//         <FormHeader formData={formData} handleInputChange={handleInputChange} handleLovClick={handleLovClick} />
//         <ItemsTable items={items} handleItemChange={handleItemChange} deleteRow={deleteRow} />
//         <FormFooter formData={formData} handleInputChange={handleInputChange} />

//         <div className="mt-6 flex gap-2">
//           <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 text-[11px]">New</button>
//           <button onClick={addRow} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-[11px]">Add Item</button>
//           {isEditMode && (
//             <button onClick={handleDeleteIssue} className="bg-red-600 text-white px-6 py-1 rounded hover:bg-red-700 font-bold text-[11px]">Delete</button>
//           )}
//           <button onClick={handleSave} className="bg-green-700 text-white px-6 py-1 rounded hover:bg-green-800 font-bold text-[11px]">{isEditMode ? 'Update' : 'Save'} Issue</button>
//         </div>

//         <LovModal 
//           show={showLov}
//           onClose={() => setShowLov(false)}
//           lovType={lovType}
//           onSelect={handleLovSelect}
//         />
//       </div>
//     </div>
//   );
// };

// // --- Sub-Components (Defined outside main component to prevent re-render issues) ---

// const LovModal = ({ show, onClose, lovType, onSelect }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   if (!show) return null;

//   const config = getLovConfig(lovType);
//   const data = lovData[lovType] || [];

//   const filteredData = data.filter(item => {
//     if (!searchTerm) return true;
//     return Object.values(item).some(val =>
//       String(val).toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 font-sans animate-in fade-in zoom-in duration-200">
//         <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-[#f9fbfd]">
//           <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">{config.title}</h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-xl leading-none">&times;</button>
//         </div>
//         <div className="p-2 border-b border-gray-100 bg-white">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="max-h-80 overflow-y-auto">
//           <table className="w-full text-left text-xs text-gray-600">
//             <thead className="bg-gray-50 text-gray-700 font-semibold sticky top-0">
//               <tr>
//                 {config.columns.map((col) => <th key={col.key} className="px-4 py-2 border-b border-gray-200">{col.header}</th>)}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {filteredData.map((item, idx) => (
//                 <tr key={idx} onClick={() => onSelect(item)} className="hover:bg-blue-50 cursor-pointer transition-colors">
//                   {config.columns.map((col) => <td key={col.key} className="px-4 py-2">{item[col.key]}</td>)}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FormHeader = ({ formData, handleInputChange, handleLovClick }) => (
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-2 mb-4">
//     <div className="space-y-2">
//       <div className="flex items-center">
//         <label className="w-24">Issue No</label>
//         <div className="flex flex-1">
//           <input name="issueNo" value={formData.issueNo} onChange={handleInputChange} className="w-full border border-gray-400 p-1 outline-none" />
//           <button onClick={() => handleLovClick('issue')} className="bg-gray-300 border border-l-0 border-gray-400 px-2 hover:bg-gray-400">🔍</button>
//         </div>
//       </div>
//       <div className="flex items-center">
//         <label className="w-24">Issue Date</label>
//         <input type="date" name="issueDate" value={formData.issueDate} onChange={handleInputChange} className="flex-1 border border-gray-400 p-1" />
//       </div>
//       <div className="flex items-center">
//         <label className="w-24 text-[11px]">Expected Return</label>
//         <input type="date" name="expectedReturnDate" value={formData.expectedReturnDate} onChange={handleInputChange} className="flex-1 border border-gray-400 p-1" />
//       </div>
//     </div>
//     <div className="space-y-2">
//       <div className="flex items-center">
//         <label className="w-20">Company</label>
//         <div className="flex flex-1">
//           <input name="company" value={formData.company} onChange={handleInputChange} className="w-full border border-gray-400 p-1 outline-none" />
//           <button onClick={() => handleLovClick('company')} className="bg-gray-300 border border-l-0 border-gray-400 px-2 hover:bg-gray-400">🔍</button>
//         </div>
//       </div>
//       <div className="flex items-start">
//         <label className="w-20 pt-1">Address</label>
//         <textarea name="address" value={formData.address} rows="3" onChange={handleInputChange} className="flex-1 border border-gray-400 p-1 outline-none resize-none"></textarea>
//       </div>
//     </div>
//     <div className="space-y-2">
//       <div className="flex items-center">
//         <label className="w-32">Requested By</label>
//         <input name="materialRequestedBy" value={formData.materialRequestedBy} onChange={handleInputChange} className="flex-1 border border-gray-400 p-1 outline-none" />
//       </div>
//       <div className="flex items-center">
//         <label className="w-32 text-right pr-2">Position</label>
//         <input name="position" value={formData.position} onChange={handleInputChange} className="flex-1 border border-gray-400 p-1 outline-none" />
//       </div>
//       <div className="flex items-center">
//         <label className="w-32 text-right pr-2">Godown</label>
//         <div className="flex flex-1">
//           <input name="godown" value={formData.godown} onChange={handleInputChange} className="w-full border border-gray-400 p-1 outline-none" />
//           <button onClick={() => handleLovClick('godown')} className="bg-gray-300 border border-l-0 border-gray-400 px-2 hover:bg-gray-400">🔍</button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const ItemsTable = ({ items, handleItemChange, deleteRow }) => (
//   <div className="bg-white border border-gray-400 min-h-[250px] overflow-x-auto">
//     <table className="w-full border-collapse">
//       <thead className="bg-[#eef2ff] border-b border-gray-300 text-gray-700">
//         <tr>
//           <th className="border-r border-gray-300 p-1 text-center w-10">#</th>
//           <th className="border-r border-gray-300 p-1 text-left w-24">Part No</th>
//           <th className="border-r border-gray-300 p-1 text-left">Item Name</th>
//           <th className="border-r border-gray-300 p-1 text-left w-24">Quantity</th>
//           <th className="border-r border-gray-300 p-1 text-left w-24">MRP</th>
//           <th className="border-r border-gray-300 p-1 text-left">Remarks</th>
//           <th className="p-1 text-center w-12 text-red-600">Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {items.map((item, index) => (
//           <tr key={item.id} className="border-b border-gray-200 group">
//             <td className="border-r border-gray-300 text-center text-gray-400">{index + 1}</td>
//             <td className="border-r border-gray-300"><input className="w-full p-1 outline-none" value={item.partNo} onChange={(e) => handleItemChange(item.id, 'partNo', e.target.value)} /></td>
//             <td className="border-r border-gray-300"><input className="w-full p-1 outline-none" value={item.itemName} onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)} /></td>
//             <td className="border-r border-gray-300"><input type="number" className="w-full p-1 outline-none" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} /></td>
//             <td className="border-r border-gray-300"><input type="number" className="w-full p-1 outline-none" value={item.mrp} onChange={(e) => handleItemChange(item.id, 'mrp', e.target.value)} /></td>
//             <td className="border-r border-gray-300"><input className="w-full p-1 outline-none" value={item.remarks} onChange={(e) => handleItemChange(item.id, 'remarks', e.target.value)} /></td>
//             <td className="text-center">
//               <button onClick={() => deleteRow(item.id)} className="text-red-500 hover:text-red-700 p-1 disabled:opacity-50" disabled={items.length <= 1}>
//                 <Trash2 size={16} />
//               </button>
//             </td>
//           </tr>
//         ))}
//         {items.length < 6 && [...Array(6 - items.length)].map((_, i) => (
//           <tr key={`blank-${i}`} className="h-7 border-b border-gray-100">
//             {[...Array(7)].map((_, j) => <td key={j} className={j < 6 ? "border-r border-gray-300" : ""}></td>)}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const FormFooter = ({ formData, handleInputChange }) => (
//   <div className="mt-4 flex flex-wrap items-center justify-between border-t border-blue-200 pt-4">
//     <div className="flex space-x-4">
//       <div className="flex items-center">
//         <label className="mr-2">Manager Name</label>
//         <input name="managerName" value={formData.managerName} onChange={handleInputChange} className="border border-gray-400 p-1 outline-none bg-white w-48" />
//       </div>
//       <div className="flex items-center">
//         <label className="mr-2">Mob No.</label>
//         <input name="mobNo" value={formData.mobNo} onChange={handleInputChange} className="border border-gray-400 p-1 outline-none bg-white w-40" />
//       </div>
//     </div>
//     <div className="text-right pr-10">
//       <span className="font-bold text-gray-700">Total : </span>
//       <span className="text-blue-800 font-bold bg-white px-4 py-1 border border-gray-400 min-w-[100px] inline-block">
//         {formData.totalAmount.toLocaleString()}
//       </span>
//     </div>
//   </div>
// );

// export default SampleIssueIndex;


















import React, { useState, useEffect } from 'react';
import { Trash2, Search, Plus, Save, RotateCcw } from 'lucide-react';

// --- Data Initializers ---
const getInitialFormData = () => ({
  issueNo: `SI${Math.floor(1000 + Math.random() * 9000)}`,
  company: '',
  address: '',
  issueDate: new Date().toISOString().split('T')[0],
  expectedReturnDate: new Date().toISOString().split('T')[0],
  materialRequestedBy: '',
  position: '',
  godown: '',
  managerName: '',
  mobNo: '',
  totalAmount: 0,
});

const getInitialItems = () => ([
  { id: Date.now(), partNo: '', itemName: '', quantity: '', mrp: '', remarks: '' }
]);

// --- Mock Database (Simulating data) ---
const lovData = {
  issue: [
    { issueNo: 'SI001', issueDate: '2026-01-10', company: 'Acme Corp', totalAmount: 15000, items: [{ id: 101, partNo: 'P001', itemName: 'Widget A', quantity: 10, mrp: 1500, remarks: 'Test' }] },
    { issueNo: 'SI002', issueDate: '2026-01-12', company: 'Globex Inc', totalAmount: 8500, items: [{ id: 102, partNo: 'P002', itemName: 'Widget B', quantity: 5, mrp: 1700, remarks: '' }] },
  ], 
  company: [
    { name: 'Acme Corp', address: '123 Industrial Way, Springfield' },
    { name: 'Globex Inc', address: '456 Business Park, Shelbyville' },
  ],
  godown: [
    { name: 'Main Warehouse' },
    { name: 'East Wing Storage' },
  ]
};

const SampleIssueIndex = () => {
  const [showLov, setShowLov] = useState(false);
  const [lovType, setLovType] = useState(''); 
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(getInitialFormData());
  const [items, setItems] = useState(getInitialItems());

  // Auto-calculate Total
  useEffect(() => {
    const total = items.reduce((sum, item) => {
      const lineTotal = (Number(item.quantity) || 0) * (Number(item.mrp) || 0);
      return sum + lineTotal;
    }, 0);
    setFormData(prev => ({ ...prev, totalAmount: total }));
  }, [items]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addRow = () => {
    setItems([...items, { id: Date.now(), partNo: '', itemName: '', quantity: '', mrp: '', remarks: '' }]);
  };

  const deleteRow = (id) => {
    if (items.length > 1) setItems(items.filter(item => item.id !== id));
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setItems(getInitialItems());
    setIsEditMode(false);
  };

  const handleLovSelect = (item) => {
    if (lovType === 'issue') {
      setFormData({ ...getInitialFormData(), ...item });
      if (item.items) setItems(item.items.map(i => ({ ...i, id: Date.now() + Math.random() })));
      setIsEditMode(true);
    } else if (lovType === 'company') {
      setFormData(prev => ({ ...prev, company: item.name, address: item.address }));
    } else if (lovType === 'godown') {
      setFormData(prev => ({ ...prev, godown: item.name }));
    }
    setShowLov(false);
  };

  return (
    /* Reduced outer padding and ensured full width */
    <div className="p-2 bg-slate-50 min-h-screen font-sans text-sm w-full">
      {/* Container widened to 98% to utilize the screen */}
      <div className="max-w-[98%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-slate-200">
        
        {/* Header Bar - More compact padding */}
        <div className="bg-slate-800 px-4 py-2.5 flex justify-between items-center text-white">
          <h1 className="text-md font-bold tracking-tight">SAMPLE ISSUE ENTRY</h1>
          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${isEditMode ? 'bg-orange-500' : 'bg-emerald-500'}`}>
            {isEditMode ? 'Edit Mode' : 'New Entry'}
          </span>
        </div>

        {/* Content Area - Reduced p-6 to p-4 */}
        <div className="p-4">
          {/* Form Top Section - Adjusted gaps and space-y */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-3">
              <label className="block">
                <span className="text-slate-500 font-semibold text-[11px] uppercase">Issue Number</span>
                <div className="flex mt-1">
                  <input name="issueNo" value={formData.issueNo} onChange={handleInputChange} className="flex-1 border rounded-l p-1.5 outline-none focus:border-blue-500" />
                  <button onClick={() => {setLovType('issue'); setShowLov(true)}} className="bg-slate-200 px-2 rounded-r hover:bg-slate-300"><Search size={14}/></button>
                </div>
              </label>
              <label className="block">
                <span className="text-slate-500 font-semibold text-[11px] uppercase">Issue Date</span>
                <input type="date" name="issueDate" value={formData.issueDate} onChange={handleInputChange} className="w-full mt-1 border rounded p-1.5 outline-none" />
              </label>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="text-slate-500 font-semibold text-[11px] uppercase">Company</span>
                <div className="flex mt-1">
                  <input name="company" value={formData.company} onChange={handleInputChange} className="flex-1 border rounded-l p-1.5 outline-none" />
                  <button onClick={() => {setLovType('company'); setShowLov(true)}} className="bg-blue-100 text-blue-600 px-2 rounded-r hover:bg-blue-200"><Search size={14}/></button>
                </div>
              </label>
              <label className="block">
                <span className="text-slate-500 font-semibold text-[11px] uppercase">Godown</span>
                <div className="flex mt-1">
                  <input name="godown" value={formData.godown} readOnly className="flex-1 border rounded-l p-1.5 bg-slate-50 outline-none cursor-not-allowed" />
                  <button onClick={() => {setLovType('godown'); setShowLov(true)}} className="bg-slate-700 text-white px-3 rounded-r hover:bg-slate-900 font-bold">L</button>
                </div>
              </label>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="text-slate-500 font-semibold text-[11px] uppercase">Address</span>
                <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" className="w-full mt-1 border rounded p-1.5 outline-none resize-none text-xs" />
              </label>
            </div>
          </div>

          {/* Table Section - Reduced cell padding */}
          <div className="border rounded-lg overflow-hidden mb-4">
            <table className="w-full border-collapse text-left">
              <thead className="bg-slate-100 border-b">
                <tr className="text-slate-600 font-bold text-[10px] uppercase">
                  <th className="p-2 w-10 text-center">#</th>
                  <th className="p-2">Item Details</th>
                  <th className="p-2 w-24 text-right">Qty</th>
                  <th className="p-2 w-32 text-right">MRP</th>
                  <th className="p-2 w-16 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-2 text-center text-slate-400 font-bold text-xs">{index + 1}</td>
                    <td className="p-2">
                      <input className="w-full outline-none bg-transparent text-xs" placeholder="Enter Item Name..." value={item.itemName} onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)} />
                    </td>
                    <td className="p-2">
                      <input type="number" className="w-full text-right outline-none bg-transparent text-xs" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} />
                    </td>
                    <td className="p-2">
                      <input type="number" className="w-full text-right outline-none bg-transparent font-medium text-xs" value={item.mrp} onChange={(e) => handleItemChange(item.id, 'mrp', e.target.value)} />
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={() => deleteRow(item.id)} className="text-red-400 hover:text-red-600 disabled:opacity-30" disabled={items.length === 1}><Trash2 size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={addRow} className="w-full py-1.5 bg-slate-50 text-blue-600 font-bold text-[10px] uppercase hover:bg-blue-50 border-t flex items-center justify-center gap-1">
              <Plus size={12}/> Add Line Item
            </button>
          </div>

          {/* Footer & Totals - More compact layout */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex gap-4 mb-4 md:mb-0">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Manager</span>
                <input name="managerName" value={formData.managerName} onChange={handleInputChange} className="block border-b border-slate-300 bg-transparent py-0.5 outline-none focus:border-blue-500 w-32 text-xs" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Mobile</span>
                <input name="mobNo" value={formData.mobNo} onChange={handleInputChange} className="block border-b border-slate-300 bg-transparent py-0.5 outline-none focus:border-blue-500 w-32 text-xs" />
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Amount</span>
              <span className="text-2xl font-black text-slate-800">₹ {formData.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons - Compact size */}
          <div className="mt-4 flex gap-2 border-t pt-4">
            <button onClick={resetForm} className="flex items-center gap-1 px-4 py-1.5 border rounded font-bold text-slate-600 hover:bg-slate-100 text-[11px]"><RotateCcw size={14}/> NEW</button>
            <button 
              className={`flex items-center gap-1 px-8 py-1.5 rounded font-bold text-white shadow transition-all text-[11px] ${isEditMode ? 'bg-orange-600 hover:bg-orange-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            >
              <Save size={14}/> {isEditMode ? 'UPDATE ISSUE' : 'SAVE ISSUE'}
            </button>
          </div>
        </div>
      </div>

      {/* LOV Modal - Compact */}
      {showLov && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
             <div className="p-3 bg-slate-100 flex justify-between font-bold border-b text-xs">
               <span>SELECT {lovType.toUpperCase()}</span>
               <button onClick={() => setShowLov(false)} className="hover:text-red-500">✕</button>
             </div>
             <div className="p-1 max-h-64 overflow-y-auto">
               {lovData[lovType]?.map((item, i) => (
                 <div key={i} onClick={() => handleLovSelect(item)} className="p-2 border-b last:border-0 hover:bg-blue-50 cursor-pointer flex justify-between items-center">
                   <span className="font-medium text-xs">{item.issueNo || item.name}</span>
                   <span className="text-slate-400 text-[10px]">{item.company || item.address}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleIssueIndex;