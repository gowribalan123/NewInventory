import { useState } from "react";
import SalesReturn from "./forms/SalesReturn";
import SalesReturnList from "./lists/SalesReturnList";

export default function SalesReturnIndex() {
  const [showForm, setShowForm] = useState(false);
  const [editingReturn, setEditingReturn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const [returns, setReturns] = useState([
    { id: 1, returnNo: "SR-1001", returnDate: "2024-02-20", party: "Cash Customer", billType: "Cash", grandTotal: "450.00" },
    { id: 2, returnNo: "SR-1002", returnDate: "2024-02-22", party: "John Doe", billType: "Credit", grandTotal: "1250.00" },
  ]);

  const handleAddNew = () => {
    setEditingReturn(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingReturn(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this return?")) {
      setReturns(returns.filter(r => r.id !== id));
    }
  };

  const handleSave = (formData) => {
    if (editingReturn) {
      setReturns(returns.map(r => r.id === editingReturn.id ? { ...formData, id: editingReturn.id } : r));
    } else {
      const newReturn = {
        id: Date.now(),
        ...formData,
      };
      setReturns([newReturn, ...returns]);
    }
    setShowForm(false);
    setEditingReturn(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingReturn(null);
  };

  const filteredReturns = returns.filter(r =>
    r.returnNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.party.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full px-6 py-4">

        {!showForm && (
          <>
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Sales Return</h1>
              <p className="text-sm text-gray-700">
                Manage sales return entries
              </p>
            </header>

            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between gap-4 mb-6">
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Search returns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={handleAddNew}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 whitespace-nowrap flex items-center gap-2"
              >
                <span className="text-lg">+</span> New Return
              </button>
            </section>

            <SalesReturnList returns={filteredReturns} onDelete={handleDelete} onEdit={handleEdit} />
          </>
        )}

        {showForm && (
          <SalesReturn onSave={handleSave} onCancel={handleCancel} initialData={editingReturn} />
        )}
      </div>
    </div>
  );
}