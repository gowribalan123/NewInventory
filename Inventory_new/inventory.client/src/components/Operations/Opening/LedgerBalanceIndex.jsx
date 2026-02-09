import React, { useState } from 'react';
import { Search, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LedgerBalanceIndex = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data - initialized into state so it can be edited
  const [ledgerData, setLedgerData] = useState([
    { id: 1, accountHead: "A/C'S & TV'S", debit: 0, credit: 0 },
    { id: 2, accountHead: "ABINASH LOAN", debit: 0, credit: 0 },
    { id: 3, accountHead: "ABINASH SALARY", debit: 0, credit: 0 },
    { id: 4, accountHead: "ABOOBACKER SALARY", debit: 0, credit: 0 },
    { id: 5, accountHead: "ABU THALIB SALARY", debit: 0, credit: 0 },
    { id: 6, accountHead: "ACCESSORIES", debit: 0, credit: 0 },
  ]);

  // Function to handle input changes
  const handleInputChange = (id, field, value) => {
    const updatedData = ledgerData.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value === '' ? 0 : parseFloat(value) };
      }
      return item;
    });
    setLedgerData(updatedData);
  };

  // Function to handle Save
  const handleSave = () => {
    console.log("Data Saved to Database:", ledgerData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
  };

  const filteredData = ledgerData.filter(item =>
    item.accountHead.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDebit = filteredData.reduce((sum, item) => sum + Number(item.debit), 0);
  const totalCredit = filteredData.reduce((sum, item) => sum + Number(item.credit), 0);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Ledger Balance</h1>
            <p className="text-sm text-slate-500">Manage opening balances for account heads</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {showSuccess && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium animate-in fade-in duration-300">
              <CheckCircle2 size={18} />
              Saved Successfully!
            </div>
          )}
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold shadow-md active:scale-95"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search Account Head..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-semibold">Group Name:</span>
          <input 
            type="text" 
            className="border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-blue-500 bg-slate-50 w-64" 
            placeholder="Filter by Group..."
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border-x border-b border-slate-200 rounded-b-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-20 text-center border-r border-slate-200">Sl.No</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Account Head</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-44 text-right">Debit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-44 text-right">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 text-sm text-slate-400 text-center border-r border-slate-100">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.accountHead}</td>
                  <td className="px-6 py-4">
                    <input 
                      type="number"
                      value={item.debit}
                      onChange={(e) => handleInputChange(item.id, 'debit', e.target.value)}
                      className="w-full text-right bg-transparent border border-transparent group-hover:border-slate-200 hover:bg-white focus:bg-white focus:border-blue-500 focus:outline-none px-3 py-1.5 rounded text-sm transition-all"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="number"
                      value={item.credit}
                      onChange={(e) => handleInputChange(item.id, 'credit', e.target.value)}
                      className="w-full text-right bg-transparent border border-transparent group-hover:border-slate-200 hover:bg-white focus:bg-white focus:border-blue-500 focus:outline-none px-3 py-1.5 rounded text-sm transition-all"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Footer Totals */}
            <tfoot>
              <tr className="bg-slate-50 font-bold border-t-2 border-slate-200">
                <td colSpan="2" className="px-6 py-5 text-sm text-slate-600 text-right uppercase tracking-widest">Total Amount :</td>
                <td className="px-6 py-5 text-base text-blue-600 text-right font-mono tracking-tight border-l border-slate-100">
                  ₹ {totalDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-5 text-base text-red-600 text-right font-mono tracking-tight border-l border-slate-100">
                  ₹ {totalCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LedgerBalanceIndex;