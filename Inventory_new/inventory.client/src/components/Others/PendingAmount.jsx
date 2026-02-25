import React, { useState } from 'react';
import { Search, Printer, FileDown, ChevronDown, Plus, Filter, Settings, Clock, Calendar } from 'lucide-react';

const PendingAmount = () => {
  const [reportType, setReportType] = useState('Debtors');
  const [selectedDate, setSelectedDate] = useState('2026-02-19');
  const [isCondensed, setIsCondensed] = useState(false);

  // Logic: Complete dummy data to fill the 7-column desktop structure
  const pendingData = [
    {
      id: 1,
      date: "2026-02-10",
      billId: "BID-9920",
      billNo: "INV/2026/042",
      partyId: "PID-551",
      supplierName: "Apex Electronics Ltd",
      billAmount: 12500.00,
      collectedAmount: 5000.00
    },
    {
      id: 2,
      date: "2026-02-15",
      billId: "BID-9925",
      billNo: "INV/2026/089",
      partyId: "PID-202",
      supplierName: "Global Solutions",
      billAmount: 8400.00,
      collectedAmount: 8400.00
    },
    {
      id: 3,
      date: "2026-02-18",
      billId: "BID-9931",
      billNo: "INV/2026/112",
      partyId: "PID-889",
      supplierName: "Vertex Industries",
      billAmount: 15000.00,
      collectedAmount: 0.00
    }
  ];

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
                <Clock className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  Pending Amount
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Outstanding
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Track unpaid bills and collections
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
                <Printer size={18} />
              </button>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all shadow-sm flex items-center gap-2">
                <Plus size={16} /> New Payment
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className={label}>Type</label>
                <select className={`${input} mt-1.5 w-full`} value={reportType} onChange={(e) => setReportType(e.target.value)}>
                  <option>Debtors</option>
                  <option>Creditors</option>
                </select>
              </div>
              <div>
                <label className={label}>As of Date</label>
                <div className="relative mt-1.5">
                  <input type="date" className={input} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                  <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={label}>Party Name</label>
                <div className="relative mt-1.5">
                  <input type="text" placeholder="Search party..." className={input} />
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <label className="flex items-center gap-2 cursor-pointer group pb-2">
                  <input type="checkbox" checked={isCondensed} onChange={(e) => setIsCondensed(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Condensed</span>
                </label>
                <button className="flex items-center gap-2 text-sm text-blue-600 font-medium pb-2 hover:underline">
                  <Filter size={14} /> More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b-2 border-blue-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bill Details</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Party Name</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Bill Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Collected</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingData.map((item) => (
                  <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors duration-150">
                    <td className={`px-6 text-sm text-gray-600 ${isCondensed ? 'py-2' : 'py-4'}`}>{item.date}</td>
                    <td className={`px-6 ${isCondensed ? 'py-2' : 'py-4'}`}>
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-600 font-medium">{item.billNo}</span>
                        <span className="text-xs text-gray-400">{item.billId}</span>
                      </div>
                    </td>
                    <td className={`px-6 ${isCondensed ? 'py-2' : 'py-4'}`}>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700 font-medium">{item.supplierName}</span>
                        <span className="text-xs text-gray-400">{item.partyId}</span>
                      </div>
                    </td>
                    <td className={`px-6 text-sm text-gray-700 text-right font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>₹{item.billAmount.toFixed(2)}</td>
                    <td className={`px-6 text-sm text-green-600 text-right font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>₹{item.collectedAmount.toFixed(2)}</td>
                    <td className={`px-6 text-sm text-red-600 text-right font-bold font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>
                      ₹{(item.billAmount - item.collectedAmount).toFixed(2)}
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

export default PendingAmount;