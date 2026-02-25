// import React, { useState } from 'react';
// import { Search, Printer, FileDown, ChevronDown, Filter, Settings, Calendar } from 'lucide-react';

// const Ageing = () => {
//   const [asOfDate, setAsOfDate] = useState('2026-02-19');
//   const [isCondensed, setIsCondensed] = useState(false);

//   // Logic: Real dummy data to fill the "Upto" buckets from desktop
//   const ageingData = [
//     {
//       id: 1,
//       customerName: "Apex Electronics Ltd",
//       total: 25000.00,
//       bucket1: 15000.00, // 1-15 Days
//       bucket2: 10000.00, // 16-30 Days
//       bucket3: 0.00,      // 31-45 Days
//       bucket4: 0.00,      // 45+ Days
//     },
//     {
//       id: 2,
//       customerName: "Global Solutions",
//       total: 12400.00,
//       bucket1: 0.00,
//       bucket2: 0.00,
//       bucket3: 5000.00,
//       bucket4: 7400.00,
//     }
//   ];

//   return (
//     <div className="flex flex-col h-full bg-white font-sans text-[#404040]">
//       {/* 1. ZOHO HEADER */}
//       <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white">
//         <div className="flex items-center gap-2">
//           <h1 className="text-xl font-medium text-gray-800">Customer Ageing</h1>
//           <ChevronDown size={16} className="text-gray-400 mt-1 cursor-pointer" />
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="p-1.5 text-gray-500 hover:bg-gray-50 rounded border border-gray-200">
//             <Printer size={16} />
//           </button>
//           <button className="p-1.5 text-gray-500 hover:bg-gray-50 rounded border border-gray-200">
//             <FileDown size={16} />
//           </button>
//           <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>
//           <button className="bg-[#0052CC] hover:bg-[#0041a3] text-white px-4 py-1.5 rounded-md text-[13px] font-medium shadow-sm transition-all">
//             Run Report
//           </button>
//         </div>
//       </div>

//       {/* 2. FILTER STRIP - Cleaning up the "Days" and "Route" logic */}
//       <div className="px-8 py-5 bg-[#fbfcfd] border-b border-gray-100 flex flex-wrap items-center gap-8">
//         <div className="flex flex-col gap-1.5">
//           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ageing As Of</label>
//           <div className="relative">
//             <input 
//               type="date" 
//               className="border border-gray-200 rounded-md px-3 py-1.5 text-sm bg-white outline-none focus:border-[#0052CC] w-48"
//               value={asOfDate}
//               onChange={(e) => setAsOfDate(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Search Customer</label>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
//             <input 
//               type="text" 
//               placeholder="All Customers"
//               className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-sm w-64 outline-none focus:border-[#0052CC]"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-2 self-end mb-2 cursor-pointer group">
//           <input 
//             type="checkbox" 
//             id="condensed"
//             className="w-4 h-4 rounded border-gray-300 text-[#0052CC] focus:ring-[#0052CC] cursor-pointer"
//             checked={isCondensed}
//             onChange={(e) => setIsCondensed(e.target.checked)}
//           />
//           <label htmlFor="condensed" className="text-sm text-gray-600 group-hover:text-[#0052CC] cursor-pointer">Condensed</label>
//         </div>

//         <div className="flex items-center gap-2 self-end mb-2 text-[#0052CC] text-sm font-medium cursor-pointer">
//           <Settings size={14} />
//           <span>Configure Aging Intervals</span>
//         </div>
//       </div>

//       {/* 3. AGEING TABLE - Vertical spacing and clear buckets */}
//       <div className="flex-1 overflow-auto px-8">
//         <table className="w-full text-left border-separate border-spacing-0">
//           <thead>
//             <tr className="bg-white">
//               <th className={`pr-4 font-medium text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-200 ${isCondensed ? 'py-2' : 'py-5'}`}>Customer Name</th>
//               <th className={`px-4 font-semibold text-gray-700 text-[11px] uppercase tracking-wider border-b border-gray-200 text-right ${isCondensed ? 'py-2' : 'py-5'}`}>Total</th>
//               <th className={`px-4 font-medium text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-200 text-right ${isCondensed ? 'py-2' : 'py-5'}`}>1 - 15 Days</th>
//               <th className={`px-4 font-medium text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-200 text-right ${isCondensed ? 'py-2' : 'py-5'}`}>16 - 30 Days</th>
//               <th className={`px-4 font-medium text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-200 text-right ${isCondensed ? 'py-2' : 'py-5'}`}>31 - 45 Days</th>
//               <th className={`pl-4 font-medium text-red-500 text-[11px] uppercase tracking-wider border-b border-gray-200 text-right ${isCondensed ? 'py-2' : 'py-5'}`}>Above 45</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {ageingData.map((row) => (
//               <tr key={row.id} className="group hover:bg-blue-50/40 transition-colors">
//                 <td className={`pr-4 text-sm text-[#0052CC] font-medium ${isCondensed ? 'py-2' : 'py-4'}`}>{row.customerName}</td>
//                 <td className={`px-4 text-sm text-gray-900 text-right font-bold font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>₹{row.total.toFixed(2)}</td>
//                 <td className={`px-4 text-sm text-gray-600 text-right font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>₹{row.bucket1.toFixed(2)}</td>
//                 <td className={`px-4 text-sm text-gray-600 text-right font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>₹{row.bucket2.toFixed(2)}</td>
//                 <td className={`px-4 text-sm text-gray-600 text-right font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>₹{row.bucket3.toFixed(2)}</td>
//                 <td className={`pl-4 text-sm text-red-600 text-right font-semibold font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>₹{row.bucket4.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//           {/* TOTALS FOOTER - Common in Zoho reports */}
//           <tfoot>
//             <tr className="bg-gray-50 font-semibold">
//               <td className="py-3 pr-4 text-[11px] uppercase text-gray-500 pl-2">Total</td>
//               <td className="px-4 py-3 text-sm text-right font-mono border-t border-gray-200">₹37,400.00</td>
//               <td className="px-4 py-3 text-sm text-right font-mono border-t border-gray-200">₹15,000.00</td>
//               <td className="px-4 py-3 text-sm text-right font-mono border-t border-gray-200">₹10,000.00</td>
//               <td className="px-4 py-3 text-sm text-right font-mono border-t border-gray-200">₹5,000.00</td>
//               <td className="pl-4 py-3 text-sm text-right font-mono border-t border-gray-200 text-red-600">₹7,400.00</td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Ageing;











import React, { useState } from 'react';
import { 
  Search, 
  Printer, 
  FileDown, 
  Calendar,
  Settings,
  RotateCcw,
  FileText,
  TrendingUp
} from 'lucide-react';

const Ageing = () => {
  const [asOfDate, setAsOfDate] = useState('2026-02-19');
  const [isCondensed, setIsCondensed] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState('');

  // Sample ageing data
  const ageingData = [
    {
      id: 1,
      customerName: "Apex Electronics Ltd",
      total: 25000.00,
      bucket1: 15000.00, // 1-15 Days
      bucket2: 10000.00, // 16-30 Days
      bucket3: 0.00,      // 31-45 Days
      bucket4: 0.00,      // 45+ Days
    },
    {
      id: 2,
      customerName: "Global Solutions",
      total: 12400.00,
      bucket1: 0.00,
      bucket2: 0.00,
      bucket3: 5000.00,
      bucket4: 7400.00,
    },
    {
      id: 3,
      customerName: "Tech World Pvt Ltd",
      total: 18500.00,
      bucket1: 8000.00,
      bucket2: 6500.00,
      bucket3: 4000.00,
      bucket4: 0.00,
    },
    {
      id: 4,
      customerName: "Smart Traders Inc",
      total: 9200.00,
      bucket1: 0.00,
      bucket2: 0.00,
      bucket3: 0.00,
      bucket4: 9200.00,
    }
  ];

  const calculateTotals = () => {
    return ageingData.reduce(
      (acc, row) => ({
        total: acc.total + row.total,
        bucket1: acc.bucket1 + row.bucket1,
        bucket2: acc.bucket2 + row.bucket2,
        bucket3: acc.bucket3 + row.bucket3,
        bucket4: acc.bucket4 + row.bucket4,
      }),
      { total: 0, bucket1: 0, bucket2: 0, bucket3: 0, bucket4: 0 }
    );
  };

  const totals = calculateTotals();

  const filteredData = ageingData.filter(item =>
    item.customerName.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  const handleRunReport = () => {
    alert('Running report with current filters...');
  };

  const handleExport = () => {
    alert('Exporting report...');
  };

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
                <TrendingUp className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  Customer Ageing Report
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Receivables
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Track outstanding payments by aging period
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleExport}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                <Printer size={18} />
              </button>
              <button 
                onClick={handleExport}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                <FileDown size={18} />
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              
              {/* As Of Date */}
              <div className="lg:col-span-2">
                <label className={label}>Ageing As Of</label>
                <div className="relative mt-1.5">
                  <input
                    type="date"
                    className={input}
                    value={asOfDate}
                    onChange={(e) => setAsOfDate(e.target.value)}
                  />
                  <Calendar
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Search Customer */}
              <div className="lg:col-span-3">
                <label className={label}>Search Customer</label>
                <div className="relative mt-1.5">
                  <input
                    className={input}
                    placeholder="Search by customer name..."
                    value={searchCustomer}
                    onChange={(e) => setSearchCustomer(e.target.value)}
                  />
                  <Search
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Condensed Toggle */}
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer group pb-2">
                  <input
                    type="checkbox"
                    checked={isCondensed}
                    onChange={() => setIsCondensed(!isCondensed)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    Condensed
                  </span>
                </label>
              </div>
            </div>

            {/* Configure Button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                <Settings size={16} />
                Configure Aging Intervals
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b-2 border-blue-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    1-15 Days
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    16-30 Days
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    31-45 Days
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-red-600 uppercase tracking-wider">
                    Above 45
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <Search size={48} className="mb-3 opacity-50" />
                        <p className="text-sm font-medium text-gray-600">No customers found</p>
                        <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-blue-50/30 transition-colors duration-150 cursor-pointer ${
                        row.bucket4 > 0 ? 'bg-red-50/20' : ''
                      }`}
                    >
                      <td className={`px-6 text-sm text-blue-600 font-semibold hover:text-blue-700 ${isCondensed ? 'py-2' : 'py-4'}`}>
                        {row.customerName}
                      </td>
                      <td className={`px-6 text-sm text-right font-bold font-mono text-gray-900 ${isCondensed ? 'py-2' : 'py-4'}`}>
                        ₹{row.total.toFixed(2)}
                      </td>
                      <td className={`px-6 text-sm text-right font-mono text-gray-600 ${isCondensed ? 'py-2' : 'py-4'}`}>
                        {row.bucket1 > 0 ? (
                          <span className="text-green-600">₹{row.bucket1.toFixed(2)}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className={`px-6 text-sm text-right font-mono text-gray-600 ${isCondensed ? 'py-2' : 'py-4'}`}>
                        {row.bucket2 > 0 ? (
                          <span className="text-yellow-600">₹{row.bucket2.toFixed(2)}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className={`px-6 text-sm text-right font-mono text-gray-600 ${isCondensed ? 'py-2' : 'py-4'}`}>
                        {row.bucket3 > 0 ? (
                          <span className="text-orange-600">₹{row.bucket3.toFixed(2)}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className={`px-6 text-sm text-right font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>
                        {row.bucket4 > 0 ? (
                          <span className="text-red-600 font-bold">₹{row.bucket4.toFixed(2)}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

              {/* Totals Footer */}
              <tfoot>
                <tr className="bg-gradient-to-r from-blue-50 to-gray-50 border-t-2 border-blue-200">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 uppercase">
                    Total
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold font-mono text-gray-900 text-base">
                    ₹{totals.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold font-mono text-green-700">
                    ₹{totals.bucket1.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold font-mono text-yellow-700">
                    ₹{totals.bucket2.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold font-mono text-orange-700">
                    ₹{totals.bucket3.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold font-mono text-red-700 text-base">
                    ₹{totals.bucket4.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2">
                <RotateCcw size={16} />
                <span className="text-sm font-medium">RESET</span>
              </button>

              <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200">
                <Printer size={18} />
              </button>

              <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200">
                <FileDown size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Total Customers
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {filteredData.length} Accounts
                </p>
              </div>

              <div className="h-12 w-px bg-gray-300"></div>

              <div className="text-right">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Overdue (45+)
                </p>
                <p className="text-sm font-bold text-red-600">
                  ₹{totals.bucket4.toFixed(2)}
                </p>
              </div>

              <div className="h-12 w-px bg-gray-300"></div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl px-6 py-3 min-w-[180px]">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Total Receivables
                </p>
                <p className="text-2xl font-bold text-yellow-400">
                  ₹{totals.total.toFixed(2)}
                </p>
              </div>

              <button
                onClick={handleRunReport}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <FileText size={18} />
                <span className="text-sm font-bold">RUN REPORT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ageing;