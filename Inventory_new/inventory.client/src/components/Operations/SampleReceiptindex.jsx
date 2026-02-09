import React, { useState, useEffect } from 'react';

const SampleReceiptIndex = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [formData, setFormData] = useState({
    receiptNo: 'SR1',
    issueNo: '',
    receivedFrom: '',
    godown: 'Godown',
    totalAmount: 0,
    // ... rest of your fields
  });

  const [items, setItems] = useState([
    { id: Date.now(), partNo: '', itemName: '', quantity: 0, mrp: 0 }
  ]);

  // Handle Save vs Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      console.log("Calling PUT/PATCH to MSSQL...", formData);
      alert("Database Updated!");
    } else {
      console.log("Calling POST to MSSQL...", formData);
      alert("New Record Saved!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Sample Receipt Entry</h1>
        <div className="flex gap-2">
           {/* Web style: Mode Indicator */}
           <span className={`px-3 py-1 rounded-full text-xs font-medium ${isEditMode ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
            {isEditMode ? 'Editing Existing Record' : 'New Entry Mode'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Issue No - Web Autocomplete Style */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Issue Number</label>
            <div className="relative flex">
              <input 
                className="w-full border border-gray-300 rounded-l-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Search Issue No..."
                value={formData.issueNo}
                onChange={(e) => setFormData({...formData, issueNo: e.target.value})}
              />
              <button type="button" className="bg-gray-800 text-white px-3 rounded-r-md hover:bg-gray-700">
                🔍
              </button>
            </div>
          </div>

          {/* Received From - Light Binocular Logic (Search/Insert) */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Received From</label>
            <div className="relative flex">
              <input 
                className="w-full border border-gray-300 rounded-l-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Search or type new name..."
                value={formData.receivedFrom}
                onChange={(e) => setFormData({...formData, receivedFrom: e.target.value})}
              />
              <button type="button" className="bg-blue-500 text-white px-3 rounded-r-md hover:bg-blue-600">
                🔍
              </button>
            </div>
          </div>

          {/* Godown - Dark Binocular Logic (Strict Selection) */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Godown</label>
            <div className="relative flex">
              <input 
                className="w-full border border-gray-300 rounded-l-md p-2 bg-gray-50 cursor-pointer"
                value={formData.godown}
                readOnly
                onClick={() => alert("Open modern Side Drawer with Godown list")}
              />
              <button type="button" className="bg-slate-700 text-white px-3 rounded-r-md">
                📋
              </button>
            </div>
          </div>
        </div>

        {/* Items Table - Clean Web Design */}
        <div className="overflow-hidden border border-gray-200 rounded-lg mb-6">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold text-gray-700">Item Details</th>
                <th className="p-3 text-sm font-semibold text-gray-700 w-32 text-right">Qty</th>
                <th className="p-3 text-sm font-semibold text-gray-700 w-32 text-right">MRP</th>
                <th className="p-3 text-sm font-semibold text-gray-700 w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <input className="w-full bg-transparent outline-none" placeholder="Enter item name..." />
                  </td>
                  <td className="p-3">
                    <input type="number" className="w-full bg-transparent text-right outline-none" placeholder="0" />
                  </td>
                  <td className="p-3">
                    <input type="number" className="w-full bg-transparent text-right outline-none" placeholder="0.00" />
                  </td>
                  <td className="p-3 text-center">
                    <button type="button" className="text-red-500 hover:text-red-700 font-bold text-lg">×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            type="button"
            onClick={() => setItems([...items, { id: Date.now() }])}
            className="w-full py-2 bg-gray-50 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
          >
            + Add New Line Item
          </button>
        </div>

        {/* Form Footer */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-t pt-6">
          <div className="w-full md:w-1/3">
             <label className="text-gray-600 text-xs uppercase font-bold tracking-wider">Remarks</label>
             <textarea className="w-full border rounded-md p-2 mt-1 h-20 outline-none focus:ring-1 focus:ring-blue-400" />
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Net Total Amount</p>
              <h2 className="text-3xl font-bold text-blue-900">₹ {formData.totalAmount.toLocaleString()}</h2>
            </div>
            
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => setIsEditMode(!isEditMode)}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                Clear
              </button>
              <button 
                type="submit"
                className={`px-10 py-2 rounded-md font-bold text-white shadow-lg transition-all ${isEditMode ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isEditMode ? 'UPDATE RECEIPT' : 'SAVE RECEIPT'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SampleReceiptIndex;