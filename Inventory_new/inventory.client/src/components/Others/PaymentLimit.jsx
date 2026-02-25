import React, { useState } from 'react';
import { Printer, Settings, MoreHorizontal, ChevronDown, Plus, CreditCard, FileDown, Calendar, RotateCcw } from 'lucide-react';

const PaymentLimit = () => {
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState('2026-02-20');
  const [limitAmount, setLimitAmount] = useState('');
  const [isCondensed, setIsCondensed] = useState(false);

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
                <CreditCard className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  Payment Limit
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Outbound
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Manage supplier payment thresholds
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
                <Printer size={18} />
              </button>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all shadow-sm flex items-center gap-2">
                <Plus size={16} /> New Limit
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className={label}>From Date</label>
                <div className="relative mt-1.5">
                  <input type="date" className={input} value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                  <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={label}>To Date</label>
                <div className="relative mt-1.5">
                  <input type="date" className={input} value={toDate} onChange={(e) => setToDate(e.target.value)} />
                  <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={label}>Limit Amount</label>
                <input type="number" placeholder="0.00" className={`${input} mt-1.5`} value={limitAmount} onChange={(e) => setLimitAmount(e.target.value)} />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer group pb-2">
                  <input type="checkbox" checked={isCondensed} onChange={(e) => setIsCondensed(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Condensed View</span>
                </label>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b-2 border-blue-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Voucher No.</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td colSpan="5" className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                        <Settings className="text-gray-300" size={32} />
                      </div>
                      <p className="text-gray-500 text-sm font-medium">No payment data found for the selected period.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLimit;