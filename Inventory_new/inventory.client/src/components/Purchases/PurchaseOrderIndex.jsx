import { useState } from "react";
import LocalPurchaseOrder from "./forms/LocalPurchaseOrder";
import PurchaseOrderList from "./lists/PurchaseOrderList";

export default function PurchaseOrderIndex() {
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Mock data
  const [orders, setOrders] = useState([
    { id: 1, orderNo: "LPO-1001", orderDate: "2024-02-20", party: "Global Suppliers Ltd", status: "Active", grandTotal: "4500.00" },
    { id: 2, orderNo: "LPO-1002", orderDate: "2024-02-22", party: "Tech Supplies Inc.", status: "Closed", grandTotal: "1250.00" },
  ]);

  const handleAddNew = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const handleSave = (formData) => {
    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...formData, id: editingOrder.id } : o));
    } else {
      const newOrder = {
        id: Date.now(),
        ...formData,
      };
      setOrders([newOrder, ...orders]);
    }
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full px-6 py-4">

        {!showForm && (
          <>
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
              <p className="text-sm text-gray-700">
                Manage local purchase orders
              </p>
            </header>

            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between gap-4 mb-6">
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Search orders..."
                />
              </div>
              <button
                onClick={handleAddNew}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 whitespace-nowrap flex items-center gap-2"
              >
                <span className="text-lg">+</span> New Order
              </button>
            </section>

            <PurchaseOrderList orders={orders} onDelete={handleDelete} onEdit={handleEdit} />
          </>
        )}

        {showForm && (
          <section>
            <LocalPurchaseOrder
              onSave={handleSave}
              onCancel={handleCancel}
              initialData={editingOrder}
            />
          </section>
        )}
      </div>
    </div>
  );
}