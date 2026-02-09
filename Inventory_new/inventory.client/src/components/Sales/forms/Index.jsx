import { useState } from "react";
import SalesForm from "./forms/SalesForm";
import SalesList from "./lists/SalesList";

export default function Index() {
  const [showForm, setShowForm] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  
  // Mock data
  const [sales, setSales] = useState([
    { id: 1, billNo: "INV-1001", billDate: "2024-02-20", party: "Cash Customer", billType: "Cash", grandTotal: "150.00" },
    { id: 2, billNo: "INV-1002", billDate: "2024-02-21", party: "John Doe", billType: "Credit", grandTotal: "1250.00" }
  ]);

  const handleAddNew = () => {
    setEditingSale(null);
    setShowForm(true);
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      setSales(sales.filter(s => s.id !== id));
    }
  };

  const handleSave = (formData) => {
    if (editingSale) {
      setSales(sales.map(s => s.id === editingSale.id ? { ...formData, id: editingSale.id } : s));
    } else {
      const newSale = {
        id: Date.now(),
        ...formData,
      };
      setSales([newSale, ...sales]);
    }
    setShowForm(false);
    setEditingSale(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSale(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-2 sm:p-4">
      {!showForm && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Sales</h1>
            <p className="text-sm text-gray-500 mt-1">Manage sales transactions and invoices.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between gap-4">
             <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  placeholder="Search sales..." 
                />
             </div>
             <button 
               onClick={handleAddNew} 
               className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap"
             >
               <span className="text-lg font-bold">+</span> New Sale
             </button>
          </div>

          <SalesList sales={sales} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}

      {showForm && (
        <SalesForm
          initialData={editingSale}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}