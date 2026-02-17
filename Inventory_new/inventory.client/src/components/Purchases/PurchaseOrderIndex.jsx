import { useState, useEffect } from "react";
import LocalPurchaseOrder from "./forms/LocalPurchaseOrder";
import PurchaseOrderList from "./lists/PurchaseOrderList";

export default function PurchaseOrderIndex() {
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const API_URL = "http://localhost:5000/api/purchase-orders";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.map((item) => ({ ...item, id: item._id })));
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAddNew = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (response.ok) {
          fetchOrders();
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      let response;
      if (editingOrder) {
        response = await fetch(`${API_URL}/${editingOrder.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        fetchOrders();
        setShowForm(false);
        setEditingOrder(null);
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
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