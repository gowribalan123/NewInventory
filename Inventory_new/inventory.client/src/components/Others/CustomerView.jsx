import React, { useState } from 'react';
import { Search, Printer, FileDown, Plus, Users, Filter, MoreHorizontal, Mail, Phone, Edit2, Trash2, MapPin } from 'lucide-react';

const CustomerView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCondensed, setIsCondensed] = useState(false);

  const customers = [
    {
      id: 1,
      name: "Apex Electronics Ltd",
      contactName: "John Doe",
      email: "accounts@apexelectronics.com",
      phone: "+91 98765 43210",
      tin: "TIN-9920115",
      address: "123 Business Park, Bangalore, KA",
      receivables: 12500.00,
      unusedCredits: 500.00,
      status: "Active"
    },
    {
      id: 2,
      name: "Global Solutions",
      contactName: "Sarah Smith",
      email: "billing@globalsol.in",
      phone: "+91 88776 55443",
      tin: "TIN-8827731",
      address: "Industrial Area Phase 2, Mumbai, MH",
      receivables: 8400.00,
      unusedCredits: 0.00,
      status: "Active"
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
                <Users className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  Customer Master
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    CRM
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Manage customer profiles and balances
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
                <Plus size={16} /> New Customer
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className={label}>Search Customers</label>
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
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Receivables</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Credits</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 w-20 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="group hover:bg-blue-50/30 transition-colors duration-150">
                    <td className={`px-6 ${isCondensed ? 'py-2' : 'py-4'}`}>
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-600 font-medium">{customer.name}</span>
                        <span className="text-xs text-gray-400">{customer.contactName}</span>
                      </div>
                    </td>
                    <td className="px-6 text-sm text-gray-600">
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1"><Mail size={10}/> {customer.email}</span>
                        <span className="flex items-center gap-1"><Phone size={10}/> {customer.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 text-sm text-red-600 text-right font-bold font-mono">₹{customer.receivables.toFixed(2)}</td>
                    <td className="px-6 text-sm text-blue-600 text-right font-medium font-mono">₹{customer.unusedCredits.toFixed(2)}</td>
                    <td className="px-6 text-center">
                      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {customer.status}
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

export default CustomerView;