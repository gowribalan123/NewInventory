import React, { useState } from 'react';
import { Search, Printer, FileDown, ChevronDown, Filter, Settings, Mail, BookOpen, Calendar } from 'lucide-react';

const LedgerList = () => {
  const [fromDate, setFromDate] = useState('2025-01-01');
  const [toDate, setToDate] = useState('2026-02-19');
  const [isCondensed, setIsCondensed] = useState(false);

  // Logic: Comprehensive dummy data to satisfy the desktop requirements
  const ledgerEntries = [
    {
      id: 1,
      date: "2026-01-05",
      type: "Invoice",
      transactionId: "INV-2026-001",
      description: "Sales to Apex Electronics",
      debit: 5000.00,
      credit: 0.00,
      balance: 5000.00
    },
    {
      id: 2,
      date: "2026-01-15",
      type: "Payment",
      transactionId: "PAY-9982",
      description: "Amount received - Ref #441",
      debit: 0.00,
      credit: 3500.00,
      balance: 1500.00
    },
    {
      id: 3,
      date: "2026-02-01",
      type: "Credit Note",
      transactionId: "CN-0022",
      description: "Item Return - Damaged goods",
      debit: 0.00,
      credit: 500.00,
      balance: 1000.00
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
                <BookOpen className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  Account Ledger
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Statement
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Detailed transaction history
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
                <Mail size={18} />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
                <Printer size={18} />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30">
                <FileDown size={18} />
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className={label}>Account Name</label>
                <div className="relative mt-1.5">
                  <input type="text" placeholder="Select Customer/Supplier" className={input} />
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className={label}>Date Range</label>
                <div className="flex items-center gap-2 mt-1.5">
                  <input type="date" className={input} value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                  <span className="text-gray-400">-</span>
                  <input type="date" className={input} value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
              </div>
              <div className="flex items-end">
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
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Debit</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Credit</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ledgerEntries.map((entry) => (
                  <tr key={entry.id} className="group hover:bg-blue-50/30 transition-colors duration-150">
                    <td className={`px-6 text-sm text-gray-600 font-mono ${isCondensed ? 'py-2' : 'py-4'}`}>{entry.date}</td>
                    <td className="px-6">
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-600 font-medium">{entry.type}</span>
                        <span className="text-xs text-gray-400">{entry.transactionId}</span>
                      </div>
                    </td>
                    <td className="px-6 text-sm text-gray-700 italic max-w-xs truncate">{entry.description}</td>
                    <td className="px-6 text-sm text-gray-700 text-right font-mono">{entry.debit > 0 ? `₹${entry.debit.toFixed(2)}` : ''}</td>
                    <td className="px-6 text-sm text-gray-700 text-right font-mono">{entry.credit > 0 ? `₹${entry.credit.toFixed(2)}` : ''}</td>
                    <td className="px-6 text-sm text-gray-900 text-right font-bold font-mono">₹{entry.balance.toFixed(2)}</td>
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

export default LedgerList;
