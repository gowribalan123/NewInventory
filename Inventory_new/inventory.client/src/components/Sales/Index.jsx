import { useState } from "react";
import SalesForm from "./forms/SalesForm";
import SalesList from "./lists/SalesList";

export default function Index() {
  const [showForm, setShowForm] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sales, setSales] = useState([
    { id: 1, billNo: "INV-001", billDate: "2024-10-20", party: "Cash Customer", billType: "Cash", grandTotal: "150.00" },
    { id: 2, billNo: "INV-002", billDate: "2024-10-21", party: "John Doe", billType: "Credit", grandTotal: "1250.00" }
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

  const filteredSales = sales.filter(
    (sale) =>
      sale.billNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.party.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="bg-gray-50 min-h-screen">
      {!showForm && (
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
            <p className="text-sm text-gray-500">Manage sales entries and transactions</p>
          </div>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            New Sale
          </button>
        </div>
      )}

      <div className="p-6">
        {showForm ? (
          <SalesForm 
            initialData={editingSale} 
            onSave={handleSave} 
            onCancel={handleCancel} 
          />
        ) : (
          <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between gap-4">
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by Bill No or Party..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <SalesList
              sales={filteredSales}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
}