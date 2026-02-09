import { useState } from "react";
import PurchaseForm from "./forms/PurchaseForm";
import PurchaseList from "./lists/PurchaseList";
import PurchaseEntry from "./forms/PurchaseEntry";

export default function Index() {
  const [showForm, setShowForm] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(null);

  // Mock data for demonstration
  const [purchases, setPurchases] = useState([
    { id: 1, invoiceNo: "PUR-2024-001", invoiceDate: "2024-02-10", party: "Tech Supplies Inc.", billType: "Credit", godown: "Main Warehouse", grandTotal: "1,250.00" },
    { id: 2, invoiceNo: "PUR-2024-002", invoiceDate: "2024-02-12", party: "Office Depot", billType: "Cash", godown: "Store B", grandTotal: "450.50" },
    { id: 3, invoiceNo: "PUR-2024-003", invoiceDate: "2024-02-15", party: "Global Electronics", billType: "Credit", godown: "Main Warehouse", grandTotal: "3,890.00" },
  ]);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this purchase?")) {
        setPurchases(purchases.filter(p => p.id !== id));
    }
  }

  const handleEdit = (purchase) => {
      setEditingPurchase(purchase);
      setShowForm(true);
  }

  const handleSave = (formData) => {
    if (editingPurchase) {
      setPurchases(purchases.map(p => p.id === editingPurchase.id ? { ...formData, id: editingPurchase.id } : p));
    } else {
      const newPurchase = {
        id: Date.now(),
        ...formData,
      };
      setPurchases([newPurchase, ...purchases]);
    }
    setShowForm(false);
    setEditingPurchase(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full px-6 py-4">

        {/* ===== 1. PAGE HEADER ===== */}
        {!showForm && <header>
          <h1 className="text-2xl font-bold text-gray-900">Purchase Management</h1>
          <p className="text-sm text-gray-700 mb-5">
            Manage purchase entries and transactions
          </p>
        </header>}

        {/* ===== 2. SEARCH + ADD BUTTON ===== */}
        {!showForm && <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between gap-4 mb-6">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Search purchases..."
            />
          </div>
          <button
            onClick={() => { setEditingPurchase(null); setShowForm(true); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 whitespace-nowrap flex items-center gap-2"
          >
            <span className="text-lg">+</span> Add New Purchase
          </button>
        </section>}

        {/* ===== 3. PURCHASE FORM ===== */}
        {showForm && (
          <section>
            <PurchaseEntry onSave={handleSave} onCancel={() => { setShowForm(false); setEditingPurchase(null); }} initialData={editingPurchase} />
          </section>
        )}

        {/* ===== 4. PURCHASE LIST ===== */}
        {!showForm && (<section>
          <PurchaseList purchases={purchases} onDelete={handleDelete} onEdit={handleEdit} />
        </section>)}
      </div>
    </div>
  );
}