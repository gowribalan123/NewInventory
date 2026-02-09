// import React, { useState, useEffect } from 'react';
// import { 
//   FileText, 
//   Search, 
//   RotateCcw, 
//   Printer, 
//   LayoutGrid,
//   AlertCircle
// } from 'lucide-react';

// const MissingBillIndex = () => {
//   // --- Persistence Logic: Pull from the same key used in ContinuousBill ---
//   const [missingBills, setMissingBills] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate checking the "database" (localStorage) for gaps in Bill Nos
//     const savedData = localStorage.getItem('lastBill');
//     if (savedData) {
//       // Logic would go here to compare bill sequences
//       // For now, we show the UI structure based on your screenshot
//       setMissingBills([
//         { id: 1, bookName: 'Main Sales Book', range: 'CB-9901 to CB-9910', count: '0' }
//       ]);
//     }
//     setLoading(false);
//   }, []);

//   return (
//     <div className="p-2 bg-slate-50 min-h-screen font-sans text-sm w-full">
//       <div className="max-w-[98%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-slate-200">
        
//         {/* HEADER - Zoho Style (Clean White) */}
//         <div className="bg-white px-6 py-4 border-b border-slate-100 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <div className="p-2 bg-red-50 rounded-lg">
//               <AlertCircle size={20} className="text-red-500" />
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-slate-800 tracking-tight">Missing Bills Report</h1>
//               <p className="text-xs text-slate-500">Audit & Verification</p>
//             </div>
//           </div>
//           <div className="flex gap-3">
//             <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
//               <LayoutGrid size={16} /> View All Books
//             </button>
//           </div>
//         </div>

//         {/* SEARCH/FILTER AREA */}
//         <div className="p-6 bg-slate-50/50 border-b border-slate-100">
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
//             <div className="md:col-span-4">
//               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Book Name / Series</label>
//               <div className="relative">
//                 <input 
//                   type="text" 
//                   placeholder="Search Book..." 
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white"
//                 />
//                 <Search size={16} className="absolute right-3 top-2.5 text-slate-400" />
//               </div>
//             </div>
            
//             <div className="md:col-span-8 flex justify-end gap-3">
//               <button className="flex items-center gap-2 px-5 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
//                 <RotateCcw size={16} /> Reset
//               </button>
//               <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
//                 <Search size={16} /> Generate Report
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* TABLE SECTION */}
//         <div className="p-6">
//           <div className="border border-slate-200 rounded-lg overflow-hidden">
//             <table className="w-full text-left text-sm border-collapse">
//               <thead className="bg-slate-50 border-b border-slate-200">
//                 <tr>
//                   <th className="py-3 px-4 w-16 text-center font-bold text-slate-500 uppercase text-xs">#</th>
//                   <th className="py-3 px-4 font-bold text-slate-500 uppercase text-xs">Book Name</th>
//                   <th className="py-3 px-4 font-bold text-slate-500 uppercase text-xs">Bill Range / Missing Range</th>
//                   <th className="py-3 px-4 text-center font-bold text-slate-500 uppercase text-xs">Missing Count</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {missingBills.length > 0 ? (
//                   missingBills.map((bill, index) => (
//                     <tr key={bill.id} className="hover:bg-slate-50 transition-colors group">
//                       <td className="py-3 px-4 text-center text-slate-400 font-medium">{index + 1}</td>
//                       <td className="py-3 px-4 font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{bill.bookName}</td>
//                       <td className="py-3 px-4 text-slate-600 font-mono text-xs">{bill.range}</td>
//                       <td className="py-3 px-4 text-center">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${bill.count === '0' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
//                           {bill.count}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="p-10 text-center text-slate-400 italic">
//                       No missing bills found in the selected range.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* FOOTER ACTIONS */}
//           <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
//             <div className="flex gap-3">
//               <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all">
//                 <Printer size={16} /> Print Report
//               </button>
//             </div>
            
//             <div className="text-right">
//               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Report Status</p>
//               <div className="flex items-center gap-2 text-emerald-600">
//                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
//                 <p className="text-sm font-bold uppercase">Verified & Up to date</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MissingBillIndex;




import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  RotateCcw, 
  Printer, 
  LayoutGrid,
  AlertCircle
} from 'lucide-react';

const MissingBillsindex = () => {
  // --- Persistence Logic: Pull from the same key used in ContinuousBill ---
  const [missingBills, setMissingBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking the "database" (localStorage) for gaps in Bill Nos
    const savedData = localStorage.getItem('lastBill');
    if (savedData) {
      // Logic would go here to compare bill sequences
      // For now, we show the UI structure based on your screenshot
      setMissingBills([
        { id: 1, bookName: 'Main Sales Book', range: 'CB-9901 to CB-9910', count: '0' }
      ]);
    }
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 font-sans">
      {/* HEADER - Styled to match your Continuous Bill screen */}
      <div className="bg-[#1e293b] text-white p-2 flex justify-between items-center rounded-t-lg shadow-lg">
        <div className="flex items-center gap-3">
          <AlertCircle size={18} className="text-yellow-400" />
          <span className="font-bold text-sm tracking-wide uppercase">Missing Bills Report</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#2563eb] hover:bg-blue-700 text-[11px] px-3 py-1 rounded font-bold transition-all flex items-center gap-1">
            <LayoutGrid size={12} /> VIEW ALL
          </button>
        </div>
      </div>

      {/* SEARCH/FILTER AREA */}
      <div className="bg-white border-x border-b p-5 shadow-sm mb-4">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-4 flex items-center gap-3">
            <label className="text-xs text-gray-500 font-semibold whitespace-nowrap">Book Name</label>
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search Book..." 
                className="w-full border rounded px-2 py-1.5 text-sm pr-8 outline-none focus:border-blue-500"
              />
              <Search size={14} className="absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <div className="col-span-8 flex justify-end gap-2">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-blue-700 transition-all shadow-sm">
              <Search size={14} /> GENERATE REPORT
            </button>
            <button className="flex items-center gap-2 border px-4 py-1.5 rounded text-gray-600 hover:bg-gray-50 text-xs font-bold transition-all shadow-sm">
              <RotateCcw size={14} /> RESET
            </button>
          </div>
        </div>
      </div>

      {/* TABLE SECTION - Matching your "Missing Bills" screenshot */}
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-[#f1f5f9] text-gray-600 font-bold border-b">
            <tr>
              <th className="p-3 w-16 border-r text-center uppercase">Sl.No.</th>
              <th className="p-3 border-r uppercase">Book Name</th>
              <th className="p-3 border-r uppercase">Bill Range / Missing Range</th>
              <th className="p-3 text-center uppercase">Missing Bills Count</th>
            </tr>
          </thead>
          <tbody>
            {missingBills.length > 0 ? (
              missingBills.map((bill, index) => (
                <tr key={bill.id} className="border-b hover:bg-blue-50/30 transition-colors">
                  <td className="p-3 border-r text-center text-gray-500 font-medium">{index + 1}</td>
                  <td className="p-3 border-r font-semibold text-gray-700">{bill.bookName}</td>
                  <td className="p-3 border-r text-gray-600">{bill.range}</td>
                  <td className="p-3 text-center">
                    <span className={`px-3 py-1 rounded-full font-bold ${bill.count === '0' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {bill.count}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400 italic">
                  No missing bills found in the selected range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-between items-center mt-6 p-2">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border px-4 py-2 rounded text-blue-600 hover:bg-blue-50 text-xs font-bold transition-all shadow-sm">
            <Printer size={14} /> PRINT REPORT
          </button>
        </div>
        
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Report Status</p>
          <p className="text-sm font-black text-green-600 uppercase">Verified & Up to date</p>
        </div>
      </div>
    </div>
  );
};

export default MissingBillsindex;