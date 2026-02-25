import React, { useState } from 'react';
import { Search, Printer, FileDown, Plus, Truck, Filter, MoreHorizontal, Mail, Phone, Edit2, Trash2, MapPin } from 'lucide-react';

const SupplierView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCondensed, setIsCondensed] = useState(false);

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Televes Middle East",
      contactName: "Miguel Garcia",
      email: "logistics@televes.com",
      phone: "+971 4 883 4344",
      tin: "VAT-772210",
      address: "Jebel Ali Free Zone, Dubai, UAE",
      payables: 45200.00,
      unusedCredits: 1200.00,
      status: "Active"
    },
    {
      id: 2,
      name: "Generic Tech Supplies",
      contactName: "Amit Sharma",
      email: "sales@generictech.in",
      phone: "+91 22 4455 6677",
      tin: "TIN-4455221",
      address: "Bandra Kurla Complex, Mumbai, MH",
      payables: 0.00,
      unusedCredits: 350.00,
      status: "Active"
    },
    {
      id: 3,
      name: "Global Components Ltd",
      contactName: "Sarah Jenkins",
      email: "accounts@globalcomp.com",
      phone: "+44 20 7946 0123",
      tin: "GB-123456789",
      address: "123 Tech Park, London, UK",
      payables: 12500.50,
      unusedCredits: 0.00,
      status: "Inactive"
    }
  ]);

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const input = "px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 transition-all";
  const label = "text-xs font-semibold text-gray-700 uppercase tracking-wide";

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Truck className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  Supplier Master
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Procurement
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Manage vendor profiles and payables
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
                <Printer size={18} />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
                <FileDown size={18} />
              </button>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all shadow-sm flex items-center gap-2">
                <Plus size={16} /> New Supplier
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className={label}>Search Suppliers</label>
                <div className="relative mt-1.5">
                  <input type="text" placeholder="Search by name, email, phone..." className={input} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="flex items-end justify-between col-start-4">
                <label className="flex items-center gap-2 cursor-pointer group pb-2">
                  <input type="checkbox" checked={isCondensed} onChange={(e) => setIsCondensed(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Condensed</span>
                </label>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b-2 border-blue-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Supplier Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Payables</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Credits</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 w-20 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSuppliers.map((supplier, index) => (
                  <tr key={supplier.id} className="group hover:bg-blue-50/30 transition-colors duration-150">
                    <td className={`px-6 ${isCondensed ? 'py-2' : 'py-4'}`}>
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-600 font-medium">{supplier.name}</span>
                        <span className="text-xs text-gray-400">{supplier.contactName}</span>
                      </div>
                    </td>
                    <td className="px-6 text-sm text-gray-600">
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1"><Mail size={10}/> {supplier.email}</span>
                        <span className="flex items-center gap-1"><Phone size={10}/> {supplier.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 text-sm text-gray-600">
                      <div className="flex items-start gap-1">
                        <MapPin size={12} className="text-gray-400 mt-0.5 shrink-0"/> 
                        <span className="truncate max-w-[200px]">{supplier.address}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 pl-4 mt-0.5">TIN: {supplier.tin}</div>
                    </td>
                    <td className="px-6 text-sm text-orange-600 text-right font-bold font-mono">₹{supplier.payables.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 text-sm text-blue-600 text-right font-medium font-mono">₹{supplier.unusedCredits.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${supplier.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {supplier.status}
                      </span>
                    </td>
                    <td className="px-6 text-center">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-blue-100 rounded text-blue-600"><Edit2 size={14}/></button>
                        <button className="p-1 hover:bg-red-100 rounded text-red-600"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierView;





// import React, { useState } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   MoreHorizontal, 
//   Edit2, 
//   FileText, 
//   IndianRupee, 
//   Truck, 
//   CreditCard,
//   ChevronDown
// } from 'lucide-react';

// const SupplierView = () => {
//   const [selectedSupplierId, setSelectedSupplierId] = useState(1);

//   // Logic: Data derived from Supplier Details headers
//   const suppliers = [
//     {
//       id: 1,
//       name: "Televes Middle East",
//       contactName: "Miguel Garcia",
//       email: "logistics@televes.com",
//       phone: "+971 4 883 4344",
//       tin: "VAT-772210",
//       address: "Jebel Ali Free Zone, Dubai, UAE",
//       payables: 45200.00,
//       unusedCredits: 1200.00,
//       status: "Active"
//     },
//     {
//       id: 2,
//       name: "Generic Tech Supplies",
//       contactName: "Amit Sharma",
//       email: "sales@generictech.in",
//       phone: "+91 22 4455 6677",
//       tin: "TIN-4455221",
//       address: "Bandra Kurla Complex, Mumbai, MH",
//       payables: 0.00,
//       unusedCredits: 350.00,
//       status: "Active"
//     }
//   ];

//   const activeSupplier = suppliers.find(s => s.id === selectedSupplierId) || suppliers[0];

//   return (
//     <div className="flex h-full bg-white font-sans text-[#404040]">
//       {/* 1. MASTER LIST (LEFT SIDEBAR) */}
//       <div className="w-1/3 border-r border-gray-200 flex flex-col bg-[#fbfcfd]">
//         <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
//           <h2 className="text-lg font-medium">All Suppliers</h2>
//           <button className="bg-[#0052CC] p-1.5 rounded-md text-white hover:bg-[#0041a3]">
//             <Plus size={18} />
//           </button>
//         </div>
//         <div className="p-3 border-b border-gray-100 bg-white">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
//             <input 
//               type="text" 
//               placeholder="Search suppliers..."
//               className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-sm outline-none focus:border-[#0052CC]"
//             />
//           </div>
//         </div>
//         <div className="overflow-y-auto flex-1">
//           {suppliers.map((supplier) => (
//             <div 
//               key={supplier.id}
//               onClick={() => setSelectedSupplierId(supplier.id)}
//               className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${selectedSupplierId === supplier.id ? 'bg-blue-50 border-l-4 border-l-[#0052CC]' : 'hover:bg-gray-50'}`}
//             >
//               <div className="flex justify-between items-start mb-1">
//                 <span className="text-sm font-medium text-gray-800 truncate">{supplier.name}</span>
//               </div>
//               <div className="flex justify-between items-center text-xs text-gray-500">
//                 <span>Payables: <span className="text-orange-600 font-medium">₹{supplier.payables.toLocaleString()}</span></span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 2. DETAIL VIEW (RIGHT PANE) */}
//       <div className="flex-1 overflow-y-auto bg-white">
//         <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between z-10">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-lg">
//               <Truck size={24} />
//             </div>
//             <div>
//               <h2 className="text-xl font-medium leading-tight">{activeSupplier.name}</h2>
//               <span className="text-[11px] text-gray-400 font-mono tracking-tighter">SUPPLIER ID: SUP-00{activeSupplier.id}</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-600"><Edit2 size={16} /></button>
//             <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-600"><MoreHorizontal size={16} /></button>
//             <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
//             <button className="bg-[#0052CC] hover:bg-[#0041a3] text-white px-4 py-2 rounded-md text-[13px] font-medium flex items-center gap-2">
//                New Purchase Order <ChevronDown size={14} />
//             </button>
//           </div>
//         </div>

//         <div className="p-8">
//           {/* BALANCE CARDS */}
//           <div className="grid grid-cols-2 gap-6 mb-10">
//             <div className="border border-gray-100 rounded-lg p-5 bg-[#fbfcfd]">
//               <div className="flex items-center gap-3 text-gray-500 mb-2">
//                 <IndianRupee size={18} className="text-orange-600" />
//                 <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Total Payables</span>
//               </div>
//               <p className="text-2xl font-semibold">₹{activeSupplier.payables.toLocaleString()}</p>
//             </div>
//             <div className="border border-gray-100 rounded-lg p-5 bg-[#fbfcfd]">
//               <div className="flex items-center gap-3 text-gray-500 mb-2">
//                 <CreditCard size={18} className="text-[#0052CC]" />
//                 <span className="text-xs font-bold uppercase tracking-wider">Unused Vendor Credits</span>
//               </div>
//               <p className="text-2xl font-semibold text-[#0052CC]">₹{activeSupplier.unusedCredits.toLocaleString()}</p>
//             </div>
//           </div>

//           {/* SUPPLIER INFORMATION TABS */}
//           <div className="grid grid-cols-2 gap-10">
//             <div>
//               <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-50 pb-2">Primary Contact</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3 text-sm">
//                   <Mail size={16} className="text-gray-400" />
//                   <span className="text-[#0052CC]">{activeSupplier.email}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <Phone size={16} className="text-gray-400" />
//                   <span>{activeSupplier.phone}</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-50 pb-2">Address & Tax</h3>
//               <div className="space-y-4">
//                  <div className="flex gap-2">
//                     <MapPin size={16} className="text-gray-400 shrink-0" />
//                     <p className="text-sm text-gray-600 leading-relaxed">{activeSupplier.address}</p>
//                  </div>
//                  <div className="pl-6">
//                     <p className="text-[10px] text-gray-400 font-bold uppercase">Tax Registration No (TIN)</p>
//                     <p className="text-sm text-gray-700 font-medium">{activeSupplier.tin}</p>
//                  </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupplierView;