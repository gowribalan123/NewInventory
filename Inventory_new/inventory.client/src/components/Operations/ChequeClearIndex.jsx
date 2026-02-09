import React, { useState, useMemo } from 'react';
import { Search, Save, RotateCcw, CheckCircle2, Landmark, Plus, Trash2 } from 'lucide-react';

const getInitialCheques = () => ([
  { id: 1, cleared: false, bounced: false, voucherDate: '2026-02-01', clearBouncedDate: '2026-02-05', accountHead: 'General Customer A', amount: 5000, chequeNo: 'CHQ1001' },
  { id: 2, cleared: false, bounced: false, voucherDate: '2026-02-02', clearBouncedDate: '2026-02-05', accountHead: 'Supplier B', amount: 12500, chequeNo: 'CHQ1002' }
]);

const ChequeClearIndex = () => {
  const [cheques, setCheques] = useState(getInitialCheques());
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ chequeNo: '', bankAccount: '', chequeType: 'UnCleared' });

  // Add a completely new blank row to the bottom of the grid
  const addNewRow = () => {
    const newEntry = {
      id: Date.now(),
      cleared: false,
      bounced: false,
      voucherDate: new Date().toISOString().split('T')[0],
      clearBouncedDate: new Date().toISOString().split('T')[0],
      accountHead: '',
      amount: 0,
      chequeNo: ''
    };
    setCheques([...cheques, newEntry]);
    setIsEditMode(true);
  };

  const deleteRow = (id) => {
    setCheques(cheques.filter(c => c.id !== id));
    setIsEditMode(true);
  };

  const handleRowChange = (id, field, value) => {
    setCheques(prev => prev.map(chq => 
      chq.id === id ? { ...chq, [field]: value } : chq
    ));
    setIsEditMode(true);
  };

  const toggleStatus = (id, statusField) => {
    setCheques(prev => prev.map(chq => {
      if (chq.id === id) {
        const isCurrentlyActive = chq[statusField];
        return { 
          ...chq, 
          cleared: statusField === 'cleared' ? !isCurrentlyActive : false, 
          bounced: statusField === 'bounced' ? !isCurrentlyActive : false 
        };
      }
      return chq;
    }));
    setIsEditMode(true);
  };

  const filteredCheques = useMemo(() => {
    return cheques.filter(c => {
      if (formData.chequeType === 'Cleared') return c.cleared;
      if (formData.chequeType === 'Bounced') return c.bounced;
      return !c.cleared && !c.bounced;
    });
  }, [cheques, formData.chequeType]);

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full">
      <div className="max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
        
        <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white">
          <h1 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400"/> Cheque Entry & Clearing
          </h1>
          <button 
            onClick={addNewRow}
            className="bg-emerald-600 hover:bg-emerald-700 px-3 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-colors"
          >
            <Plus size={12}/> ADD NEW LINE
          </button>
        </div>

        <div className="p-2 bg-[#e2ebf8]">
          {/* Top Search Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 bg-white p-3 border border-blue-200 rounded shadow-sm">
             <div className="flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Bank Account</span>
                <div className="flex flex-1">
                  <input className="w-full border border-slate-300 p-1 text-xs outline-none" placeholder="Select Bank..." />
                  <button className="bg-slate-800 text-white px-2"><Landmark size={12}/></button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">View Status</span>
                <select 
                  className="flex-1 border border-slate-300 p-1 text-xs font-bold bg-blue-50"
                  value={formData.chequeType}
                  onChange={(e) => setFormData({...formData, chequeType: e.target.value})}
                >
                  <option value="UnCleared">Un-Cleared</option>
                  <option value="Cleared">Cleared</option>
                  <option value="Bounced">Bounced</option>
                </select>
              </div>
          </div>

          {/* Grid with Inline Editing */}
          <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-[#f8fafc] border-b border-slate-300">
                <tr className="text-[#1e3a8a] font-bold text-[10px] uppercase text-left">
                  <th className="p-1.5 border-r border-slate-200 w-12 text-center">Clr</th>
                  <th className="p-1.5 border-r border-slate-200 w-12 text-center">Bnc</th>
                  <th className="p-1.5 border-r border-slate-200 w-32 px-2">Account Head</th>
                  <th className="p-1.5 border-r border-slate-200 w-24 px-2">Cheque No</th>
                  <th className="p-1.5 border-r border-slate-200 w-28 text-right px-2">Amount</th>
                  <th className="p-1.5 border-r border-slate-200 w-28 px-2">Date</th>
                  <th className="p-1.5 w-10 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCheques.map((chq) => (
                  <tr key={chq.id} className="hover:bg-blue-50/50">
                    <td className="p-1 border-r border-slate-100 text-center">
                      <input type="checkbox" checked={chq.cleared} onChange={() => toggleStatus(chq.id, 'cleared')} className="w-4 h-4" />
                    </td>
                    <td className="p-1 border-r border-slate-100 text-center">
                      <input type="checkbox" checked={chq.bounced} onChange={() => toggleStatus(chq.id, 'bounced')} className="w-4 h-4 accent-red-500" />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input 
                        className="w-full outline-none text-xs bg-transparent px-1" 
                        value={chq.accountHead} 
                        onChange={(e) => handleRowChange(chq.id, 'accountHead', e.target.value)}
                        placeholder="Customer Name..."
                      />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input 
                        className="w-full outline-none text-xs bg-transparent px-1" 
                        value={chq.chequeNo} 
                        onChange={(e) => handleRowChange(chq.id, 'chequeNo', e.target.value)}
                        placeholder="No..."
                      />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input 
                        type="number"
                        className="w-full outline-none text-xs bg-transparent px-1 text-right font-bold" 
                        value={chq.amount} 
                        onChange={(e) => handleRowChange(chq.id, 'amount', e.target.value)}
                      />
                    </td>
                    <td className="p-1 border-r border-slate-100">
                      <input 
                        type="date" 
                        className="w-full outline-none text-[10px] bg-transparent" 
                        value={chq.clearBouncedDate} 
                        onChange={(e) => handleRowChange(chq.id, 'clearBouncedDate', e.target.value)}
                      />
                    </td>
                    <td className="p-1 text-center">
                      <button onClick={() => deleteRow(chq.id)} className="text-slate-300 hover:text-red-500">
                        <Trash2 size={12}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Direct Add Button at bottom of table */}
            <button 
              onClick={addNewRow}
              className="w-full py-1.5 bg-slate-50 hover:bg-blue-50 text-blue-600 font-bold text-[10px] uppercase flex justify-center items-center gap-1 border-t border-slate-200 transition-colors"
            >
              <Plus size={14}/> Add New Cheque Row
            </button>
          </div>

          <div className="mt-2 flex justify-between items-center bg-white p-2 border border-blue-200 rounded">
            <button className="px-4 py-1 border rounded font-bold text-slate-600 text-[11px] flex items-center gap-1 hover:bg-slate-50">
              <RotateCcw size={14}/> RESET
            </button>
            <div className="text-[11px] font-bold text-slate-500">
              TOTAL SELECTED: ₹ {filteredCheques.reduce((acc, curr) => acc + Number(curr.amount), 0).toLocaleString()}
            </div>
            <button className="px-8 py-1 rounded bg-[#0369a1] font-bold text-white text-[11px] flex items-center gap-1 hover:bg-[#075985] shadow-md">
              <Save size={14}/> {isEditMode ? 'SAVE CHANGES' : 'UPDATE STATUS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChequeClearIndex;