import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

// --- Initializers & Data (Moved outside component) ---
const getInitialFormData = () => ({
  qtnNo: `QTN-${Math.floor(1000 + Math.random() * 9000)}`,
  date: new Date().toISOString().split('T')[0],
  party: '',
  address1: '',
  address2: '',
  salesMan: '',
  rateType: 'Standard',
  preparedBy: 'Admin',
  grandTotal: 0
});

const getInitialItems = () => ([
  { id: Date.now(), partNo: '', itemName: '', unit: 'PCS', qty: 1, rate: 0, total: 0 }
]);

const lovData = {
  quotation: [
    { 
      qtnNo: 'QTN-001', 
      date: '2026-01-20', 
      party: 'Global Tech Inc.', 
      address1: '101 Tech Park', 
      salesMan: 'S. Jones', 
      rateType: 'Wholesale', 
      preparedBy: 'Admin', 
      grandTotal: 2500, 
      items: [{ id: 1, partNo: 'HW-101', itemName: 'Wireless Mouse', unit: 'PCS', qty: 10, rate: 250, total: 2500 }] 
    },
    { 
      qtnNo: 'QTN-002', 
      date: '2026-01-22', 
      party: 'Innovate Solutions', 
      address1: '202 Innovation Dr', 
      salesMan: 'M. Williams', 
      rateType: 'Standard', 
      preparedBy: 'Admin', 
      grandTotal: 18000, 
      items: [{ id: 1, partNo: 'SW-202', itemName: 'Project Management Software', unit: 'LIC', qty: 1, rate: 18000, total: 18000 }] 
    },
  ],
  party: [
    { name: 'Global Tech Inc.', address1: '101 Tech Park, Silicon Valley' },
    { name: 'Innovate Solutions', address1: '202 Innovation Dr, Research Triangle' },
    { name: 'Creative Minds LLC', address1: '303 Art St, Design District' },
  ]
};

const getLovConfig = (type) => {
  switch(type) {
    case 'quotation': return { 
      title: 'Select Quotation', 
      columns: [{ header: 'Quotation No', key: 'qtnNo' }, { header: 'Date', key: 'date' }, { header: 'Party', key: 'party' }, { header: 'Amount', key: 'grandTotal' }] 
    };
    case 'party': return { 
      title: 'Select Party', 
      columns: [{ header: 'Party Name', key: 'name' }, { header: 'Address', key: 'address1' }] 
    };
    default: return { title: 'Select', columns: [] };
  }
};

const QuotationIndex = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showLov, setShowLov] = useState(false);
  const [lovType, setLovType] = useState('');
  const [formData, setFormData] = useState(getInitialFormData());
  const [items, setItems] = useState(getInitialItems());

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (Number(item.qty) || 0) * (Number(item.rate) || 0), 0);
    setFormData(prev => ({ ...prev, grandTotal: total }));
  }, [items]);

  const resetForm = () => {
    setFormData(getInitialFormData());
    setItems(getInitialItems());
    setIsEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const newItem = { ...item, [field]: value };
        newItem.total = (Number(newItem.qty) || 0) * (Number(newItem.rate) || 0);
        return newItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const addRow = () => {
    setItems([...items, { id: Date.now(), partNo: '', itemName: '', unit: 'PCS', qty: 1, rate: 0, total: 0 }]);
  };

  const deleteRow = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleLovClick = (type) => {
    setLovType(type);
    setShowLov(true);
  };

  const handleLovSelect = (item) => {
    if (lovType === 'quotation') {
      setFormData({ ...getInitialFormData(), ...item });
      if (item.items) {
        setItems(item.items.map(i => ({ ...i, id: Date.now() + Math.random() })));
      }
      setIsEditMode(true);
    } else if (lovType === 'party') {
      setFormData(prev => ({ ...prev, party: item.name, address1: item.address1 }));
    }
    setShowLov(false);
  };

  const handleDeleteQuotation = () => {
    if (window.confirm('Are you sure you want to delete this Quotation?')) {
      console.log('Deleting quotation:', formData.qtnNo);
      resetForm();
    }
  };

  const handleSave = () => {
    const payload = { ...formData, items };
    console.log(isEditMode ? 'Updating Quotation:' : 'Saving New Quotation:', payload);
    alert(isEditMode ? 'Quotation Updated! (Check console)' : 'Quotation Saved! (Check console)');
    if (!isEditMode) {
      resetForm();
    }
  };

  return (
    <div className="bg-[#f0f5ff] min-h-screen p-4 font-sans text-[12px]">
      <div className="flex border-b border-gray-300 mb-2">
        <button className="px-6 py-1 bg-[#e2ebf8] border-t border-l border-r border-blue-300 rounded-t font-semibold">Entry</button>
      </div>

      <div className="bg-[#e2ebf8] p-4 border border-blue-300 shadow-sm">
        <FormHeader formData={formData} handleInputChange={handleInputChange} handleLovClick={handleLovClick} />
        <ItemsTable items={items} handleItemChange={handleItemChange} deleteRow={deleteRow} />
        <FormFooter formData={formData} handleInputChange={handleInputChange} />

        <div className="mt-6 flex gap-2">
          <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 text-[11px]">New</button>
          <button onClick={addRow} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-[11px]">Add Item</button>
          {isEditMode && (
            <button onClick={handleDeleteQuotation} className="bg-red-600 text-white px-6 py-1 rounded hover:bg-red-700 font-bold text-[11px]">Delete</button>
          )}
          <button onClick={handleSave} className="bg-green-700 text-white px-6 py-1 rounded hover:bg-green-800 font-bold text-[11px]">{isEditMode ? 'Update' : 'Save'} Quotation</button>
        </div>

        <LovModal 
          show={showLov}
          onClose={() => setShowLov(false)}
          lovType={lovType}
          onSelect={handleLovSelect}
        />
      </div>
    </div>
  );
};

// --- Sub-Components ---

const LovModal = ({ show, onClose, lovType, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  if (!show) return null;

  const config = getLovConfig(lovType);
  const data = lovData[lovType] || [];

  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    return Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 font-sans animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-[#f9fbfd]">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">{config.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-xl leading-none">&times;</button>
        </div>
        <div className="p-2 border-b border-gray-100 bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold sticky top-0">
              <tr>
                {config.columns.map((col) => <th key={col.key} className="px-4 py-2 border-b border-gray-200">{col.header}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item, idx) => (
                <tr key={idx} onClick={() => onSelect(item)} className="hover:bg-blue-50 cursor-pointer transition-colors">
                  {config.columns.map((col) => <td key={col.key} className="px-4 py-2">{item[col.key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FormHeader = ({ formData, handleInputChange, handleLovClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 mb-4">
    <div className="space-y-2">
      <div className="flex items-center">
        <label className="w-24">Quotation #</label>
        <div className="flex flex-1">
          <input name="qtnNo" value={formData.qtnNo} onChange={handleInputChange} className="w-full border border-gray-400 p-1 outline-none" />
          <button onClick={() => handleLovClick('quotation')} className="bg-gray-300 border border-l-0 border-gray-400 px-2 hover:bg-gray-400">🔍</button>
        </div>
      </div>
      <div className="flex items-center">
        <label className="w-24">Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="flex-1 border border-gray-400 p-1" />
      </div>
      <div className="flex items-center">
        <label className="w-24">Sales Man</label>
        <input name="salesMan" value={formData.salesMan} onChange={handleInputChange} className="flex-1 border border-gray-400 p-1 outline-none" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex items-center">
        <label className="w-20">Party</label>
        <div className="flex flex-1">
          <input name="party" value={formData.party} onChange={handleInputChange} className="w-full border border-gray-400 p-1 outline-none" />
          <button onClick={() => handleLovClick('party')} className="bg-gray-300 border border-l-0 border-gray-400 px-2 hover:bg-gray-400">🔍</button>
        </div>
      </div>
      <div className="flex items-start">
        <label className="w-20 pt-1">Address</label>
        <textarea name="address1" value={formData.address1} rows="3" onChange={handleInputChange} className="flex-1 border border-gray-400 p-1 outline-none resize-none"></textarea>
      </div>
    </div>
  </div>
);

const ItemsTable = ({ items, handleItemChange, deleteRow }) => (
  <div className="bg-white border border-gray-400 min-h-[250px] overflow-x-auto">
    <table className="w-full border-collapse">
      <thead className="bg-[#eef2ff] border-b border-gray-300 text-gray-700">
        <tr>
          <th className="border-r border-gray-300 p-1 text-center w-10">#</th>
          <th className="border-r border-gray-300 p-1 text-left w-32">Part No</th>
          <th className="border-r border-gray-300 p-1 text-left">Item Name</th>
          <th className="border-r border-gray-300 p-1 text-left w-20">Unit</th>
          <th className="border-r border-gray-300 p-1 text-left w-24">Qty</th>
          <th className="border-r border-gray-300 p-1 text-left w-24">Rate</th>
          <th className="border-r border-gray-300 p-1 text-left w-32">Total</th>
          <th className="p-1 text-center w-12 text-red-600">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id} className="border-b border-gray-200 group">
            <td className="border-r border-gray-300 text-center text-gray-400">{index + 1}</td>
            <td className="border-r border-gray-300"><input className="w-full p-1 outline-none" value={item.partNo} onChange={(e) => handleItemChange(item.id, 'partNo', e.target.value)} /></td>
            <td className="border-r border-gray-300"><input className="w-full p-1 outline-none" value={item.itemName} onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)} /></td>
            <td className="border-r border-gray-300"><input className="w-full p-1 outline-none" value={item.unit} onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)} /></td>
            <td className="border-r border-gray-300"><input type="number" className="w-full p-1 outline-none" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} /></td>
            <td className="border-r border-gray-300"><input type="number" className="w-full p-1 outline-none" value={item.rate} onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)} /></td>
            <td className="border-r border-gray-300 p-1 text-right">{item.total.toFixed(2)}</td>
            <td className="text-center">
              <button onClick={() => deleteRow(item.id)} className="text-red-500 hover:text-red-700 p-1 disabled:opacity-50" disabled={items.length <= 1}>
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FormFooter = ({ formData, handleInputChange }) => (
  <div className="mt-4 flex flex-wrap items-center justify-between border-t border-blue-200 pt-4">
    <div className="flex space-x-4">
      <div className="flex items-center">
        <label className="mr-2">Prepared By</label>
        <input name="preparedBy" value={formData.preparedBy} onChange={handleInputChange} className="border border-gray-400 p-1 outline-none bg-white w-48" />
      </div>
    </div>
    <div className="text-right pr-10">
      <span className="font-bold text-gray-700">Grand Total : </span>
      <span className="text-blue-800 font-bold bg-white px-4 py-1 border border-gray-400 min-w-[100px] inline-block">
        {formData.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>
    </div>
  </div>
);

export default QuotationIndex;